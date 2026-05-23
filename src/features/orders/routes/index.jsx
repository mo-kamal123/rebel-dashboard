import { OrdersPage } from '../pages/OrdersPage'
import { OrderCreatePage } from '../pages/OrderCreatePage'
import { OrderDetailPage } from '../pages/OrderDetailPage'

export const orderRoutes = [
  { path: 'orders', element: <OrdersPage /> },
  { path: 'orders/new', element: <OrderCreatePage /> },
  { path: 'orders/:id', element: <OrderDetailPage /> },
]
