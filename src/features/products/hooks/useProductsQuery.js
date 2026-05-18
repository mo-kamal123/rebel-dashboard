import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api/productsApi'
import { queryKeys } from '../../../shared/lib/queryKeys'
import { normalizeProduct } from '../lib/normalizeProduct'

export function useProductsQuery() {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: fetchProducts,
    select: (products) => products.map(normalizeProduct),
  })
}
