"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useSidebar } from "./ui/sidebar"

export function SidebarStateController() {
  const pathname = usePathname()
  const { setOpen, isMobile } = useSidebar()
  const prevPathRef = useRef<string | null>(null)

  useEffect(() => {
    if (isMobile) return
    // Only auto-control when navigating to a different route segment
    const prevBase = prevPathRef.current?.split("/")[1]
    const currBase = pathname.split("/")[1]
    if (prevBase === currBase) return // same section — don't override user toggle

    prevPathRef.current = pathname

    if (["dashboard", "projects", "tally-sync", "settings"].includes(currBase)) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [pathname, setOpen, isMobile])

  return null
}
