import { httpClient } from '../../../shared/api/httpClient'

export async function fetchUsers() {
  const { data } = await httpClient.get('/api/users')
  return data.users
}

export async function fetchUserById(id) {
  const { data } = await httpClient.get(`/api/users/${id}`)
  return data.user
}

/**
 * @param {{ id: string, role: import('../../../shared/models/user').UserRole }} payload
 */
export async function updateUserRole({ id, role }) {
  const { data } = await httpClient.patch(`/api/users/${id}/role`, { role })
  return data
}
