"use client"

import * as React from "react"
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { IconInfoCircle } from "@tabler/icons-react"

// ─── FORMAT HELPERS ──────────────────────────────────────────────────────────

const formatLakhs = (value: number) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(0)} L`
  return `₹${value.toLocaleString("en-IN")}`
}

// ─── DEFAULT MOCK DATA ───────────────────────────────────────────────────────

const defaultQuarterlyExpense = {
  current: [
    { name: "Q1", value: 35, color: "#991b1b" },
    { name: "Q2", value: 30, color: "#dc2626" },
    { name: "Q3", value: 20, color: "#f87171" },
    { name: "Q4", value: 15, color: "#fca5a5" },
  ],
  prev: [
    { name: "Q1", value: 28, color: "#991b1b" },
    { name: "Q2", value: 32, color: "#dc2626" },
    { name: "Q3", value: 22, color: "#f87171" },
    { name: "Q4", value: 18, color: "#fca5a5" },
  ],
}

const defaultExpenseTrend = [
  { month: "Apr", current: 22, prev: 18 },
  { month: "May", current: 25, prev: 20 },
  { month: "Jun", current: 28, prev: 25 },
  { month: "Jul", current: 30, prev: 32 },
  { month: "Aug", current: 25, prev: 28 },
  { month: "Sep", current: 18, prev: 22 },
  { month: "Oct", current: 10, prev: 25 },
  { month: "Nov", current: 22, prev: 20 },
  { month: "Dec", current: 28, prev: 24 },
  { month: "Jan", current: 25, prev: 18 },
  { month: "Feb", current: 20, prev: 15 },
  { month: "Mar", current: 24, prev: 22 },
]

const defaultTopExpenseGroups = [
  { name: "Direct Expenses", current: 9800000, prev: 8500000 },
  { name: "Indirect Expenses", current: 7200000, prev: 6800000 },
]

// ─── TOOLTIP ─────────────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background/95 backdrop-blur-sm px-3 py-2 shadow-xl text-xs">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold text-foreground">
              {typeof entry.value === "number" && entry.value > 1000
                ? formatLakhs(entry.value)
                : `₹${entry.value}L`}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

// ─── COMPONENT PROPS ─────────────────────────────────────────────────────────

interface ExpenseKpiRowProps {
  quarterlyExpense?: typeof defaultQuarterlyExpense
  expenseTrend?: typeof defaultExpenseTrend
  topExpenseGroups?: typeof defaultTopExpenseGroups
  currentLabel?: string
  prevLabel?: string
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function ExpenseKpiRow({
  quarterlyExpense = defaultQuarterlyExpense,
  expenseTrend = defaultExpenseTrend,
  topExpenseGroups = defaultTopExpenseGroups,
  currentLabel = "2024-25",
  prevLabel = "2023-24",
}: ExpenseKpiRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* ─── QUARTERLY EXPENSE (Nested Donut) ─── */}
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Quarterly Expense
          </CardTitle>
          <CardAction>
            <IconInfoCircle className="size-4 text-muted-foreground" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                {/* Outer ring = current year */}
                <Pie
                  data={quarterlyExpense.current}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {quarterlyExpense.current.map((entry, index) => (
                    <Cell key={`outer-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                {/* Inner ring = previous year */}
                <Pie
                  data={quarterlyExpense.prev}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                  opacity={0.6}
                >
                  {quarterlyExpense.prev.map((entry, index) => (
                    <Cell key={`inner-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center labels */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-[10px] text-muted-foreground">{prevLabel}</div>
                <div className="text-[10px] text-muted-foreground font-semibold">{currentLabel}</div>
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
            {quarterlyExpense.current.map((q) => (
              <div key={q.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: q.color }} />
                <span>{q.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ─── EXPENSE TREND (Line Chart) ─── */}
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Expense Trend
          </CardTitle>
          <CardAction>
            <IconInfoCircle className="size-4 text-muted-foreground" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={expenseTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="expTrendCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={10} />
                <YAxis tickLine={false} axisLine={false} fontSize={10} tickFormatter={(v) => `${v} L`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconSize={8}
                  wrapperStyle={{ fontSize: "11px" }}
                  formatter={(value: string) => (
                    <span className="text-muted-foreground text-xs">{value}</span>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="current"
                  name={currentLabel}
                  stroke="#dc2626"
                  strokeWidth={2}
                  fill="url(#expTrendCurrent)"
                />
                <Area
                  type="monotone"
                  dataKey="prev"
                  name={prevLabel}
                  stroke="#fca5a5"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ─── TOP EXPENSE GROUPS (Grouped Bar) ─── */}
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Top 10 Expense Groups
          </CardTitle>
          <CardAction>
            <IconInfoCircle className="size-4 text-muted-foreground" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topExpenseGroups} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={10} />
                <YAxis tickLine={false} axisLine={false} fontSize={10} tickFormatter={(v) => formatLakhs(v)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconSize={8}
                  wrapperStyle={{ fontSize: "11px" }}
                  formatter={(value: string) => (
                    <span className="text-muted-foreground text-xs">{value}</span>
                  )}
                />
                <Bar dataKey="prev" name={prevLabel} fill="#fca5a5" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="current" name={currentLabel} fill="#dc2626" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
