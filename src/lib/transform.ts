import type { Connection, RawCSVRow } from '@/types/connection'
import { SENIORITY_RULES, ROLE_RULES } from '@/constants/classification'

export function classifySeniority(position: string): string {
  if (!position) return 'Unknown'
  for (const [name, rx] of SENIORITY_RULES) if (rx.test(position)) return name
  return 'IC / Other'
}

export function classifyRole(position: string): string {
  if (!position) return 'Other'
  for (const [name, rx] of ROLE_RULES) if (rx.test(position)) return name
  return 'Other'
}

function parseDate(d: string): Date | null {
  if (!d) return null
  const dt = new Date(d)
  return isNaN(dt.getTime()) ? null : dt
}

export function transformRows(rows: RawCSVRow[]): Connection[] {
  return rows.map(r => {
    const first = (r['First Name'] ?? '').trim()
    const last  = (r['Last Name'] ?? '').trim()
    const pos   = (r['Position'] ?? '').trim()
    const company = (r['Company'] ?? '').trim() || 'Unknown'
    const url   = (r['URL'] ?? '').trim()
    const email = (r['Email Address'] ?? '').trim()
    const dateStr = (r['Connected On'] ?? '').trim()
    const dt = parseDate(dateStr)
    return {
      name: `${first} ${last}`.trim(),
      first, last, url, email, company,
      position: pos,
      connectedOn: dateStr,
      iso: dt ? dt.toISOString().slice(0, 10) : '',
      year: dt ? dt.getFullYear() : null,
      ym: dt ? dt.toISOString().slice(0, 7) : '',
      seniority: classifySeniority(pos),
      role: classifyRole(pos),
    }
  })
}
