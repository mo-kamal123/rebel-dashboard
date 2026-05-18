import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function GuestOnly({ children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  if (isAuthenticated && user?.role === 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}
