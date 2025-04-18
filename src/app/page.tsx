"use client"

import { useState, useEffect, useCallback } from "react"
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { ErrorBoundary } from '@/components/errors/error-boundary'
import useErrorHandler from '@/components/errors/use-error-handler'
import { FilterProvider } from "@/contexts/filter-context"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { handleError } = useErrorHandler()

  // Create a memoized toggle function to prevent unnecessary re-renders
  const toggleSidebar = useCallback(() => {
    console.log('Toggling sidebar, current state:', sidebarOpen)
    setSidebarOpen(prevState => !prevState)
  }, [sidebarOpen])

  // Create a memoized close function
  const closeSidebar = useCallback(() => {
    console.log('Closing sidebar')
    setSidebarOpen(false)
  }, [])

  // Log when the sidebar state changes
  useEffect(() => {
    console.log('Sidebar state changed to:', sidebarOpen)
  }, [sidebarOpen])

  // Custom error handler for component-level errors
  useEffect(() => {
    // Clean up any potential error sources here
    return () => {
      // Clean up code
    }
  }, [])

  return (
    <ErrorBoundary>
      <FilterProvider>
        <div className="flex min-h-screen flex-col">
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex flex-1 flex-col md:flex-row">
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
            <main className="flex-1 p-4 md:p-6">
              <ErrorBoundary>
                <DashboardLayout />
              </ErrorBoundary>
            </main>
          </div>
        </div>
      </FilterProvider>
    </ErrorBoundary>
  )
}
