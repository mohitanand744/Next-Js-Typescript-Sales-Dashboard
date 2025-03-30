import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Sample data for our dashboard
export const revenueData = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2200 },
  { month: "Apr", revenue: 2500 },
  { month: "May", revenue: 2300 },
  { month: "Jun", revenue: 3000 },
  { month: "Jul", revenue: 2800 },
  { month: "Aug", revenue: 3200 },
  { month: "Sep", revenue: 3500 },
  { month: "Oct", revenue: 3700 },
  { month: "Nov", revenue: 3400 },
  { month: "Dec", revenue: 3900 },
]

export const productPerformance = [
  { name: "Product A", sales: 4000, profit: 2400 },
  { name: "Product B", sales: 3000, profit: 1398 },
  { name: "Product C", sales: 2000, profit: 9800 },
  { name: "Product D", sales: 2780, profit: 3908 },
  { name: "Product E", sales: 1890, profit: 4800 },
]

export const salesByRegion = [
  { name: "North America", value: 4000 },
  { name: "Europe", value: 3000 },
  { name: "Asia", value: 2000 },
  { name: "Australia", value: 1000 },
  { name: "Africa", value: 500 },
]

export const topCustomers = [
  { id: "1", name: "Jane Cooper", email: "jane@example.com", totalSpent: "$10,224" },
  { id: "2", name: "Wade Warren", email: "wade@example.com", totalSpent: "$8,797" },
  { id: "3", name: "Esther Howard", email: "esther@example.com", totalSpent: "$7,603" },
  { id: "4", name: "Cameron Williamson", email: "cameron@example.com", totalSpent: "$6,982" },
  { id: "5", name: "Brooklyn Simmons", email: "brooklyn@example.com", totalSpent: "$5,890" },
]

export const recentSales = [
  {
    id: "1",
    customer: "Jane Cooper",
    date: "Today, 11:30 AM",
    amount: "$430",
    avatar: "https://avatars.githubusercontent.com/u/124599?v=4"
  },
  {
    id: "2",
    customer: "Wade Warren",
    date: "Yesterday, 3:24 PM",
    amount: "$192",
    avatar: "https://avatars.githubusercontent.com/u/207941?v=4"
  },
  {
    id: "3",
    customer: "Esther Howard",
    date: "Mar 20, 9:15 AM",
    amount: "$290",
    avatar: "https://avatars.githubusercontent.com/u/67109815?v=4"
  },
  {
    id: "4",
    customer: "Cameron Williamson",
    date: "Mar 19, 2:45 PM",
    amount: "$125",
    avatar: "https://avatars.githubusercontent.com/u/70624517?v=4"
  },
  {
    id: "5",
    customer: "Brooklyn Simmons",
    date: "Mar 18, 10:30 AM",
    amount: "$214",
    avatar: "https://avatars.githubusercontent.com/u/75042455?v=4"
  },
]

export const salesMetrics = {
  totalSales: "$98,743",
  growth: "+12.3%",
  customers: "1,482",
  newCustomers: "+43",
  averageOrder: "$621",
  conversion: "3.2%"
} 