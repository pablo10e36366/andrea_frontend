import { useEffect, useState } from 'react'

import {
  checkAccess,
  createOrder,
  createPaypalOrder,
  getProductBySlug,
  requestProtectedDownload,
  type Product,
} from '../lib/api'
import {
  getLastCustomer,
  saveLastCustomer,
  savePendingPurchase,
} from '../lib/purchaseStorage'

const GUIDE_SLUG = 'guia-para-el-estres'
const GUIDE_PREVIEW_URL = '/previews/guia-para-el-estres-preview.pdf#toolbar=0&navpanes=0&scrollbar=0'

const guideTopics = [
  'Qué es el estrés y cómo identificarlo a tiempo.',
  'Señales físicas, emocionales y mentales más frecuentes.',
  'Ejercicios prácticos para bajar la tensión en minutos.',
  'Rutina sencilla para prevenir que el estrés te sobrepase.',
]

const unlockedTools = [
  'Ejercicio de respiración guiada.',
  'Checklist personal de detonantes.',
  'Plan breve de regulación emocional.',
  'Recomendaciones prácticas para el día a día.',
]

export function PaidGuideSection() {
  const [product, setProduct] = useState<Product | null>(null)
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [hasAccess, setHasAccess] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [checkingAccess, setCheckingAccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [openingFile, setOpeningFile] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const savedCustomer = getLastCustomer()

    if (savedCustomer) {
      setCustomerName(savedCustomer.customerName)
      setEmail(savedCustomer.email)
    }

    void loadProduct(savedCustomer?.email)
  }, [])

  async function loadProduct(savedEmail?: string) {
    setLoadingProduct(true)
    setError('')

    try {
      const productResponse = await getProductBySlug(GUIDE_SLUG)
      setProduct(productResponse)

      if (savedEmail) {
        await verifyAccess(savedEmail, productResponse.slug)
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar la guía.')
    } finally {
      setLoadingProduct(false)
    }
  }

  async function verifyAccess(emailValue = email, slugValue = product?.slug ?? GUIDE_SLUG) {
    if (!emailValue.trim()) {
      setError('Escribe tu correo para verificar acceso.')
      return
    }

    setCheckingAccess(true)
    setError('')
    setMessage('')

    try {
      const response = await checkAccess(emailValue.trim(), slugValue)
      setHasAccess(response.hasAccess)
      setMessage(
        response.hasAccess
          ? 'Tu acceso ya está activo. Puedes revisar la guía completa.'
          : 'Todavía no tienes acceso desbloqueado para esta guía.',
      )
    } catch (accessError) {
      setError(accessError instanceof Error ? accessError.message : 'No se pudo verificar el acceso.')
    } finally {
      setCheckingAccess(false)
    }
  }

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
    if (!email.trim()) {
      setError('Necesitas tu correo para validar el acceso al archivo.')
      return
    }

    setOpeningFile(true)
    setError('')

    try {
      const links = await requestProtectedDownload(email.trim(), GUIDE_SLUG)
      const targetUrl = mode === 'download' ? links.downloadUrl : links.viewUrl

      window.open(targetUrl, '_blank', 'noopener,noreferrer')
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : 'No se pudo abrir el PDF protegido.')
    } finally {
      setOpeningFile(false)
    }
  }

  return (
    <div className="card paidGuide">
      <div className="paidGuide__head">
        <span className="paidGuide__price">{loadingProduct || !product ? '...' : `$${product.price.toFixed(2)}`}</span>
      </div>

      <div className="guidePreviewDocument">
        <iframe className="guidePreviewDocument__frame" src={GUIDE_PREVIEW_URL} title="Vista previa del workbook" />
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
            {guideTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>

          {hasAccess && (
            <>
              <p className="paidGuide__unlockedTitle">Acceso completo desbloqueado</p>
              <ul className="list">
                {unlockedTools.map((tool) => (
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
          <button className="btn" type="button" onClick={() => void verifyAccess()} disabled={checkingAccess || loadingProduct}>
            {checkingAccess ? 'Verificando acceso...' : 'Verificar acceso'}
          </button>

          {!hasAccess && (
            <button className="btn paidGuide__buyBtn" type="button" onClick={() => void handlePurchase()} disabled={submitting || loadingProduct}>
              {submitting ? 'Conectando con PayPal...' : '¡Comprar ahora!'}
            </button>
          )}
        </div>

        {message && <p className="paidGuide__message">{message}</p>}
        {error && <p className="paidGuide__error">{error}</p>}
      </div>
    </div>
  )
}
