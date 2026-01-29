import { useState, useEffect } from "react";
import { useHeader } from "@/context/HeaderContext";
import { useTranslation } from "react-i18next";
import CrudInterventions from "@/components/interventions/CrudIntervention";
import type { Intervention } from "@/types/Types";
import ListIntervention from "@/components/interventions/ListIntervention";
import ListInterventionSkeleton from "@/components/interventions/ListInterventionSkeleton";
import EmptyIntervention from "@/components/interventions/EmptyIntervention";
import { useParams } from "react-router-dom";
import { useUrlSegment } from "@/hooks/useUrlSegment";
import { useInterventions } from "@/domain";
import AnimatedPlaceholder from "@/components/animations/AnimatedPlaceholder";

const Interventions = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { setBreadcrumbs } = useHeader();

  const [selectedIntervention, setSelectedIntervention] =
    useState<Intervention | null>(null);
  const [selectedId, setSelectedId] = useState<string>(id ?? "");

  const { replaceSegment } = useUrlSegment();
  const { data, isLoading, refetch } = useInterventions();

  const interventions = data?.data ?? [];

  useEffect(() => {
    if (data && selectedId) {
      const found = data.data.find((d) => d.id === selectedId);
      if (found) setSelectedIntervention(found);
    }
  }, [data, selectedId]);

  useEffect(() => {
    setBreadcrumbs([
      { label: t("sidebar.dashboard"), href: "/backoffice/dashboard" },
      { label: t("sidebar.interventions") },
    ]);
  }, [t, setBreadcrumbs]);

  const handleSelect = (intervention: Intervention) => {
    setSelectedId(intervention.id);
    setSelectedIntervention(intervention);
    setBreadcrumbs([
      { label: t("sidebar.dashboard"), href: "/backoffice/dashboard" },
      { label: t("sidebar.interventions") },
      { label: intervention.id },
    ]);

    replaceSegment(intervention.id, 2);
  };

  const reload = async () => {
    refetch();
  };

  return (
    <div className="min-h-full flex flex-col md:flex-row py-4 px-2 gap-6 md:py-6 md:px-4 max-w-full overflow-hidden">
      <div className="flex flex-col gap-2 w-full md:w-1/3">
        <AnimatedPlaceholder
          loading={isLoading}
          skeletonCount={1}
          skeletonClassName="hidden"
        >
          <div className="flex flex-col gap-2 w-full">
            {interventions.map((interv) => (
              <ListIntervention
                key={interv.id}
                intervention={interv}
                onSelect={handleSelect}
                selected={selectedIntervention?.id === interv.id}
              />
            ))}
          </div>
        </AnimatedPlaceholder>
      </div>

      <div className="flex flex-col w-full md:w-2/3">
        <AnimatedPlaceholder loading={false} skeletonCount={0}>
          {selectedIntervention ? (
            <CrudInterventions
              reload={reload}
              intervention={selectedIntervention}
            />
          ) : (
            <EmptyIntervention />
          )}
        </AnimatedPlaceholder>
      </div>
    </div>
  );
};

export default Interventions;
