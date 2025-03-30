"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  LayoutDashboard,
  ShoppingBag,
  Settings,
  Users,
  Package,
  X
} from 'lucide-react'
import { Button } from './ui/button'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  useEffect(() => {
    console.log('Sidebar isOpen state:', isOpen)
  }, [isOpen])

  // Function to handle link click on mobile
  const handleLinkClick = () => {
    // Only close sidebar on mobile
    if (window.innerWidth < 768) {
      console.log('Link clicked on mobile, closing sidebar')
      onClose()
    }
  }

  const navLinks = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      title: "Products",
      href: "/products",
      icon: <Package className="h-5 w-5" />
    },
    {
      title: "Customers",
      href: "/customers",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Orders",
      href: "/orders",
      icon: <ShoppingBag className="h-5 w-5" />
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />
    }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
          data-testid="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "sidebar fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card text-card-foreground transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        data-state={isOpen ? "open" : "closed"}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold" onClick={handleLinkClick}>
            <BarChart3 className="h-6 w-6" />
            <span>Sales Dashboard</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              console.log('Close sidebar button clicked')
              onClose()
            }}
            className="md:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                pathname === link.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.icon}
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
} 