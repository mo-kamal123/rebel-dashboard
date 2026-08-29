/**
 * @param {import('../../../shared/models/order').Order} order
 */
export function normalizeOrder(order) {
  const products = order.products ?? []
  const computedSubtotal = products.reduce((sum, item) => {
    const unitPrice = item.product.discountedPrice ?? item.product.price
    return sum + unitPrice * item.quantity
  }, 0)

  return {
    id: order._id,
    referenceNumber: order.referenceNumber ?? '',
    user: order.user,
    customerName: order.name,
    phoneNumber: order.phoneNumber,
    address: order.address,
    paymentMethod: order.paymentMethod,
    products,
    subtotal: order.subtotal ?? computedSubtotal,
    shipping: order.shipping ?? 0,
    totalPrice:
      order.totalPrice ?? (order.subtotal ?? computedSubtotal) + (order.shipping ?? 0),
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  }
}

export function formatOrderLabel(order) {
  return order.referenceNumber || `#${order.id.slice(-6).toUpperCase()}`
}