"use client"

import { IconCirclePlusFilled, IconMail, IconChevronRight, type Icon } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type NavItem = {
  title: string
  url: string
  icon?: Icon
  isActive?: boolean
  items?: {
    title: string
    url: string
    badge?: string
    status?: "green" | "amber" | "red"
    subItems?: {
      title: string
      url: string
      icon?: Icon
    }[]
  }[]
}

export function NavMain({
  items,
}: {
  items: NavItem[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url || pathname.startsWith(item.url + '/') || item.isActive;
            
            if (item.items && item.items.length > 0) {
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} className={cn(isActive && !item.items && "bg-primary text-primary-foreground")}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          const isSubActive = pathname === subItem.url || (subItem.subItems?.some(s => pathname === s.url || pathname.startsWith(s.url + '/')));
                          
                          if (subItem.subItems) {
                            return (
                              <Collapsible key={subItem.title} asChild defaultOpen={isSubActive} className="group/sub-collapsible">
                                <SidebarMenuSubItem className="mb-3">
                                  <CollapsibleTrigger asChild>
                                    <SidebarMenuSubButton isActive={isSubActive} className={cn("w-full cursor-pointer h-auto py-1.5", isSubActive && "bg-primary/10 text-primary font-medium")}>
                                      <div className="flex justify-between w-full pr-1 items-start gap-1">
                                        <div className="flex items-start gap-2 overflow-hidden">
                                          {subItem.status && (
                                            <span
                                              className={cn(
                                                "size-2 rounded-full shrink-0 mt-1",
                                                subItem.status === "green" && "bg-green-500",
                                                subItem.status === "amber" && "bg-amber-500",
                                                subItem.status === "red" && "bg-red-500"
                                              )}
                                            />
                                          )}
                                          <span className="whitespace-normal leading-tight text-left">{subItem.title}</span>
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0 pt-0.5">
                                          {subItem.badge && (
                                            <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 min-w-0">
                                              {subItem.badge}
                                            </Badge>
                                          )}
                                          <IconChevronRight className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/sub-collapsible:rotate-90" />
                                        </div>
                                      </div>
                                    </SidebarMenuSubButton>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <SidebarMenuSub className="pr-0 mr-0 mt-1 space-y-1">
                                      {subItem.subItems.map((ss) => (
                                        <SidebarMenuSubItem key={ss.title}>
                                          <SidebarMenuSubButton asChild isActive={pathname === ss.url}>
                                            <Link href={ss.url}>
                                              {ss.icon && <ss.icon className="size-4" />}
                                              <span>{ss.title}</span>
                                            </Link>
                                          </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                      ))}
                                    </SidebarMenuSub>
                                  </CollapsibleContent>
                                </SidebarMenuSubItem>
                              </Collapsible>
                            )
                          }

                          return (
                            <SidebarMenuSubItem key={subItem.title} className="mb-3">
                              <SidebarMenuSubButton asChild isActive={isSubActive} className={cn("h-auto py-1.5", isSubActive && "bg-primary/20 text-primary font-medium")}>
                                <Link href={subItem.url} className="flex justify-between w-full pr-1 items-start gap-1">
                                  <div className="flex items-start gap-2 overflow-hidden">
                                    {subItem.status && (
                                      <span
                                        className={cn(
                                          "size-2 rounded-full shrink-0 mt-1",
                                          subItem.status === "green" && "bg-green-500",
                                          subItem.status === "amber" && "bg-amber-500",
                                          subItem.status === "red" && "bg-red-500"
                                        )}
                                      />
                                    )}
                                    <span className="whitespace-normal leading-tight text-left">{subItem.title}</span>
                                  </div>
                                  {subItem.badge && (
                                    <div className="flex items-center gap-1 shrink-0 pt-0.5">
                                      <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 min-w-0">
                                        {subItem.badge}
                                      </Badge>
                                    </div>
                                  )}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title} className={cn(isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground")}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
