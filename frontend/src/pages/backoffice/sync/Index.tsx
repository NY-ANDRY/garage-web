import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHeader } from "@/context/HeaderContext";
import { useTranslation } from "react-i18next";
import { useSyncHistory } from "@/domain";
import SyncList from "./SyncList";
import SyncDialog from "./SyncDialog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const { t } = useTranslation();
  const { setBreadcrumbs } = useHeader();
  const navigate = useNavigate();
  const { data: syncData, isLoading, refetch } = useSyncHistory();

  useEffect(() => {
    setBreadcrumbs([
      { label: t("sidebar.dashboard"), href: "/backoffice/dashboard" },
      { label: t("sidebar.synchronize") },
    ]);
  }, [t, setBreadcrumbs]);

  const handleSyncStarted = (id: number) => {
    navigate(`/backoffice/sync/${id}`);
    refetch();
  };

  return (
    <div className="py-4 px-2 md:gap-6 md:py-6 md:px-4 max-w-full overflow-hidden space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("common.sync")}</h1>
          {syncData?.data[0] && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-sm text-muted-foreground">
              <span>{t("common.last_sync")}:</span>
              <span className="font-medium text-foreground">
                {format(new Date(syncData.data[0].created_at), "PPpp", { locale: fr })}
              </span>
              <Badge variant={syncData.data[0].statuts?.[0]?.id === 2 ? "success" : syncData.data[0].statuts?.[0]?.id === 3 ? "destructive" : "warning"} className="ml-2">
                {syncData.data[0].statuts?.[0]?.statut || t("common.unknown")}
              </Badge>
            </div>
          )}
        </div>
        <SyncDialog onSyncStarted={handleSyncStarted} lastSyncDate={syncData?.data[0]?.created_at} />
      </div>

        <SyncList 
          syncs={syncData?.data || []} 
        />
    </div>
  );
};

export default Index;
