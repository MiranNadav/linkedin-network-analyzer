import type { RawCSVRow } from '@/types/connection'

function parseCSV(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ }
        else { inQuotes = false }
      } else {
        field += c
      }
    } else {
      if (c === '"') { inQuotes = true }
      else if (c === ',') { row.push(field); field = '' }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
      else if (c === '\r') { /* skip */ }
      else { field += c }
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row) }
  return rows
}

export function parseLinkedInCSV(text: string): RawCSVRow[] {
  const rows = parseCSV(text)
  const headerIdx = rows.findIndex(r => {
    const j = r.map(s => s.trim().toLowerCase()).join('|')
    return j.includes('first name') && j.includes('last name') && j.includes('connected on')
  })
  if (headerIdx === -1) {
    throw new Error('Could not find LinkedIn header row (First Name, Last Name, …, Connected On).')
  }
  const headers = rows[headerIdx].map(s => s.trim())
  const data: RawCSVRow[] = []
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i]
    if (r.length === 1 && r[0].trim() === '') continue
    const obj: Record<string, string> = {}
    headers.forEach((h, j) => { obj[h] = (r[j] ?? '').trim() })
    data.push(obj as RawCSVRow)
  }
  return data
}
