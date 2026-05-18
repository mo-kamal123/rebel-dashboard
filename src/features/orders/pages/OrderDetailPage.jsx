import { useParams, Link } from 'react-router-dom'
import { PageHeader } from '../../../shared/components/ui/PageHeader'
import { Spinner } from '../../../shared/components/ui/Spinner'
import { EmptyState } from '../../../shared/components/ui/EmptyState'
import { Badge } from '../../../shared/components/ui/Badge'
import { Button } from '../../../shared/components/ui/Button'
import { OrderStatusSelect } from '../components/OrderStatusSelect'
import { useOrderQuery } from '../hooks/useOrderQuery'
import { useUpdateOrderStatusMutation } from '../hooks/useUpdateOrderStatusMutation'
import { formatCurrency, formatDate } from '../../../shared/lib/format'
import { formatPaymentMethod } from '../../../shared/lib/formatPaymentMethod'
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage'
import { ORDER_STATUS_LABELS } from '../../../shared/models/order'

export function OrderDetailPage() {
  const { id } = useParams()
  const orderQuery = useOrderQuery(id)
  const statusMutation = useUpdateOrderStatusMutation(id)

  if (orderQuery.isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (orderQuery.isError || !orderQuery.data) {
    return (
      <EmptyState
        title="Order not found"
        description={getApiErrorMessage(orderQuery.error, 'Unable to load this order.')}
        action={
          <Link to="/orders">
            <Button type="button" variant="ghost">
              Back to orders
            </Button>
          </Link>
        }
      />
    )
  }

  const order = orderQuery.data

  const handleStatusChange = (event) => {
    const nextStatus = event.target.value
    if (nextStatus === order.status) return
    statusMutation.mutate(nextStatus)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Order"
        title={`#${order.id.slice(-6).toUpperCase()}`}
        description={`Placed ${formatDate(order.createdAt)}`}
        actions={
          <Link to="/orders">
            <Button type="button" variant="ghost">
              ← All orders
            </Button>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="glass-panel space-y-4 p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Items</h2>
          <ul className="space-y-3">
            {order.products.map((item) => (
              <li
                key={`${item.product._id}-${item.quantity}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="flex items-center gap-3">
                  {item.product.images?.[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="size-12 rounded-lg object-cover"
                    />
                  ) : null}
                  <div>
                    <p className="font-medium text-white">{item.product.name}</p>
                    <p className="text-xs text-white/40">Qty {item.quantity}</p>
                  </div>
                </div>
                <p className="text-sm text-white/70">
                  {formatCurrency(item.product.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-white/10 pt-4 text-sm">
            <span className="text-white/50">Total</span>
            <span className="font-semibold text-white">{formatCurrency(order.totalPrice)}</span>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="glass-panel space-y-3 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Status</h2>
            <Badge status={order.status}>{ORDER_STATUS_LABELS[order.status]}</Badge>
            <OrderStatusSelect
              value={statusMutation.isPending ? statusMutation.variables : order.status}
              onChange={handleStatusChange}
              disabled={statusMutation.isPending}
            />
            {statusMutation.isError ? (
              <p className="text-xs text-red-400">{getApiErrorMessage(statusMutation.error)}</p>
            ) : null}
          </section>

          <section className="glass-panel space-y-3 p-6 text-sm">
            <h2 className="font-semibold uppercase tracking-wider text-white/50">Customer</h2>
            <p className="text-white">{order.customerName}</p>
            <p className="text-white/60">{order.phoneNumber}</p>
            <p className="text-white/60">{order.address}</p>
            {order.user?.email ? (
              <p className="text-white/40">Account: {order.user.email}</p>
            ) : null}
          </section>

          <section className="glass-panel space-y-2 p-6 text-sm">
            <h2 className="font-semibold uppercase tracking-wider text-white/50">Payment</h2>
            <p className="text-white">{formatPaymentMethod(order.paymentMethod)}</p>
          </section>
        </aside>
      </div>
    </div>
  )
}
