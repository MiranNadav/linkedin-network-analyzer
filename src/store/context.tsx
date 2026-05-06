import { createContext, useContext, useReducer, useEffect, useState, useCallback, type ReactNode } from 'react'
import type { AppState, AppAction } from '@/types/connection'
import { appReducer, initialState } from './reducer'
import { saveConnections, loadConnections, clearConnections } from '@/lib/persistence'

const StateCtx = createContext<AppState | null>(null)
const DispatchCtx = createContext<React.Dispatch<AppAction> | null>(null)
const HydratingCtx = createContext<boolean>(false)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const [isHydrating, setIsHydrating] = useState(true)

  useEffect(() => {
    loadConnections().then(data => {
      if (data && data.length > 0) {
        dispatch({ type: 'SET_DATA', payload: data })
      }
      setIsHydrating(false)
    })
  }, [])

  const wrappedDispatch = useCallback((action: AppAction) => {
    dispatch(action)
    if (action.type === 'SET_DATA') {
      saveConnections(action.payload)
    } else if (action.type === 'RESET_ALL') {
      clearConnections()
    }
  }, [])

  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={wrappedDispatch}>
        <HydratingCtx.Provider value={isHydrating}>
          {children}
        </HydratingCtx.Provider>
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

export function useIsHydrating(): boolean {
  return useContext(HydratingCtx)
}
