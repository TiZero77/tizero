// src/App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMovieStore } from './stores/useMovieStore'
import { Header } from './components/Layout/Header'
import { Sidebar } from './components/Layout/Sidebar'

const queryClient = new QueryClient()

function AppContent() {
  const isDark = useMovieStore((s) => s.isDark)

  return (
    <div className={isDark ? '' : 'light'}>
      <div className="min-h-screen bg-bg text-text">
        <Header />
        <div className="flex h-[calc(100vh-65px)]">
          <Sidebar>
            <p className="text-muted text-sm">筛选栏开发中...</p>
          </Sidebar>
          <main className="flex-1 flex items-center justify-center">
            <p className="text-muted">主内容区开发中...</p>
          </main>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}
