export function Input({ label, error, ...props }) {
  return (
    <label className="block space-y-1.5 text-sm">
      {label ? <span className="text-white/55">{label}</span> : null}
      <input className={`field-base ${error ? 'border-red-500/50' : ''}`} {...props} />
      {error ? <span className="text-xs text-red-400">{error}</span> : null}
    </label>
  )
}
