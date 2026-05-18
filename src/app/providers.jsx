import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { AuthBootstrap } from '../features/auth/components/AuthBootstrap'
import { store } from './store'
import { router } from './router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
    },
  },
})

export function AppProviders() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthBootstrap>
          <RouterProvider router={router} />
        </AuthBootstrap>
      </QueryClientProvider>
    </Provider>
  )
}
