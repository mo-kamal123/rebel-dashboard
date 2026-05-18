export function Button({ children, className = '', variant = 'primary', size = 'md', ...props }) {
  const variants = {
    primary:
      'bg-rebel-red text-white shadow-[0_8px_24px_rgba(34,197,94,0.28)] hover:bg-[#14d966]',
    ghost: 'border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/8',
    danger: 'border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20',
  }

  const sizes = {
    sm: 'rounded-lg px-3 py-1.5 text-xs tracking-wider',
    md: 'rounded-xl px-5 py-2.5 text-sm font-medium',
  }

  return (
    <button
      className={`inline-flex items-center justify-center transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
