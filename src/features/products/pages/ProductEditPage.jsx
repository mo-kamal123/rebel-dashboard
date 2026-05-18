import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../shared/components/ui/PageHeader'
import { Spinner } from '../../../shared/components/ui/Spinner'
import { EmptyState } from '../../../shared/components/ui/EmptyState'
import { ProductForm } from '../components/ProductForm'
import { useProductQuery } from '../hooks/useProductQuery'
import { useUpdateProductMutation } from '../hooks/useUpdateProductMutation'
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage'

export function ProductEditPage() {
  const { id } = useParams()
  const productQuery = useProductQuery(id)
  const mutation = useUpdateProductMutation(id)

  if (productQuery.isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (productQuery.isError || !productQuery.data) {
    return (
      <EmptyState
        title="Product not found"
        description={getApiErrorMessage(productQuery.error, 'Unable to load this product.')}
      />
    )
  }

  return (
    <div>
      <PageHeader kicker="Catalog" title="Edit product" description={productQuery.data.name} />
      <ProductForm
        mode="edit"
        product={productQuery.data}
        onSubmit={mutation.mutate}
        isPending={mutation.isPending}
        error={mutation.error}
      />
    </div>
  )
}
