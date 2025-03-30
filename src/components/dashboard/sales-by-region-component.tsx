"use client"

import React from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts"
import { useTheme } from "next-themes"

interface SalesByRegionData {
  name: string
  value: number
}

interface SalesByRegionComponentProps {
  data: SalesByRegionData[]
}

// Colors for both light and dark modes
const COLORS_LIGHT = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];
const COLORS_DARK = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function SalesByRegionComponent({ data }: SalesByRegionComponentProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const COLORS = isDark ? COLORS_DARK : COLORS_LIGHT;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`$${value}`, ""]}
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            border: `1px solid ${isDark ? "#374151" : "#e2e8f0"}`,
            borderRadius: "6px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            color: isDark ? "#f9fafb" : "#111827",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
} 