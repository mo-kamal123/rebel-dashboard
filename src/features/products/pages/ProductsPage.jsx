import { Link } from 'react-router-dom'
import { PageHeader } from '../../../shared/components/ui/PageHeader'
import { Button } from '../../../shared/components/ui/Button'
import { Spinner } from '../../../shared/components/ui/Spinner'
import { EmptyState } from '../../../shared/components/ui/EmptyState'
import { ProductTable } from '../components/ProductTable'
import { useProductsQuery } from '../hooks/useProductsQuery'
import { useDeleteProductMutation } from '../hooks/useDeleteProductMutation'
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage'

export function ProductsPage() {
  const productsQuery = useProductsQuery()
  const deleteMutation = useDeleteProductMutation()

  const handleDelete = (id) => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return
    deleteMutation.mutate(id)
  }

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

  return (
    <div>
      <PageHeader
        kicker="Catalog"
        title="Products"
        description="Manage inventory, pricing, and product images."
        actions={<Link to="/products/new"><Button type="button">Add product</Button></Link>}
      />

      {products.length === 0 ? (
        <EmptyState
          title="No products yet"
          description="Create your first product to start selling."
          action={
            <Link to="/products/new">
              <Button type="button">Add product</Button>
            </Link>
          }
        />
      ) : (
        <ProductTable
          products={products}
          onDelete={handleDelete}
          deletingId={deleteMutation.isPending ? deleteMutation.variables : null}
        />
      )}
    </div>
  )
}
