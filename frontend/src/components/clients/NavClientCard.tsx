import { cn } from "@/lib/utils";
import type { User } from "@/types/Types";
import DropdownClient from "./DropDownClient";

type NavClientProps = {
  client: User;
  onClick?: (client: User) => void;
  selected: boolean;
};

const NavClient = ({ client, onClick, selected }: NavClientProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(client);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        key={client.uid}
        className={cn(
          " border-t border-border-50 border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 py-2 pb-4 px-4 text-sm leading-tight whitespace-nowrap last:border-b-0 cursor-pointer transition-all",
          selected && "bg-sidebar-accent/80 text-sidebar-accent-foreground",
        )}
      >
        <div className="flex w-full items-center gap-2">
          <span className="text-sm">{client.displayName}</span>
          <div className="ml-auto text-xs hover:bg-background rounded-sm p-1">
            <DropdownClient client={client} />
          </div>
        </div>
        <span className="font-medium">{client.email}</span>
        <span className="line-clamp-2 w-65 text-xs">
          fcm token: {client.fcmToken}
        </span>
      </div>
    </>
  );
};
export default NavClient;
