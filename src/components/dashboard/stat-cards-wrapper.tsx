"use client"

import React from 'react'
import { StatCard } from './stat-card'
import { useFilters } from '@/contexts/filter-context'
import { filterSalesMetrics } from '@/lib/filter-utils'
import { salesMetrics } from '@/lib/utils'
import { BarChart3, DollarSign, ShoppingCart, Users } from 'lucide-react'

export function StatCardsWrapper() {
  const { timeFilter, productFilter, regionFilter } = useFilters()

  // Get filtered sales metrics based on current filters
  const filteredMetrics = filterSalesMetrics(
    salesMetrics,
    timeFilter,
    productFilter,
    regionFilter
  )

  return (
    <>
      <StatCard
        title="Total Sales"
        value={filteredMetrics.totalSales}
        icon={<DollarSign className="w-6 h-6" />}
        trend={{ value: filteredMetrics.growth, isPositive: parseFloat(filteredMetrics.growth) > 0 }}
      />
      <StatCard
        title="Customers"
        value={filteredMetrics.customers}
        icon={<Users className="w-6 h-6" />}
        trend={{ value: filteredMetrics.newCustomers + " new", isPositive: true }}
      />
      <StatCard
        title="Average Order"
        value={filteredMetrics.averageOrder}
        icon={<ShoppingCart className="w-6 h-6" />}
      />
      <StatCard
        title="Conversion Rate"
        value={filteredMetrics.conversion}
        icon={<BarChart3 className="w-6 h-6" />}
      />
    </>
  )
} 