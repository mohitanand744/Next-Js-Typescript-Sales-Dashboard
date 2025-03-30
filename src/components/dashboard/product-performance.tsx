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
import { productPerformance } from '@/lib/utils'
import { useFilters } from '@/contexts/filter-context'
import { filterProductData } from '@/lib/filter-utils'
import { ProductPerformanceData } from '@/types/dashboard'

// Use dynamic import with type safety
const ProductPerformanceComponent = dynamic<{ data: ProductPerformanceData[] }>(
  () => import('./product-performance-component').then((mod) => mod.ProductPerformanceComponent),
  { ssr: false }
)

interface ProductPerformanceProps {
  className?: string
}

export function ProductPerformance({ className }: ProductPerformanceProps) {
  const { timeFilter, productFilter } = useFilters()
  const filteredData = filterProductData(productPerformance, productFilter, timeFilter)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Product Performance</CardTitle>
        <CardDescription>
          Sales and profit by product
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] w-full px-4">
          <ProductPerformanceComponent data={filteredData} />
        </div>
      </CardContent>
    </Card>
  )
} 