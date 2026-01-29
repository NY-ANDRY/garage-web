import AppSidebar from "@/layouts/backoffice/DashboardSidebar";
import SiteHeader from "@/layouts/backoffice/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { fade } from "@/components/transitions/tansitions";

const DashboardLayout = () => {
  const location = useLocation();
  const outlet = useOutlet();

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
        <div className="@container/main flex flex-1 flex-col gap-2">
          <AnimatePresence mode="wait">
            {outlet && (
              <motion.div
                key={location.pathname}
                {...fade}
                className="flex-1 flex flex-col"
              >
                {outlet}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
