"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
  ComposedChart,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const formatRupee = (value: number) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export function MonthlyIncomeExpenseChart({ data }: { data: any[] }) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-4">
      <CardHeader>
        <CardTitle>Monthly Income vs Expense</CardTitle>
        <CardDescription>Grouped bar with cumulative surplus overlay</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" tickFormatter={formatRupee} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={formatRupee} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: any) => formatRupee(Number(value))} />
              <Legend />
              <Bar yAxisId="left" dataKey="income" fill="#10b981" name="Funds Received" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="expense" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="surplus" stroke="#3b82f6" name="Cumulative Surplus" strokeWidth={2} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function CumulativeSpendChart({ data }: { data: any[] }) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Cumulative Spend vs Planned Budget</CardTitle>
        <CardDescription>Area line chart tracking actual vs planned</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={formatRupee} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: any) => formatRupee(Number(value))} />
              <Legend />
              <Area type="monotone" dataKey="actual" stroke="#ef4444" fillOpacity={1} fill="url(#colorActual)" name="Actual Spend" />
              <Line type="monotone" dataKey="planned" stroke="#94a3b8" strokeDasharray="5 5" name="Planned Trajectory" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

export function CostCenterDonutChart({ data }: { data: any[] }) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center">
      <div className="w-full p-6">
        <h3 className="font-semibold text-lg mb-2">Cost Center Breakdown</h3>
        <p className="text-sm text-muted-foreground mb-4">Distribution of expenses across categories</p>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => formatRupee(Number(value))} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="w-full p-6 border-t">
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">{formatRupee(item.value)}</span>
                <span className={`text-xs ${item.change.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export function MilestoneTracker({ data }: { data: any[] }) {
  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle>Milestone Payment Tracker</CardTitle>
        <CardDescription>Horizontal tracking of project milestones and payments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((milestone, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="font-medium">{milestone.name}</div>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{milestone.date}</span>
                <span className="font-semibold">{formatRupee(milestone.amount)}</span>
                <Badge 
                  variant={milestone.status === 'received' ? 'default' : milestone.status === 'pending' ? 'secondary' : 'destructive'}
                  className={
                    milestone.status === 'received' ? 'bg-green-500 hover:bg-green-600' : 
                    milestone.status === 'pending' ? 'bg-amber-500 hover:bg-amber-600 text-white' : ''
                  }
                >
                  {milestone.status}
                </Badge>
              </div>
            </div>
            <Progress 
              value={milestone.status === 'received' ? 100 : milestone.status === 'pending' ? 50 : 100} 
              indicatorColor={
                milestone.status === 'received' ? 'bg-green-500' : 
                milestone.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
              }
              className="h-2"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function ExpenseTrendChart({ data }: { data: any[] }) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Expense Trend by Category</CardTitle>
        <CardDescription>Stacked area chart over 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={formatRupee} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: any) => formatRupee(Number(value))} />
              <Legend />
              <Area type="monotone" dataKey="staff" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} name="Staff" />
              <Area type="monotone" dataKey="equip" stackId="1" stroke={COLORS[1]} fill={COLORS[1]} name="Equipment" />
              <Area type="monotone" dataKey="admin" stackId="1" stroke={COLORS[2]} fill={COLORS[2]} name="Admin" />
              <Area type="monotone" dataKey="misc" stackId="1" stroke={COLORS[3]} fill={COLORS[3]} name="Misc" />
              <Area type="monotone" dataKey="travel" stackId="1" stroke={COLORS[4]} fill={COLORS[4]} name="Travel" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function PfmsWaterfallChart({ data }: { data: any[] }) {
  // A true waterfall is tricky in Recharts natively without data manipulation, 
  // but we can use a composed chart with invisible bottom bars or just a bar chart with custom colors
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>PFMS Fund Release Schedule</CardTitle>
        <CardDescription>Sanctioned → Installments → Expenses → Balance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={formatRupee} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: any) => formatRupee(Number(value))} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={
                    entry.type === 'total' ? '#3b82f6' : 
                    entry.type === 'positive' ? '#10b981' : '#ef4444'
                  } />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function TeamCostChart({ data }: { data: any[] }) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-4">
      <CardHeader>
        <CardTitle>Team & Headcount Cost</CardTitle>
        <CardDescription>FTE vs Cost as % of budget</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="fte" fill="#8b5cf6" name="Headcount (FTE)" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="costPercent" stroke="#f59e0b" name="Cost (% of Budget)" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function ArAgingChart({ data }: { data: any[] }) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-4">
      <CardHeader>
        <CardTitle>Accounts Receivable Aging</CardTitle>
        <CardDescription>Overdue funds breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickFormatter={formatRupee} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="range" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: any) => formatRupee(Number(value))} />
              <Bar dataKey="amount" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function GanttChart({ data }: { data: any[] }) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-4 overflow-x-auto">
      <CardHeader>
        <CardTitle>Year-wise Project Progress</CardTitle>
        <CardDescription>Timeline of key milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 min-w-[600px]">
          {data.map((task, idx) => {
            const isCompleted = task.status === 'completed';
            const isInProgress = task.status === 'in-progress';
            return (
              <div key={idx} className="flex items-center gap-4 text-sm">
                <div className="w-48 font-medium truncate" title={task.task}>{task.task}</div>
                <div className="w-24 text-muted-foreground text-xs">{task.start}</div>
                <div className="flex-1 flex items-center h-6 bg-secondary/50 rounded-full overflow-hidden relative">
                   <div 
                     className={cn(
                       "absolute h-full left-0 rounded-full",
                       isCompleted ? "bg-green-500 w-full" : 
                       isInProgress ? "bg-amber-500 w-1/2 pattern-diagonal-lines pattern-amber-600 pattern-bg-amber-500 pattern-size-4 pattern-opacity-100" : 
                       "border-2 border-dashed border-muted-foreground w-full bg-transparent"
                     )}
                   />
                </div>
                <div className="w-24 text-muted-foreground text-xs text-right">{task.end}</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export function RatiosPanel({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 col-span-1 md:col-span-2 lg:col-span-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Current Ratio</CardDescription>
          <CardTitle className="text-2xl">{data.currentRatio}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-green-500 flex items-center mt-1">Healthy</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Quick Ratio</CardDescription>
          <CardTitle className="text-2xl">{data.quickRatio}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-amber-500 flex items-center mt-1">Monitor</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Burn Rate / Mo</CardDescription>
          <CardTitle className="text-2xl">{formatRupee(data.burnRate)}</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="h-[30px] w-full mt-2">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={data.burnRateTrend.map((v: number, i: number) => ({val: v, i}))}>
                 <Line type="monotone" dataKey="val" stroke="#ef4444" strokeWidth={2} dot={false} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Runway (Months)</CardDescription>
          <CardTitle className="text-2xl">{data.runway}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground flex items-center mt-1">Estimated</div>
        </CardContent>
      </Card>
    </div>
  )
}
