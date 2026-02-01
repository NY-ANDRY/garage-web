import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SyncOptionWrapperProps {
  id: string;
  label: React.ReactNode;
  description?: string;
  hint: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const SyncOptionWrapper: React.FC<SyncOptionWrapperProps> = ({
  id,
  label,
  description,
  hint,
  checked,
  onCheckedChange,
}) => {
  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="flex items-center space-x-2 py-2">
          <Switch 
            id={id} 
            checked={checked} 
            onCheckedChange={onCheckedChange} 
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor={id} className="cursor-pointer">
              {label}
            </Label>
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="left" className="w-80 text-sm py-2 px-4 text-muted-foreground">
        {hint}
      </HoverCardContent>
    </HoverCard>
  );
};
