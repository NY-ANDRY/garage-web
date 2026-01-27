import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { StatsClientTotal } from "@/types/Types";

import { useTranslation } from "react-i18next";

type CardsClientsProps = {
  totalClients: StatsClientTotal | undefined;
};

const CardsClients = ({ totalClients }: CardsClientsProps) => {
  const { t } = useTranslation();

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("clients.cards_total_client")}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalClients ? totalClients.total_clients.toLocaleString() : "..."}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm"></CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("clients.cards_filtered_client")}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalClients ? totalClients.filtered_clients.toLocaleString() : "..."}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm"></CardFooter>
      </Card>
    </div>
  );
}

export default CardsClients;
