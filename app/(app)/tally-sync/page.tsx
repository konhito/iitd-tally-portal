"use client"

import * as React from "react"
import {
  IconRefresh,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconAlertTriangleFilled,
  IconLoader2,
  IconDatabase,
  IconClockHour4,
  IconFileSpreadsheet,
  IconWifi,
} from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ─── MOCK SYNC LOG DATA ────────────────────────────────────────────────────

type SyncStatus = "success" | "failed" | "warning" | "syncing"

interface SyncLog {
  id: string
  timestamp: string
  duration: string
  status: SyncStatus
  company: string
  records: {
    ledgers: number
    vouchers: number
    costCentres: number
    groups: number
  }
  message: string
  details?: string[]
}

const syncLogs: SyncLog[] = [
  {
    id: "sync-018",
    timestamp: "2026-04-21 11:30:00",
    duration: "3.2s",
    status: "success",
    company: "IITD Research Accounts",
    records: { ledgers: 248, vouchers: 1820, costCentres: 34, groups: 42 },
    message: "Full sync completed successfully.",
    details: [
      "Fetched 248 ledgers from Tally XML API",
      "Fetched 1820 vouchers (Apr 2025 – Apr 2026)",
      "Fetched 34 cost centres",
      "Fetched 42 ledger groups",
    ],
  },
  {
    id: "sync-017",
    timestamp: "2026-04-21 08:00:01",
    duration: "2.9s",
    status: "success",
    company: "IITD Research Accounts",
    records: { ledgers: 248, vouchers: 1818, costCentres: 34, groups: 42 },
    message: "Full sync completed successfully.",
    details: [],
  },
  {
    id: "sync-016",
    timestamp: "2026-04-20 20:00:00",
    duration: "4.1s",
    status: "warning",
    company: "IITD Research Accounts",
    records: { ledgers: 247, vouchers: 1810, costCentres: 34, groups: 42 },
    message: "Sync completed with warnings.",
    details: [
      "1 ledger skipped — malformed XML node at position 247",
      "All vouchers synced successfully",
    ],
  },
  {
    id: "sync-015",
    timestamp: "2026-04-20 14:00:00",
    duration: "1.1s",
    status: "failed",
    company: "IITD Research Accounts",
    records: { ledgers: 0, vouchers: 0, costCentres: 0, groups: 0 },
    message: "Connection refused — Tally not running on port 9000.",
    details: [
      "TCP connection to 127.0.0.1:9000 failed",
      "Ensure Tally Prime is running and XML API is enabled",
    ],
  },
  {
    id: "sync-014",
    timestamp: "2026-04-20 08:00:00",
    duration: "3.4s",
    status: "success",
    company: "IITD Research Accounts",
    records: { ledgers: 247, vouchers: 1795, costCentres: 34, groups: 42 },
    message: "Full sync completed successfully.",
    details: [],
  },
  {
    id: "sync-013",
    timestamp: "2026-04-19 20:00:00",
    duration: "3.0s",
    status: "success",
    company: "IITD Research Accounts",
    records: { ledgers: 247, vouchers: 1785, costCentres: 34, groups: 42 },
    message: "Full sync completed successfully.",
    details: [],
  },
  {
    id: "sync-012",
    timestamp: "2026-04-19 14:00:00",
    duration: "5.8s",
    status: "warning",
    company: "IITD Research Accounts",
    records: { ledgers: 246, vouchers: 1780, costCentres: 33, groups: 42 },
    message: "Partial sync — cost centre data incomplete.",
    details: [
      "1 cost centre returned empty node — skipped",
      "Remaining records synced successfully",
    ],
  },
  {
    id: "sync-011",
    timestamp: "2026-04-19 08:00:00",
    duration: "3.1s",
    status: "success",
    company: "IITD Research Accounts",
    records: { ledgers: 246, vouchers: 1772, costCentres: 33, groups: 42 },
    message: "Full sync completed successfully.",
    details: [],
  },
]

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<SyncStatus, {
  label: string
  icon: React.ElementType
  badge: string
  dot: string
}> = {
  success: {
    label: "Success",
    icon: IconCircleCheckFilled,
    badge: "bg-green-500/10 text-green-600",
    dot: "bg-green-500",
  },
  warning: {
    label: "Warning",
    icon: IconAlertTriangleFilled,
    badge: "bg-amber-500/10 text-amber-600",
    dot: "bg-amber-500",
  },
  failed: {
    label: "Failed",
    icon: IconCircleXFilled,
    badge: "bg-red-500/10 text-red-600",
    dot: "bg-red-500",
  },
  syncing: {
    label: "Syncing…",
    icon: IconLoader2,
    badge: "bg-blue-500/10 text-blue-600",
    dot: "bg-blue-500",
  },
}

function SyncStatusBadge({ status }: { status: SyncStatus }) {
  const cfg = STATUS_CONFIG[status]
  const Icon = cfg.icon
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full", cfg.badge)}>
      <Icon className={cn("size-3", status === "syncing" && "animate-spin")} />
      {cfg.label}
    </span>
  )
}

function SyncLogRow({ log }: { log: SyncLog }) {
  const [expanded, setExpanded] = React.useState(false)
  const hasDetails = log.details && log.details.length > 0

  return (
    <div className="border rounded-xl overflow-hidden transition-all">
      <button
        onClick={() => hasDetails && setExpanded(p => !p)}
        className={cn(
          "w-full text-left px-4 py-3 flex items-start gap-4 hover:bg-muted/40 transition-colors",
          !hasDetails && "cursor-default"
        )}
      >
        {/* Status dot */}
        <div className="flex items-center pt-1 shrink-0">
          <span className={cn("size-2 rounded-full", STATUS_CONFIG[log.status].dot)} />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-foreground font-mono">{log.id}</span>
            <SyncStatusBadge status={log.status} />
            <span className="text-xs text-muted-foreground ml-auto hidden sm:block">{log.timestamp}</span>
          </div>
          <p className="text-xs text-muted-foreground">{log.message}</p>
          <span className="text-xs text-muted-foreground sm:hidden">{log.timestamp}</span>
        </div>

        {/* Right metadata */}
        <div className="shrink-0 text-right hidden md:block">
          <div className="text-xs text-muted-foreground">{log.duration}</div>
          {log.records.vouchers > 0 && (
            <div className="text-xs text-muted-foreground">{log.records.vouchers.toLocaleString()} vouchers</div>
          )}
        </div>

        {hasDetails && (
          <div className="shrink-0 text-muted-foreground text-xs pt-0.5">
            {expanded ? "▲" : "▼"}
          </div>
        )}
      </button>

      {expanded && hasDetails && (
        <div className="px-4 pb-3 pt-1 bg-muted/30 border-t space-y-1">
          {log.records.vouchers > 0 && (
            <div className="flex gap-6 flex-wrap mb-2">
              {[
                ["Ledgers", log.records.ledgers],
                ["Vouchers", log.records.vouchers],
                ["Cost Centres", log.records.costCentres],
                ["Groups", log.records.groups],
              ].map(([label, val]) => (
                <div key={label as string} className="text-xs">
                  <span className="text-muted-foreground">{label}: </span>
                  <span className="font-semibold">{(val as number).toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
          {log.details!.map((d, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="shrink-0 mt-0.5">›</span>
              <span>{d}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────

const latestLog = syncLogs[0]

export default function TallySyncPage() {
  const [isSyncing, setIsSyncing] = React.useState(false)

  const handleManualSync = () => {
    setIsSyncing(true)
    setTimeout(() => setIsSyncing(false), 3000)
  }

  const successCount = syncLogs.filter(l => l.status === "success").length
  const failedCount = syncLogs.filter(l => l.status === "failed").length
  const warnCount = syncLogs.filter(l => l.status === "warning").length

  return (
    <div className="flex-1 space-y-6 p-6 md:p-10 pt-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tally Sync</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            XML API sync logs between this dashboard and Tally Prime (127.0.0.1:9000)
          </p>
        </div>
        <Button onClick={handleManualSync} disabled={isSyncing} className="self-start md:self-auto">
          <IconRefresh className={cn("mr-2 size-4", isSyncing && "animate-spin")} />
          {isSyncing ? "Syncing…" : "Sync Now"}
        </Button>
      </div>

      {/* KPI STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Last Sync",
            value: latestLog.timestamp.split(" ")[1],
            sub: latestLog.timestamp.split(" ")[0],
            icon: IconClockHour4,
          },
          {
            label: "Successful (last 8)",
            value: successCount,
            sub: `${Math.round((successCount / syncLogs.length) * 100)}% success rate`,
            icon: IconCircleCheckFilled,
          },
          {
            label: "Warnings",
            value: warnCount,
            sub: "Partial syncs",
            icon: IconAlertTriangleFilled,
          },
          {
            label: "Failed",
            value: failedCount,
            sub: "Connection errors",
            icon: IconCircleXFilled,
          },
        ].map(({ label, value, sub, icon: Icon }) => (
          <Card key={label} className="shadow-none border-border/60">
            <CardHeader className="pb-1 pt-4 px-4 flex flex-row items-center gap-2">
              <Icon className="size-4 text-muted-foreground" />
              <CardTitle className="text-xs font-medium text-muted-foreground">{label}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      {/* CONNECTION STATUS */}
      <div className="flex items-center gap-3 p-4 rounded-xl border bg-muted/30">
        <IconWifi className="size-5 text-green-500 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold">Tally Prime — Connected</p>
          <p className="text-xs text-muted-foreground">XML API · 127.0.0.1:9000 · Company: IITD Research Accounts</p>
        </div>
        <Badge className="bg-green-500/10 text-green-600 text-xs">Online</Badge>
      </div>

      {/* SYNC LOGS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Sync History</p>
          <span className="text-xs text-muted-foreground">{syncLogs.length} entries · click a row to expand details</span>
        </div>
        <div className="space-y-2">
          {syncLogs.map(log => (
            <SyncLogRow key={log.id} log={log} />
          ))}
        </div>
      </div>

    </div>
  )
}
