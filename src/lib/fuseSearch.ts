import Fuse from 'fuse.js'
import type { Connection } from '@/types/connection'

export function buildFuseIndex(connections: Connection[]): Fuse<Connection> {
  return new Fuse(connections, {
    keys: [
      { name: 'name', weight: 0.4 },
      { name: 'company', weight: 0.3 },
      { name: 'position', weight: 0.2 },
      { name: 'email', weight: 0.1 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
  })
}

export function searchConnections(fuse: Fuse<Connection>, query: string): Connection[] {
  if (!query.trim()) return []
  return fuse.search(query).map(r => r.item)
}
