/**
 * @typedef {'user' | 'admin'} UserRole
 */

/**
 * @typedef {Object} AuthUser
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {UserRole} role
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} message
 * @property {string} token
 * @property {AuthUser} user
 */

/**
 * @typedef {Object} LoginPayload
 * @property {string} email
 * @property {string} password
 */

export {}
