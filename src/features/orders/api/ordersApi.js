import { httpClient } from '../../../shared/api/httpClient'

export async function fetchOrders() {
  const { data } = await httpClient.get('/api/orders')
  return data
}

export async function fetchOrderById(id) {
  const { data } = await httpClient.get(`/api/orders/${id}`)
  return data
}

export async function updateOrderStatus({ id, status }) {
  const { data } = await httpClient.patch(`/api/orders/${id}/status`, { status })
  return data
}
