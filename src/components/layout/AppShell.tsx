import { useAppState, useIsHydrating } from '@/store/context'
import { Header } from './Header'
import { DropZone } from '@/components/upload/DropZone'
import { Dashboard } from './Dashboard'

export function AppShell() {
  const { connections } = useAppState()
  const isHydrating = useIsHydrating()

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-6 pb-16">
      <Header />
      {isHydrating
        ? <div className="flex items-center justify-center h-64 text-dim text-sm">Loading…</div>
        : connections.length === 0 ? <DropZone /> : <Dashboard />
      }
    </div>
  )
}
