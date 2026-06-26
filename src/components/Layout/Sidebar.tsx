// src/components/Layout/Sidebar.tsx
import type { ReactNode } from 'react'

interface SidebarProps {
  children: ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-border p-4 overflow-y-auto flex flex-col gap-6">
      {children}
    </aside>
  )
}
