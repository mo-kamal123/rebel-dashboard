export function EmptyState({ title, description, action }) {
  return (
    <div className="glass-panel flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <h3 className="font-display text-2xl uppercase tracking-wide text-white">{title}</h3>
      {description ? <p className="max-w-md text-sm text-white/50">{description}</p> : null}
      {action}
    </div>
  )
}
