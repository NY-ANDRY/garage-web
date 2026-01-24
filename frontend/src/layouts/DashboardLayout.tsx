import { AppSidebar } from "@/layouts/DashboardSidebar"
import { SiteHeader } from "@/layouts/DashboardHeader"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useLocation, useOutlet } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import { mainPageTransitionProps } from "@/components/transitions/tansition-pages"

export default function DashboardLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <AnimatePresence mode="wait">
              {outlet && (
                <motion.div
                  key={location.pathname}
                  {...mainPageTransitionProps}
                  className="flex-1 flex flex-col"
                >
                  {outlet}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
