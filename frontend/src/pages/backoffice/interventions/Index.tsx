import { useEffect, useState } from "react";
import { useHeader } from "@/context/HeaderContext";
import { useTranslation } from "react-i18next";
import { CardsInterventions } from "@/components/interventions/CardsInterventions";
import ChartBar from "@/components/interventions/ChartInterventions";
import TableIntervention from "@/components/interventions/TableInterventions";
import ChartFilter from "@/components/interventions/FilterInterventions";
import type { StatsInterventions } from "@/types/Types";
import { useInterventionsStats } from "@/domain";

const Index = () => {
  const { t } = useTranslation();
  const { setBreadcrumbs } = useHeader();
  const [stats, setStats] = useState<StatsInterventions | undefined>();

  useEffect(() => {
    setBreadcrumbs([{ label: t("sidebar.dashboard"), href: "/backoffice" }]);
  }, [setBreadcrumbs, t]);

  const { data } = useInterventionsStats();

  useEffect(() => {
    if (data?.success) {
      setStats(data.data);
    }
  }, [data]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 mt-4">
        <h1 className="text-3xl font-bold tracking-tight capitalize">
          {t("backoffice.interventions_title")}
        </h1>
        <ChartFilter setChartData={setStats} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="flex flex-col col-span-1 lg:col-span-5 gap-8">
          <CardsInterventions total={stats?.sum} />
          <ChartBar items={stats?.stats} />
        </div>
        <div className="flex w-full col-span-1 lg:col-span-7">
          <TableIntervention items={stats?.stats} />
        </div>
      </div>
    </div>
  );
};

export default Index;
