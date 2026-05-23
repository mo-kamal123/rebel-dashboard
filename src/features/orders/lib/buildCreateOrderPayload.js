/**
 * @param {Object} form
 * @param {{ productId: string, size: string, quantity: string }[]} lineItems
 * @returns {import('../../../shared/models/order').CreateOrderPayload}
 */
export function buildCreateOrderPayload(form, lineItems) {
  const referenceNumber = form.referenceNumber.trim().toUpperCase()

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

  return payload
}
