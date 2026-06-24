import { Link, useNavigate } from 'react-router-dom'
import { formatCurrency, formatDate } from '../../../shared/lib/format'
import { formatPaymentMethod } from '../../../shared/lib/formatPaymentMethod'
import { Badge } from '../../../shared/components/ui/Badge'
import { ORDER_STATUS_LABELS } from '../../../shared/models/order'
import { formatOrderLabel } from '../lib/normalizeOrder'

function getDiscountedTotal(products) {
  return products.reduce((sum, item) => {
    const unitPrice = item.product.discountedPrice ?? item.product.price
    return sum + unitPrice * item.quantity
  }, 0)
}

export function OrderTable({ orders }) {
  const navigate = useNavigate()

  return (
    <div className="table-shell">
      <table className="data-table">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Customer</th>
            <th>Payment</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th className="text-right">View</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const discountedTotal = getDiscountedTotal(order.products)
            const hasDiscount = discountedTotal !== order.totalPrice

            return (
              <tr
                key={order.id}
                className="cursor-pointer"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <td className="font-mono text-xs text-rebel-red">{formatOrderLabel(order)}</td>
                <td>
                  <div>
                    <p className="font-medium text-white">{order.customerName}</p>
                    <p className="text-xs text-white/40">{order.phoneNumber}</p>
                  </div>
                </td>
                <td>{formatPaymentMethod(order.paymentMethod)}</td>
                <td>
                  {hasDiscount ? (
                    <span className="flex flex-col">
                      <span className="text-white/50 line-through">{formatCurrency(order.totalPrice)}</span>
                      <span>{formatCurrency(discountedTotal)}</span>
                    </span>
                  ) : (
                    formatCurrency(order.totalPrice)
                  )}
                </td>
                <td>
                  <Badge status={order.status}>{ORDER_STATUS_LABELS[order.status]}</Badge>
                </td>
                <td className="text-white/50">{formatDate(order.createdAt)}</td>
                <td className="text-right">
                  <Link
                    to={`/orders/${order.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-rebel-red hover:text-[#14d966]"
                  >
                    Details →
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
