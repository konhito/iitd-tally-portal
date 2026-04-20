"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconReport,
  IconReceipt2,
  IconRefresh,
  IconSettings,
  IconInnerShadowTop,
  IconCalendar,
  IconLayoutKanban,
  IconReportAnalytics,
} from "@tabler/icons-react";

import { NavMain, type NavItem } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "IITD Admin",
    email: "admin@iitd.ac.in",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: IconFolder,
      isActive: true,
      items: [
        {
          title: "AI Automation System",
          url: "/projects/p1",
          badge: "GOV",
          status: "green" as const,
          subItems: [
            {
              title: "Overview",
              url: "/projects/p1",
              icon: IconReportAnalytics,
            },
            {
              title: "Calendar (P&L)",
              url: "/projects/p1/calendar",
              icon: IconCalendar,
            },
            {
              title: "Kanban",
              url: "/projects/p1/kanban",
              icon: IconLayoutKanban,
            },
          ],
        },
        {
          title: "Smart City Infrastructure",
          url: "/projects/p2",
          badge: "GOV",
          status: "amber" as const,
          subItems: [
            {
              title: "Overview",
              url: "/projects/p2",
              icon: IconReportAnalytics,
            },
            {
              title: "Calendar (P&L)",
              url: "/projects/p2/calendar",
              icon: IconCalendar,
            },
            {
              title: "Kanban",
              url: "/projects/p2/kanban",
              icon: IconLayoutKanban,
            },
          ],
        },
        {
          title: "Fintech Platform MVP",
          url: "/projects/p3",
          badge: "START",
          status: "red" as const,
          subItems: [
            {
              title: "Overview",
              url: "/projects/p3",
              icon: IconReportAnalytics,
            },
            {
              title: "Calendar (P&L)",
              url: "/projects/p3/calendar",
              icon: IconCalendar,
            },
            {
              title: "Kanban",
              url: "/projects/p3/kanban",
              icon: IconLayoutKanban,
            },
          ],
        },
        {
          title: "Healthcare Analytics App",
          url: "/projects/p4",
          badge: "COM",
          status: "green" as const,
          subItems: [
            {
              title: "Overview",
              url: "/projects/p4",
              icon: IconReportAnalytics,
            },
            {
              title: "Calendar (P&L)",
              url: "/projects/p4/calendar",
              icon: IconCalendar,
            },
            {
              title: "Kanban",
              url: "/projects/p4/kanban",
              icon: IconLayoutKanban,
            },
          ],
        },
      ],
    },
    {
      title: "Tally Sync",
      url: "/",
      icon: IconRefresh,
    },
    {
      title: "Settings",
      url: "/",
      icon: IconSettings,
    },
  ] as NavItem[],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">
                  IITD Tally Portal
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
