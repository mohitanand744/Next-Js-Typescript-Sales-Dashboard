"use client"

import React, { useState, useEffect } from 'react'
import {
  ShoppingBag,
  Search,
  Filter,
  Calendar,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  CalendarRange,
  X,
  User
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

// Define the Order type
type Order = {
  id: string
  date: string
  customer: string
  total: string
  status: string
  numericDate: Date
  numericTotal: number
}

export default function OrdersPage() {
  // Parse the order data with additional fields for filtering
  const rawOrders = [
    { id: "ORD-001", date: "2023-09-10", customer: "Alex Johnson", total: "$299.99", status: "Completed" },
    { id: "ORD-002", date: "2023-09-12", customer: "Maria Rodriguez", total: "$145.50", status: "Processing" },
    { id: "ORD-003", date: "2023-09-15", customer: "John Smith", total: "$49.99", status: "Completed" },
    { id: "ORD-004", date: "2023-09-18", customer: "Sarah Lee", total: "$799.00", status: "Pending" },
    { id: "ORD-005", date: "2023-09-20", customer: "David Kim", total: "$1,299.99", status: "Completed" },
    { id: "ORD-006", date: "2023-09-22", customer: "Lisa Chen", total: "$199.50", status: "Processing" },
    { id: "ORD-007", date: "2023-09-25", customer: "Michael Brown", total: "$64.99", status: "Cancelled" },
    { id: "ORD-008", date: "2023-09-28", customer: "Emma Wilson", total: "$349.49", status: "Completed" },
    { id: "ORD-009", date: "2023-10-02", customer: "James Taylor", total: "$89.99", status: "Processing" },
    { id: "ORD-010", date: "2023-10-05", customer: "Sophia Martinez", total: "$249.50", status: "Completed" },
    { id: "ORD-011", date: "2023-10-08", customer: "William Johnson", total: "$129.99", status: "Pending" },
    { id: "ORD-012", date: "2023-10-10", customer: "Olivia Davis", total: "$599.99", status: "Completed" },
    { id: "ORD-013", date: "2023-10-15", customer: "Henry Wilson", total: "$79.99", status: "Cancelled" },
    { id: "ORD-014", date: "2023-10-18", customer: "Emma Brown", total: "$179.50", status: "Processing" },
    { id: "ORD-015", date: "2023-10-20", customer: "Michael Lee", total: "$449.99", status: "Completed" },
    { id: "ORD-016", date: "2023-10-25", customer: "Ava Johnson", total: "$899.00", status: "Pending" },
  ]

  // Convert date strings to Date objects and totals to numbers
  const allOrders: Order[] = rawOrders.map(order => ({
    ...order,
    numericDate: new Date(order.date + "T00:00:00"),
    numericTotal: parseFloat(order.total.replace(/[^0-9.-]+/g, "")),
  }))

  // State for search query
  const [searchQuery, setSearchQuery] = useState('')

  // State for status filter
  const [statusFilter, setStatusFilter] = useState<string[]>([])

  // State for date range - updated to use a single object
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [datePopoverOpen, setDatePopoverOpen] = useState(false)

  // State for filtered orders
  const [filteredOrders, setFilteredOrders] = useState(allOrders)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 8

  // Apply filters and search
  useEffect(() => {
    let result = [...allOrders]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(order =>
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.total.includes(query) ||
        order.status.toLowerCase().includes(query)
      )
    }

    // Apply status filter
    if (statusFilter.length > 0) {
      result = result.filter(order => statusFilter.includes(order.status))
    }

    // Apply date range filter
    if (dateRange?.from && dateRange?.to) {
      // Create end of day date for inclusive filtering
      const endDate = new Date(dateRange.to)
      endDate.setHours(23, 59, 59, 999)

      result = result.filter(order => {
        const orderDate = order.numericDate
        return orderDate >= dateRange.from! && orderDate <= endDate
      })
    }

    setFilteredOrders(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, statusFilter, dateRange])

  // Get paginated orders
  const getPaginatedOrders = () => {
    const startIndex = (currentPage - 1) * ordersPerPage
    return filteredOrders.slice(startIndex, startIndex + ordersPerPage)
  }

  // Calculate page count
  const pageCount = Math.ceil(filteredOrders.length / ordersPerPage)

  // Get unique values for status filter
  const statuses = [...new Set(allOrders.map(o => o.status))]

  // Toggle filter function
  const toggleFilter = (value: string) => {
    if (statusFilter.includes(value)) {
      setStatusFilter(statusFilter.filter(item => item !== value))
    } else {
      setStatusFilter([...statusFilter, value])
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setStatusFilter([])
    setSearchQuery('')
    setDateRange(undefined)
  }

  // Clear date range
  const clearDateRange = () => {
    setDateRange(undefined)
    setDatePopoverOpen(false)
  }

  // Apply date range
  const applyDateRange = () => {
    if (dateRange?.from && dateRange?.to) {
      setDatePopoverOpen(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
      case "Processing":
        return "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
      case "Pending":
        return "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Cancelled":
        return "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
      case "Cancelled":
        return <AlertCircle className="mr-1.5 h-3.5 w-3.5" />
      case "Processing":
        return <Clock className="mr-1.5 h-3.5 w-3.5" />
      case "Pending":
        return <Clock className="mr-1.5 h-3.5 w-3.5" />
      default:
        return null
    }
  }

  // View order details
  const viewOrderDetails = (order: Order) => {
    console.log('View order details:', order)
    // This would typically open a modal with order details
    // For demonstration purposes, we're just logging to console
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Track and manage customer orders.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex justify-end w-full gap-2 sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="w-4 h-4 mr-2" />
                Filter
                <Badge className="ml-2 h-5 px-1.5 text-xs" variant="secondary">
                  {statusFilter.length || 0}
                </Badge>
                <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Filter Orders</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs">Status</DropdownMenuLabel>
                {statuses.map(status => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter.includes(status)}
                    onCheckedChange={() => toggleFilter(status)}
                  >
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(status)}`}>
                      {getStatusIcon(status)}
                      {status}
                    </span>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <Button
                variant="ghost"
                size="sm"
                className="justify-center w-full"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>

          <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
                {dateRange?.from && dateRange?.to && (
                  <Badge className="ml-2 h-5 px-1.5 text-xs" variant="secondary">
                    {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-3 space-y-3">
                <div className="space-y-1.5">
                  <div className="text-sm font-medium">Select date range</div>
                  <div className="text-xs text-muted-foreground">
                    Filter orders by date
                  </div>
                </div>
                <div className="p-2 border rounded-md">
                  <CalendarComponent
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    initialFocus
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearDateRange}
                  >
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    onClick={applyDateRange}
                    disabled={!dateRange?.from || !dateRange?.to}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Display currently active filters if any */}
          {(statusFilter.length > 0 || (dateRange?.from && dateRange?.to)) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="px-2 h-9"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Manage and process customer orders</CardDescription>
            </div>
            {(searchQuery || statusFilter.length > 0 || (dateRange?.from && dateRange?.to)) && (
              <div className="text-sm text-muted-foreground">
                Showing {filteredOrders.length} of {allOrders.length} orders
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="border rounded-md hidden md:block">
            <div className="grid grid-cols-12 px-4 py-3 text-sm font-medium border-b bg-muted/50">
              <div className="col-span-2">Order ID</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-3">Customer</div>
              <div className="col-span-2">Total</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Actions</div>
            </div>
            <div className="divide-y">
              {getPaginatedOrders().length > 0 ? (
                getPaginatedOrders().map(order => (
                  <div key={order.id} className="grid items-center grid-cols-12 px-4 py-3">
                    <div className="col-span-2 font-medium">{order.id}</div>
                    <div className="col-span-2">{order.date}</div>
                    <div className="col-span-3">{order.customer}</div>
                    <div className="col-span-2">{order.total}</div>
                    <div className="col-span-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-end col-span-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0"
                        title="View Order Details"
                        onClick={() => viewOrderDetails(order)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-muted-foreground">No orders match your criteria.</p>
                  <Button variant="link" onClick={clearFilters} className="mt-2">
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="space-y-4 md:hidden">
            {getPaginatedOrders().length > 0 ? (
              getPaginatedOrders().map(order => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 p-4 border-b">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-muted-foreground">{order.date}</div>
                      </div>
                      <div className="ml-auto">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-sm font-medium">
                          <User className="w-4 h-4 mr-2 text-muted-foreground" />
                          Customer:
                        </span>
                        <span className="text-sm">{order.customer}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Total:</span>
                        <span className="text-sm font-bold">{order.total}</span>
                      </div>
                    </div>
                    <div className="flex border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 py-2 rounded-none"
                        onClick={() => viewOrderDetails(order)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="p-8 text-center border rounded-md">
                <p className="text-muted-foreground">No orders match your criteria.</p>
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        {pageCount > 1 && (
          <CardFooter className="flex items-center justify-center gap-1 pt-8 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              Next
            </Button>
          </CardFooter>
        )}
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredOrders.length}</div>
            <p className="text-xs text-muted-foreground">
              {filteredOrders.length === allOrders.length
                ? "All orders"
                : `${((filteredOrders.length / allOrders.length) * 100).toFixed(0)}% of total`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredOrders.reduce((sum, order) => sum + order.numericTotal, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredOrders.filter(order => order.status === "Completed").length} completed orders
              {filteredOrders.length !== allOrders.length && (
                <> ({((filteredOrders.reduce((sum, order) => sum + order.numericTotal, 0) /
                  allOrders.reduce((sum, order) => sum + order.numericTotal, 0)) * 100).toFixed(0)}% of total revenue)</>
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredOrders.length > 0
                ? (filteredOrders.reduce((sum, order) => sum + order.numericTotal, 0) / filteredOrders.length).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : "0.00"}
            </div>
            {filteredOrders.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {filteredOrders.filter(order =>
                  order.numericTotal > (filteredOrders.reduce((sum, order) => sum + order.numericTotal, 0) / filteredOrders.length)
                ).length} orders above average

                {filteredOrders.length !== allOrders.length && allOrders.length > 0 && (
                  <span> ({
                    filteredOrders.length > 0 && allOrders.length > 0
                      ? ((filteredOrders.reduce((sum, order) => sum + order.numericTotal, 0) / filteredOrders.length) >
                        (allOrders.reduce((sum, order) => sum + order.numericTotal, 0) / allOrders.length)
                        ? "+"
                        : "") +
                      ((filteredOrders.reduce((sum, order) => sum + order.numericTotal, 0) / filteredOrders.length) /
                        (allOrders.reduce((sum, order) => sum + order.numericTotal, 0) / allOrders.length) * 100 - 100).toFixed(0) + "% vs overall"
                      : ""
                  })</span>
                )}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 