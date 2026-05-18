import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../api/productsApi'
import { queryKeys } from '../../../shared/lib/queryKeys'

export function useCreateProductMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products })
      navigate('/products')
    },
  })
}
