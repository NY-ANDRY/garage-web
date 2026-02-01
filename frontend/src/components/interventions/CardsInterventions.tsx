import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { StatsInterventionTotal } from "@/types/Types";
import { useTranslation } from "react-i18next";
import { writeNumber } from "@/lib/utils";

type CardsInterventionsProps = {
  total: StatsInterventionTotal | undefined | null;
};

export function CardsInterventions({ total }: CardsInterventionsProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-full! *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("interventions.total_revenue")}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-center gap-1">
            <span>{t("currency")}</span>
            <span>{total && writeNumber(total.montant_total)}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm"></CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("interventions.total_number")}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {total && writeNumber(total.nombre_total)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm"></CardFooter>
      </Card>
    </div>
  );
}
