import { Select } from '../../../shared/components/ui/Select'
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from '../../../shared/models/order'

export function OrderStatusSelect({ value, onChange, disabled }) {
  return (
    <Select label="Order status" value={value} onChange={onChange} disabled={disabled}>
      {ORDER_STATUSES.map((status) => (
        <option key={status} value={status}>
          {ORDER_STATUS_LABELS[status]}
        </option>
      ))}
    </Select>
  )
}
