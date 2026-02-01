import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserIcon, Car as CarIcon, Wrench as WrenchIcon } from "lucide-react";
import type { Synchronisation } from "@/types/Types";

interface SyncStatsProps {
  sync: Synchronisation;
  onOpenDetail: (type: "clients" | "voitures" | "reparations") => void;
}

export const SyncStats: React.FC<SyncStatsProps> = ({ sync, onOpenDetail }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        onClick={() => onOpenDetail("clients")}
        className="cursor-pointer hover:bg-accent/50 transition-colors"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("common.clients")}
          </CardTitle>
          <UserIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sync.clients?.length || 0}</div>
          <p className="text-xs text-muted-foreground">{t("common.new_items")}</p>
        </CardContent>
      </Card>

      <Card
        onClick={() => onOpenDetail("voitures")}
        className="cursor-pointer hover:bg-accent/50 transition-colors"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("common.voitures")}
          </CardTitle>
          <CarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sync.voitures?.length || 0}</div>
          <p className="text-xs text-muted-foreground">{t("common.new_items")}</p>
        </CardContent>
      </Card>

      <Card
        onClick={() => onOpenDetail("reparations")}
        className="cursor-pointer hover:bg-accent/50 transition-colors"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("common.reparations")}
          </CardTitle>
          <WrenchIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {sync.reparations?.length || 0}
          </div>
          <p className="text-xs text-muted-foreground">{t("common.new_items")}</p>
        </CardContent>
      </Card>
    </div>
  );
};
