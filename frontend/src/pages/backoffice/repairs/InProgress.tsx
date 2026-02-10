import React, { useEffect } from "react";
import { useReparationsInProgress } from "@/domain/index";
import {
  ItemGroup,
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemSeparator,
} from "@/components/ui/item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { getStatutLabel } from "@/lib/utils";
import { useHeader } from "@/context/HeaderContext";
import { Fragment } from "react";

const InProgress: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { setBreadcrumbs } = useHeader();
  const { data: repairs, loading } = useReparationsInProgress();

  // Date-fns locale based on i18n
  const dateLocale = i18n.language === "en" ? enUS : fr;

  useEffect(() => {
    setBreadcrumbs([
      { label: t("sidebar.repairs_in_progress") }
    ]);
  }, [setBreadcrumbs, t]);

  return (
    <div className="p-6 space-y-6">
      <CardHeader className="px-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <CardTitle className="text-3xl capitalize">
          {t("backoffice.repairs_in_progress_title")}
        </CardTitle>
      </CardHeader>
      <Card className="border-none shadow-none">
        <CardContent className="px-0">
          <ItemGroup>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="flex items-center p-4 gap-4">
                  <Skeleton className="h-12 w-12 rounded-sm" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-62.5" />
                    <Skeleton className="h-4 w-50" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              ))
            ) : repairs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                <p>{t("backoffice.no_repairs_found")}</p>
              </div>
            ) : (
              repairs.map((repair, index) => (
                <Fragment key={repair.id}>
                  <Item className="hover:bg-muted/50 transition-colors">
                    <ItemContent>
                      <ItemTitle>
                        {repair.voiture ? (
                          <>
                            {repair.voiture.marque} - {repair.voiture.numero}
                          </>
                        ) : (
                          t("common.unknown_car")
                        )}
                      </ItemTitle>
                      <ItemDescription>
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-2 sm:items-center">
                           <span>
                             {repair.user?.displayName || repair.user?.email || "N/A"}
                           </span>
                           <span className="hidden sm:inline">•</span>
                           <span>
                             {repair.date
                               ? format(repair.date.toDate(), "PPP", {
                                   locale: dateLocale,
                                 })
                               : "N/A"}
                           </span>
                           <span className="hidden sm:inline">•</span>
                           <span className="font-mono text-xs text-muted-foreground">
                             {repair.id?.substring(0, 8)}
                           </span>
                        </div>
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Badge variant={getStatutLabel(repair.statut).variant}>
                        {getStatutLabel(repair.statut).label}
                      </Badge>
                    </ItemActions>
                  </Item>
                  {index < repairs.length - 1 && <ItemSeparator />}
                </Fragment>
              ))
            )}
          </ItemGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default InProgress;
