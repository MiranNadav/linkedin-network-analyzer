import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { AppState, AppAction } from '@/types/connection'
import { appReducer, initialState } from './reducer'

const StateCtx = createContext<AppState | null>(null)
const DispatchCtx = createContext<React.Dispatch<AppAction> | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>
        {children}
      </DispatchCtx.Provider>
    </StateCtx.Provider>
  )
}

export function useAppState(): AppState {
  const ctx = useContext(StateCtx)
  if (!ctx) throw new Error('useAppState must be inside AppProvider')
  return ctx
}

export function useAppDispatch(): React.Dispatch<AppAction> {
  const ctx = useContext(DispatchCtx)
  if (!ctx) throw new Error('useAppDispatch must be inside AppProvider')
  return ctx
}
