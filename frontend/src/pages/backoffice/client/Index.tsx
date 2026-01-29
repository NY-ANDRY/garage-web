import { useState, useEffect } from "react";
import { useHeader } from "@/context/HeaderContext";
import { useTranslation } from "react-i18next";
import Cards from "@/components/clients/CardsClients";
import ChartBar from "@/components/clients/ChartClients";
import ChartFilter from "@/components/clients/FilterClients";
import type { StatsClients } from "@/types/Types";
import { useClientsStats } from "@/domain";

const Index = () => {
  const { t } = useTranslation();
  const { setBreadcrumbs } = useHeader();
  const [chartData, setChartData] = useState<StatsClients | undefined>(
      undefined,
    );

  const { data } = useClientsStats();

  useEffect(() => {
      if (data?.data) {
        setChartData(data.data);
      }
    }, [data]);

  useEffect(() => {
    setBreadcrumbs([
      { label: t("sidebar.dashboard"), href: "/backoffice/dashboard" },
      { label: t("sidebar.clients") },
    ]);
  }, [t, setBreadcrumbs]);
  return (
    <div className="flex flex-col py-4 px-2 md:gap-6 md:py-6 md:px-4 max-w-full overflow-hidden min-h-full">
      <div className="flex items-center justify-between">
         <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
           {t("sidebar.clients")}
         </h2>
         <ChartFilter setChartData={setChartData} />
      </div>
      <Cards totalClients={chartData?.sum} />
      <ChartBar chartData={chartData?.stats} />
    </div>
  );
};

export default Index;
