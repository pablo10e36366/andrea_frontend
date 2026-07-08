import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { capturePaypalOrder, checkAccess } from '../lib/api'
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
        try {
          await capturePaypalOrder(pendingPurchase.orderId, paypalOrderId)
        } catch (captureError) {
          const accessResult = await checkAccess(pendingPurchase.email, pendingPurchase.productSlug)

          if (!accessResult.hasAccess) {
            throw captureError
          }
        }

        const accessResult = await checkAccess(pendingPurchase.email, pendingPurchase.productSlug)

        if (!accessResult.hasAccess) {
          throw new Error('El pago se proceso, pero el acceso no quedo habilitado todavia.')
        }

        saveLastCustomer({
          email: pendingPurchase.email,
          customerName: pendingPurchase.customerName,
        })
        clearPendingPurchase()

        setState('success')
        setMessage(
          `Tu pago fue confirmado. El PDF de la guia se enviara al correo ${pendingPurchase.email}. Revisa tambien tu carpeta de spam por si acaso.`,
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
        <div className="paymentResult__actions">
          {state === 'success' && (
            <Link className="btn" to="/workbooks/guia-para-el-estres">
              Ir a la guia desbloqueada
            </Link>
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
        <p>La compra se cancelo antes de completarse. Puedes intentarlo nuevamente cuando quieras.</p>
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
