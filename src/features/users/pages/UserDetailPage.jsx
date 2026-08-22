import { useParams, Link } from 'react-router-dom'
import { PageHeader } from '../../../shared/components/ui/PageHeader'
import { Spinner } from '../../../shared/components/ui/Spinner'
import { EmptyState } from '../../../shared/components/ui/EmptyState'
import { Badge } from '../../../shared/components/ui/Badge'
import { Button } from '../../../shared/components/ui/Button'
import { useUserQuery } from '../hooks/useUserQuery'
import { useUpdateUserRoleMutation } from '../hooks/useUpdateUserRoleMutation'
import { UserRoleSelect } from '../components/UserRoleSelect'
import { formatCurrency, formatDate } from '../../../shared/lib/format'
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage'
import { USER_ROLE_LABELS } from '../../../shared/models/user'

function CartItemRow({ item }) {
  const { product, size, quantity } = item

  return (
    <li className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center gap-3">
        {product.images[0] ? (
          <img src={product.images[0]} alt="" className="size-12 rounded-lg object-cover" />
        ) : null}
        <div>
          <p className="font-medium text-white">{product.name}</p>
          <p className="text-xs text-white/40">
            Size EU {size} · Qty {quantity}
          </p>
          {product.discount ? (
            <p className="text-xs text-rebel-red">
              {product.discount} EGP off · {formatCurrency(product.discountedPrice)} each
            </p>
          ) : null}
        </div>
      </div>
      <p className="text-sm text-white/70">
        {product.discount ? (
          <span className="flex flex-col items-end">
            <span className="text-white/40 line-through">
              {formatCurrency(product.price * quantity)}
            </span>
            <span>{formatCurrency(product.discountedPrice * quantity)}</span>
          </span>
        ) : (
          formatCurrency(product.price * quantity)
        )}
      </p>
    </li>
  )
}

export function UserDetailPage() {
  const { id } = useParams()
  const userQuery = useUserQuery(id)
  const roleMutation = useUpdateUserRoleMutation(id)

  const handleRoleChange = (nextRole) => {
    roleMutation.mutate(nextRole)
  }

  if (userQuery.isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (userQuery.isError || !userQuery.data) {
    return (
      <EmptyState
        title="User not found"
        description={getApiErrorMessage(userQuery.error, 'Unable to load this user.')}
        action={
          <Link to="/users">
            <Button type="button" variant="ghost">
              Back to users
            </Button>
          </Link>
        }
      />
    )
  }

  const user = userQuery.data
  const cartTotal = user.cart.items.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0,
  )

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Customer"
        title={user.name}
        description={user.email}
        actions={
          <Link to="/users">
            <Button type="button" variant="ghost">
              ← All users
            </Button>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="glass-panel space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Cart</h2>
              <span className="text-xs text-white/40">{user.cart.itemsCount} items</span>
            </div>
            {user.cart.items.length === 0 ? (
              <p className="text-sm text-white/40">No items in cart.</p>
            ) : (
              <>
                <ul className="space-y-3">
                  {user.cart.items.map((item) => (
                    <CartItemRow key={`${item.product.id}-${item.size}`} item={item} />
                  ))}
                </ul>
                <div className="flex justify-between border-t border-white/10 pt-4 text-sm">
                  <span className="text-white/50">Total</span>
                  <span className="font-semibold text-white">{formatCurrency(cartTotal)}</span>
                </div>
              </>
            )}
          </section>

          <section className="glass-panel space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">
                Favorites
              </h2>
              <span className="text-xs text-white/40">{user.favorites.productsCount} products</span>
            </div>
            {user.favorites.products.length === 0 ? (
              <p className="text-sm text-white/40">No favorite products.</p>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {user.favorites.products.map((product) => (
                  <li
                    key={product.id ?? product.name}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4"
                  >
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt=""
                        className="size-12 rounded-lg object-cover"
                      />
                    ) : null}
                    <div>
                      <p className="font-medium text-white">{product.name}</p>
                      <p className="text-xs text-white/40 capitalize">{product.category}</p>
                      <p className="text-sm text-white/70">
                        {product.discount ? (
                          <span className="flex flex-col">
                            <span className="text-white/40 line-through">
                              {formatCurrency(product.price)}
                            </span>
                            <span>{formatCurrency(product.discountedPrice)}</span>
                          </span>
                        ) : (
                          formatCurrency(product.price)
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-4">
          <section className="glass-panel space-y-3 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Role</h2>
            <Badge status={user.role}>{USER_ROLE_LABELS[user.role] ?? user.role}</Badge>
            <UserRoleSelect
              value={roleMutation.isPending ? roleMutation.variables : user.role}
              onChange={handleRoleChange}
              disabled={roleMutation.isPending}
            />
            {roleMutation.isError ? (
              <p className="text-xs text-red-400">{getApiErrorMessage(roleMutation.error)}</p>
            ) : null}
          </section>

          <section className="glass-panel space-y-3 p-6 text-sm">
            <h2 className="font-semibold uppercase tracking-wider text-white/50">Contact</h2>
            <p className="text-white/60">{user.phoneNumber || '—'}</p>
            <p className="text-white/60">{user.address || '—'}</p>
          </section>

          <section className="glass-panel space-y-3 p-6 text-sm">
            <h2 className="font-semibold uppercase tracking-wider text-white/50">Account</h2>
            <p className="font-mono text-xs text-rebel-red">{user.email}</p>
            <p className="text-white/50">Joined {formatDate(user.createdAt)}</p>
            <p className="text-white/40">Updated {formatDate(user.updatedAt)}</p>
          </section>
        </aside>
      </div>
    </div>
  )
}
