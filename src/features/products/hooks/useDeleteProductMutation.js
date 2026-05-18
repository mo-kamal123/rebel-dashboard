import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '../api/productsApi'
import { queryKeys } from '../../../shared/lib/queryKeys'

export function useDeleteProductMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products })
    },
  })
}
