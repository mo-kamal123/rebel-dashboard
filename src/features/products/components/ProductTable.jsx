import { Link } from 'react-router-dom'
import { formatCurrency } from '../../../shared/lib/format'
import { Button } from '../../../shared/components/ui/Button'

export function ProductTable({ products, onDelete, deletingId }) {
  return (
    <div className="table-shell">
      <table className="data-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Sizes</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="flex items-center gap-3">
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt=""
                      className="size-10 rounded-lg object-cover"
                    />
                  ) : (
                    <span className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-xs text-white/30">
                      —
                    </span>
                  )}
                  <span className="font-medium text-white">{product.name}</span>
                </div>
              </td>
              <td>{product.category}</td>
              <td>{formatCurrency(product.price)}</td>
              <td>{product.stock}</td>
              <td className="text-white/50">{product.sizes.join(', ')}</td>
              <td>
                <div className="flex justify-end gap-2">
                  <Link
                    to={`/products/${product.id}/edit`}
                    className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white hover:border-white/30"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    disabled={deletingId === product.id}
                    onClick={() => onDelete(product.id)}
                  >
                    {deletingId === product.id ? '…' : 'Delete'}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
