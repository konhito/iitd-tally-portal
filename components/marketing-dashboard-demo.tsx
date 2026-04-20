"use client"
import { MarketingDashboard } from "@/components/ui/dashboard-1";

export const MarketingDashboardDemo = () => {
  const projectActivities = {
    totalHours: 124.5,
    stats: [
      { label: "On Track", value: 50, color: "bg-green-400" },
      { label: "At Risk", value: 20, color: "bg-amber-400" },
      { label: "Delayed", value: 15, color: "bg-red-400" },
      { label: "Pending", value: 15, color: "bg-slate-800 dark:bg-slate-700" },
    ],
  };

  const projectTeam = {
    memberCount: 48,
    members: [
      { id: "1", name: "Dr. A. Sharma", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
      { id: "2", name: "R. Verma", avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150" },
      { id: "3", name: "P. Gupta", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
      { id: "4", name: "S. Kumar", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
    ],
  };

  const tallyCta = {
    text: "Sync Tally ledgers and review pending reconciliations",
    buttonText: "Tally Sync",
    onButtonClick: () => alert("Initiating Tally Sync…"),
  };

  return (
    <MarketingDashboard
      title="Project Activity Overview"
      teamActivities={projectActivities}
      team={projectTeam}
      cta={tallyCta}
      onFilterClick={() => alert("Filter projects")}
    />
  );
};

