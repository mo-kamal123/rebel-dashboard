import { httpClient } from '../../../shared/api/httpClient'

/**
 * @param {import('../../../shared/models/auth').LoginPayload} credentials
 * @returns {Promise<import('../../../shared/models/auth').AuthResponse>}
 */
export async function login(credentials) {
  const { data } = await httpClient.post('/api/auth/login', credentials)
  return data
}
