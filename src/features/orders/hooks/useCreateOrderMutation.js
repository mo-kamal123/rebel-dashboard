import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../api/ordersApi'
import { queryKeys } from '../../../shared/lib/queryKeys'
import { normalizeOrder } from '../lib/normalizeOrder'

export function useCreateOrderMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders })
      const normalized = normalizeOrder(order)
      navigate(`/orders/${normalized.id}`, { replace: true })
    },
  })
}
