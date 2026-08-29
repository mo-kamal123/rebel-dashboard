import { Link, useNavigate } from 'react-router-dom'
import { formatCurrency, formatDate } from '../../../shared/lib/format'
import { formatPaymentMethod } from '../../../shared/lib/formatPaymentMethod'
import { Badge } from '../../../shared/components/ui/Badge'
import { ORDER_STATUS_LABELS } from '../../../shared/models/order'
import { formatOrderLabel } from '../lib/normalizeOrder'

function getProductsSummary(products) {
  let originalTotal = 0
  let hasDiscount = false

  for (const item of products) {
    const unitPrice = item.product.discountedPrice ?? item.product.price
    originalTotal += item.product.price * item.quantity
    if (unitPrice !== item.product.price) hasDiscount = true
  }

  return { originalTotal, hasDiscount }
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
            const { originalTotal, hasDiscount } = getProductsSummary(order.products)

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
                  <div className="flex flex-col items-start">
                    {hasDiscount ? (
                      <span className="text-white/40 line-through">{formatCurrency(originalTotal)}</span>
                    ) : null}
                    <span>{formatCurrency(order.subtotal)}</span>
                    {order.shipping > 0 ? (
                      <span className="text-xs text-white/40">
                        + {formatCurrency(order.shipping)} shipping
                      </span>
                    ) : null}
                  </div>
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
