const statusStyles = {
  pending: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  paid: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  shipped: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  delivered: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  cancelled: 'bg-red-500/15 text-red-300 border-red-500/30',
}

export function Badge({ children, status }) {
  const style = status ? statusStyles[status] : 'bg-white/10 text-white/70 border-white/20'

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}>
      {children}
    </span>
  )
}
