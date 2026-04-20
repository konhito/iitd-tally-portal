"use client"

import * as React from "react"
import { subDays, subMonths } from "date-fns"
import { DateRange } from "react-day-picker"

function getFYRange(): DateRange {
  const now = new Date()
  const year = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1
  return {
    from: new Date(year, 3, 1),
    to: new Date(year + 1, 2, 31),
  }
}

export type DatePreset = "Last 7 days" | "Last 30 days" | "Last 3 months" | "FY: April to March" | "Custom"

type DateRangeContextType = {
  dateRange: DateRange
  activePreset: DatePreset
  setActivePreset: (preset: DatePreset) => void
  setDateRange: (range: DateRange) => void
}

const DateRangeContext = React.createContext<DateRangeContextType | null>(null)

export function DateRangeProvider({ children }: { children: React.ReactNode }) {
  const [activePreset, setActivePresetState] = React.useState<DatePreset>("FY: April to March")
  const [dateRange, setDateRange] = React.useState<DateRange>(getFYRange())

  const setActivePreset = React.useCallback((preset: DatePreset) => {
    setActivePresetState(preset)
    if (preset === "Last 7 days") {
      setDateRange({ from: subDays(new Date(), 7), to: new Date() })
    } else if (preset === "Last 30 days") {
      setDateRange({ from: subDays(new Date(), 30), to: new Date() })
    } else if (preset === "Last 3 months") {
      setDateRange({ from: subMonths(new Date(), 3), to: new Date() })
    } else if (preset === "FY: April to March") {
      setDateRange(getFYRange())
    }
    // "Custom" — caller must setDateRange manually
  }, [])

  return (
    <DateRangeContext.Provider value={{ dateRange, activePreset, setActivePreset, setDateRange }}>
      {children}
    </DateRangeContext.Provider>
  )
}

export function useDateRange() {
  const ctx = React.useContext(DateRangeContext)
  if (!ctx) throw new Error("useDateRange must be used within DateRangeProvider")
  return ctx
}
