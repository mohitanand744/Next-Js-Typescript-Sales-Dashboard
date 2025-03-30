"use client"

import React, { useState, useEffect } from 'react'
import { RevenueChart } from './revenue-chart'
import { ProductPerformance } from './product-performance'
import { SalesByRegion } from './sales-by-region'
import { RecentSales } from './recent-sales'
import { Filters } from './filters'
import { StatCardsWrapper } from './stat-cards-wrapper'
import { motion, AnimatePresence } from 'framer-motion'
import { useFilters } from '@/contexts/filter-context'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FilterDialog } from './filter-dialog'

interface DashboardLayoutProps {
  className?: string
}

export function DashboardLayout({ className }: DashboardLayoutProps) {
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const { timeFilter, productFilter, regionFilter } = useFilters();
  const [filterApplied, setFilterApplied] = useState(false);

  // Track if filters have changed from default
  useEffect(() => {
    setFilterApplied(
      timeFilter !== '30days' ||
      productFilter !== 'all' ||
      regionFilter !== 'all'
    );
  }, [timeFilter, productFilter, regionFilter]);

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (timeFilter !== '30days') count++;
    if (productFilter !== 'all') count++;
    if (regionFilter !== 'all') count++;
    return count;
  };

  const filterCount = getActiveFiltersCount();

  // Animation variants for content
  const contentVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={contentVariants}
    >
      <motion.div className="flex items-center justify-between pb-4 border-b" variants={itemVariants}>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Overview of your sales performance and key metrics
          </p>
        </div>

        {/* Filter Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilterDialog(true)}
          className={cn(
            "gap-2",
            filterApplied && "border-primary text-primary bg-primary/5"
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {filterCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 text-xs rounded-full bg-primary text-primary-foreground">
              {filterCount}
            </span>
          )}
        </Button>
      </motion.div>

      {/* Filter Dialog */}
      <FilterDialog
        open={showFilterDialog}
        onOpenChange={setShowFilterDialog}
      />

      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        variants={itemVariants}
      >
        <StatCardsWrapper />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        variants={itemVariants}
      >
        <RevenueChart />
        <ProductPerformance />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        variants={itemVariants}
      >
        <SalesByRegion />
        <RecentSales className="lg:col-span-1" />
      </motion.div>
    </motion.div>
  )
} 