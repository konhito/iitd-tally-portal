import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { CeoDashboard } from "@/components/ceo-dashboard";
import { MarketingDashboardDemo } from "@/components/marketing-dashboard-demo";

import data from "./data.json";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* CEO Dashboard — KPI cards + Income/Expense */}
          <div className="px-4 lg:px-6">
            <CeoDashboard />
          </div>
          {/* Interactive Area Chart */}
          {/* <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div> */}
          {/* Project Activity Overview */}
          {/* <div className="px-4 lg:px-6">
            <MarketingDashboardDemo />
          </div> */}
          {/* Data Table */}
          {/* <DataTable data={data} /> */}
        </div>
      </div>
    </div>
  );
}
