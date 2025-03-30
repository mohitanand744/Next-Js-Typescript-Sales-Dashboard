"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils'
import { CalendarIcon, FilterIcon, GlobeIcon, RefreshCcw } from 'lucide-react'
import { useFilters, TimeFilter, ProductFilter, RegionFilter } from '@/contexts/filter-context'
import { motion } from "framer-motion"

interface FiltersProps {
  className?: string
}

export function Filters({ className }: FiltersProps) {
  const {
    timeFilter,
    productFilter,
    regionFilter,
    updateTimeFilter,
    updateProductFilter,
    updateRegionFilter,
    resetFilters
  } = useFilters()

  const handleTimeChange = (value: string) => {
    updateTimeFilter(value as TimeFilter)
  }

  const handleProductChange = (value: string) => {
    updateProductFilter(value as ProductFilter)
  }

  const handleRegionChange = (value: string) => {
    updateRegionFilter(value as RegionFilter)
  }

  return (
    <div
      className={cn("w-full space-y-5", className)}
    >
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Time Period</span>
          </div>
          <Select
            value={timeFilter}
            onValueChange={handleTimeChange}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <FilterIcon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Product</span>
          </div>
          <Select
            value={productFilter}
            onValueChange={handleProductChange}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Filter by product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="product-a">Product A</SelectItem>
              <SelectItem value="product-b">Product B</SelectItem>
              <SelectItem value="product-c">Product C</SelectItem>
              <SelectItem value="product-d">Product D</SelectItem>
              <SelectItem value="product-e">Product E</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <GlobeIcon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Region</span>
          </div>
          <Select
            value={regionFilter}
            onValueChange={handleRegionChange}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="north-america">North America</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
              <SelectItem value="africa">Africa</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </div>
    </div>
  )
} 