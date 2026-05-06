import type { AppState, AppAction, FilterState } from '@/types/connection'

const DEFAULT_FILTERS: FilterState = {
  search: '', company: '', role: '', seniority: '', year: '',
}

export const initialState: AppState = {
  connections: [],
  filters: { ...DEFAULT_FILTERS },
  sort: { field: 'iso', dir: 'desc' },
  page: 1,
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_DATA':
      return { ...initialState, connections: action.payload }
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, [action.key]: action.value }, page: 1 }
    case 'SET_SORT': {
      const sameField = state.sort.field === action.field
      return {
        ...state,
        sort: { field: action.field, dir: sameField && state.sort.dir === 'asc' ? 'desc' : 'asc' },
        page: 1,
      }
    }
    case 'SET_PAGE':
      return { ...state, page: action.page }
    case 'RESET_FILTERS':
      return { ...state, filters: { ...DEFAULT_FILTERS }, page: 1 }
    case 'RESET_ALL':
      return { ...initialState }
    default:
      return state
  }
}
