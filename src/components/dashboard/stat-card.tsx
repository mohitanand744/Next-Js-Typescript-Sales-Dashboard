"use client"

import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  description?: string
  trend?: {
    value: string
    isPositive: boolean
  }
  className?: string
}

export function StatCard({ title, value, icon, description, trend, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        <div className="p-2 text-3xl rounded-full bg-secondary/20 text-secondary-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={cn(
            "text-xs font-medium flex items-center mt-1",
            trend.isPositive ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
          )}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </p>
        )}
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
} 