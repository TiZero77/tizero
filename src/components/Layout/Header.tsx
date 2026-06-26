// src/components/Layout/Header.tsx
import { useMovieStore } from '../../stores/useMovieStore'

export function Header() {
  const { isDark, toggleTheme } = useMovieStore()

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border">
      <h1 className="text-xl font-bold tracking-wider text-accent">
        TiZero
      </h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-card transition-colors text-lg"
        aria-label="切换主题"
      >
        {isDark ? '☀️' : '🌙'}
      </button>
    </header>
  )
}
