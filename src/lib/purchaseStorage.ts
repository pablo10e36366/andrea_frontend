export const PENDING_PURCHASE_KEY = 'andrea_pending_purchase'
export const LAST_CUSTOMER_KEY = 'andrea_last_customer'

export type PendingPurchase = {
  orderId: string
  email: string
  customerName: string
  productId: string
  productSlug: string
}

export type LastCustomer = {
  email: string
  customerName: string
}

export function getPendingPurchase() {
  const raw = window.localStorage.getItem(PENDING_PURCHASE_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as PendingPurchase
  } catch {
    return null
  }
}

export function savePendingPurchase(data: PendingPurchase) {
  window.localStorage.setItem(PENDING_PURCHASE_KEY, JSON.stringify(data))
}

export function clearPendingPurchase() {
  window.localStorage.removeItem(PENDING_PURCHASE_KEY)
}

export function getLastCustomer() {
  const raw = window.localStorage.getItem(LAST_CUSTOMER_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as LastCustomer
  } catch {
    return null
  }
}

export function saveLastCustomer(data: LastCustomer) {
  window.localStorage.setItem(LAST_CUSTOMER_KEY, JSON.stringify(data))
}
