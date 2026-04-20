"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { ShieldCheck, ShieldX, ExternalLink } from "lucide-react"
import { Share, Download, RefreshCw, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"
import { verifyShareToken, PROJECT_NAMES } from "@/lib/share-token"
import { projectData } from "@/app/(app)/projects/[id]/mock-data"
import {
  MonthlyIncomeExpenseChart,
  CumulativeSpendChart,
  CostCenterDonutChart,
  MilestoneTracker,
  ExpenseTrendChart,
  PfmsWaterfallChart,
  TeamCostChart,
  ArAgingChart,
  GanttChart,
  RatiosPanel
} from "@/app/(app)/projects/[id]/components/project-charts"

const formatRupee = (value: number) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  return `₹${value.toLocaleString("en-IN")}`
}

export default function SharedProjectPage() {
  const { token } = useParams()
  const tokenStr = Array.isArray(token) ? token[0] : token ?? ""

  const verified = React.useMemo(() => verifyShareToken(tokenStr), [tokenStr])
  const [isExternalView, setIsExternalView] = React.useState(true) // default external on shared view

  if (!verified) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <div className="flex flex-col items-center gap-3 max-w-sm text-center">
          <ShieldX className="size-12 text-destructive" />
          <h1 className="text-2xl font-bold">Invalid or Expired Link</h1>
          <p className="text-muted-foreground text-sm">
            This share link is invalid or has been revoked. Please request a new link from the project owner.
          </p>
          <Badge variant="destructive">Access Denied</Badge>
        </div>
      </div>
    )
  }

  const { projectId } = verified
  const projectName = PROJECT_NAMES[projectId] ?? projectId
  const data = projectData

  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen bg-background">
      {/* Shared-view top bar — no sidebar, just branding + restricted notice */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 h-12">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-green-500" />
            <span className="text-sm font-semibold">IITD Tally Portal</span>
            <Separator orientation="vertical" className="h-4 mx-1" />
            <span className="text-xs text-muted-foreground">Shared View · Read Only</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs text-green-600 border-green-300 bg-green-50">
              <ShieldCheck className="mr-1 size-3" />
              Verified Access: {projectName}
            </Badge>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">{data.name}</h2>
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">{data.type}</Badge>
              <Badge
                variant={data.status === "On Track" ? "default" : "destructive"}
                className={data.status === "On Track" ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {data.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <span>{data.ministry}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>PI: {data.piName}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>{data.startDate} to {data.endDate}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Toggle
              aria-label="Toggle external view"
              pressed={isExternalView}
              onPressedChange={setIsExternalView}
              className="data-[state=on]:bg-amber-100 data-[state=on]:text-amber-900"
            >
              {isExternalView ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
              {isExternalView ? "External View" : "Internal View"}
            </Toggle>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Download className="mr-2 h-4 w-4" /> Export PDF
            </Button>
            <div className="text-xs text-muted-foreground flex items-center ml-2 border p-2 rounded-md bg-secondary/50">
              <RefreshCw className="mr-2 h-3 w-3" />
              Last Synced: {data.lastSynced}
            </div>
          </div>
        </div>

        <Separator />

        {/* KPI ROW */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Sanctioned Amt", value: formatRupee(data.kpi.sanctioned), color: "" },
            { label: "Funds Received", value: formatRupee(data.kpi.received), color: "text-green-600" },
            { label: "Total Expenses", value: formatRupee(data.kpi.expenses), color: "text-red-600" },
            { label: "Net Surplus", value: formatRupee(data.kpi.surplus), color: "" },
            { label: "Budget Utilisation", value: `${data.kpi.budgetUtil}%`, color: data.kpi.budgetUtil < 70 ? "text-green-500" : data.kpi.budgetUtil < 85 ? "text-amber-500" : "text-red-500" },
            { label: "Est. Completion", value: data.kpi.completionDate, color: "" },
          ].map(({ label, value, color }) => (
            <Card key={label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium">{label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-xl font-bold ${color}`}>{value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CHARTS GRID */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MonthlyIncomeExpenseChart data={data.monthlyIncomeExpense} />
          <CumulativeSpendChart data={data.cumulativeSpend} />
          <CostCenterDonutChart data={data.costCenters} />
          <MilestoneTracker data={data.milestones} />
          <ExpenseTrendChart data={data.expenseTrend} />
          {data.type === "GOV" && <PfmsWaterfallChart data={data.pfmsWaterfall} />}
          {/* Internal charts hidden in shared/external view */}
          {!isExternalView && (
            <>
              <TeamCostChart data={data.teamCost} />
              <RatiosPanel data={data.ratios} />
            </>
          )}
          {data.type === "GOV" && <ArAgingChart data={data.arAging} />}
          <div className="col-span-1 lg:col-span-4">
            <GanttChart data={data.timeline} />
          </div>
        </div>
      </main>
    </div>
  )
}
