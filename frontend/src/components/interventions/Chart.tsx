import { useState } from "react";
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
import type { ChartDataItem } from "@/types/Types";

const initialChartData: ChartDataItem[] = [
  { nom: "Vidange", nombre: 186, prix: 80 },
  { nom: "Refroidissement", nombre: 305, prix: 200 },
  { nom: "Pneu", nombre: 237, prix: 120 },
  { nom: "Filtre", nombre: 73, prix: 190 },
  { nom: "Embrayage", nombre: 209, prix: 130 },
  { nom: "Amortisseur", nombre: 214, prix: 140 },
  { nom: "Batterie", nombre: 250, prix: 160 },
  { nom: "Frein", nombre: 230, prix: 150 },
];

const chartConfig = {
  nombre: {
    label: "Nombre",
    color: "#666666",
  },
  prix: {
    label: "Cost",
    color: "#aaaaaa",
  },
} satisfies ChartConfig;

const Chart = () => {
  const [chartData, setChartData] = useState<ChartDataItem[]>(initialChartData);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        {/* Filtre au-dessus */}
        <div className="w-full">
          <ChartFilter setChartData={setChartData} />
        </div>

        <div className="w-full">
          <ChartContainer config={chartConfig} className="w-full">
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
