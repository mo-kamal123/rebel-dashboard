import { Link } from 'react-router-dom'
import { PageHeader } from '../../../shared/components/ui/PageHeader'
import { Spinner } from '../../../shared/components/ui/Spinner'
import { formatCurrency } from '../../../shared/lib/format'
import { useProductsQuery } from '../../products/hooks/useProductsQuery'
import { useOrdersQuery } from '../../orders/hooks/useOrdersQuery'
import { ORDER_STATUS_LABELS } from '../../../shared/models/order'

function StatCard({ label, value, hint, to }) {
  const content = (
    <article className="glass-panel p-6 transition hover:border-white/20">
      <p className="text-xs uppercase tracking-wider text-white/45">{label}</p>
      <p className="mt-2 font-display text-4xl text-white">{value}</p>
      {hint ? <p className="mt-2 text-sm text-white/40">{hint}</p> : null}
    </article>
  )

  if (to) {
    return (
      <Link to={to} className="block">
        {content}
      </Link>
    )
  }

  return content
}

export function DashboardPage() {
  const productsQuery = useProductsQuery()
  const ordersQuery = useOrdersQuery()

  const isLoading = productsQuery.isLoading || ordersQuery.isLoading

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner className="size-8" />
      </div>
    )
  }

  const products = productsQuery.data ?? []
  const orders = ordersQuery.data ?? []
  const pendingOrders = orders.filter((order) => order.status === 'pending').length
  const revenue = orders
    .filter((order) => order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.totalPrice, 0)
  const lowStock = products.filter((product) => product.stock <= 5).length

  return (
    <div>
      <PageHeader
        kicker="Overview"
        title="Dashboard"
        description="Quick snapshot of store activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Products" value={products.length} hint="In catalog" to="/products" />
        <StatCard label="Orders" value={orders.length} hint="All time" to="/orders" />
        <StatCard
          label="Pending"
          value={pendingOrders}
          hint={ORDER_STATUS_LABELS.pending}
          to="/orders"
        />
        <StatCard label="Revenue" value={formatCurrency(revenue)} hint="Excl. cancelled" />
      </div>

      {lowStock > 0 ? (
        <p className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {lowStock} product{lowStock === 1 ? '' : 's'} with low stock (5 or fewer units).
        </p>
      ) : null}
    </div>
  )
}
