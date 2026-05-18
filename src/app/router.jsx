import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from './shell/AppShell'
import { AdminLayout } from './shell/AdminLayout'
import { AdminRoute } from '../features/auth/components/AdminRoute'
import { authRoutes } from '../features/auth/routes'
import { dashboardRoutes } from '../features/dashboard/routes'
import { productRoutes } from '../features/products/routes'
import { orderRoutes } from '../features/orders/routes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      ...authRoutes,
      {
        element: <AdminRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [...dashboardRoutes, ...productRoutes, ...orderRoutes],
          },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
