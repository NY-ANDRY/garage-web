import { cn } from "@/lib/utils";
import type { User } from "@/types/Types";

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
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b py-2 px-4 text-sm leading-tight whitespace-nowrap last:border-b-0 cursor-pointer",
          selected && "bg-sidebar-accent text-sidebar-accent-foreground",
        )}
      >
        <div className="flex w-full items-center gap-2">
          <span className="text-sm">{client.displayName}</span>
          <span className="ml-auto text-xs">...</span>
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
