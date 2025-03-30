"use client"

import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { useTheme } from "next-themes"

interface RevenueData {
  month: string
  revenue: number
}

interface RevenueChartComponentProps {
  data: RevenueData[]
}

export function RevenueChartComponent({ data }: RevenueChartComponentProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke={isDark ? "#374151" : "#e5e7eb"}
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          padding={{ left: 10, right: 10 }}
          stroke={isDark ? "#9ca3af" : "#6b7280"}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
          stroke={isDark ? "#9ca3af" : "#6b7280"}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            border: `1px solid ${isDark ? "#374151" : "#e2e8f0"}`,
            borderRadius: "6px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            color: isDark ? "#f9fafb" : "#111827",
          }}
          formatter={(value) => [`$${value}`, "Revenue"]}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke={isDark ? "#a78bfa" : "#8884d8"}
          fillOpacity={0.3}
          fill={isDark ? "rgba(167, 139, 250, 0.3)" : "rgba(136, 132, 216, 0.3)"}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
} 