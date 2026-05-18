import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/authApi'
import { authStorage } from '../../../shared/api/authStorage'
import { setCredentials } from '../store/authSlice'
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage'

export function useLoginMutation() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials) => {
      const data = await login(credentials)

      if (data.user.role !== 'admin') {
        throw new Error('Admin access only. Use a store admin account.')
      }

      return data
    },
    onSuccess: (data) => {
      authStorage.setToken(data.token)
      authStorage.setUser(data.user)
      dispatch(setCredentials({ token: data.token, user: data.user }))
      navigate('/', { replace: true })
    },
    meta: {
      getErrorMessage: getApiErrorMessage,
    },
  })
}
