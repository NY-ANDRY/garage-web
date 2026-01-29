import { useState, type ComponentProps } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
  useSidebar,
} from "@/components/ui/sidebar";
import { useClientsFirestore } from "@/domain";
import type { User } from "@/types/Types";
import { useNavigate } from "react-router-dom";
import NavClient from "@/components/clients/NavClientCard";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedPlaceholder from "@/components/animations/AnimatedPlaceholder";
import { AnimatePresence, motion } from "motion/react";
import { RefreshCcw } from "lucide-react";

const ClientsSidebarContent = ({
  ...props
}: ComponentProps<typeof Sidebar>) => {
  const navigate = useNavigate();
  const [activeClient, setActiveClient] = useState<User | undefined>(undefined);

  const [searchTerm, setSearchTerm] = useState("");

  const { data: clients, loading: loadingClients } =
    useClientsFirestore(searchTerm);

  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  const handleClickClient = (user: User) => {
    setActiveClient(user);
    navigate(`/frontoffice/clients/${user.uid}`);
    if (isMobile) {
      toggleSidebar();
    }
  };

  const handleReset = () => {
    setSearchTerm("");
  };

  return (
    <SidebarContent className="gap-px">
      <div className="flex gap-0.5 pb-0 pt-2 pr-2 items-center">
        <SidebarInput
          placeholder="Rechercher un client..."
          className="ml-3 mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div
          onClick={handleReset}
          className="flex items-center justify-center p-2 rounded-sm cursor-pointer hover:bg-accent"
        >
          <RefreshCcw size={16} />
        </div>
      </div>
      <SidebarGroup className="px-0">
        <SidebarGroupContent className="gap-2">
          <AnimatedPlaceholder
            loading={loadingClients}
            skeletonCount={8}
            skeletonClassName="h-24 w-full"
          >
            <AnimatePresence mode="popLayout">
              {clients.map((client) => (
                <motion.div key={client.uid} layout>
                  <NavClient
                    client={client}
                    selected={client.uid === activeClient?.uid}
                    onClick={handleClickClient}
                  />
                </motion.div>
              ))}
              {!loadingClients && clients.length === 0 && searchTerm && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Aucun client trouvé pour "{searchTerm}"
                </div>
              )}
            </AnimatePresence>
          </AnimatedPlaceholder>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default ClientsSidebarContent;
