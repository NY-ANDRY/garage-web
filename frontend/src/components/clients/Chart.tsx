import { useState, useEffect } from "react";
import ChartFilter from "./ChartFilter";
import type { ClientChartData } from "@/types/Types";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import useFetch from "@/hooks/useFetch";
import { API_BASE_URL } from "@/lib/constants";

const Chart = () => {
  const { t, i18n } = useTranslation();
  const [chartData, setChartData] = useState<ClientChartData[]>([]);
  const { data } = useFetch<ClientChartData[]>(API_BASE_URL + `/stats/users`);

  const chartConfig = {
    number: {
      label: t("clients.total_clients"),
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    if (data) {
      setChartData(data);
    }
  }, [data]);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="w-full">
        <ChartFilter setChartData={setChartData} />
      </div>

      <div className="w-full flex-1">
        <Card className="@container/card min-h-full flex flex-col">
          <CardHeader>
            <CardTitle>{t("clients.total_clients")}</CardTitle>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex-1">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-106 w-full"
            >
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="fillNumber" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--primary)"
                      stopOpacity={1}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--primary)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString(i18n.language, {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString(
                          i18n.language,
                          {
                            month: "short",
                            day: "numeric",
                          },
                        );
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="number"
                  type="natural"
                  fill="url(#fillNumber)"
                  stroke="var(--primary)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>{" "}
      </div>
    </div>
  );
};

export default Chart;
