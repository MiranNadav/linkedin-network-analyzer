import { AppProvider } from '@/store/context'
import { ThemeProvider } from '@/store/themeContext'
import { AppShell } from '@/components/layout/AppShell'

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </ThemeProvider>
  )
}
