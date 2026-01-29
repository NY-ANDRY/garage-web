import ClientSidebar from "@/layouts/frontoffice/ClientsSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ClientsHeader from "./ClientsHeader";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { fade } from "@/components/transitions/tansitions";

export default function Page() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      {/* <ClientSidebar /> */}
      <ClientSidebar variant="floating" />
      <SidebarInset>
        <ClientsHeader />

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
}
