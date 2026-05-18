import { OrdersPage } from '../pages/OrdersPage'
import { OrderDetailPage } from '../pages/OrderDetailPage'

export const orderRoutes = [
  { path: 'orders', element: <OrdersPage /> },
  { path: 'orders/:id', element: <OrderDetailPage /> },
]
