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
import { revenueData } from '@/lib/utils'
import { useFilters } from '@/contexts/filter-context'
import { filterRevenueData } from '@/lib/filter-utils'
import { RevenueData } from '@/types/dashboard'

// Use dynamic import with type safety
const RevenueChartComponent = dynamic<{ data: RevenueData[] }>(
  () => import('./revenue-chart-component').then((mod) => mod.RevenueChartComponent),
  { ssr: false }
)

interface RevenueChartProps {
  className?: string
}

export function RevenueChart({ className }: RevenueChartProps) {
  const { timeFilter } = useFilters()
  const filteredData = filterRevenueData(revenueData, timeFilter)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Revenue Over Time</CardTitle>
        <CardDescription>
          Monthly revenue for the selected period
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] w-full px-4">
          <RevenueChartComponent data={filteredData} />
        </div>
      </CardContent>
    </Card>
  )
} 