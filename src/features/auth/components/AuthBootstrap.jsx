import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authStorage } from '../../../shared/api/authStorage'
import { Spinner } from '../../../shared/components/ui/Spinner'
import { setCredentials } from '../store/authSlice'

export function AuthBootstrap({ children }) {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    const token = authStorage.getToken()
    const user = authStorage.getUser()

    if (token && user?.role === 'admin') {
      dispatch(setCredentials({ token, user }))
    } else if (token || user) {
      authStorage.clear()
    }
  }, [dispatch])

  const hasStoredSession = Boolean(authStorage.getToken()) || Boolean(authStorage.getUser())

  if (!isAuthenticated && hasStoredSession) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    )
  }

  return children
}