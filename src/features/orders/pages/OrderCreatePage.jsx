import { PageHeader } from '../../../shared/components/ui/PageHeader'
import { Spinner } from '../../../shared/components/ui/Spinner'
import { EmptyState } from '../../../shared/components/ui/EmptyState'
import { OrderForm } from '../components/OrderForm'
import { useProductsQuery } from '../../products/hooks/useProductsQuery'
import { useCreateOrderMutation } from '../hooks/useCreateOrderMutation'
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage'

export function OrderCreatePage() {
  const productsQuery = useProductsQuery()
  const createMutation = useCreateOrderMutation()

  if (productsQuery.isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (productsQuery.isError) {
    return (
      <EmptyState
        title="Could not load products"
        description={getApiErrorMessage(productsQuery.error)}
      />
    )
  }

  const products = productsQuery.data ?? []

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products available"
        description="Add products to the catalog before creating manual orders."
      />
    )
  }

  return (
    <div>
      <PageHeader
        kicker="Sales"
        title="New order"
        description="Create a manual order for phone, walk-in, or social sales."
      />
      <OrderForm
        products={products}
        onSubmit={createMutation.mutate}
        isPending={createMutation.isPending}
        error={createMutation.error}
      />
    </div>
  )
}
