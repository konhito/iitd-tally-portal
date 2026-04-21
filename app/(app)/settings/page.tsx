"use client"

import * as React from "react"
import {
  IconServer,
  IconRefresh,
  IconPalette,
  IconBell,
  IconShieldLock,
  IconBuilding,
  IconDeviceFloppy,
  IconCheck,
  IconClock,
} from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Card className="shadow-none border-border/60">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Icon className="size-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold">{title}</CardTitle>
            <CardDescription className="text-xs mt-0.5">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  )
}

// ─── FIELD ROWS ───────────────────────────────────────────────────────────

function FieldRow({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function TextInput({
  value,
  placeholder,
  readOnly,
}: {
  value?: string
  placeholder?: string
  readOnly?: boolean
}) {
  const [val, setVal] = React.useState(value ?? "")
  return (
    <input
      value={val}
      onChange={e => setVal(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      className={cn(
        "h-8 w-56 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
        readOnly && "cursor-not-allowed opacity-60"
      )}
    />
  )
}

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = React.useState(defaultOn)
  return (
    <button
      onClick={() => setOn(p => !p)}
      className={cn(
        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
        on ? "bg-primary" : "bg-muted-foreground/30"
      )}
    >
      <span
        className={cn(
          "inline-block size-3.5 rounded-full bg-white shadow transition-transform",
          on ? "translate-x-4" : "translate-x-0.5"
        )}
      />
    </button>
  )
}

function Select({ options, defaultValue }: { options: string[]; defaultValue?: string }) {
  const [val, setVal] = React.useState(defaultValue ?? options[0])
  return (
    <select
      value={val}
      onChange={e => setVal(e.target.value)}
      className="h-8 w-48 rounded-md border bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [saved, setSaved] = React.useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-10 pt-8 max-w-3xl">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Configure your dashboard, Tally connection, and account preferences.
          </p>
        </div>
        <Button onClick={handleSave} className="self-start md:self-auto" variant={saved ? "outline" : "default"}>
          {saved ? (
            <><IconCheck className="mr-2 size-4 text-green-500" /> Saved</>
          ) : (
            <><IconDeviceFloppy className="mr-2 size-4" /> Save Changes</>
          )}
        </Button>
      </div>

      {/* 1. ORGANISATION */}
      <SettingsSection
        icon={IconBuilding}
        title="Organisation"
        description="Details about your institution shown across the portal."
      >
        <FieldRow label="Organisation Name" hint="Displayed in the portal header and reports">
          <TextInput value="Indian Institute of Technology Delhi" />
        </FieldRow>
        <Separator />
        <FieldRow label="Admin Email" hint="Used for sync alerts and system notifications">
          <TextInput value="admin@iitd.ac.in" />
        </FieldRow>
        <Separator />
        <FieldRow label="Financial Year Start" hint="Used for YTD calculations">
          <Select options={["April (India Standard)", "January", "July"]} defaultValue="April (India Standard)" />
        </FieldRow>
        <Separator />
        <FieldRow label="Default Currency" hint="All values displayed in this currency">
          <Select options={["INR ₹", "USD $", "EUR €"]} defaultValue="INR ₹" />
        </FieldRow>
      </SettingsSection>

      {/* 2. TALLY CONNECTION */}
      <SettingsSection
        icon={IconServer}
        title="Tally Connection"
        description="XML API endpoint configuration for Tally Prime."
      >
        <FieldRow label="Tally Host" hint="IP or hostname where Tally Prime is running">
          <TextInput value="127.0.0.1" />
        </FieldRow>
        <Separator />
        <FieldRow label="Port" hint="Default Tally XML API port is 9000">
          <TextInput value="9000" />
        </FieldRow>
        <Separator />
        <FieldRow label="Company Name" hint="Must match the active company in Tally exactly">
          <TextInput value="IITD Research Accounts" />
        </FieldRow>
        <Separator />
        <FieldRow label="Connection Timeout" hint="Seconds before a sync attempt times out">
          <Select options={["10s", "20s", "30s", "60s"]} defaultValue="20s" />
        </FieldRow>
        <Separator />
        <FieldRow label="Connection Status">
          <Badge className="bg-green-500/10 text-green-600 text-xs">● Connected</Badge>
        </FieldRow>
      </SettingsSection>

      {/* 3. SYNC SCHEDULE */}
      <SettingsSection
        icon={IconClock}
        title="Sync Schedule"
        description="Configure how often the dashboard polls Tally for fresh data."
      >
        <FieldRow label="Auto Sync" hint="Automatically fetch data on a schedule">
          <Toggle defaultOn={true} />
        </FieldRow>
        <Separator />
        <FieldRow label="Sync Frequency" hint="How often to poll the Tally XML API">
          <Select options={["Every 30 min", "Every 1 hour", "Every 2 hours", "Every 6 hours", "Daily"]} defaultValue="Every 2 hours" />
        </FieldRow>
        <Separator />
        <FieldRow label="Sync on Page Load" hint="Trigger a fresh pull each time the dashboard opens">
          <Toggle defaultOn={false} />
        </FieldRow>
        <Separator />
        <FieldRow label="Log Retention" hint="How long to keep sync history entries">
          <Select options={["7 days", "30 days", "90 days", "1 year"]} defaultValue="30 days" />
        </FieldRow>
      </SettingsSection>

      {/* 4. NOTIFICATIONS */}
      {/* <SettingsSection
        icon={IconBell}
        title="Notifications"
        description="Choose which events trigger alerts."
      >
        <FieldRow label="Sync Failure Alerts" hint="Notify when a sync attempt fails">
          <Toggle defaultOn={true} />
        </FieldRow>
        <Separator />
        <FieldRow label="Sync Warning Alerts" hint="Notify on partial or incomplete syncs">
          <Toggle defaultOn={true} />
        </FieldRow>
        <Separator />
        <FieldRow label="Daily Sync Summary" hint="Email a daily summary of sync activity">
          <Toggle defaultOn={false} />
        </FieldRow>
      </SettingsSection> */}

      {/* 5. APPEARANCE */}
      {/* <SettingsSection
        icon={IconPalette}
        title="Appearance"
        description="Customise the look and feel of the dashboard."
      >
        <FieldRow label="Theme" hint="Light or dark mode preference">
          <Select options={["System Default", "Light", "Dark"]} defaultValue="System Default" />
        </FieldRow>
        <Separator />
        <FieldRow label="Accent Colour" hint="Primary colour used across the UI">
          <Select options={["Scaled Blue (Default)", "Teal", "Violet", "Amber"]} defaultValue="Scaled Blue (Default)" />
        </FieldRow>
        <Separator />
        <FieldRow label="Compact Mode" hint="Reduce padding for denser layouts">
          <Toggle defaultOn={false} />
        </FieldRow>
      </SettingsSection> */}

      {/* 6. SECURITY */}
      {/* <SettingsSection
        icon={IconShieldLock}
        title="Security & Access"
        description="Share link and access control settings."
      >
        <FieldRow label="Shared Link Expiry" hint="How long project share links remain valid">
          <Select options={["Never", "24 hours", "7 days", "30 days"]} defaultValue="Never" />
        </FieldRow>
        <Separator />
        <FieldRow label="Require Token for Shared Links" hint="Anyone with the link must have a valid token">
          <Toggle defaultOn={true} />
        </FieldRow>
        <Separator />
        <FieldRow label="Portal Version" hint="Current dashboard build">
          <TextInput value="v1.0.0 (Apr 2026)" readOnly />
        </FieldRow>
      </SettingsSection> */}

    </div>
  )
}
