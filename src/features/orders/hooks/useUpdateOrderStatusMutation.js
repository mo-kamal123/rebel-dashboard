import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateOrderStatus } from '../api/ordersApi'
import { queryKeys } from '../../../shared/lib/queryKeys'

export function useUpdateOrderStatusMutation(orderId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (status) => updateOrderStatus({ id: orderId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders })
      queryClient.invalidateQueries({ queryKey: queryKeys.order(orderId) })
    },
  })
}
