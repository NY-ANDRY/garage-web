import React from "react";
import { useTranslation } from "react-i18next";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ClientsList, VoituresList, ReparationsList } from "./index";
import type { Synchronisation } from "@/types/Types";

interface SyncDetailSheetProps {
  openDetail: "clients" | "voitures" | "reparations" | null;
  onOpenChange: (open: boolean) => void;
  sync: Synchronisation | null;
}

export const SyncDetailSheet: React.FC<SyncDetailSheetProps> = ({
  openDetail,
  onOpenChange,
  sync,
}) => {
  const { t } = useTranslation();

  return (
    <Sheet
      open={openDetail !== null}
      onOpenChange={(open) => !open && onOpenChange(false)}
    >
      <SheetContent side="right" className="sm:max-w-[600px] w-full">
        <SheetHeader>
          <SheetTitle>
            {openDetail === "clients" && t("common.clients")}
            {openDetail === "voitures" && t("common.voitures")}
            {openDetail === "reparations" && t("common.reparations")}
          </SheetTitle>
          <SheetDescription>{t("common.sync_items_list")}</SheetDescription>
        </SheetHeader>
        <div className="mt-6 h-full overflow-y-auto pb-10">
          {sync && (
            <>
              {openDetail === "clients" && (
                <ClientsList clients={sync.clients || []} />
              )}
              {openDetail === "voitures" && (
                <VoituresList voitures={sync.voitures || []} />
              )}
              {openDetail === "reparations" && (
                <ReparationsList reparations={sync.reparations || []} />
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
