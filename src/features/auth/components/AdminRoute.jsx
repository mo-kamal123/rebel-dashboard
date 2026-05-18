import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function AdminRoute() {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const location = useLocation()

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
