"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import { IconInfoCircle, IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { GradientBarChart } from "@/components/gradient-bar-chart"
import { ExpenseKpiRow } from "@/components/expense-kpi-row"
import { useDateRange, DatePreset } from "@/components/providers/date-range-provider"
import { AnimatedNumber } from "@/components/animated-number"

// ─── FORMAT HELPERS ──────────────────────────────────────────────────────────

const formatRupee = (value: number) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`
  return `₹${value.toLocaleString("en-IN")}`
}

const formatCompact = (value: number) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  return `₹${value.toLocaleString("en-IN")}`
}

// ─── MOCK DATA ───────────────────────────────────────────────────────────────

const totalSalesGauge = {
  value: 323000000, // ₹3.23 Cr
  prevYear: 342000000, // ₹3.42 Cr  
  percentage: 65, // gauge needle position
}

const ratios = {
  currentRatio: 0.9,
  currentTarget: 1.5,
  quickRatio: 0.82,
  quickTarget: 1.0,
}

const profitLoss = {
  grossProfit: 2748000, // ₹27.48 L
  grossProfitPrev: 3072000, // ₹30.72 L
  grossProfitChange: -10.54,
  netProfit: 1986000, // ₹19.86 L
  netProfitPrev: 2131000, // ₹21.31 L
  netProfitChange: -6.78,
}

const incomeData = {
  total: 340000000, // ₹3.4 Cr
  prevYear: 339000000, // ₹3.39 Cr
  change: 5.14,
  monthly: [
    { month: "Apr", current: 18, prev: 16 },
    { month: "May", current: 22, prev: 18 },
    { month: "Jun", current: 30, prev: 25 },
    { month: "Jul", current: 35, prev: 28 },
    { month: "Aug", current: 28, prev: 32 },
    { month: "Sep", current: 32, prev: 30 },
    { month: "Oct", current: 38, prev: 25 },
    { month: "Nov", current: 42, prev: 35 },
    { month: "Dec", current: 35, prev: 38 },
    { month: "Jan", current: 28, prev: 30 },
    { month: "Feb", current: 30, prev: 26 },
    { month: "Mar", current: 38, prev: 28 },
  ],
}

const expenseData = {
  total: 4251000, // ₹42.51 L
  prevYear: 4290000, // ₹42.9 L
  change: 0.92,
  monthly: [
    { month: "Apr", current: 10, prev: 8 },
    { month: "May", current: 12, prev: 15 },
    { month: "Jun", current: 8, prev: 10 },
    { month: "Jul", current: 15, prev: 20 },
    { month: "Aug", current: 18, prev: 25 },
    { month: "Sep", current: 14, prev: 12 },
    { month: "Oct", current: 10, prev: 8 },
    { month: "Nov", current: 8, prev: 15 },
    { month: "Dec", current: 12, prev: 18 },
    { month: "Jan", current: 20, prev: 22 },
    { month: "Feb", current: 15, prev: 10 },
    { month: "Mar", current: 25, prev: 28 },
  ],
}

// ─── DATA BY PRESET ──────────────────────────────────────────────────────────

const DATA_BY_PRESET: Record<DatePreset, {
  income: typeof incomeData
  expense: typeof expenseData
  profitLoss: typeof profitLoss
  gaugeValue: number
}> = {
  "FY: April to March": {
    income: incomeData,
    expense: expenseData,
    profitLoss: profitLoss,
    gaugeValue: 65,
  },
  "Last 3 months": {
    income: {
      total: 96000000,
      prevYear: 87000000,
      change: 10.34,
      monthly: incomeData.monthly.slice(-3),
    },
    expense: {
      total: 1120000,
      prevYear: 1200000,
      change: -6.67,
      monthly: expenseData.monthly.slice(-3),
    },
    profitLoss: {
      grossProfit: 820000,
      grossProfitPrev: 760000,
      grossProfitChange: 7.89,
      netProfit: 610000,
      netProfitPrev: 570000,
      netProfitChange: 7.02,
    },
    gaugeValue: 72,
  },
  "Last 30 days": {
    income: {
      total: 32000000,
      prevYear: 29000000,
      change: 10.34,
      monthly: incomeData.monthly.slice(-1),
    },
    expense: {
      total: 380000,
      prevYear: 410000,
      change: -7.32,
      monthly: expenseData.monthly.slice(-1),
    },
    profitLoss: {
      grossProfit: 275000,
      grossProfitPrev: 240000,
      grossProfitChange: 14.58,
      netProfit: 198000,
      netProfitPrev: 172000,
      netProfitChange: 15.12,
    },
    gaugeValue: 78,
  },
  "Last 7 days": {
    income: {
      total: 8200000,
      prevYear: 7400000,
      change: 10.81,
      monthly: incomeData.monthly.slice(-1),
    },
    expense: {
      total: 94000,
      prevYear: 102000,
      change: -7.84,
      monthly: expenseData.monthly.slice(-1),
    },
    profitLoss: {
      grossProfit: 68000,
      grossProfitPrev: 59000,
      grossProfitChange: 15.25,
      netProfit: 49000,
      netProfitPrev: 42000,
      netProfitChange: 16.67,
    },
    gaugeValue: 82,
  },
  "Custom": {
    income: {
      total: 52000000,
      prevYear: 48000000,
      change: 8.33,
      monthly: incomeData.monthly.slice(-6),
    },
    expense: {
      total: 620000,
      prevYear: 680000,
      change: -8.82,
      monthly: expenseData.monthly.slice(-6),
    },
    profitLoss: {
      grossProfit: 460000,
      grossProfitPrev: 410000,
      grossProfitChange: 12.20,
      netProfit: 330000,
      netProfitPrev: 295000,
      netProfitChange: 11.86,
    },
    gaugeValue: 74,
  },
}

// Chart configs
const incomeChartConfig = {
  current: { label: "2024-25", color: "#10b981" },
  prev: { label: "2023-24", color: "#86efac" },
} satisfies ChartConfig

const expenseChartConfig = {
  current: { label: "2024-25", color: "#ef4444" },
  prev: { label: "2023-24", color: "#fca5a5" },
} satisfies ChartConfig

// ─── GAUGE COMPONENT (pure SVG) ──────────────────────────────────────────────

const GAUGE_SEGMENTS = [
  { pct: 0.30, color: "#22c55e" },
  { pct: 0.20, color: "#84cc16" },
  { pct: 0.15, color: "#eab308" },
  { pct: 0.15, color: "#f97316" },
  { pct: 0.20, color: "#ef4444" },
]

// Convert polar coords — angles in standard math (0°=right, 90°=up, 180°=left)
// SVG has y-axis flipped, so y = cy - r*sin(deg)
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) }
}

// Build a filled donut arc slice.
// Going from high angle (left) to low angle (right) over the top = clockwise in SVG (sweep=1)
function arcSlice(cx: number, cy: number, inner: number, outer: number, fromDeg: number, toDeg: number) {
  const o1 = polar(cx, cy, outer, fromDeg)
  const o2 = polar(cx, cy, outer, toDeg)
  const i1 = polar(cx, cy, inner, toDeg)
  const i2 = polar(cx, cy, inner, fromDeg)
  // fromDeg > toDeg (e.g. 180 → 126): arc spans less than 180°, large-arc=0
  const large = (fromDeg - toDeg) > 180 ? 1 : 0
  // In SVG with y-flipped: going from left(180°) → right(0°) over the top = clockwise = sweep=1
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${outer} ${outer} 0 ${large} 1 ${o2.x} ${o2.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${inner} ${inner} 0 ${large} 0 ${i2.x} ${i2.y}`,
    "Z",
  ].join(" ")
}

function GaugeChart({ value, label }: { value: number; label: string }) {
  const animatedValue = useCountUpRaw(value)

  const CX = 100, CY = 108
  const INNER = 48, OUTER = 70
  const GAP = 1.2 // degrees gap between adjacent segments

  // Compute boundary angles (180=left, 0=right)
  const bounds: number[] = [180]
  let a = 180
  for (const seg of GAUGE_SEGMENTS) {
    a -= seg.pct * 180
    bounds.push(a)
  }

  const paths = GAUGE_SEGMENTS.map((seg, i) => ({
    color: seg.color,
    d: arcSlice(
      CX, CY, INNER, OUTER,
      bounds[i] - (i === 0 ? 0 : GAP / 2),         // shrink left edge inward (except first)
      bounds[i + 1] + (i === GAUGE_SEGMENTS.length - 1 ? 0 : GAP / 2) // shrink right edge inward (except last)
    ),
  }))

  const needleDeg = 180 - (animatedValue / 100) * 180
  const tip = polar(CX, CY, OUTER - 14, needleDeg)

  return (
    <div className="w-full flex flex-col items-center">
      <svg viewBox="0 0 200 115" className="w-full max-w-[190px]">
        {paths.map((p, i) => <path key={i} d={p.d} fill={p.color} />)}
        <line x1={CX} y1={CY} x2={tip.x} y2={tip.y}
          stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
          className="text-foreground" />
        <circle cx={CX} cy={CY} r={5} className="fill-foreground" />
        <circle cx={CX} cy={CY} r={2.5} className="fill-background" />
      </svg>
      <span className="text-xs text-muted-foreground font-medium -mt-3">{label}</span>
    </div>
  )
}

// Raw count-up hook (returns number, not formatted string)
function useCountUpRaw(target: number, duration = 700) {
  const [val, setVal] = React.useState(target)
  const rafRef = React.useRef<number | null>(null)
  const startRef = React.useRef<number | null>(null)
  const fromRef = React.useRef(target)

  React.useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const from = fromRef.current
    startRef.current = null

    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const t = Math.min((ts - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(2, -10 * t)
      const next = from + (target - from) * eased
      setVal(next)
      fromRef.current = next
      if (t < 1) rafRef.current = requestAnimationFrame(step)
      else { setVal(target); fromRef.current = target }
    }
    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  return val
}

// ─── MAIN CEO DASHBOARD ──────────────────────────────────────────────────────

export function CeoDashboard() {
  const { activePreset } = useDateRange()
  const d = DATA_BY_PRESET[activePreset] ?? DATA_BY_PRESET["FY: April to March"]
  const { income, expense, profitLoss: pl, gaugeValue } = d

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your financial performance</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>Last Sync: <strong className="text-foreground">Apr 20, 2026</strong></span>
          <Badge variant="outline" className="text-xs">Currency: INR ₹</Badge>
        </div>
      </div>

      {/* TOP ROW — 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* ─── TOTAL SALES (YTD) ─── */}
        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Revenue (YTD)
            </CardTitle>
            <CardAction>
              <IconInfoCircle className="size-4 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between mb-2">
              <div className="text-3xl font-bold tracking-tight">
                <AnimatedNumber value={income.total} format={formatRupee} />
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-muted-foreground">
                  {formatRupee(income.prevYear)}
                </div>
                <div className="text-xs text-muted-foreground">(PYTD: 2023-24)</div>
              </div>
            </div>
            <GaugeChart value={gaugeValue} label={formatCompact(income.total)} />
          </CardContent>
        </Card>

        {/* ─── CURRENT & QUICK RATIO ─── */}
        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Current & Quick Ratio
            </CardTitle>
            <CardAction>
              <IconInfoCircle className="size-4 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {/* Current Ratio */}
            <div className="space-y-2">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold">
                Current Ratio
              </Badge>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">{ratios.currentRatio} : 1</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{ratios.currentTarget} : 1</span>
                  <span className="text-red-500">●</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Target: 1.5 or higher</p>
            </div>
            {/* Quick Ratio */}
            <div className="space-y-2">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold">
                Quick Ratio
              </Badge>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">{ratios.quickRatio} : 1</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{ratios.quickTarget} : 1</span>
                  <span className="text-red-500">●</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Target: 1 or higher</p>
            </div>
          </CardContent>
        </Card>

        {/* ─── PROFIT & LOSS ─── */}
        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Profit & Loss
            </CardTitle>
            <CardAction>
              <IconInfoCircle className="size-4 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {/* Gross Profit */}
            <div className="space-y-1">
              <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 text-xs font-semibold">
                Gross Profit
              </Badge>
              <div className="flex items-start justify-between mt-2">
                <span className="text-2xl font-bold">
                  <AnimatedNumber value={pl.grossProfit} format={formatRupee} />
                </span>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <span className={cn("font-bold", pl.grossProfitChange < 0 ? "text-red-500" : "text-green-500")}>
                      {pl.grossProfitChange}%
                    </span>
                    {pl.grossProfitChange < 0 ? (
                      <IconTrendingDown className="size-4 text-red-500" />
                    ) : (
                      <IconTrendingUp className="size-4 text-green-500" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCompact(pl.grossProfitPrev)}
                  </div>
                  <div className="text-[10px] text-muted-foreground">(PYTD: 2023-24)</div>
                </div>
              </div>
            </div>
            {/* Net Profit */}
            <div className="space-y-1">
              <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 text-xs font-semibold">
                Net Profit
              </Badge>
              <div className="flex items-start justify-between mt-2">
                <span className="text-2xl font-bold">
                  <AnimatedNumber value={pl.netProfit} format={formatRupee} />
                </span>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <span className={cn("font-bold", pl.netProfitChange < 0 ? "text-red-500" : "text-green-500")}>
                      {pl.netProfitChange}%
                    </span>
                    {pl.netProfitChange < 0 ? (
                      <IconTrendingDown className="size-4 text-red-500" />
                    ) : (
                      <IconTrendingUp className="size-4 text-green-500" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCompact(pl.netProfitPrev)}
                  </div>
                  <div className="text-[10px] text-muted-foreground">(PYTD: 2023-24)</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BOTTOM ROW — 2 chart cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* ─── INCOME CHART ─── */}
        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Income
            </CardTitle>
            <CardAction>
              <IconInfoCircle className="size-4 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-2xl font-bold">
                  <AnimatedNumber value={income.total} format={formatRupee} />
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-bold text-green-500">{income.change}%</span>
                  <IconTrendingUp className="size-4 text-green-500" />
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatCompact(income.prevYear)}
                </div>
                <div className="text-[10px] text-muted-foreground">(PYTD: 2023-24)</div>
              </div>
            </div>
            <ChartContainer config={incomeChartConfig} className="aspect-auto h-[200px] w-full">
              <AreaChart data={income.monthly}>
                <defs>
                  <linearGradient id="fillIncomeCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-current)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-current)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} fontSize={11} />
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <ChartLegend content={<ChartLegendContent payload={[]} />} />
                <Area type="monotone" dataKey="current" stroke="var(--color-current)" fill="url(#fillIncomeCurrent)" strokeWidth={2} />
                <Area type="monotone" dataKey="prev" stroke="var(--color-prev)" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* ─── EXPENSE CHART ─── */}
        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Expense
            </CardTitle>
            <CardAction>
              <IconInfoCircle className="size-4 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-2xl font-bold">
                  <AnimatedNumber value={expense.total} format={formatRupee} />
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-bold text-green-500">{expense.change}%</span>
                  <IconTrendingDown className="size-4 text-green-500" />
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatCompact(expense.prevYear)}
                </div>
                <div className="text-[10px] text-muted-foreground">(PYTD: 2023-24)</div>
              </div>
            </div>
            <ChartContainer config={expenseChartConfig} className="aspect-auto h-[200px] w-full">
              <AreaChart data={expense.monthly}>
                <defs>
                  <linearGradient id="fillExpenseCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-current)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-current)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} fontSize={11} />
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <ChartLegend content={<ChartLegendContent payload={[]} />} />
                <Area type="monotone" dataKey="current" stroke="var(--color-current)" fill="url(#fillExpenseCurrent)" strokeWidth={2} />
                <Area type="monotone" dataKey="prev" stroke="var(--color-prev)" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* GRADIENT BAR CHART — Monthly Revenue Trend */}
      <GradientBarChart />

      {/* EXPENSE KPI ROW — Quarterly Expense, Trend, Top Groups */}
      <ExpenseKpiRow />
    </div>
  )
}
