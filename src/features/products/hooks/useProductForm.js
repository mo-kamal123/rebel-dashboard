import { useState } from 'react'
import { sizesToInput } from '../lib/normalizeProduct'

const emptyForm = {
  name: '',
  description: '',
  price: '',
  category: '',
  stock: '',
  sizes: '',
}

export function useProductForm(initialProduct) {
  const [values, setValues] = useState(() => {
    if (!initialProduct) return emptyForm

    return {
      name: initialProduct.name ?? '',
      description: initialProduct.description ?? '',
      price: String(initialProduct.price ?? ''),
      category: initialProduct.category ?? '',
      stock: String(initialProduct.stock ?? ''),
      sizes: sizesToInput(initialProduct.sizes),
    }
  })

  const [newImages, setNewImages] = useState([])
  const [keptImages, setKeptImages] = useState(() => initialProduct?.images ?? [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files ?? [])
    setNewImages(files)
  }

  const removeKeptImage = (url) => {
    setKeptImages((current) => current.filter((image) => image !== url))
  }

  return {
    values,
    newImages,
    keptImages,
    handleChange,
    handleImagesChange,
    removeKeptImage,
  }
}
