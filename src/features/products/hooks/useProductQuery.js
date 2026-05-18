import { useQuery } from '@tanstack/react-query'
import { fetchProductById } from '../api/productsApi'
import { queryKeys } from '../../../shared/lib/queryKeys'
import { normalizeProduct } from '../lib/normalizeProduct'

export function useProductQuery(id) {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => fetchProductById(id),
    enabled: Boolean(id),
    select: normalizeProduct,
  })
}
