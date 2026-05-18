import { useState } from 'react'

const initialValues = {
  email: '',
  password: '',
}

export function useAuthForm() {
  const [values, setValues] = useState(initialValues)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const reset = () => setValues(initialValues)

  return { values, handleChange, reset }
}
