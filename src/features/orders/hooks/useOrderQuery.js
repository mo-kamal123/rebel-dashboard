import { useQuery } from '@tanstack/react-query'
import { fetchOrderById } from '../api/ordersApi'
import { queryKeys } from '../../../shared/lib/queryKeys'
import { normalizeOrder } from '../lib/normalizeOrder'

export function useOrderQuery(id) {
  return useQuery({
    queryKey: queryKeys.order(id),
    queryFn: () => fetchOrderById(id),
    enabled: Boolean(id),
    select: normalizeOrder,
  })
}
