import { useEffect, useState } from "react";
import { useHeader } from "@/context/HeaderContext";
import { useTranslation } from "react-i18next";
import { CardsInterventions } from "@/components/interventions/CardsInterventions";
import ChartBar from "@/components/interventions/ChartInterventions";
import TableIntervention from "@/components/interventions/TableInterventions";
import ChartFilter from "@/components/interventions/ChartFilter";
import type { ApiResponse, StatsInterventions } from "@/types/Types";
import useFetch from "@/hooks/useFetch";
import { API_BASE_URL } from "@/lib/constants";

const Index = () => {
  const { t } = useTranslation();
  const { setBreadcrumbs } = useHeader();

  const [chartData, setChartData] = useState<StatsInterventions | undefined>(
    undefined,
  );
  const { data } = useFetch<ApiResponse<StatsInterventions>>(
    API_BASE_URL + `/stats/interventions`,
  );

  useEffect(() => {
    if (data?.data) {
      setChartData(data?.data);
    }
  }, [data]);

  useEffect(() => {
    setBreadcrumbs([{ label: t("sidebar.dashboard") }]);
  }, [t, setBreadcrumbs]);

  return (
    <div className="flex flex-col py-4 px-2 md:gap-6 md:py-6 md:px-4 max-w-full overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Dashboard Interventions
        </h2>
        <ChartFilter setChartData={setChartData} />
      </div>

      <CardsInterventions total={chartData?.sum} />
      <ChartBar items={chartData?.stats} />
      <TableIntervention items={chartData?.stats} />
    </div>
  );
};

export default Index;
