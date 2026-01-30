import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCardIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import { MoreHorizontalIcon } from "lucide-react";
import DropMenuProfile from "./DropMenuProfile";
import type { User } from "@/types/Types";

type DropdownUserProps = {
  client: User;
};

const DropdownUser = ({ client }: DropdownUserProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="ml-auto text-xs hover:bg-background rounded-sm p-1">
          <MoreHorizontalIcon size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropMenuProfile client={client} />
        {/* <DropdownMenuItem>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUser;
