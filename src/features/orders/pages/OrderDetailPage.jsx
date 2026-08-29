import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PageHeader } from '../../../shared/components/ui/PageHeader'
import { Spinner } from '../../../shared/components/ui/Spinner'
import { EmptyState } from '../../../shared/components/ui/EmptyState'
import { Badge } from '../../../shared/components/ui/Badge'
import { Button } from '../../../shared/components/ui/Button'
import { Input } from '../../../shared/components/ui/Input'
import { OrderStatusSelect } from '../components/OrderStatusSelect'
import { useOrderQuery } from '../hooks/useOrderQuery'
import { useUpdateOrderStatusMutation } from '../hooks/useUpdateOrderStatusMutation'
import { useUpdateOrderMutation } from '../hooks/useUpdateOrderMutation'
import { formatCurrency, formatDate } from '../../../shared/lib/format'
import { formatPaymentMethod } from '../../../shared/lib/formatPaymentMethod'
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage'
import { ORDER_STATUS_LABELS } from '../../../shared/models/order'
import { formatOrderLabel } from '../lib/normalizeOrder'

function ShippingEditor({ order }) {
  const shippingMutation = useUpdateOrderMutation(order.id)
  const [shippingDraft, setShippingDraft] = useState(String(order.shipping))

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextShipping = Number(shippingDraft)
    if (!Number.isFinite(nextShipping) || nextShipping < 0) return
    if (nextShipping === order.shipping) return
    shippingMutation.mutate(nextShipping)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        label="Shipping (EGP)"
        name="shipping"
        type="number"
        min="0"
        step="0.01"
        value={shippingMutation.isPending ? shippingMutation.variables : shippingDraft}
        onChange={(event) => setShippingDraft(event.target.value)}
        disabled={shippingMutation.isPending}
      />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        disabled={shippingMutation.isPending || Number(shippingDraft) === order.shipping}
      >
        {shippingMutation.isPending ? 'Saving…' : 'Update shipping'}
      </Button>
      {shippingMutation.isError ? (
        <p className="text-xs text-red-400">{getApiErrorMessage(shippingMutation.error)}</p>
      ) : null}
    </form>
  )
}

export function OrderDetailPage() {
  const { id } = useParams()
  const orderQuery = useOrderQuery(id)
  const statusMutation = useUpdateOrderStatusMutation(id)

  const order = orderQuery.data

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

  const handleStatusChange = (nextStatus) => {
    if (nextStatus === order.status) return
    statusMutation.mutate(nextStatus)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Order"
        title={formatOrderLabel(order)}
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
                key={`${item.product._id}-${item.size}-${item.quantity}`}
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
                    <p className="text-xs text-white/40">
                      Size EU {item.size} · Qty {item.quantity}
                    </p>
                    {item.product.discount ? (
                      <p className="text-xs text-rebel-red">
                        {item.product.discount} EGP off · {formatCurrency(item.product.discountedPrice)} each
                      </p>
                    ) : null}
                  </div>
                </div>
                <p className="text-sm text-white/70">
                  {item.product.discount ? (
                    <span className="flex flex-col items-end">
                      <span className="text-white/40 line-through">{formatCurrency(item.product.price * item.quantity)}</span>
                      <span>{formatCurrency(item.product.discountedPrice * item.quantity)}</span>
                    </span>
                  ) : (
                    formatCurrency(item.product.price * item.quantity)
                  )}
                </p>
              </li>
            ))}
          </ul>
          {(() => {
            return (
              <div className="flex flex-col gap-1 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">Subtotal</span>
                  <span className="text-white/70">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Shipping</span>
                  <span className="text-white/70">{formatCurrency(order.shipping)}</span>
                </div>
                <div className="flex justify-between font-semibold text-white">
                  <span>Total</span>
                  <span>{formatCurrency(order.totalPrice)}</span>
                </div>
              </div>
            )
          })()}
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
            <h2 className="font-semibold uppercase tracking-wider text-white/50">Reference</h2>
            <p className="font-mono text-rebel-red">{order.referenceNumber || '—'}</p>
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

          <section className="glass-panel space-y-3 p-6 text-sm">
            <h2 className="font-semibold uppercase tracking-wider text-white/50">Payment</h2>
            <p className="text-white">{formatPaymentMethod(order.paymentMethod)}</p>
            <ShippingEditor key={order.id} order={order} />
          </section>
        </aside>
      </div>
    </div>
  )
}
