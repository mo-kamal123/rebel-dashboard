export function PageHeader({ kicker, title, description, actions }) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {kicker ? (
          <p className="text-xs uppercase tracking-[0.4em] text-rebel-red">{kicker}</p>
        ) : null}
        <h1 className="mt-2 font-display text-3xl uppercase tracking-wide text-white sm:text-4xl">
          {title}
        </h1>
        {description ? <p className="mt-2 max-w-2xl text-sm text-white/50">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  )
}
