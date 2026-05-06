import { useAppDispatch, useAppState } from '@/store/context'

export function Header() {
  const { connections } = useAppState()
  const dispatch = useAppDispatch()
  const hasData = connections.length > 0

  const years = connections.map(d => d.year).filter(Boolean) as number[]
  const minYear = years.length ? Math.min(...years) : null
  const maxYear = years.length ? Math.max(...years) : null

  return (
    <header className="mb-7 flex justify-between items-end flex-wrap gap-3">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight bg-gradient-to-r from-[#6dd5ff] to-[#a78bfa] bg-clip-text text-transparent">
          LinkedIn Network Dashboard
        </h1>
        <p className="text-dim text-[13px] mt-1">
          {hasData
            ? `${connections.length.toLocaleString()} connections${minYear && maxYear ? ` from ${minYear} to ${maxYear}` : ''}`
            : 'Load your Connections.csv to begin'}
        </p>
      </div>
      {hasData && (
        <button
          className="bg-surface border border-border text-text px-3.5 py-2 rounded-lg text-[12.5px] font-medium hover:border-accent transition-colors"
          onClick={() => dispatch({ type: 'RESET_ALL' })}
        >
          Load different file
        </button>
      )}
    </header>
  )
}
