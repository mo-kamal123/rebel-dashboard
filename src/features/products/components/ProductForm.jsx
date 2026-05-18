import { Link } from 'react-router-dom'
import { Input } from '../../../shared/components/ui/Input'
import { Textarea } from '../../../shared/components/ui/Textarea'
import { Button } from '../../../shared/components/ui/Button'
import { Spinner } from '../../../shared/components/ui/Spinner'
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage'
import { buildProductFormData } from '../lib/buildProductFormData'
import { useProductForm } from '../hooks/useProductForm'

export function ProductForm({ mode = 'create', product, onSubmit, isPending, error }) {
  const form = useProductForm(product)
  const isEdit = mode === 'edit'

  const handleSubmit = (event) => {
    event.preventDefault()

    const payload = buildProductFormData(form.values, {
      newImages: form.newImages,
      existingImages: isEdit ? form.keptImages : undefined,
    })

    onSubmit(payload)
  }

  const message = getApiErrorMessage(error)

  return (
    <form onSubmit={handleSubmit} className="glass-panel space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Name" name="name" required value={form.values.name} onChange={form.handleChange} />
        <Input
          label="Category"
          name="category"
          required
          value={form.values.category}
          onChange={form.handleChange}
        />
        <Input
          label="Price (EGP)"
          name="price"
          type="number"
          min="0"
          step="1"
          required
          value={form.values.price}
          onChange={form.handleChange}
        />
        <Input
          label="Stock"
          name="stock"
          type="number"
          min="0"
          step="1"
          required
          value={form.values.stock}
          onChange={form.handleChange}
        />
      </div>

      <Textarea
        label="Description"
        name="description"
        required
        value={form.values.description}
        onChange={form.handleChange}
      />

      <Input
        label="Sizes (comma-separated or range e.g. 38:45)"
        name="sizes"
        required
        placeholder="38, 39, 40 or 38:45"
        value={form.values.sizes}
        onChange={form.handleChange}
      />

      {isEdit && form.keptImages.length > 0 ? (
        <div className="space-y-2">
          <p className="text-sm text-white/55">Current images</p>
          <div className="flex flex-wrap gap-3">
            {form.keptImages.map((url) => (
              <div key={url} className="relative">
                <img src={url} alt="" className="size-20 rounded-xl object-cover" />
                <button
                  type="button"
                  onClick={() => form.removeKeptImage(url)}
                  className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <label className="block space-y-1.5 text-sm">
        <span className="text-white/55">
          {isEdit ? 'Add new images (optional)' : 'Product images (required)'}
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          required={!isEdit}
          onChange={form.handleImagesChange}
          className="field-base file:mr-4 file:rounded-lg file:border-0 file:bg-rebel-red file:px-3 file:py-1.5 file:text-sm file:text-white"
        />
        {form.newImages.length > 0 ? (
          <span className="text-xs text-white/40">{form.newImages.length} file(s) selected</span>
        ) : null}
      </label>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner className="size-4 border-t-white" /> : isEdit ? 'Save changes' : 'Create product'}
        </Button>
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white transition hover:border-white/30"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
