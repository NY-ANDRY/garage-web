import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
                <YAxis
                  domain={[0, "dataMax"]}
                  allowDataOverflow={false}
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
                  type="monotone"
                  fill="url(#fillNumber)"
                  stroke="var(--primary)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
    </div>
  );
};

export default ChartClients;
