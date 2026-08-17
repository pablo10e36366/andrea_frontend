import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { capturePaypalOrder } from '../lib/api'
import {
  clearPendingPurchase,
  getPendingPurchase,
  saveLastCustomer,
} from '../lib/purchaseStorage'

type StatusState = 'loading' | 'success' | 'error'

function PaypalSuccessPage() {
  const location = useLocation()
  const [state, setState] = useState<StatusState>('loading')
  const [message, setMessage] = useState('Estamos confirmando tu pago con PayPal...')

  useEffect(() => {
    async function confirmPayment() {
      const hashQuery = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : ''
      const searchParams = new URLSearchParams(location.search || hashQuery)
      const paypalOrderId = searchParams.get('token')
      const pendingPurchase = getPendingPurchase()

      if (!paypalOrderId || !pendingPurchase) {
        setState('error')
        setMessage('No encontramos los datos de la compra para confirmar el acceso.')
        return
      }

      try {
        await capturePaypalOrder(pendingPurchase.orderId, paypalOrderId)

        saveLastCustomer({
          email: pendingPurchase.email,
          customerName: pendingPurchase.customerName,
        })
        clearPendingPurchase()

        setState('success')
        setMessage(
          `Tu pago fue confirmado. Enviamos el PDF y un enlace privado de acceso al correo ${pendingPurchase.email}. Revisa también la carpeta de spam o correo no deseado.`,
        )
      } catch (confirmError) {
        setState('error')
        setMessage(confirmError instanceof Error ? confirmError.message : 'No se pudo confirmar el pago.')
      }
    }

    void confirmPayment()
  }, [location.search])

  return (
    <section className="section">
      <div className="card paymentResult">
        <h2>{state === 'loading' ? 'Confirmando pago' : state === 'success' ? 'Pago confirmado' : 'No se pudo confirmar el pago'}</h2>
        <p>{message}</p>
        {state === 'success' && (
          <p className="muted small">
            Para abrir el workbook completo, utiliza exclusivamente el enlace privado enviado a tu correo.
          </p>
        )}
        <div className="paymentResult__actions">
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
