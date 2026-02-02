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

  const [chartData, setChartData] = useState<StatsInterventions | undefined>(
    undefined,
  );
  const { data } = useInterventionsStats();

  useEffect(() => {
    if (data?.data) {
      setChartData(data?.data);
    }
  }, [data]);

  useEffect(() => {
    setBreadcrumbs([{ label: t("sidebar.dashboard") }]);
  }, [t, setBreadcrumbs]);

  return (
    <section className="flex flex-col py-4 px-2 gap-4 md:gap-6 md:py-6 md:px-4 max-w-full overflow-hidden min-h-full">
      <div className="flex items-center justify-between gap-2">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 flex w-full">
          Interventions
        </h2>
        <ChartFilter setChartData={setChartData} />
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-8 justify-between">
          <CardsInterventions total={chartData?.sum} />
          <ChartBar items={chartData?.stats} />
        </div>
      <TableIntervention items={chartData?.stats} />
      </div>
    </section>
  );
};

export default Index;
