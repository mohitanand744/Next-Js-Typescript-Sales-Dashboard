"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type TimeFilter = '7days' | '30days' | '90days' | 'year' | 'custom'
export type ProductFilter = 'all' | 'product-a' | 'product-b' | 'product-c' | 'product-d' | 'product-e'
export type RegionFilter = 'all' | 'north-america' | 'europe' | 'asia' | 'australia' | 'africa'

interface FilterState {
  timeFilter: TimeFilter
  productFilter: ProductFilter
  regionFilter: RegionFilter
}

interface FilterContextType extends FilterState {
  updateTimeFilter: (value: TimeFilter) => void
  updateProductFilter: (value: ProductFilter) => void
  updateRegionFilter: (value: RegionFilter) => void
  resetFilters: () => void
}

const defaultFilterState: FilterState = {
  timeFilter: '30days',
  productFilter: 'all',
  regionFilter: 'all'
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilterState)

  const updateTimeFilter = useCallback((value: TimeFilter) => {
    setFilters(prev => ({ ...prev, timeFilter: value }))
  }, [])

  const updateProductFilter = useCallback((value: ProductFilter) => {
    setFilters(prev => ({ ...prev, productFilter: value }))
  }, [])

  const updateRegionFilter = useCallback((value: RegionFilter) => {
    setFilters(prev => ({ ...prev, regionFilter: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(defaultFilterState)
  }, [])

  return (
    <FilterContext.Provider value={{
      ...filters,
      updateTimeFilter,
      updateProductFilter,
      updateRegionFilter,
      resetFilters
    }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
} 