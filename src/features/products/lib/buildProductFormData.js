/**
 * @param {Object} fields
 * @param {File[]} [newImages]
 * @param {string[]} [existingImages]
 */
export function buildProductFormData(fields, { newImages = [], existingImages } = {}) {
  const formData = new FormData()

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, String(value))
    }
  })

  newImages.forEach((file) => {
    formData.append('images', file)
  })

  if (existingImages !== undefined) {
    formData.append('existingImages', JSON.stringify(existingImages))
  }

  return formData
}
