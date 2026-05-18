import { useQuery } from '@tanstack/react-query'
import { fetchOrders } from '../api/ordersApi'
import { queryKeys } from '../../../shared/lib/queryKeys'
import { normalizeOrder } from '../lib/normalizeOrder'

export function useOrdersQuery() {
  return useQuery({
    queryKey: queryKeys.orders,
    queryFn: fetchOrders,
    select: (orders) => orders.map(normalizeOrder),
  })
}
