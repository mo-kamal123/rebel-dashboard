/**
 * @param {import('../../../shared/models/order').Order} order
 */
export function normalizeOrder(order) {
  return {
    id: order._id,
    user: order.user,
    customerName: order.name,
    phoneNumber: order.phoneNumber,
    address: order.address,
    paymentMethod: order.paymentMethod,
    products: order.products ?? [],
    totalPrice: order.totalPrice,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  }
}
