import { cookies } from "next/headers";
import React from "react";

import { DateRangeProvider } from "@/components/providers/date-range-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarStateController } from "@/components/sidebar-state-controller";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DateRangeProvider>
      <SidebarProvider
        defaultOpen={false}
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 68)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <SidebarStateController />
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </DateRangeProvider>
  );
}
