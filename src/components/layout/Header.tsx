import { useAppDispatch, useAppState } from '@/store/context'
import { useTheme } from '@/store/themeContext'

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export function Header() {
  const { connections } = useAppState()
  const dispatch = useAppDispatch()
  const { theme, toggleTheme } = useTheme()
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
      <div className="flex items-center gap-2">
        <button
          className="bg-surface border border-border text-dim px-2.5 py-2 rounded-lg hover:border-accent hover:text-text transition-colors"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        {hasData && (
          <button
            className="bg-surface border border-border text-text px-3.5 py-2 rounded-lg text-[12.5px] font-medium hover:border-accent transition-colors"
            onClick={() => dispatch({ type: 'RESET_ALL' })}
          >
            Load different file
          </button>
        )}
      </div>
    </header>
  )
}
