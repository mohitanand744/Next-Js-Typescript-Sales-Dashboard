// Revenue chart data type
export interface RevenueData {
  month: string
  revenue: number
}

// Product performance data type
export interface ProductPerformanceData {
  name: string
  sales: number
  profit: number
}

// Sales by region data type
export interface SalesByRegionData {
  name: string
  value: number
}

// Recent sales data type
export interface RecentSaleData {
  id: string
  customer: string
  date: string
  amount: string
  avatar: string
}

// Sales metrics data type
export interface SalesMetrics {
  totalSales: string
  growth: string
  customers: string
  newCustomers: string
  averageOrder: string
  conversion: string
} 