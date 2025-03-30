"use client"

import { useState, useCallback } from "react"
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { ErrorBoundary } from '@/components/errors/error-boundary'
import { FilterProvider } from "@/contexts/filter-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    console.log('Toggling sidebar, current state:', sidebarOpen)
    setSidebarOpen(prevState => !prevState)
  }, [sidebarOpen])

  const closeSidebar = useCallback(() => {
    console.log('Closing sidebar')
    setSidebarOpen(false)
  }, [])

  return (
    <ErrorBoundary>
      <FilterProvider>
        <div className="flex flex-col min-h-screen">
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex flex-col flex-1 md:flex-row">
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
            <main className="flex-1 p-4 md:p-6">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </main>
          </div>
        </div>
      </FilterProvider>
    </ErrorBoundary>
  )
} 