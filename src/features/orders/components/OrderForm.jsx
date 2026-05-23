import { Link } from 'react-router-dom'
import { Input } from '../../../shared/components/ui/Input'
import { Textarea } from '../../../shared/components/ui/Textarea'
import { Select } from '../../../shared/components/ui/Select'
import { Button } from '../../../shared/components/ui/Button'
import { Spinner } from '../../../shared/components/ui/Spinner'
import { formatCurrency } from '../../../shared/lib/format'
import { formatPaymentMethod } from '../../../shared/lib/formatPaymentMethod'
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage'
import { PAYMENT_METHODS } from '../../../shared/models/order'
import { buildCreateOrderPayload } from '../lib/buildCreateOrderPayload'
import { useOrderForm } from '../hooks/useOrderForm'
import { OrderLineItems } from './OrderLineItems'

export function OrderForm({ products, onSubmit, isPending, error }) {
  const {
    form,
    lineItems,
    estimatedTotal,
    handleFormChange,
    handleReferenceBlur,
    updateLineItem,
    addLineItem,
    removeLineItem,
  } = useOrderForm(products)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(buildCreateOrderPayload(form, lineItems))
  }

  const isValid =
    form.name.trim() &&
    form.phoneNumber.trim() &&
    form.address.trim() &&
    lineItems.every((item) => item.productId && item.size && Number(item.quantity) >= 1)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="glass-panel space-y-5 p-6 sm:p-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Order details</h2>

        <Input
          label="Reference number (optional)"
          name="referenceNumber"
          value={form.referenceNumber}
          onChange={handleFormChange}
          onBlur={handleReferenceBlur}
          placeholder="Auto-generated if left empty (e.g. RB-20260523-123456)"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Customer name"
            name="name"
            required
            value={form.name}
            onChange={handleFormChange}
          />
          <Input
            label="Phone number"
            name="phoneNumber"
            required
            value={form.phoneNumber}
            onChange={handleFormChange}
          />
        </div>

        <Textarea
          label="Delivery address"
          name="address"
          required
          value={form.address}
          onChange={handleFormChange}
        />

        <Select
          label="Payment method"
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleFormChange}
          required
        >
          {PAYMENT_METHODS.map((method) => (
            <option key={method} value={method}>
              {formatPaymentMethod(method)}
            </option>
          ))}
        </Select>
      </section>

      <section className="glass-panel p-6 sm:p-8">
        <OrderLineItems
          lineItems={lineItems}
          products={products}
          onUpdate={updateLineItem}
          onAdd={addLineItem}
          onRemove={removeLineItem}
        />

        <div className="mt-6 flex justify-between border-t border-white/10 pt-4 text-sm">
          <span className="text-white/50">Estimated total</span>
          <span className="font-semibold text-white">{formatCurrency(estimatedTotal)}</span>
        </div>
      </section>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {getApiErrorMessage(error)}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isPending || !isValid}>
          {isPending ? <Spinner className="size-4 border-t-white" /> : 'Create order'}
        </Button>
        <Link
          to="/orders"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white transition hover:border-white/30"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
