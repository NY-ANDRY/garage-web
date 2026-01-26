import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import ChartFilter from "./ChartFilter";
import type { InterventionChartData, ApiResponse } from "@/types/Types";
import useFetch from "@/hooks/useFetch";
import { API_BASE_URL } from "@/lib/constants";

// /stats/interventions
const Chart = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState<InterventionChartData[]>([]);
  const { data } = useFetch<ApiResponse<InterventionChartData[]>>(
    API_BASE_URL + `/stats/interventions/chart`,
  );

  const chartConfig = {
    nombre: {
      label: t("interventions.number"),
      color: "#666666",
    },
    prix: {
      label: t("interventions.cost"),
      color: "#aaaaaa",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    if (data?.data) {
      setChartData(data?.data);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <ChartFilter setChartData={setChartData} />
        </div>

        <div className="w-full">
          <ChartContainer config={chartConfig} className="w-full h-160">
            <BarChart
              accessibilityLayer
              data={chartData}
              barCategoryGap="12%"
              barGap={6}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="nom"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="nombre" fill="var(--color-nombre)" radius={4} />
              <Bar dataKey="prix" fill="var(--color-prix)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default Chart;
