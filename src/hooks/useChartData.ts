import { useMemo } from 'react'
import type { Connection } from '@/types/connection'
import { SENIORITY_ORDER } from '@/constants/classification'

export function useChartData(filtered: Connection[]) {
  return useMemo(() => {
    // Timeline: connections by month
    const byMonth: Record<string, number> = {}
    filtered.forEach(d => { if (d.ym) byMonth[d.ym] = (byMonth[d.ym] || 0) + 1 })
    const timelineData = Object.keys(byMonth).sort().map(m => ({ month: m, count: byMonth[m] }))

    // Role categories
    const byRole: Record<string, number> = {}
    filtered.forEach(d => { byRole[d.role] = (byRole[d.role] || 0) + 1 })
    const roleData = Object.entries(byRole).sort((a, b) => b[1] - a[1]).map(([role, count]) => ({ role, count }))

    // Seniority
    const bySen: Record<string, number> = {}
    filtered.forEach(d => { bySen[d.seniority] = (bySen[d.seniority] || 0) + 1 })
    const seniorityData = SENIORITY_ORDER.filter(s => bySen[s]).map(s => ({ name: s, value: bySen[s] }))

    // Top 10 companies
    const compCounts: Record<string, number> = {}
    filtered.forEach(d => { if (d.company !== 'Unknown') compCounts[d.company] = (compCounts[d.company] || 0) + 1 })
    const topCompaniesData = Object.entries(compCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([company, count]) => ({ company, count }))

    return { timelineData, roleData, seniorityData, topCompaniesData }
  }, [filtered])
}
