import { LoginPage } from '../pages/LoginPage'
import { GuestOnly } from '../components/GuestOnly'

export const authRoutes = [
  {
    path: 'login',
    element: (
      <GuestOnly>
        <LoginPage />
      </GuestOnly>
    ),
  },
]
