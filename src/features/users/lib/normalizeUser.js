/**
 * @param {any} product
 * @returns {import('../../../shared/models/user').UserProductSummary}
 */
function normalizeProductSummary(product) {
  const discount = product.discount ?? 0

  return {
    id: product._id ?? product.id,
    name: product.name,
    price: product.price,
    discount,
    discountedPrice: discount ? product.price - discount : product.price,
    images: product.images ?? [],
    category: product.category,
    stock: product.stock,
    sizes: product.sizes ?? [],
  }
}

function normalizeCartItem(item) {
  return {
    product: normalizeProductSummary(item.product),
    size: item.size,
    quantity: item.quantity,
  }
}

/**
 * @param {any} user
 * @returns {import('../../../shared/models/user').User}
 */
export function normalizeUser(user) {
  return {
    id: user._id ?? user.id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber ?? '',
    address: user.address ?? '',
    role: user.role ?? 'user',
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    cartItemsCount: user.cartItemsCount ?? 0,
    favoritesCount: user.favoritesCount ?? 0,
  }
}

/**
 * @param {any} user
 * @returns {import('../../../shared/models/user').UserDetail}
 */
export function normalizeUserDetail(user) {
  const cartItems = user.cart?.items ?? []
  const favoriteProducts = user.favorites?.products ?? []

  return {
    ...normalizeUser(user),
    cart: {
      itemsCount: user.cart?.itemsCount ?? cartItems.length,
      items: cartItems.map(normalizeCartItem),
    },
    favorites: {
      productsCount: user.favorites?.productsCount ?? favoriteProducts.length,
      products: favoriteProducts.map(normalizeProductSummary),
    },
  }
}
