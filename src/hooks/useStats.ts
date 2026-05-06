import { useMemo } from 'react'
import type { Connection } from '@/types/connection'
import { useAppState } from '@/store/context'

export interface Stats {
  total: number
  totalAll: number
  totalCompanies: number
  cLevel: number
  last90: number
  thisYear: number
  topCompany: string
  topCompanyCount: number
}

export function useStats(filtered: Connection[]): Stats {
  const { connections } = useAppState()

  return useMemo(() => {
    const now = new Date()
    const totalCompanies = new Set(filtered.map(d => d.company)).size
    const last90 = filtered.filter(d => d.iso && (now.getTime() - new Date(d.iso).getTime()) / 86400000 < 90).length
    const thisYear = filtered.filter(d => d.year === now.getFullYear()).length
    const cLevel = filtered.filter(d => d.seniority === 'C-Level').length

    const compCounts: Record<string, number> = {}
    filtered.forEach(d => { compCounts[d.company] = (compCounts[d.company] || 0) + 1 })

    let topCompany = '—'
    let topCompanyCount = 0
    for (const [c, n] of Object.entries(compCounts)) {
      if (c === 'Unknown') continue
      if (n > topCompanyCount) { topCompany = c; topCompanyCount = n }
    }

    return {
      total: filtered.length,
      totalAll: connections.length,
      totalCompanies,
      cLevel,
      last90,
      thisYear,
      topCompany,
      topCompanyCount,
    }
  }, [filtered, connections.length])
}
