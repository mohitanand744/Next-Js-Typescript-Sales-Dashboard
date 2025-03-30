"use client"

import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SearchBarProps {
  placeholder?: string
  className?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  showIcon?: boolean
  showClearButton?: boolean
  variant?: 'default' | 'minimal'
}

export function SearchBar({
  placeholder = "Search...",
  className,
  value: externalValue,
  onChange,
  onSearch,
  showIcon = true,
  showClearButton = true,
  variant = 'default'
}: SearchBarProps) {
  const [focused, setFocused] = useState(false)
  const [internalValue, setInternalValue] = useState('')

  const isControlled = externalValue !== undefined
  const value = isControlled ? externalValue : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value)
    }
    onChange?.(e.target.value)
  }

  const clearSearch = () => {
    if (!isControlled) {
      setInternalValue('')
    }
    onChange?.('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value)
    }
  }

  return (
    <div
      className={cn(
        "relative flex items-center",
        variant === 'default' ? "w-full" : "flex-1",
        className
      )}
    >
      {showIcon && (
        <Search
          className={cn(
            "absolute left-3 w-4 h-4 transition-opacity duration-200 pointer-events-none",
            focused ? "text-primary" : "text-muted-foreground opacity-70"
          )}
        />
      )}
      <motion.input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "flex h-9 w-full rounded-md bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          showIcon && "pl-9",
          variant === 'default' ? "border border-input" : "border-none shadow-none",
        )}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: focused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      />
      {showClearButton && value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 h-7 w-7 rounded-full"
          onClick={clearSearch}
          type="button"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  )
} 