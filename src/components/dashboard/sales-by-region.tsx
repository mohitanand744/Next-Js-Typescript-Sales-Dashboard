"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { salesByRegion } from '@/lib/utils'
import { useFilters } from '@/contexts/filter-context'
import { filterRegionData } from '@/lib/filter-utils'
import { SalesByRegionData } from '@/types/dashboard'

// Use dynamic import with type safety
const SalesByRegionComponent = dynamic<{ data: SalesByRegionData[] }>(
  () => import('./sales-by-region-component').then((mod) => mod.SalesByRegionComponent),
  { ssr: false }
)

interface SalesByRegionProps {
  className?: string
}

export function SalesByRegion({ className }: SalesByRegionProps) {
  const { regionFilter } = useFilters()
  const filteredData = filterRegionData(salesByRegion, regionFilter)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Sales by Region</CardTitle>
        <CardDescription>
          Distribution of sales across different regions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] w-full">
          <SalesByRegionComponent data={filteredData} />
        </div>
      </CardContent>
    </Card>
  )
} 