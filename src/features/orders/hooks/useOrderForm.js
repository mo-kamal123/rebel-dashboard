import { useMemo, useState } from 'react'
import { calculateOrderTotal } from '../lib/calculateOrderTotal'

const emptyLineItem = () => ({
  id: crypto.randomUUID(),
  productId: '',
  size: '',
  quantity: '1',
})

const initialForm = {
  referenceNumber: '',
  name: '',
  phoneNumber: '',
  address: '',
  paymentMethod: 'cash',
  shipping: '0',
}

function normalizeShipping(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

export function useOrderForm(products = []) {
  const [form, setForm] = useState(initialForm)
  const [lineItems, setLineItems] = useState([emptyLineItem()])

  const estimatedSubtotal = useMemo(
    () => calculateOrderTotal(lineItems, products),
    [lineItems, products],
  )

  const shippingAmount = normalizeShipping(form.shipping)
  const estimatedTotal = estimatedSubtotal + shippingAmount

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleReferenceBlur = () => {
    setForm((current) => ({
      ...current,
      referenceNumber: current.referenceNumber.trim().toUpperCase(),
    }))
  }

  const updateLineItem = (id, patch) => {
    setLineItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    )
  }

  const addLineItem = () => {
    setLineItems((current) => [...current, emptyLineItem()])
  }

  const removeLineItem = (id) => {
    setLineItems((current) => {
      if (current.length === 1) return current
      return current.filter((item) => item.id !== id)
    })
  }

  const reset = () => {
    setForm(initialForm)
    setLineItems([emptyLineItem()])
  }

  return {
    form,
    lineItems,
    estimatedSubtotal,
    shippingAmount,
    estimatedTotal,
    handleFormChange,
    handleReferenceBlur,
    updateLineItem,
    addLineItem,
    removeLineItem,
    reset,
  }
}