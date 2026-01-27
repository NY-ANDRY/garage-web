import { useState, useEffect } from "react";
import { useHeader } from "@/context/HeaderContext";
import { useTranslation } from "react-i18next";
import CrudInterventions from "@/components/interventions/CrudIntervention";
import useFetch from "@/hooks/useFetch";
import { API_BASE_URL } from "@/lib/constants";
import type { ApiResponse, Intervention } from "@/types/Types";
import ListIntervention from "@/components/interventions/ListIntervention";
import ListInterventionSkeleton from "@/components/interventions/ListInterventionSkeleton";
import { AnimatePresence, motion } from "motion/react";
import { fade } from "@/components/transitions/tansitions";
import EmptyIntervention from "@/components/interventions/EmptyIntervention";

const Interventions = () => {
  const { t } = useTranslation();
  const { setBreadcrumbs } = useHeader();
  const [selectedIntervention, setSelectedIntervention] =
    useState<Intervention | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");

  const { data, isLoading, refetch } = useFetch<ApiResponse<Intervention[]>>(
    API_BASE_URL + `/interventions`,
  );
  const interventions = data?.data ?? [];

  useEffect(() => {
    if (data && selectedId) {
      data.data.forEach((d) => {
        if (d.id == selectedId) {
          setSelectedIntervention(d);
        }
      })
    }
  }, [data]);

  useEffect(() => {
    setBreadcrumbs([
      { label: t("sidebar.dashboard"), href: "/backoffice/dashboard" },
      { label: t("sidebar.interventions") },
    ]);
  }, [t, setBreadcrumbs]);

  const handleSelect = (intervention: Intervention) => {
    setSelectedId(intervention.id);
    setBreadcrumbs([
      { label: t("sidebar.dashboard"), href: "/backoffice/dashboard" },
      { label: t("sidebar.interventions") },
      { label: intervention.id },
    ]);
    setSelectedIntervention(intervention);
  };

  const reload = async () => {
    refetch();
  };

  return (
    <div className="min-h-full flex flex-col md:flex-row py-4 px-2 gap-6 md:py-6 md:px-4 max-w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key={0}
            {...fade}
            className="flex flex-col gap-2 w-full md:w-1/3"
          >
            <ListInterventionSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key={1}
            {...fade}
            className="flex flex-col gap-2 w-full md:w-1/3"
          >
            {interventions?.map((interv) => (
              <ListIntervention
                key={interv.id}
                intervention={interv}
                onSelect={handleSelect}
                selected={
                  selectedIntervention
                    ? selectedIntervention.id == interv.id
                    : false
                }
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col w-full md:w-2/3">
        <AnimatePresence mode="wait">
          {selectedIntervention ? (
            <CrudInterventions
              key={0}
              reload={reload}
              intervention={selectedIntervention}
            />
          ) : (
            <motion.div
              key={1}
              {...fade}
              className="h-full flex flex-col gap-2 w-full"
            >
              <EmptyIntervention />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Interventions;
