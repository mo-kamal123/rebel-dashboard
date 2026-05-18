import { Link } from 'react-router-dom'
import { formatCurrency, formatDate } from '../../../shared/lib/format'
import { formatPaymentMethod } from '../../../shared/lib/formatPaymentMethod'
import { Badge } from '../../../shared/components/ui/Badge'
import { ORDER_STATUS_LABELS } from '../../../shared/models/order'

export function OrderTable({ orders }) {
  return (
    <div className="table-shell">
      <table className="data-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Payment</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th className="text-right">View</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="font-mono text-xs text-white/60">#{order.id.slice(-6).toUpperCase()}</td>
              <td>
                <div>
                  <p className="font-medium text-white">{order.customerName}</p>
                  <p className="text-xs text-white/40">{order.phoneNumber}</p>
                </div>
              </td>
              <td>{formatPaymentMethod(order.paymentMethod)}</td>
              <td>{formatCurrency(order.totalPrice)}</td>
              <td>
                <Badge status={order.status}>{ORDER_STATUS_LABELS[order.status]}</Badge>
              </td>
              <td className="text-white/50">{formatDate(order.createdAt)}</td>
              <td className="text-right">
                <Link
                  to={`/orders/${order.id}`}
                  className="text-sm text-rebel-red hover:text-[#14d966]"
                >
                  Details →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
