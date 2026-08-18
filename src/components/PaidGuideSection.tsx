import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  createOrder,
  createPaypalOrder,
  getProductBySlug,
  getProtectedFile,
  verifyProtectedAccess,
  type Product,
} from '../lib/api'
import {
  getLastCustomer,
  saveLastCustomer,
  savePendingPurchase,
} from '../lib/purchaseStorage'
import type { WorkbookGuide } from '../data/siteContent'

type PaidGuideSectionProps = {
  guide: WorkbookGuide
}

export function PaidGuideSection({ guide }: PaidGuideSectionProps) {
  const { slug, previewUrl, downloadFilename, topics, tools } = guide
  const guideAccessStorageKey = `workbook-access:${slug}`
  const guidePreviewUrl = `${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`
  const location = useLocation()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [customerName, setCustomerName] = useState(() => getLastCustomer()?.customerName ?? '')
  const [email, setEmail] = useState(() => getLastCustomer()?.email ?? '')
  const [hasAccess, setHasAccess] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [checkingAccess, setCheckingAccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [openingFile, setOpeningFile] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadProduct() {
      try {
        const productResponse = await getProductBySlug(slug)

        if (!cancelled) {
          setProduct(productResponse)
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar la guía.')
        }
      } finally {
        if (!cancelled) {
          setLoadingProduct(false)
        }
      }
    }

    void loadProduct()

    return () => {
      cancelled = true
    }
  }, [slug])

  useEffect(() => {
    async function unlockFromPrivateLink() {
      const tokenFromLink = new URLSearchParams(location.search).get('access')
    const token = tokenFromLink ?? sessionStorage.getItem(guideAccessStorageKey)

      if (!token) {
        return
      }

      setCheckingAccess(true)
      setError('')

      try {
        const response = await verifyProtectedAccess(token)

        if (!response.hasAccess || response.slug !== slug) {
          throw new Error('Este enlace no corresponde a este workbook.')
        }

        sessionStorage.setItem(guideAccessStorageKey, token)
        setAccessToken(token)
        setHasAccess(true)
        setMessage('Tu enlace privado es válido. Ya puedes abrir el PDF completo.')
      } catch (accessError) {
        sessionStorage.removeItem(guideAccessStorageKey)
        setAccessToken('')
        setHasAccess(false)
        setError(
          accessError instanceof Error
            ? accessError.message
            : 'El enlace privado no es válido o ya venció.',
        )
      } finally {
        setCheckingAccess(false)

        if (tokenFromLink) {
          navigate(location.pathname, { replace: true })
        }
      }
    }

    void unlockFromPrivateLink()
  }, [guideAccessStorageKey, location.pathname, location.search, navigate, slug])

  async function handlePurchase() {
    if (!product) {
      setError('La guía aún no está disponible.')
      return
    }

    if (!customerName.trim() || !email.trim()) {
      setError('Completa tu nombre y correo antes de continuar.')
      return
    }

    setSubmitting(true)
    setError('')
    setMessage('')

    try {
      saveLastCustomer({
        email: email.trim(),
        customerName: customerName.trim(),
      })

      const order = await createOrder({
        email: email.trim(),
        customerName: customerName.trim(),
        productId: product.id,
        amount: product.price,
        currency: 'USD',
      })

      const paypalOrder = await createPaypalOrder(order.id)

      if (!paypalOrder.approveLink) {
        throw new Error('PayPal no devolvió el enlace de aprobación.')
      }

      savePendingPurchase({
        orderId: order.id,
        email: email.trim(),
        customerName: customerName.trim(),
        productId: product.id,
        productSlug: product.slug,
      })

      window.location.href = paypalOrder.approveLink
    } catch (purchaseError) {
      setError(purchaseError instanceof Error ? purchaseError.message : 'No se pudo iniciar la compra.')
      setSubmitting(false)
    }
  }

  async function handleProtectedFile(mode: 'view' | 'download') {
    if (!accessToken) {
      setError('Abre el enlace privado que recibiste por correo para acceder al archivo.')
      return
    }

    setOpeningFile(true)
    setError('')

    try {
      const file = await getProtectedFile(accessToken, mode === 'download')
      const fileUrl = URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = fileUrl

      if (mode === 'download') {
      link.download = downloadFilename
      } else {
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
      }

      document.body.appendChild(link)
      link.click()
      link.remove()
      window.setTimeout(() => URL.revokeObjectURL(fileUrl), 60_000)
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : 'No se pudo abrir el PDF protegido.')
    } finally {
      setOpeningFile(false)
    }
  }

  return (
    <div className="card paidGuide">
      <div className="guidePreviewDocument">
              <iframe className="guidePreviewDocument__frame" src={guidePreviewUrl} title={`Vista previa de ${guide.title}`} />
      </div>

      {!hasAccess && (
        <div className="guideLockedPage">
          <div className="guideLockedPage__blur" />
          <div className="guideLockedPage__content">
            <p className="guideLockedPage__eyebrow">Página 4 en adelante</p>
            <h4>¿Quieres seguir leyendo la guía completa?</h4>
            <p>Completa el pago para desbloquear el workbook.</p>
          </div>
        </div>
      )}

      <div className={`guidePreview ${hasAccess ? 'is-unlocked' : 'is-locked'}`}>
        <div className="guidePreview__content">
          <p>
            Esta guía te ayuda a reconocer el estrés, entender cómo afecta tu cuerpo y aplicar herramientas concretas
            para regularlo.
          </p>

          <ul className="list">
                {topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>

          {hasAccess && (
            <>
              <p className="paidGuide__unlockedTitle">Acceso completo desbloqueado</p>
              <ul className="list">
                {tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              <div className="paidGuide__downloadActions">
                <button className="btn" type="button" onClick={() => void handleProtectedFile('view')} disabled={openingFile}>
                  {openingFile ? 'Abriendo archivo...' : 'Ver PDF completo'}
                </button>
                <button
                  className="btn paidGuide__downloadBtn"
                  type="button"
                  onClick={() => void handleProtectedFile('download')}
                  disabled={openingFile}
                >
                  {openingFile ? 'Preparando descarga...' : 'Descargar PDF completo'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="paidGuide__form">
        <label>
          Nombre completo
          <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Tu nombre" />
        </label>

        <label>
          Correo electrónico
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tunombre@correo.com"
          />
        </label>
        <p className="paidGuide__hint">
          📩 <em>Revisa tu correo electrónico.</em> Tu workbook será enviado en formato PDF una vez completes tu compra.
          <br />
          <br />
          Si no lo encuentras en tu bandeja de entrada, recuerda revisar la carpeta de <em>spam</em> o <em>correo no deseado</em>.
        </p>

        <div className="paidGuide__actions">
          {!hasAccess && (
            <button className="btn paidGuide__buyBtn" type="button" onClick={() => void handlePurchase()} disabled={submitting || loadingProduct}>
              {submitting ? 'Conectando con PayPal...' : '¡Comprar ahora!'}
            </button>
          )}
        </div>

        {checkingAccess && <p className="paidGuide__message">Verificando tu enlace privado...</p>}
        {message && <p className="paidGuide__message">{message}</p>}
        {error && <p className="paidGuide__error">{error}</p>}
      </div>
    </div>
  )
}
