import { ProductFilter, RegionFilter, TimeFilter } from "@/contexts/filter-context"
import { ProductPerformanceData, SalesByRegionData, RevenueData, RecentSaleData } from "@/types/dashboard"

// Filter revenue data by time period
export function filterRevenueData(data: RevenueData[], timeFilter: TimeFilter): RevenueData[] {
  const months = {
    '7days': 1,
    '30days': 3,
    '90days': 6,
    'year': 12,
    'custom': 12 // For custom, we'll just show all data for now
  }

  const numMonths = months[timeFilter] || 12
  return data.slice(-numMonths)
}

// Filter product performance data by product and time
export function filterProductData(
  data: ProductPerformanceData[],
  productFilter: ProductFilter,
  timeFilter: TimeFilter
): ProductPerformanceData[] {
  let filtered = [...data]

  // Apply product filter
  if (productFilter !== 'all') {
    const productName = productFilter.replace('product-', '').toUpperCase()
    filtered = filtered.filter(item => item.name === `Product ${productName}`)
  }

  // Apply time filter (just for demonstration, we're not actually changing the product data by time)
  // In a real app, each product might have time-based data
  return filtered
}

// Filter sales by region data
export function filterRegionData(
  data: SalesByRegionData[],
  regionFilter: RegionFilter
): SalesByRegionData[] {
  if (regionFilter === 'all') return data

  // Convert filter value like 'north-america' to 'North America'
  const regionName = regionFilter
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return data.filter(item => item.name === regionName)
}

// Filter sales metrics based on all filters
export function filterSalesMetrics(
  baseMetrics: {
    totalSales: string;
    growth: string;
    customers: string;
    newCustomers: string;
    averageOrder: string;
    conversion: string;
  },
  timeFilter: TimeFilter,
  productFilter: ProductFilter,
  regionFilter: RegionFilter
) {
  // In a real application, these values would be calculated based on filtered data
  // Here we'll simulate changes based on filter values for demonstration

  // Apply time filter multiplier
  const timeMultiplier = {
    '7days': 0.2,
    '30days': 1,
    '90days': 2.5,
    'year': 4,
    'custom': 1
  }[timeFilter] || 1

  // Apply product filter multiplier
  const productMultiplier = productFilter === 'all' ? 1 : 0.3

  // Apply region filter multiplier
  const regionMultiplier = regionFilter === 'all' ? 1 : 0.25

  // Calculate overall multiplier
  const multiplier = timeMultiplier * productMultiplier * regionMultiplier

  // Format currency function
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  }

  // Parse base values
  const baseTotalSales = parseInt(baseMetrics.totalSales.replace(/[^0-9]/g, ''));
  const baseAverageOrder = parseInt(baseMetrics.averageOrder.replace(/[^0-9]/g, ''));

  // Calculate new values
  const newTotalSales = formatCurrency(Math.round(baseTotalSales * multiplier));
  const newGrowth = `${(parseFloat(baseMetrics.growth) * multiplier).toFixed(1)}%`;

  // Customer numbers are affected less by filters
  const baseCustomers = parseInt(baseMetrics.customers.replace(/[^0-9]/g, ''));
  const newCustomers = Math.round(baseCustomers * Math.sqrt(multiplier)).toString();
  const newCustomersChange = `+${Math.round(parseInt(baseMetrics.newCustomers.replace(/\+/g, '')) * Math.sqrt(multiplier))}`;

  const newAverageOrder = formatCurrency(Math.round(baseAverageOrder * (multiplier * 0.8 + 0.2)));
  const baseConversion = parseFloat(baseMetrics.conversion);
  const newConversion = `${(baseConversion * (multiplier * 0.3 + 0.7)).toFixed(1)}%`;

  return {
    totalSales: newTotalSales,
    growth: newGrowth,
    customers: newCustomers,
    newCustomers: newCustomersChange,
    averageOrder: newAverageOrder,
    conversion: newConversion
  };
}

// Filter recent sales data
export function filterRecentSales(
  data: RecentSaleData[],
  timeFilter: TimeFilter,
  productFilter: ProductFilter,
  regionFilter: RegionFilter
): RecentSaleData[] {
  // For this demo, we'll just return different subsets of data based on time filter
  // In a real app, you'd filter based on actual date relationships
  switch (timeFilter) {
    case '7days':
      return data.slice(0, 2); // Only most recent sales
    case '30days':
      return data; // All sales
    case '90days':
      return data; // All sales
    case 'year':
      return data; // All sales
    default:
      return data;
  }
} 