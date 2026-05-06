export interface RawCSVRow {
  'First Name': string
  'Last Name': string
  'URL': string
  'Email Address': string
  'Company': string
  'Position': string
  'Connected On': string
  [key: string]: string
}

export interface Connection {
  name: string
  first: string
  last: string
  url: string
  email: string
  company: string
  position: string
  connectedOn: string
  iso: string
  year: number | null
  ym: string
  seniority: string
  role: string
}

export interface FilterState {
  search: string
  company: string
  role: string
  seniority: string
  year: string
}

export type SortField = 'name' | 'company' | 'position' | 'role' | 'seniority' | 'iso'

export interface SortState {
  field: SortField
  dir: 'asc' | 'desc'
}

export interface AppState {
  connections: Connection[]
  filters: FilterState
  sort: SortState
  page: number
}

export type AppAction =
  | { type: 'SET_DATA'; payload: Connection[] }
  | { type: 'SET_FILTER'; key: keyof FilterState; value: string }
  | { type: 'SET_SORT'; field: SortField }
  | { type: 'SET_PAGE'; page: number }
  | { type: 'RESET_FILTERS' }
  | { type: 'RESET_ALL' }
