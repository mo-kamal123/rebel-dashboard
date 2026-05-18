import { httpClient } from '../../../shared/api/httpClient'

export async function fetchProducts() {
  const { data } = await httpClient.get('/api/products')
  return data
}

export async function fetchProductById(id) {
  const { data } = await httpClient.get(`/api/products/${id}`)
  return data
}

export async function createProduct(formData) {
  const { data } = await httpClient.post('/api/products', formData)
  return data
}

export async function updateProduct({ id, formData }) {
  const { data } = await httpClient.put(`/api/products/${id}`, formData)
  return data
}

export async function deleteProduct(id) {
  const { data } = await httpClient.delete(`/api/products/${id}`)
  return data
}
