"use client"

import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { useTheme } from "next-themes"

interface ProductPerformanceData {
  name: string
  sales: number
  profit: number
}

interface ProductPerformanceComponentProps {
  data: ProductPerformanceData[]
}

export function ProductPerformanceComponent({ data }: ProductPerformanceComponentProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke={isDark ? "#374151" : "#e5e7eb"}
        />
        <XAxis
          dataKey="name"
          stroke={isDark ? "#9ca3af" : "#6b7280"}
        />
        <YAxis
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
          formatter={(value) => [`$${value}`, ""]}
        />
        <Legend />
        <Bar radius={15} dataKey="sales" fill={isDark ? "#a78bfa" : "#8884d8"} name="Sales" />
        <Bar radius={15} dataKey="profit" fill={isDark ? "#6ee7b7" : "#82ca9d"} name="Profit" />
      </BarChart>
    </ResponsiveContainer>
  )
} 