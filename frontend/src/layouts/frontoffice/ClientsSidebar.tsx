import { useState, type ComponentProps } from "react";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  useSidebar,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useClientsFirestore } from "@/domain";
import type { User } from "@/types/Types";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import NavClient from "@/components/cards/NavClient";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ClientsSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const navigate = useNavigate();
  const [activeClient, setActiveClient] = useState<User | undefined>(undefined);
  const { data: clients, loading: loadingClients } = useClientsFirestore();
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  const handleBack = () => {
    toggleSidebar();
    navigate("/");
  };
  const handleClickClient = (user: User) => {
    setActiveClient(user);
    navigate(`/frontoffice/clients/${user.uid}`);
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <Sidebar
      collapsible="offcanvas"
      className="overflow-hidden hidden flex-1 md:flex"
      {...props}
    >
      <SidebarHeader className="gap-2 border-b px-3 pt-2">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="text-foreground text-base font-medium flex items-center">
            <Button variant={"ghost"} onClick={handleBack}>
              <ArrowLeft />
            </Button>
          </div>
          <div className="flex-1 font-bold text-lg flex items-center">
            <span className="text-base font-semibold">Garage</span>
          </div>
          <div className="flex"></div>
        </div>
        <SidebarInput placeholder="Type to search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent className="gap-2">
            {loadingClients && (
              <>
                <div className="flex flex-col gap-1">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton className="aspect-video w-full h-24" />
                  ))}
                </div>
              </>
            )}
            {clients.map((client) => (
              <NavClient
                client={client}
                selected={client.uid == activeClient?.uid}
                onClick={handleClickClient}
              />
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ClientsSidebar;
