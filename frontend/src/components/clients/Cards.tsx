import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { API_BASE_URL } from "@/lib/constants";
import type { ApiResponse, UserMaxStats } from "@/types/Types";

import { useTranslation } from "react-i18next";

export function Cards() {
  const { t } = useTranslation();

  const { data, isLoading, error } = useFetch<ApiResponse<UserMaxStats>>(
    `${API_BASE_URL}/stats/interventions/max`,
  );

  const stats = data?.data;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("clients.cards_total_client")}</CardDescription>
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
