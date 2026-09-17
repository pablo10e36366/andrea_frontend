import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { capturePaypalOrder } from '../lib/api'
import {
  clearPendingPurchase,
  getPendingPurchase,
  saveLastCustomer,
  savePendingPurchase,
} from '../lib/purchaseStorage'

type StatusState = 'loading' | 'success' | 'error'

function PaypalSuccessPage() {
  const location = useLocation()
  const [state, setState] = useState<StatusState>('loading')
  const [message, setMessage] = useState('Estamos confirmando tu pago con PayPal...')
  const [deliveryPending, setDeliveryPending] = useState(false)
  const [retrying, setRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [orderReference, setOrderReference] = useState('')
  const [pendingPurchase] = useState(getPendingPurchase)
  const paidConfirmed = useRef(false)

  useEffect(() => {
    let cancelled = false
    async function confirmPayment() {
      const hashQuery = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : ''
      const searchParams = new URLSearchParams(location.search || hashQuery)
      const paypalOrderId = searchParams.get('token')
      if (!paypalOrderId || !pendingPurchase) {
        setState('error')
        setMessage('No encontramos los datos de la compra para confirmar el acceso.')
        setRetrying(false)
        return
      }

      try {
        const result = await capturePaypalOrder(pendingPurchase.orderId, paypalOrderId)
        if (cancelled) return
        paidConfirmed.current = true
        const emailSent = result.deliveryStatus === 'sent'
        setOrderReference(pendingPurchase.orderId)
        setDeliveryPending(!emailSent)

        saveLastCustomer({
          email: pendingPurchase.email,
          customerName: pendingPurchase.customerName,
        })
        // Keep the purchase reference until email delivery succeeds, so a
        // refresh or retry can recover the shipment without another checkout.
        if (emailSent) {
          clearPendingPurchase(pendingPurchase.orderId)
        } else if (getPendingPurchase()?.orderId === pendingPurchase.orderId) {
          savePendingPurchase({ ...pendingPurchase, paypalOrderId, paymentConfirmed: true })
        }

        setState('success')
        setMessage(
          emailSent
            ? `Tu pago fue confirmado. Enviamos el PDF y un enlace privado de acceso al correo ${pendingPurchase.email}. Revisa también la carpeta de spam o correo no deseado.`
            : 'Tu pago fue confirmado, pero no pudimos completar el envío del correo. Pulsa «Reintentar envío del correo». No necesitas volver a pagar.',
        )
      } catch (confirmError) {
        if (cancelled) return
        if (paidConfirmed.current || (pendingPurchase.paymentConfirmed && pendingPurchase.paypalOrderId === paypalOrderId)) {
          setState('success')
          setDeliveryPending(true)
          setOrderReference(pendingPurchase.orderId)
          setMessage('Tu compra sigue pagada. No pudimos completar el reintento. Inténtalo más tarde; no vuelvas a pagar.')
        } else {
          setState('error')
          setMessage(confirmError instanceof Error ? confirmError.message : 'No se pudo confirmar el pago.')
        }
      } finally {
        if (!cancelled) setRetrying(false)
      }
    }

    void confirmPayment()
    return () => { cancelled = true }
  }, [location.search, retryCount, pendingPurchase])

  return (
    <section className="section">
      <div className="card paymentResult">
        <h2>{state === 'loading' ? 'Confirmando pago' : state === 'success' ? 'Pago confirmado' : 'No se pudo confirmar el pago'}</h2>
        <p>{message}</p>
        {state === 'success' && !deliveryPending && (
          <p className="muted small">
            Para abrir el workbook completo, utiliza exclusivamente el enlace privado enviado a tu correo.
          </p>
        )}
        {deliveryPending && (
          <p className="muted small">Guarda tu referencia de compra: {orderReference}. Si el problema continúa, contáctanos con esta referencia.</p>
        )}
        <div className="paymentResult__actions">
          {deliveryPending && (
            <button className="btn" type="button" disabled={retrying} onClick={() => {
              setRetrying(true)
              setRetryCount((count) => count + 1)
            }}>
              {retrying ? 'Reintentando envío...' : 'Reintentar envío del correo'}
            </button>
          )}
          <Link className="btn paymentResult__secondary" to="/workbooks">
            Volver a workbooks
          </Link>
        </div>
      </div>
    </section>
  )
}

function PaypalCancelPage() {
  return (
    <section className="section">
      <div className="card paymentResult">
        <h2>Pago cancelado</h2>
        <p>La compra se canceló antes de completarse. Puedes intentarlo nuevamente cuando quieras.</p>
        <div className="paymentResult__actions">
          <Link className="btn" to="/workbooks">
            Volver a workbooks
          </Link>
        </div>
      </div>
    </section>
  )
}

export { PaypalCancelPage, PaypalSuccessPage }
