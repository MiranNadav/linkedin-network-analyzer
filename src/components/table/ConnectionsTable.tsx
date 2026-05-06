import type { Connection, SortField } from '@/types/connection'
import { useAppDispatch, useAppState } from '@/store/context'
import { exportFilteredCSV } from '@/lib/exportCsv'

const PAGE_SIZE = 25

const COLUMNS: { label: string; field: SortField }[] = [
  { label: 'Name',      field: 'name' },
  { label: 'Company',   field: 'company' },
  { label: 'Position',  field: 'position' },
  { label: 'Role',      field: 'role' },
  { label: 'Seniority', field: 'seniority' },
  { label: 'Connected', field: 'iso' },
]

function fmtDate(iso: string): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function RoleBadge({ value }: { value: string }) {
  return <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold bg-accent2/15 text-[#b09dff] border border-accent2/30">{value}</span>
}

function SenBadge({ value }: { value: string }) {
  return <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold bg-accent/15 text-[#7eb0ff] border border-accent/30">{value}</span>
}

function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null
  const pages: (number | '…')[] = [1]
  for (let i = page - 2; i <= page + 2; i++) if (i > 1 && i < totalPages) pages.push(i)
  if (totalPages > 1) pages.push(totalPages)
  const uniq = [...new Set(pages as number[])].sort((a, b) => a - b)
  const result: (number | '…')[] = []
  let prev = 0
  uniq.forEach(p => { if (p - prev > 1) result.push('…'); result.push(p); prev = p })

  const btn = 'px-3 py-1.5 rounded-md text-xs border border-border bg-transparent text-text hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-w-[34px]'
  return (
    <div className="flex justify-center items-center gap-2 px-4 py-3 bg-surface2 border-t border-border">
      <button className={btn} disabled={page === 1} onClick={() => onChange(page - 1)}>‹ Prev</button>
      {result.map((p, i) =>
        p === '…'
          ? <span key={`e${i}`} className="text-dim text-xs px-1">…</span>
          : <button key={p} className={`${btn} ${p === page ? 'bg-accent border-accent font-semibold' : ''}`} onClick={() => onChange(p as number)}>{p}</button>
      )}
      <span className="text-dim text-xs mx-2">page {page} of {totalPages}</span>
      <button className={btn} disabled={page === totalPages} onClick={() => onChange(page + 1)}>Next ›</button>
    </div>
  )
}

interface Props {
  rows: Connection[]
  totalAll: number
}

export function ConnectionsTable({ rows, totalAll }: Props) {
  const dispatch = useAppDispatch()
  const { sort, page } = useAppState()

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageRows = rows.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <>
      <div className="flex justify-between items-center mb-3 px-1">
        <p className="text-dim text-[13px]">
          Showing <strong className="text-text font-semibold">{rows.length.toLocaleString()}</strong> of{' '}
          <strong className="text-text font-semibold">{totalAll.toLocaleString()}</strong> connections
        </p>
        <button
          className="bg-accent border-0 text-white px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-[#3a7ce8] transition-colors"
          onClick={() => exportFilteredCSV(rows)}
        >
          Export filtered CSV
        </button>
      </div>

      <div className="bg-surface border border-border rounded-[14px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-surface2 sticky top-0 z-10">
              <tr>
                {COLUMNS.map(col => (
                  <th
                    key={col.field}
                    onClick={() => dispatch({ type: 'SET_SORT', field: col.field })}
                    className={`text-left px-3.5 py-3 text-[11px] font-semibold uppercase tracking-[0.6px] border-b border-border cursor-pointer select-none whitespace-nowrap hover:text-text transition-colors
                      ${sort.field === col.field ? 'text-accent' : 'text-dim'}`}
                  >
                    {col.label}
                    <span className="inline-block ml-1 opacity-60">
                      {sort.field === col.field ? (sort.dir === 'asc' ? '↑' : '↓') : ''}
                    </span>
                  </th>
                ))}
                <th className="text-left px-3.5 py-3 text-[11px] font-semibold uppercase tracking-[0.6px] border-b border-border text-dim">Profile</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr><td colSpan={7} className="text-center text-dim py-12">No connections match your filters.</td></tr>
              ) : pageRows.map((d, i) => (
                <tr key={`${d.name}-${i}`} className="hover:bg-accent/5 transition-colors">
                  <td className="px-3.5 py-2.5 border-b border-border text-[13px] font-semibold text-text">{d.name}</td>
                  <td className="px-3.5 py-2.5 border-b border-border text-[13px]">{d.company}</td>
                  <td className="px-3.5 py-2.5 border-b border-border text-[13px]">{d.position}</td>
                  <td className="px-3.5 py-2.5 border-b border-border"><RoleBadge value={d.role} /></td>
                  <td className="px-3.5 py-2.5 border-b border-border"><SenBadge value={d.seniority} /></td>
                  <td className="px-3.5 py-2.5 border-b border-border text-[13px] text-dim">{fmtDate(d.iso)}</td>
                  <td className="px-3.5 py-2.5 border-b border-border">
                    {d.url && <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-accent text-xs hover:underline">View →</a>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={safePage} totalPages={totalPages} onChange={p => dispatch({ type: 'SET_PAGE', page: p })} />
      </div>
    </>
  )
}
