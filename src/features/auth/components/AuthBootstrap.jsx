import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authStorage } from '../../../shared/api/authStorage'
import { setCredentials } from '../store/authSlice'

export function AuthBootstrap({ children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = authStorage.getToken()
    const user = authStorage.getUser()

    if (token && user?.role === 'admin') {
      dispatch(setCredentials({ token, user }))
    } else if (token || user) {
      authStorage.clear()
    }
  }, [dispatch])

  return children
}
