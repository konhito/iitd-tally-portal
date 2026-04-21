"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Share, Download, RefreshCw, Copy, CheckCheck, Link2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { projectData } from "./mock-data"
import {
  MonthlyIncomeExpenseChart,
  CumulativeSpendChart,
  CostCenterDonutChart,
  ExpenseTrendChart,
  ArAgingChart,
  RatiosPanel
} from "./components/project-charts"
import { generateShareToken, PROJECT_NAMES } from "@/lib/share-token"
import { ExpenseKpiRow } from "@/components/expense-kpi-row"
import { AnimatedNumber } from "@/components/animated-number"

const formatRupee = (value: number) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

function SharePopover({ projectId }: { projectId: string }) {
  const [copied, setCopied] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const shareUrl = React.useMemo(() => {
    if (typeof window === "undefined") return ""
    const token = generateShareToken(projectId)
    return `${window.location.origin}/shared/${token}`
  }, [projectId])

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Share className="mr-2 h-4 w-4" /> Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold">Share Project View</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Anyone with this link can view <strong>{PROJECT_NAMES[projectId] ?? projectId}</strong> only.
              They won't see other projects or the main dashboard.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-2 py-1.5">
            <Link2 className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="text-xs text-muted-foreground truncate flex-1 font-mono">{shareUrl}</span>
          </div>
          <Button className="w-full h-8 text-sm" onClick={copyLink} variant={copied ? "outline" : "default"}>
            {copied ? (
              <><CheckCheck className="mr-2 size-4 text-green-500" /> Copied!</>
            ) : (
              <><Copy className="mr-2 size-4" /> Copy Link</>
            )}
          </Button>
          <p className="text-[11px] text-muted-foreground text-center">
            🔒 Restricted access — project data only
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default function ProjectPage() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? ""

  const data = projectData

  const handlePrint = () => window.print()

  return (
    <div className="flex-1 space-y-8 p-6 md:p-10 pt-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-3xl font-bold tracking-tight">{data.name}</h2>
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
            <span>{data.ministry}</span>
            {data.type === "GOV" && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <span className="font-medium text-foreground">{data.pfmsAccount}</span>
              </>
            )}
            <Separator orientation="vertical" className="h-4" />
            <span>PI: {data.piName}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>{data.startDate} to {data.endDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <SharePopover projectId={id} />
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
          <div className="text-xs text-muted-foreground flex items-center border px-3 py-2 rounded-md bg-secondary/50">
            <RefreshCw className="mr-2 h-3 w-3" />
            Last Synced: {data.lastSynced}
          </div>
        </div>
      </div>

      <Separator />

      {/* KPI ROW */}
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Financial Overview</p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-1 pt-5 px-5">
              <CardTitle className="text-xs font-medium text-muted-foreground">Sanctioned Amt</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="text-2xl font-bold tracking-tight">
                <AnimatedNumber value={data.kpi.sanctioned} format={(v) => {
                  if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`
                  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`
                  return `₹${Math.round(v).toLocaleString('en-IN')}`
                }} />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-1 pt-5 px-5">
              <CardTitle className="text-xs font-medium text-muted-foreground">Funds Received</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="text-2xl font-bold tracking-tight text-green-600">
                <AnimatedNumber value={data.kpi.received} format={(v) => {
                  if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`
                  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`
                  return `₹${Math.round(v).toLocaleString('en-IN')}`
                }} />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-1 pt-5 px-5">
              <CardTitle className="text-xs font-medium text-muted-foreground">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="text-2xl font-bold tracking-tight text-red-600">
                <AnimatedNumber value={data.kpi.expenses} format={(v) => {
                  if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`
                  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`
                  return `₹${Math.round(v).toLocaleString('en-IN')}`
                }} />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-1 pt-5 px-5">
              <CardTitle className="text-xs font-medium text-muted-foreground">Net Surplus</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="text-2xl font-bold tracking-tight">
                <AnimatedNumber value={data.kpi.surplus} format={(v) => {
                  if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`
                  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`
                  return `₹${Math.round(v).toLocaleString('en-IN')}`
                }} />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-1 pt-5 px-5">
              <CardTitle className="text-xs font-medium text-muted-foreground">Budget Utilisation</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className={`text-2xl font-bold tracking-tight ${data.kpi.budgetUtil < 70 ? 'text-green-500' :
                  data.kpi.budgetUtil < 85 ? 'text-amber-500' : 'text-red-500'
                }`}>
                <AnimatedNumber value={data.kpi.budgetUtil} format={(v) => `${v.toFixed(1)}%`} />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-1 pt-5 px-5">
              <CardTitle className="text-xs font-medium text-muted-foreground">Est. Completion</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="text-2xl font-bold tracking-tight">{data.kpi.completionDate}</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* EXPENSE KPI ROW — Quarterly Expense, Expense Trend, Top 10 Groups */}
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Expense Breakdown</p>
        <ExpenseKpiRow />
      </section>

      {/* CHARTS GRID */}
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Analytics</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MonthlyIncomeExpenseChart data={data.monthlyIncomeExpense} />
          <CumulativeSpendChart data={data.cumulativeSpend} />
          <CostCenterDonutChart data={data.costCenters} />
          <ExpenseTrendChart data={data.expenseTrend} />
          <RatiosPanel data={data.ratios} />
          {/* {data.type === "GOV" && <ArAgingChart data={data.arAging} />} */}
        </div>
      </section>
    </div>
  )
}
