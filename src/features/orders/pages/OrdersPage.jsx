import { PageHeader } from '../../../shared/components/ui/PageHeader'
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
        description="Review customer orders and update fulfillment status."
      />

      {orders.length === 0 ? (
        <EmptyState title="No orders yet" description="New orders will appear here." />
      ) : (
        <OrderTable orders={orders} />
      )}
    </div>
  )
}
