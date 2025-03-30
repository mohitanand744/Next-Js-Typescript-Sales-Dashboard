import { NotificationItem } from "@/components/ui/notification";

export const sampleNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "New order placed",
    message: "A new order (#12345) was placed by John Doe",
    time: "Just now",
    read: false
  },
  {
    id: "2",
    title: "Sales target achieved",
    message: "You've reached 80% of your monthly sales target",
    time: "2 hours ago",
    read: false
  },
  {
    id: "3",
    title: "Product inventory low",
    message: "Premium headphones (SKU: HD-100) inventory is below threshold",
    time: "5 hours ago",
    read: false
  },
  {
    id: "4",
    title: "New customer signup",
    message: "Sarah Wilson has registered as a new customer",
    time: "Yesterday",
    read: true
  },
  {
    id: "5",
    title: "Weekly report available",
    message: "Your sales performance report for last week is ready",
    time: "2 days ago",
    read: true
  }
]; 