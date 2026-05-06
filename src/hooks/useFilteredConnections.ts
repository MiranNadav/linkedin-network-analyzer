import { useMemo, useRef } from 'react'
import Fuse from 'fuse.js'
import type { Connection } from '@/types/connection'
import { useAppState } from '@/store/context'
import { buildFuseIndex } from '@/lib/fuseSearch'

function applyStructuralFilters(
  connections: Connection[],
  filters: { company: string; role: string; seniority: string; year: string },
): Connection[] {
  return connections.filter(d => {
    if (filters.company && d.company !== filters.company) return false
    if (filters.role && d.role !== filters.role) return false
    if (filters.seniority && d.seniority !== filters.seniority) return false
    if (filters.year && String(d.year) !== filters.year) return false
    return true
  })
}

export function useFilteredConnections(): Connection[] {
  const { connections, filters, sort } = useAppState()

  const fuseRef = useRef<Fuse<Connection> | null>(null)
  const fuseDataRef = useRef<Connection[]>([])

  if (fuseDataRef.current !== connections) {
    fuseDataRef.current = connections
    fuseRef.current = buildFuseIndex(connections)
  }

  return useMemo(() => {
    let result: Connection[]

    if (filters.search.trim() && fuseRef.current) {
      result = fuseRef.current.search(filters.search).map(r => r.item)
    } else {
      result = connections
    }

    result = applyStructuralFilters(result, filters)

    const { field, dir } = sort
    const m = dir === 'asc' ? 1 : -1
    return [...result].sort((a, b) => {
      const va = (a[field] ?? '') as string
      const vb = (b[field] ?? '') as string
      if (va < vb) return -1 * m
      if (va > vb) return 1 * m
      return 0
    })
  }, [connections, filters, sort])
}
