import { Button } from '../../../shared/components/ui/Button'
import { Select } from '../../../shared/components/ui/Select'
import { Input } from '../../../shared/components/ui/Input'
import { formatCurrency } from '../../../shared/lib/format'
import { MIN_ORDER_SIZE, MAX_ORDER_SIZE } from '../../../shared/models/order'

function getSizeOptions(product) {
  if (product?.sizes?.length) {
    return product.sizes
  }

  return Array.from({ length: MAX_ORDER_SIZE - MIN_ORDER_SIZE + 1 }, (_, index) => MIN_ORDER_SIZE + index)
}

export function OrderLineItems({
  lineItems,
  products,
  onUpdate,
  onAdd,
  onRemove,
}) {
  const productById = new Map(products.map((product) => [product.id, product]))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Products</h2>
        <Button type="button" variant="ghost" size="sm" onClick={onAdd}>
          + Add item
        </Button>
      </div>

      <ul className="space-y-3">
        {lineItems.map((item, index) => {
          const product = productById.get(item.productId)
          const sizes = getSizeOptions(product)
          const lineTotal =
            product && Number(item.quantity) >= 1
              ? product.price * Number(item.quantity)
              : null

          return (
            <li
              key={item.id}
              className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-2 lg:grid-cols-[1fr_120px_100px_auto]"
            >
              <Select
                label={index === 0 ? 'Product' : undefined}
                value={item.productId}
                onChange={(event) => {
                  const productId = event.target.value
                  const nextProduct = productById.get(productId)
                  const defaultSize = nextProduct?.sizes?.[0] ?? ''

                  onUpdate(item.id, {
                    productId,
                    size: defaultSize ? String(defaultSize) : '',
                  })
                }}
                required
              >
                <option value="">Select product</option>
                {products.map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    {entry.name} — {formatCurrency(entry.price)} (stock {entry.stock})
                  </option>
                ))}
              </Select>

              <Select
                label={index === 0 ? 'Size' : undefined}
                value={item.size}
                onChange={(event) => onUpdate(item.id, { size: event.target.value })}
                required
                disabled={!item.productId}
              >
                <option value="">Size</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    EU {size}
                  </option>
                ))}
              </Select>

              <Input
                label={index === 0 ? 'Qty' : undefined}
                type="number"
                min="1"
                step="1"
                value={item.quantity}
                onChange={(event) => onUpdate(item.id, { quantity: event.target.value })}
                required
              />

              <div className="flex items-end justify-between gap-2 sm:col-span-2 lg:col-span-1 lg:flex-col lg:items-stretch">
                {lineTotal !== null ? (
                  <p className="text-sm text-white/50 lg:order-1">{formatCurrency(lineTotal)}</p>
                ) : (
                  <span className="lg:order-1" />
                )}
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  disabled={lineItems.length === 1}
                  onClick={() => onRemove(item.id)}
                  className="lg:order-2"
                >
                  Remove
                </Button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
