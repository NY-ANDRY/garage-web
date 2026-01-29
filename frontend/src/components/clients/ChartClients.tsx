import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { type ClientChartData } from "@/types/Types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type ChartClientsProps = {
  chartData: ClientChartData[] | undefined;
};

const ChartClients = ({ chartData }: ChartClientsProps) => {
  const { t, i18n } = useTranslation();

  const chartConfig = {
    number: {
      label: t("clients.total_clients"),
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Card className="@container/card min-h-full flex flex-col">
        <CardHeader>
          <CardTitle>{t("clients.total_clients")}</CardTitle>
        </CardHeader>

        <CardContent className="px-0 sm:pt-6 flex-1 pr-4 md:pr-8">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-106 w-full"
          >
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                interval={0}
                tickMargin={2}
                tick={{ fontSize: 9, letterSpacing: 0.2 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString(i18n.language, {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />

              <YAxis domain={[0, "dataMax"]} />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString(i18n.language, {
                        year: "numeric" ,
                        month: "long",
                        day: "numeric",
                      })
                    }
                  />
                }
              />

              <Bar dataKey="number" radius={[6, 6, 0, 0]} fill="#aaa" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartClients;
