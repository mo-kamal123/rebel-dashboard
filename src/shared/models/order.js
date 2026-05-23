/**
 * @typedef {'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'} OrderStatus
 */

/**
 * @typedef {'cash' | 'instapay' | 'vodafone_cash'} PaymentMethod
 */

/**
 * @typedef {Object} OrderItem
 * @property {{ _id: string, name: string, price: number, images?: string[], sizes?: number[] }} product
 * @property {number} size
 * @property {number} quantity
 */

/**
 * @typedef {Object} Order
 * @property {string} _id
 * @property {string} [referenceNumber]
 * @property {{ _id: string, name: string, email: string }} user
 * @property {string} name
 * @property {string} phoneNumber
 * @property {string} address
 * @property {PaymentMethod} paymentMethod
 * @property {OrderItem[]} products
 * @property {number} totalPrice
 * @property {OrderStatus} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} CreateOrderPayload
 * @property {string} name
 * @property {string} phoneNumber
 * @property {string} address
 * @property {PaymentMethod} paymentMethod
 * @property {{ product: string, size: number, quantity: number }[]} products
 * @property {string} [referenceNumber]
 */

export const ORDER_STATUSES = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']

export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  paid: 'Paid',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

export const PAYMENT_METHODS = ['cash', 'instapay', 'vodafone_cash']

export const MIN_ORDER_SIZE = 37
export const MAX_ORDER_SIZE = 46
