import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppState } from '@/store/context'
import { SENIORITY_ORDER } from '@/constants/classification'

function unique(arr: (string | null)[]): string[] {
  return [...new Set(arr)].filter(Boolean).sort() as string[]
}

export function FilterBar() {
  const dispatch = useAppDispatch()
  const { connections, filters } = useAppState()
  const [searchDraft, setSearchDraft] = useState(filters.search)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync searchDraft when filters reset externally
  useEffect(() => {
    if (filters.search === '') setSearchDraft('')
  }, [filters.search])

  const handleSearch = useCallback((value: string) => {
    setSearchDraft(value)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      dispatch({ type: 'SET_FILTER', key: 'search', value })
    }, 150)
  }, [dispatch])

  const companies = unique(connections.map(d => d.company))
  const roles     = unique(connections.map(d => d.role))
  const years     = [...new Set(connections.map(d => d.year).filter(Boolean))]
    .sort((a, b) => (b as number) - (a as number)).map(String)

  const sel = 'bg-surface2 border border-border text-text px-3 py-2 rounded-lg text-[13px] outline-none focus:border-accent transition-colors w-full'

  return (
    <div className="bg-surface border border-border rounded-[14px] p-4 mb-4 grid gap-2.5"
      style={{ gridTemplateColumns: '2fr repeat(4,1fr) auto' }}>
      <input
        type="text"
        placeholder="Search name, company, position, email…"
        value={searchDraft}
        onChange={e => handleSearch(e.target.value)}
        className={sel + ' placeholder-dim'}
      />

      <select value={filters.company} onChange={e => dispatch({ type: 'SET_FILTER', key: 'company', value: e.target.value })} className={sel}>
        <option value="">All companies</option>
        {companies.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select value={filters.role} onChange={e => dispatch({ type: 'SET_FILTER', key: 'role', value: e.target.value })} className={sel}>
        <option value="">All roles</option>
        {roles.map(r => <option key={r} value={r}>{r}</option>)}
      </select>

      <select value={filters.seniority} onChange={e => dispatch({ type: 'SET_FILTER', key: 'seniority', value: e.target.value })} className={sel}>
        <option value="">All seniority</option>
        {SENIORITY_ORDER.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <select value={filters.year} onChange={e => dispatch({ type: 'SET_FILTER', key: 'year', value: e.target.value })} className={sel}>
        <option value="">All years</option>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>

      <button
        onClick={() => dispatch({ type: 'RESET_FILTERS' })}
        className="bg-transparent border border-border text-dim px-3.5 py-2 rounded-lg text-[13px] hover:text-text hover:border-accent transition-all whitespace-nowrap"
      >
        Clear
      </button>
    </div>
  )
}
