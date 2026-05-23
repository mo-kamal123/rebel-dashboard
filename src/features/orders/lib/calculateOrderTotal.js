/**
 * @param {{ productId: string, size: string, quantity: string }[]} lineItems
 * @param {{ id: string, price: number }[]} products
 */
export function calculateOrderTotal(lineItems, products) {
  const priceById = new Map(products.map((product) => [product.id, product.price]))

  return lineItems.reduce((sum, item) => {
    const price = priceById.get(item.productId)
    const quantity = Number(item.quantity)

    if (!price || !Number.isFinite(quantity) || quantity < 1) return sum

    return sum + price * quantity
  }, 0)
}
