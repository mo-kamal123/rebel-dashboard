export function Textarea({ label, error, className = '', ...props }) {
  return (
    <label className="block space-y-1.5 text-sm">
      {label ? <span className="text-white/55">{label}</span> : null}
      <textarea
        className={`field-base min-h-24 resize-y ${error ? 'border-red-500/50' : ''} ${className}`}
        {...props}
      />
      {error ? <span className="text-xs text-red-400">{error}</span> : null}
    </label>
  )
}
