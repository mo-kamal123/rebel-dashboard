const labels = {
  cash: 'Cash on delivery',
  instapay: 'Instapay',
  vodafone_cash: 'Vodafone Cash',
}

export function formatPaymentMethod(method) {
  return labels[method] ?? method
}
