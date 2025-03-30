"use client"

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ModeToggle } from './ui/mode-toggle'
import { Menu, PanelRight, Search } from 'lucide-react'
import { Button } from './ui/button'
import { Notifications } from './ui/notification'
import { sampleNotifications } from '@/data/notifications'
import { SearchBar } from './ui/search-bar'
import { ProfileDropdown } from './ui/profile-dropdown'
import { useUser } from '@/contexts/user-context'

interface HeaderProps {
  toggleSidebar: () => void
}

export function Header({ toggleSidebar }: HeaderProps) {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const { userData } = useUser();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Create a handler for the button click
  const handleToggle = () => {
    console.log('Toggle sidebar button clicked')
    toggleSidebar()
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleDismiss = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const handleViewAll = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    // Implement your search logic here
  };

  const toggleSearchExpand = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  // Handle clicks outside of the search container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isSearchExpanded &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
      }
    }

    // Add event listener when search is expanded
    if (isSearchExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchExpanded]);

  return (
    <header className="sticky top-0 z-30 flex items-center h-16 gap-4 px-4 border-b bg-card text-card-foreground md:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className="md:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <PanelRight className="w-6 h-6" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
      </div>
      {/* Mobile search button */}
      <div className="ml-auto sm:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSearchExpand}
          className="mr-1"
          aria-label="Toggle search"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>
      {/* Desktop search bar */}
      <div
        ref={searchContainerRef}
        className={`${isSearchExpanded ? "absolute inset-x-0 top-0 p-2 h-16 bg-card flex items-center z-50" : "hidden"} sm:relative sm:flex sm:ml-auto sm:w-[40%] md:w-[50%] lg:w-[40%]`}
      >
        {isSearchExpanded && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSearchExpand}
            className="mr-2 sm:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}
        <SearchBar
          placeholder="Search dashboard..."
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
          className="w-full"
        />
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <Notifications
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onDismiss={handleDismiss}
          onViewAll={handleViewAll}
        />
        <ModeToggle />
        <div className="hidden w-px h-6 mx-1 bg-border sm:block" />
        <ProfileDropdown
          profileImage={userData.avatar}
          name={userData.name}
          email={userData.email}
        />
      </div>
    </header>
  )
} 