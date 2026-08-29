import { useQuery } from '@tanstack/react-query'
import { fetchOrderStatuses } from '../api/ordersApi'
import { queryKeys } from '../../../shared/lib/queryKeys'

export function useOrderStatusesQuery() {
  return useQuery({
    queryKey: queryKeys.orderStatuses,
    queryFn: fetchOrderStatuses,
  })
}