import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLazySyncDetail } from "@/domain";
import { useTranslation } from "react-i18next";
import { ChevronLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useHeader } from "@/context/HeaderContext";
import type { Synchronisation } from "@/types/Types";
import AnimatedPlaceholder from "@/components/animations/AnimatedPlaceholder";
import {
  SyncStats,
  SyncTimeline,
  SyncBadges,
  SyncDetailSheet,
} from "@/components/sync";

interface SyncDetailProps {
  syncId?: number;
  onBack?: () => void;
}

const SyncDetail: React.FC<SyncDetailProps> = ({
  syncId: propSyncId,
  onBack,
}) => {
  const { t } = useTranslation();
  const { id: paramId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setBreadcrumbs } = useHeader();

  const syncId = propSyncId ?? Number(paramId);
  const [sync, setSync] = useState<Synchronisation | null>(null);
  const { fetch, isLoading } = useLazySyncDetail(syncId);
  const [pollInterval] = useState(2000);
  const [openDetail, setOpenDetail] = useState<
    "clients" | "voitures" | "reparations" | null
  >(null);

  useEffect(() => {
    setBreadcrumbs([
      { label: t("sidebar.dashboard"), href: "/backoffice/dashboard" },
      { label: t("sidebar.synchronize"), href: "/backoffice/sync" },
      { label: `${syncId}` },
    ]);
  }, [t, setBreadcrumbs, syncId]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/backoffice/sync");
    }
  };

  const loadDetail = async () => {
    const result = await fetch();
    if (result && result.success) {
      setSync(result.data);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [syncId]);

  useEffect(() => {
    let intervalId: any;

    const lastStatut = sync?.statuts?.[0];
    if (lastStatut && lastStatut.id == 1) {
      intervalId = setInterval(() => {
        loadDetail();
      }, pollInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [sync, pollInterval]);

  const currentStatut = sync?.statuts?.[0];

  return (
    <section className="flex flex-col gap-4 py-4 md:py-6 md:px-4 px-2">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleBack}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center justify-between flex-1 pr-4">
          <h2 className="text-xl md:text-2xl font-bold">
            {t("common.sync_detail")} #{syncId}
          </h2>
          <SyncBadges statusId={currentStatut?.id} pollInterval={pollInterval} />
        </div>
      </div>

      <AnimatedPlaceholder loading={!sync && isLoading} skeletonCount={3}>
        {sync ? (
          <div className="flex flex-col gap-4">
            <SyncStats sync={sync} onOpenDetail={setOpenDetail} />
            <SyncTimeline sync={sync} />
          </div>
        ) : null}
      </AnimatedPlaceholder>

      <SyncDetailSheet
        sync={sync}
        openDetail={openDetail}
        onOpenChange={(open) => !open && setOpenDetail(null)}
      />
    </section>
  );
};

export default SyncDetail;
