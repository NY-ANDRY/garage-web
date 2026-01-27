import { useTranslation } from "react-i18next";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { StatsInterventionItem } from "@/types/Types";

type ChartInterventionsProps = {
  items: StatsInterventionItem[] | undefined;
};

const ChartInterventions = ({ items }: ChartInterventionsProps) => {
  const { t } = useTranslation();

  const chartConfig1 = {
    nombre_total: {
      label: t("interventions.number"),
      color: "#ffffff",
    },
  } satisfies ChartConfig;

  const chartConfig2 = {
    montant_total: {
      label: t("interventions.cost"),
      color: "#ffffff",
    },
  } satisfies ChartConfig;

  const chartData = items?.map((item) => ({
    ...item,
    montant_total: Number(item.montant_total),
  }));

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-center justify-between">
      <ChartContainer config={chartConfig2} className="w-full min-w-80 h-96">
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
            tickFormatter={(value) => value.slice(0, 8)}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="montant_total" fill="#aaa" radius={4} />
        </BarChart>
      </ChartContainer>
      <ChartContainer config={chartConfig1} className="w-full min-w-80 h-96">
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
            tickFormatter={(value) => value.slice(0, 8)}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="nombre_total" fill="#aaa" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartInterventions;
