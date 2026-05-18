/**
 * @param {import('../../../shared/models/product').Product} product
 */
export function normalizeProduct(product) {
  return {
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    images: product.images ?? [],
    category: product.category,
    stock: product.stock,
    sizes: product.sizes ?? [],
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }
}

export function sizesToInput(sizes) {
  if (!sizes?.length) return ''
  return sizes.join(', ')
}
