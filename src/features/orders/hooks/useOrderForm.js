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
}

export function useOrderForm(products = []) {
  const [form, setForm] = useState(initialForm)
  const [lineItems, setLineItems] = useState([emptyLineItem()])

  const estimatedTotal = useMemo(
    () => calculateOrderTotal(lineItems, products),
    [lineItems, products],
  )

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
    estimatedTotal,
    handleFormChange,
    handleReferenceBlur,
    updateLineItem,
    addLineItem,
    removeLineItem,
    reset,
  }
}
