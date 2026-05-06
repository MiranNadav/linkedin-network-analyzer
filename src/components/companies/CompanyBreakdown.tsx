import { useState, useMemo } from 'react'
import type { Connection } from '@/types/connection'
import { useAppDispatch, useAppState } from '@/store/context'

interface Props {
  connections: Connection[]
}

export function CompanyBreakdown({ connections }: Props) {
  const dispatch = useAppDispatch()
  const { filters } = useAppState()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'count' | 'name'>('count')

  const entries = useMemo(() => {
    const counts: Record<string, number> = {}
    connections.forEach(d => { counts[d.company] = (counts[d.company] || 0) + 1 })
    let list = Object.entries(counts)
    if (search.trim()) list = list.filter(([c]) => c.toLowerCase().includes(search.toLowerCase()))
    if (sortBy === 'name') list.sort((a, b) => a[0].localeCompare(b[0]))
    else list.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    return list
  }, [connections, search, sortBy])

  const totalCompanies = useMemo(() => {
    const s = new Set(connections.map(d => d.company))
    return s.size
  }, [connections])

  return (
    <div className="bg-surface border border-border rounded-[14px] p-5 mb-7">
      <div className="flex justify-between items-center gap-3 mb-3.5 flex-wrap">
        <h3 className="text-[13px] font-semibold text-dim uppercase tracking-[0.6px]">All Companies in View</h3>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Filter companies…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-surface2 border border-border text-text placeholder-dim px-2.5 py-1.5 rounded-lg text-xs outline-none focus:border-accent transition-colors w-44"
          />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'count' | 'name')}
            className="bg-surface2 border border-border text-text px-2.5 py-1.5 rounded-lg text-xs outline-none focus:border-accent transition-colors"
          >
            <option value="count">Sort by count</option>
            <option value="name">Sort A→Z</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1.5 max-h-[380px] overflow-y-auto pr-1">
        {entries.length === 0 ? (
          <div className="col-span-full text-dim text-sm text-center py-6">No companies match.</div>
        ) : entries.map(([company, count]) => {
          const active = filters.company === company
          return (
            <button
              key={company}
              onClick={() => dispatch({ type: 'SET_FILTER', key: 'company', value: active ? '' : company })}
              title={company}
              className={`flex justify-between items-center px-2.5 py-2 rounded-lg text-[12.5px] text-left transition-all border
                ${active
                  ? 'bg-accent/15 border-accent text-text'
                  : 'bg-surface2 border-transparent hover:bg-accent/10 hover:border-accent text-text'
                }`}
            >
              <span className="truncate pr-2">{company}</span>
              <span className="text-dim font-semibold tabular-nums shrink-0">{count}</span>
            </button>
          )
        })}
      </div>

      <p className="text-dim text-xs mt-2.5">
        {entries.length === totalCompanies
          ? `${totalCompanies} unique companies in current view`
          : `Showing ${entries.length} of ${totalCompanies} companies`}
      </p>
    </div>
  )
}
