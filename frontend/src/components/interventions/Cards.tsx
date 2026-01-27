import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { API_BASE_URL } from "@/lib/constants";
import type { ApiResponse, InterventionMaxStats } from "@/types/Types";
import { useTranslation } from "react-i18next";

export function Cards() {
  const { t } = useTranslation();

  // On récupère les stats depuis l'API
  const { data, isLoading, error } = useFetch<
    ApiResponse<InterventionMaxStats>
  >(`${API_BASE_URL}/stats/interventions/max`);

  const stats = data?.data;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("interventions.total_revenue")}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-center gap-1">
            <span>{t("currency")}</span>
            <span>
              {isLoading
                ? "..."
                : stats
                  ? `${stats.total_cost.toLocaleString()}`
                  : "..."}
            </span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm"></CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("interventions.total_number")}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading
              ? "..."
              : stats
                ? stats.total_number.toLocaleString()
                : "..."}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm"></CardFooter>
      </Card>
    </div>
  );
}
