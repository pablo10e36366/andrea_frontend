export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export type Product = {
  id: string
  title: string
  slug: string
  description: string
  price: number
  isActive: boolean
}

export type Order = {
  id: string
  userId: string
  productId: string
  status: string
  amount: number
  currency: string
}

export type PaypalOrder = {
  internalOrderId: string
  paypalOrderId: string
  status: string
  approveLink: string | null
}

export type AccessCheckResponse = {
  hasAccess: boolean
  userId?: string
  productId?: string
  grantedAt?: string | null
}

export type DownloadLinksResponse = {
  viewUrl: string
  downloadUrl: string
  expiresInMinutes: number
}

type RequestOptions = RequestInit & {
  body?: BodyInit | null
}

async function request<T>(path: string, options: RequestOptions = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  })

  const contentType = response.headers.get('content-type') ?? ''
  const payload = contentType.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload && 'message' in payload
        ? Array.isArray(payload.message)
          ? payload.message.join(', ')
          : String(payload.message)
        : `Request failed: ${response.status}`

    throw new Error(message)
  }

  return payload as T
}

export function getProductBySlug(slug: string) {
  return request<Product>(`/products/${slug}`, {
    method: 'GET',
  })
}

export function createOrder(payload: {
  email: string
  customerName: string
  productId: string
  amount: number
  currency: string
}) {
  return request<Order>('/orders', {
    method: 'POST',
    body: JSON.stringify({
      ...payload,
      status: 'pending',
    }),
  })
}

export function createPaypalOrder(orderId: string) {
  return request<PaypalOrder>('/paypal/create-order', {
    method: 'POST',
    body: JSON.stringify({ orderId }),
  })
}

export function capturePaypalOrder(orderId: string, paypalOrderId: string) {
  return request('/paypal/capture-order', {
    method: 'POST',
    body: JSON.stringify({ orderId, paypalOrderId }),
  })
}

export function checkAccess(email: string, slug: string) {
  const query = new URLSearchParams({ email, slug }).toString()
  return request<AccessCheckResponse>(`/access/check?${query}`, {
    method: 'GET',
  })
}

export function requestProtectedDownload(email: string, slug: string) {
  return request<DownloadLinksResponse>('/downloads/request', {
    method: 'POST',
    body: JSON.stringify({ email, slug }),
  })
}
