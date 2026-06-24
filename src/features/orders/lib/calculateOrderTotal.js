/**
 * @param {{ productId: string, size: string, quantity: string }[]} lineItems
 * @param {{ id: string, price: number, discountedPrice?: number }[]} products
 */
export function calculateOrderTotal(lineItems, products) {
  const productMap = new Map(products.map((product) => [product.id, product]))

  return lineItems.reduce((sum, item) => {
    const product = productMap.get(item.productId)
    const quantity = Number(item.quantity)

    if (!product || !Number.isFinite(quantity) || quantity < 1) return sum

    const unitPrice = product.discountedPrice ?? product.price
    return sum + unitPrice * quantity
  }, 0)
}
