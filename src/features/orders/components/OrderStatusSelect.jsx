import { Dropdown } from '../../../shared/components/ui/Dropdown'
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from '../../../shared/models/order'

const options = ORDER_STATUSES.map((status) => ({
  value: status,
  label: ORDER_STATUS_LABELS[status],
}))

export function OrderStatusSelect({ value, onChange, disabled }) {
  return (
    <Dropdown
      value={value}
      options={options}
      onChange={onChange}
      disabled={disabled}
      placeholder="Set status…"
    />
  )
}
