"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { useDateRange, DatePreset } from "@/components/providers/date-range-provider"

const PRESETS: { label: DatePreset }[] = [
  { label: "FY: April to March" },
  { label: "Last 3 months" },
  { label: "Last 30 days" },
  { label: "Last 7 days" },
]

export function DateRangePicker({ className }: { className?: string }) {
  const { dateRange, activePreset, setActivePreset, setDateRange } = useDateRange()
  const [open, setOpen] = React.useState(false)
  const [calMonth, setCalMonth] = React.useState<Date>(dateRange?.from ?? new Date())
  const [pendingRange, setPendingRange] = React.useState<DateRange | undefined>(undefined)

  // Sync calendar month when preset changes
  React.useEffect(() => {
    if (dateRange?.from) setCalMonth(dateRange.from)
  }, [dateRange?.from])

  const label = React.useMemo(() => {
    if (activePreset !== "Custom") return activePreset
    if (!dateRange?.from) return "Select range"
    if (dateRange.to) {
      return `${format(dateRange.from, "dd MMM yy")} – ${format(dateRange.to, "dd MMM yy")}`
    }
    return format(dateRange.from, "dd MMM yyyy")
  }, [dateRange, activePreset])

  function handlePreset(preset: DatePreset) {
    setActivePreset(preset)
    setPendingRange(undefined)
    setOpen(false)
  }

  function handleCalendarSelect(range: DateRange | undefined) {
    setPendingRange(range)
    // Don't close — wait for Apply
  }

  function handleApply() {
    if (pendingRange?.from) {
      setDateRange(pendingRange)
      setActivePreset("Custom")
    }
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={(o) => { setOpen(o); if (!o) setPendingRange(undefined) }}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-1.5 text-xs font-medium border-dashed hover:border-primary/50 hover:bg-primary/5 transition-all",
            open && "border-primary bg-primary/5",
            className
          )}
        >
          <CalendarIcon className="size-3.5 text-muted-foreground" />
          <span className="max-w-[180px] truncate">{label}</span>
          <ChevronDown className={cn("size-3 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 shadow-xl border"
        align="end"
        sideOffset={6}
        avoidCollisions
      >
        <div className="flex divide-x">
          {/* Presets column */}
          <div className="flex flex-col gap-0.5 p-3 min-w-[165px]">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
              Quick Select
            </p>
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => handlePreset(p.label)}
                className={cn(
                  "text-left text-sm px-2 py-1.5 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                  activePreset === p.label && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground font-medium"
                )}
              >
                {p.label}
              </button>
            ))}
            <Separator className="my-2" />
            <button
              onClick={() => setActivePreset("Custom")}
              className={cn(
                "text-left text-sm px-2 py-1.5 rounded-md transition-colors hover:bg-accent",
                activePreset === "Custom" && "bg-accent font-medium"
              )}
            >
              Custom range ↓
            </button>
          </div>

          {/* Calendar column */}
          <div className="flex flex-col">
            <Calendar
              mode="range"
              month={calMonth}
              onMonthChange={setCalMonth}
              selected={pendingRange ?? (activePreset === "Custom" ? dateRange : undefined)}
              onSelect={handleCalendarSelect}
              numberOfMonths={2}
              disabled={{ after: new Date() }}
              className="p-3"
            />
            <div className="flex items-center justify-between border-t px-4 py-2.5 bg-muted/30">
              <span className="text-xs text-muted-foreground">
                {pendingRange?.from && pendingRange?.to
                  ? `${format(pendingRange.from, "dd MMM")} – ${format(pendingRange.to, "dd MMM yyyy")}`
                  : pendingRange?.from
                  ? `${format(pendingRange.from, "dd MMM yyyy")} — pick end date`
                  : "Select start & end date"}
              </span>
              <Button
                size="sm"
                className="h-7 text-xs ml-3"
                disabled={!pendingRange?.from || !pendingRange?.to}
                onClick={handleApply}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
