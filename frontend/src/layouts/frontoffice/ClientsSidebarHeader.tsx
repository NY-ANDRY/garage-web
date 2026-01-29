import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type ClientsSidebarHeaderProps = {
  onReset?: () => void;
};

const ClientsSidebarHeader = ({ onReset }: ClientsSidebarHeaderProps) => {
  const navigate = useNavigate();

  const { toggleSidebar } = useSidebar();

  const handleReload = () => {
    if (onReset) {
      onReset();
    }
    navigate("/frontoffice");
  };

  const handleBack = () => {
    toggleSidebar();
    navigate("/");
  };

  return (
    <SidebarHeader className="gap-2 px-3 pt-2">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="text-foreground text-base font-medium flex items-center">
          <Button variant={"ghost"} onClick={handleBack}>
            <ArrowLeft />
          </Button>
        </div>
        <div className="flex-1 font-bold text-lg flex items-center cursor-pointer">
          <Button
            onClick={handleReload}
            variant={"ghost"}
            className="text-base font-semibold"
          >
            Garage clients
          </Button>
        </div>
      </div>
    </SidebarHeader>
  );
};

export default ClientsSidebarHeader;
