import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { updateProduct } from '../api/productsApi'
import { queryKeys } from '../../../shared/lib/queryKeys'

export function useUpdateProductMutation(id) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (formData) => updateProduct({ id, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products })
      queryClient.invalidateQueries({ queryKey: queryKeys.product(id) })
      navigate('/products')
    },
  })
}
