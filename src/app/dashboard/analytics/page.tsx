"use client"

import React, { useState, useEffect } from 'react'
import { BarChart3, LineChart, Filter } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RevenueChartComponent } from '@/components/dashboard/revenue-chart-component'
import { SalesByRegionComponent } from '@/components/dashboard/sales-by-region-component'
import { ProductPerformanceComponent } from '@/components/dashboard/product-performance-component'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

// Sample data for charts
const allRevenueData = [
  { month: "Jan", revenue: 10500 },
  { month: "Feb", revenue: 12800 },
  { month: "Mar", revenue: 9800 },
  { month: "Apr", revenue: 15400 },
  { month: "May", revenue: 18300 },
  { month: "Jun", revenue: 14200 },
  { month: "Jul", revenue: 21500 },
  { month: "Aug", revenue: 25600 },
  { month: "Sep", revenue: 19800 },
  { month: "Oct", revenue: 22400 },
  { month: "Nov", revenue: 28700 },
  { month: "Dec", revenue: 32100 }
]

const allSalesByRegionData = [
  { name: "North America", value: 42000 },
  { name: "Europe", value: 29000 },
  { name: "Asia", value: 18500 },
  { name: "Australia", value: 8200 },
  { name: "South America", value: 6800 }
]

const allProductPerformanceData = [
  { name: "Product A", sales: 21000, profit: 12000, category: "Electronics" },
  { name: "Product B", sales: 18000, profit: 9000, category: "Fashion" },
  { name: "Product C", sales: 16000, profit: 8000, category: "Electronics" },
  { name: "Product D", sales: 8000, profit: 3000, category: "Home" },
  { name: "Product E", sales: 12000, profit: 6000, category: "Fashion" }
]

// Time period options
const timePeriods = [
  { label: "Last Month", value: "lastMonth" },
  { label: "Last 3 Months", value: "last3Months" },
  { label: "Last 6 Months", value: "last6Months" },
  { label: "This Year", value: "thisYear" },
  { label: "All Time", value: "allTime" }
]

// Product categories
const productCategories = [
  { label: "All Categories", value: "all" },
  { label: "Electronics", value: "Electronics" },
  { label: "Fashion", value: "Fashion" },
  { label: "Home", value: "Home" }
]

// Regions
const regions = [
  { label: "All Regions", value: "all" },
  { label: "North America", value: "North America" },
  { label: "Europe", value: "Europe" },
  { label: "Asia", value: "Asia" },
  { label: "Australia", value: "Australia" },
  { label: "South America", value: "South America" }
]

export default function AnalyticsPage() {
  // Filter states
  const [timePeriod, setTimePeriod] = useState("allTime")
  const [productCategory, setProductCategory] = useState("all")
  const [region, setRegion] = useState("all")

  // Filtered data states
  const [revenueData, setRevenueData] = useState(allRevenueData)
  const [salesByRegionData, setSalesByRegionData] = useState(allSalesByRegionData)
  const [productPerformanceData, setProductPerformanceData] = useState(allProductPerformanceData)

  // Filter data based on selected filters
  useEffect(() => {
    // Filter revenue data based on time period
    let filteredRevenueData = [...allRevenueData]
    if (timePeriod === "lastMonth") {
      filteredRevenueData = [allRevenueData[allRevenueData.length - 1]]
    } else if (timePeriod === "last3Months") {
      filteredRevenueData = allRevenueData.slice(-3)
    } else if (timePeriod === "last6Months") {
      filteredRevenueData = allRevenueData.slice(-6)
    } else if (timePeriod === "thisYear") {
      filteredRevenueData = [...allRevenueData]
    }
    setRevenueData(filteredRevenueData)

    // Filter product performance data based on category
    let filteredProductData = [...allProductPerformanceData]
    if (productCategory !== "all") {
      filteredProductData = allProductPerformanceData.filter(
        item => item.category === productCategory
      )
    }
    setProductPerformanceData(filteredProductData)

    // Filter sales by region data
    let filteredRegionData = [...allSalesByRegionData]
    if (region !== "all") {
      filteredRegionData = allSalesByRegionData.filter(
        item => item.name === region
      )
    }
    setSalesByRegionData(filteredRegionData)
  }, [timePeriod, productCategory, region])

  const resetFilters = () => {
    setTimePeriod("allTime")
    setProductCategory("all")
    setRegion("all")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track your sales performance and metrics over time.
        </p>
      </div>

      {/* Filter options */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter Analytics</span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="time-period" className="text-sm text-muted-foreground">
                  Time Period
                </label>
                <Select value={timePeriod} onValueChange={setTimePeriod}>
                  <SelectTrigger id="time-period">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timePeriods.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="product-category" className="text-sm text-muted-foreground">
                  Product Category
                </label>
                <Select value={productCategory} onValueChange={setProductCategory}>
                  <SelectTrigger id="product-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="region" className="text-sm text-muted-foreground">
                  Region
                </label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger id="region">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button variant="outline" onClick={resetFilters} className="w-full md:w-auto">
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <LineChart className="h-6 w-6" />
            <div>
              <CardTitle>Revenue Growth</CardTitle>
              <CardDescription>Monthly revenue performance</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {revenueData.length > 0 ? (
                <RevenueChartComponent data={revenueData} />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">No data available for the selected filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <BarChart3 className="h-6 w-6" />
            <div>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Sales and profit by product</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {productPerformanceData.length > 0 ? (
                <ProductPerformanceComponent data={productPerformanceData} />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">No data available for the selected filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales by Region</CardTitle>
          <CardDescription>Regional market distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            {salesByRegionData.length > 0 ? (
              <SalesByRegionComponent data={salesByRegionData} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">No data available for the selected filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 