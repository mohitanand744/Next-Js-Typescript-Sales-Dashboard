"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define user data type
interface UserData {
  name: string
  email: string
  avatar: string
  notificationPreferences: {
    orderUpdates: { email: boolean, push: boolean },
    securityAlerts: { email: boolean, push: boolean },
    marketingUpdates: { email: boolean, push: boolean },
  }
  currentPlan: string
  planPrice: string
}

// Initial user state
const initialUserState: UserData = {
  name: "Sarah Johnson",
  email: "sarah@dashboard.com",
  avatar: "/avatars/01.png",
  notificationPreferences: {
    orderUpdates: { email: false, push: true },
    securityAlerts: { email: true, push: false },
    marketingUpdates: { email: false, push: false },
  },
  currentPlan: "Professional",
  planPrice: "$29.99/month"
}

// Create context
interface UserContextType {
  userData: UserData
  updateUserData: (data: Partial<UserData>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(initialUserState)

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }))
  }

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  )
}

// Hook for using the context
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
} 