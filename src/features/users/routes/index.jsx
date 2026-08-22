import { UsersPage } from '../pages/UsersPage'
import { UserDetailPage } from '../pages/UserDetailPage'

export const userRoutes = [
  { path: 'users', element: <UsersPage /> },
  { path: 'users/:id', element: <UserDetailPage /> },
]
