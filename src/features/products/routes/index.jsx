import { ProductsPage } from '../pages/ProductsPage'
import { ProductCreatePage } from '../pages/ProductCreatePage'
import { ProductEditPage } from '../pages/ProductEditPage'

export const productRoutes = [
  { path: 'products', element: <ProductsPage /> },
  { path: 'products/new', element: <ProductCreatePage /> },
  { path: 'products/:id/edit', element: <ProductEditPage /> },
]
