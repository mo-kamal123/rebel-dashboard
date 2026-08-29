import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateOrder } from '../api/ordersApi'
import { queryKeys } from '../../../shared/lib/queryKeys'

export function useUpdateOrderMutation(orderId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (shipping) => updateOrder({ id: orderId, shipping }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders })
      queryClient.invalidateQueries({ queryKey: queryKeys.order(orderId) })
    },
  })
}