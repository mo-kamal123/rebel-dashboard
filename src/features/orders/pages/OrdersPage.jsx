import { Link } from 'react-router-dom'
import { PageHeader } from '../../../shared/components/ui/PageHeader'
import { Button } from '../../../shared/components/ui/Button'
import { Spinner } from '../../../shared/components/ui/Spinner'
import { EmptyState } from '../../../shared/components/ui/EmptyState'
import { OrderTable } from '../components/OrderTable'
import { useOrdersQuery } from '../hooks/useOrdersQuery'
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage'

export function OrdersPage() {
  const ordersQuery = useOrdersQuery()

  if (ordersQuery.isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (ordersQuery.isError) {
    return (
      <EmptyState
        title="Could not load orders"
        description={getApiErrorMessage(ordersQuery.error)}
      />
    )
  }

  const orders = ordersQuery.data ?? []

  return (
    <div>
      <PageHeader
        kicker="Sales"
        title="Orders"
        description="Review customer orders, create manual orders, and update fulfillment status."
        actions={
          <Link to="/orders/new">
            <Button type="button">Create order</Button>
          </Link>
        }
      />

      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="Create a manual order or wait for storefront checkout."
          action={
            <Link to="/orders/new">
              <Button type="button">Create order</Button>
            </Link>
          }
        />
      ) : (
        <OrderTable orders={orders} />
      )}
    </div>
  )
}
