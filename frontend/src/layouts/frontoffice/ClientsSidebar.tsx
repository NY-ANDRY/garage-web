import { type ComponentProps } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import ClientsSidebarHeader from "./ClientsSidebarHeader";
import ClientsSidebarContent from "./ClientsSidebarContent";

const ClientsSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {

  return (
    <Sidebar
      collapsible="offcanvas"
      className="overflow-hidden hidden flex-1 md:flex"
      {...props}
    >
      <ClientsSidebarHeader/>
      <ClientsSidebarContent />
    </Sidebar>
  );
};

export default ClientsSidebar;
