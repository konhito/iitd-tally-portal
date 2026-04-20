"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { IconInfoCircle } from "@tabler/icons-react"

const monthlyRevenueData = [
  { month: "Apr", revenue: 28, trend: 26 },
  { month: "May", revenue: 18, trend: 22 },
  { month: "Jun", revenue: 32, trend: 30 },
  { month: "Jul", revenue: 42, trend: 35 },
  { month: "Aug", revenue: 38, trend: 37 },
  { month: "Sep", revenue: 45, trend: 40 },
  { month: "Oct", revenue: 40, trend: 42 },
  { month: "Nov", revenue: 48, trend: 44 },
  { month: "Dec", revenue: 35, trend: 41 },
  { month: "Jan", revenue: 30, trend: 38 },
  { month: "Feb", revenue: 36, trend: 37 },
  { month: "Mar", revenue: 50, trend: 45 },
]

const formatLakhs = (value: number) => `₹${value}L`

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background/95 backdrop-blur-sm px-3 py-2 shadow-xl">
        <p className="text-xs font-semibold text-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold text-foreground">{formatLakhs(entry.value)}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function GradientBarChart() {
  return (
    <Card className="@container/card overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Monthly Revenue Trend (FY 2024-25)
        </CardTitle>
        <CardAction>
          <IconInfoCircle className="size-4 text-muted-foreground" />
        </CardAction>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={monthlyRevenueData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                {/* Main bar gradient — amber/orange */}
                <linearGradient id="barGradientAmber" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
                  <stop offset="50%" stopColor="#d97706" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#92400e" stopOpacity={0.6} />
                </linearGradient>
                {/* Reflection gradient */}
                <linearGradient id="barReflection" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                fontSize={11}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={11}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={formatLakhs}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />

              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="url(#barGradientAmber)"
                radius={[6, 6, 0, 0]}
                barSize={28}
              />

              <Line
                dataKey="trend"
                name="Trend"
                type="monotone"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#3b82f6",
                  stroke: "#dbeafe",
                  strokeWidth: 2,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        {/* Reflection row */}
        <div className="h-[30px] w-full opacity-20 -mt-1 overflow-hidden" style={{ transform: "scaleY(-1)" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyRevenueData}
              margin={{ top: 0, right: 10, left: -10, bottom: 0 }}
            >
              <Bar
                dataKey="revenue"
                fill="url(#barReflection)"
                radius={[6, 6, 0, 0]}
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
