import { useAppState } from '@/store/context'
import { Header } from './Header'
import { DropZone } from '@/components/upload/DropZone'
import { Dashboard } from './Dashboard'

export function AppShell() {
  const { connections } = useAppState()
  return (
    <div className="max-w-[1400px] mx-auto px-8 py-6 pb-16">
      <Header />
      {connections.length === 0 ? <DropZone /> : <Dashboard />}
    </div>
  )
}
