export const projectData = {
  id: "p1",
  name: "AI Automation System",
  type: "GOV",
  ministry: "Ministry of Electronics & IT",
  pfmsAccount: "PFMS-8832-1102",
  status: "On Track",
  startDate: "2023-04-01",
  endDate: "2025-03-31",
  piName: "Dr. A. Sharma",
  lastSynced: "2024-10-24 14:30 IST",

  kpi: {
    sanctioned: 50000000,
    received: 35000000,
    expenses: 28000000,
    surplus: 7000000,
    budgetUtil: 56, // percentage
    completionDate: "2025-02-15",
  },

  // Chart 1: Monthly income vs expense
  monthlyIncomeExpense: [
    { month: "Apr", income: 5000000, expense: 2000000, surplus: 3000000 },
    { month: "May", income: 0, expense: 2500000, surplus: 500000 },
    { month: "Jun", income: 10000000, expense: 3000000, surplus: 7500000 },
    { month: "Jul", income: 0, expense: 4000000, surplus: 3500000 },
    { month: "Aug", income: 0, expense: 3500000, surplus: 0 },
    { month: "Sep", income: 15000000, expense: 5000000, surplus: 10000000 },
    { month: "Oct", income: 5000000, expense: 8000000, surplus: 7000000 },
  ],

  // Chart 2: Cumulative spend vs planned budget
  cumulativeSpend: [
    { month: "Apr", actual: 2000000, planned: 2500000 },
    { month: "May", actual: 4500000, planned: 5000000 },
    { month: "Jun", actual: 7500000, planned: 8000000 },
    { month: "Jul", actual: 11500000, planned: 12000000 },
    { month: "Aug", actual: 15000000, planned: 15000000 },
    { month: "Sep", actual: 20000000, planned: 22000000 },
    { month: "Oct", actual: 28000000, planned: 27000000 },
  ],

  // Chart 3: Cost center donut
  costCenters: [
    { name: "Staff Welfare", value: 8000000, change: "+5%" },
    { name: "Accommodation", value: 3000000, change: "-2%" },
    { name: "Admin", value: 2000000, change: "+1%" },
    { name: "Travel", value: 1500000, change: "+10%" },
    { name: "Misc", value: 1000000, change: "0%" },
    { name: "Equipment", value: 12500000, change: "0%" },
  ],

  // Chart 4: Milestone payments
  milestones: [
    { name: "Project Initiation", amount: 10000000, date: "2023-04-15", status: "received" },
    { name: "Phase 1 Delivery", amount: 15000000, date: "2023-10-15", status: "received" },
    { name: "Phase 2 Delivery", amount: 10000000, date: "2024-04-15", status: "received" },
    { name: "Beta Testing", amount: 10000000, date: "2024-10-15", status: "pending" },
    { name: "Final Handover", amount: 5000000, date: "2025-03-31", status: "pending" },
  ],

  // Chart 5: Expense trend by category
  expenseTrend: [
    { month: "Apr", staff: 1000000, travel: 100000, admin: 200000, equip: 500000, misc: 200000 },
    { month: "May", staff: 1000000, travel: 150000, admin: 250000, equip: 800000, misc: 300000 },
    { month: "Jun", staff: 1100000, travel: 200000, admin: 300000, equip: 1000000, misc: 400000 },
    { month: "Jul", staff: 1100000, travel: 300000, admin: 350000, equip: 1500000, misc: 750000 },
    { month: "Aug", staff: 1200000, travel: 250000, admin: 400000, equip: 1000000, misc: 650000 },
    { month: "Sep", staff: 1200000, travel: 400000, admin: 450000, equip: 2000000, misc: 950000 },
    { month: "Oct", staff: 1400000, travel: 100000, admin: 500000, equip: 5700000, misc: 300000 },
  ],

  // Chart 6: PFMS Waterfall
  pfmsWaterfall: [
    { name: "Sanctioned", value: 50000000, type: "total" },
    { name: "Inst 1", value: 10000000, type: "positive" },
    { name: "Inst 2", value: 15000000, type: "positive" },
    { name: "Inst 3", value: 10000000, type: "positive" },
    { name: "Expenses", value: -28000000, type: "negative" },
    { name: "Balance", value: 7000000, type: "total" },
  ],

  // Chart 7: Team cost
  teamCost: [
    { month: "Apr", fte: 10, costPercent: 20 },
    { month: "May", fte: 10, costPercent: 22 },
    { month: "Jun", fte: 12, costPercent: 25 },
    { month: "Jul", fte: 12, costPercent: 26 },
    { month: "Aug", fte: 14, costPercent: 28 },
    { month: "Sep", fte: 14, costPercent: 29 },
    { month: "Oct", fte: 15, costPercent: 32 },
  ],

  // Chart 8: AR Aging
  arAging: [
    { range: "0-30 Days", amount: 0 },
    { range: "31-60 Days", amount: 10000000 },
    { range: "61-90 Days", amount: 0 },
    { range: "90+ Days", amount: 0 },
  ],

  // Chart 9: Gantt (simplified as timeline data)
  timeline: [
    { task: "Requirement Analysis", start: "2023-04-01", end: "2023-05-31", status: "completed" },
    { task: "Architecture Design", start: "2023-06-01", end: "2023-08-31", status: "completed" },
    { task: "Core Development", start: "2023-09-01", end: "2024-05-31", status: "completed" },
    { task: "AI Model Training", start: "2024-06-01", end: "2024-11-30", status: "in-progress" },
    { task: "Integration & Testing", start: "2024-12-01", end: "2025-02-28", status: "not-started" },
  ],

  // Chart 10: Financial ratios
  ratios: {
    currentRatio: 1.5,
    quickRatio: 1.2,
    burnRate: 3500000, // per month
    runway: 6.5, // months
    burnRateTrend: [30, 32, 35, 33, 34, 38, 35], // simple sparkline data
  }
};
