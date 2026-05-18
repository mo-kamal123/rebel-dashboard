import { PageHeader } from '../../../shared/components/ui/PageHeader'
import { ProductForm } from '../components/ProductForm'
import { useCreateProductMutation } from '../hooks/useCreateProductMutation'

export function ProductCreatePage() {
  const mutation = useCreateProductMutation()

  return (
    <div>
      <PageHeader
        kicker="Catalog"
        title="New product"
        description="Upload images and set sizes between 38 and 45."
      />
      <ProductForm
        mode="create"
        onSubmit={mutation.mutate}
        isPending={mutation.isPending}
        error={mutation.error}
      />
    </div>
  )
}
