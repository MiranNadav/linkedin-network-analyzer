import { openDB } from 'idb'
import type { Connection } from '@/types/connection'

const DB_NAME = 'linkedin-analyzer'
const DB_VERSION = 1
const STORE = 'connections'
const KEY = 'data'

async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore(STORE)
    },
  })
}

export async function saveConnections(connections: Connection[]): Promise<void> {
  try {
    const db = await getDB()
    await db.put(STORE, connections, KEY)
  } catch {
    // unavailable in private mode or quota exceeded
  }
}

export async function loadConnections(): Promise<Connection[] | null> {
  try {
    const db = await getDB()
    const data = await db.get(STORE, KEY)
    return data ?? null
  } catch {
    return null
  }
}

export async function clearConnections(): Promise<void> {
  try {
    const db = await getDB()
    await db.delete(STORE, KEY)
  } catch {
    // ignore
  }
}
