import { Dropdown } from '../../../shared/components/ui/Dropdown'
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from '../../../shared/models/order'
import { useOrderStatusesQuery } from '../hooks/useOrderStatusesQuery'

export function OrderStatusSelect({ value, onChange, disabled }) {
  const statusesQuery = useOrderStatusesQuery()
  const statuses = statusesQuery.data ?? ORDER_STATUSES

  const options = statuses.map((status) => ({
    value: status,
    label: ORDER_STATUS_LABELS[status] ?? status,
  }))

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