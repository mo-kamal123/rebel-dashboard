/**
 * @typedef {'user' | 'admin'} UserRole
 */

/**
 * @typedef {Object} UserProductSummary
 * @property {string} [id]
 * @property {string} name
 * @property {number} price
 * @property {number} discount
 * @property {number} discountedPrice
 * @property {string[]} images
 * @property {string} [category]
 * @property {number} [stock]
 * @property {number[]} sizes
 */

/**
 * @typedef {Object} UserCartItem
 * @property {UserProductSummary} product
 * @property {number} size
 * @property {number} quantity
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} phoneNumber
 * @property {string} address
 * @property {UserRole} role
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {number} cartItemsCount
 * @property {number} favoritesCount
 */

/**
 * @typedef {Object} UserDetail
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} phoneNumber
 * @property {string} address
 * @property {UserRole} role
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {{ itemsCount: number, items: UserCartItem[] }} cart
 * @property {{ productsCount: number, products: UserProductSummary[] }} favorites
 */

export const USER_ROLES = ['user', 'admin']

export const USER_ROLE_LABELS = {
  user: 'User',
  admin: 'Admin',
}

export {}
