import type { Connection } from '@/types/connection'

function escapeField(v: unknown): string {
  const s = String(v ?? '')
  return s.includes(',') || s.includes('"') || s.includes('\n')
    ? '"' + s.replace(/"/g, '""') + '"'
    : s
}

export function exportFilteredCSV(rows: Connection[]): void {
  const headers = ['Name', 'Company', 'Position', 'Role Category', 'Seniority', 'Connected On', 'Email', 'URL']
  const csv = [
    headers.join(','),
    ...rows.map(d =>
      [d.name, d.company, d.position, d.role, d.seniority, d.connectedOn, d.email, d.url]
        .map(escapeField).join(',')
    ),
  ].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'linkedin_network_filtered.csv'
  a.click()
  URL.revokeObjectURL(url)
}
