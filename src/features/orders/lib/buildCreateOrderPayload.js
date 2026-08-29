/**
 * @param {Object} form
 * @param {{ productId: string, size: string, quantity: string }[]} lineItems
 * @returns {import('../../../shared/models/order').CreateOrderPayload}
 */
export function buildCreateOrderPayload(form, lineItems) {
  const referenceNumber = form.referenceNumber.trim().toUpperCase()
  const shippingNumber = Number(form.shipping)
  const shipping =
    Number.isFinite(shippingNumber) && shippingNumber > 0 ? shippingNumber : 0

  const payload = {
    name: form.name.trim(),
    phoneNumber: form.phoneNumber.trim(),
    address: form.address.trim(),
    paymentMethod: form.paymentMethod,
    products: lineItems.map((item) => ({
      product: item.productId,
      size: Number(item.size),
      quantity: Number(item.quantity),
    })),
  }

  if (referenceNumber) {
    payload.referenceNumber = referenceNumber
  }

  if (shipping > 0) {
    payload.shipping = shipping
  }

  return payload
}