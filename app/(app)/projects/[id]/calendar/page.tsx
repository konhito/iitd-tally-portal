"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

// Generate some dummy data for the calendar
const generateCalendarData = (year: number, month: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  
  const days = []
  
  // Padding for previous month
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: null, profit: 0, loss: 0 })
  }
  
  // Days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    // Generate some random profit/loss data for the mock
    const profit = Math.floor(Math.random() * 50000)
    const loss = Math.floor(Math.random() * 30000)
    days.push({ day: i, profit, loss })
  }
  
  return days
}

export default function CalendarPage() {
  const { id } = useParams()
  
  const [currentDate, setCurrentDate] = React.useState(new Date())
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  const calendarDays = React.useMemo(() => generateCalendarData(year, month), [year, month])
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const monthName = currentDate.toLocaleString('default', { month: 'long' })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 pb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Project P&L Calendar</h2>
          <p className="text-muted-foreground">
            Daily profit and loss tracking for project {id}
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-medium">
            {monthName} {year}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px rounded-md bg-muted overflow-hidden border">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="bg-background py-2 text-center text-sm font-semibold text-muted-foreground">
                {day}
              </div>
            ))}
            
            {calendarDays.map((date, i) => (
              <div 
                key={i} 
                className={`min-h-[120px] bg-background p-2 transition-colors hover:bg-muted/50 ${!date.day ? 'bg-muted/20' : ''}`}
              >
                {date.day && (
                  <div className="flex flex-col h-full">
                    <span className="text-sm font-medium mb-2">{date.day}</span>
                    <div className="flex-1 flex flex-col justify-end space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">In:</span>
                        <span className="text-green-600 font-medium">+{formatCurrency(date.profit)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Out:</span>
                        <span className="text-red-600 font-medium">-{formatCurrency(date.loss)}</span>
                      </div>
                      <div className="pt-1 mt-1 border-t flex items-center justify-between text-xs font-bold">
                        <span>Net:</span>
                        <span className={date.profit - date.loss >= 0 ? "text-green-600" : "text-red-600"}>
                          {date.profit - date.loss >= 0 ? '+' : ''}{formatCurrency(date.profit - date.loss)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
