import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { Synchronisation } from "@/types/Types";

interface SyncTimelineProps {
  sync: Synchronisation;
}

export const SyncTimeline: React.FC<SyncTimelineProps> = ({ sync }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("common.timeline")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sync.statuts?.map((s, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full mt-2 bg-primary" />
              <div>
                <p className="font-medium">{s.statut}</p>
                <p className="text-sm text-muted-foreground">
                  {s.pivot?.created_at
                    ? format(new Date(s.pivot.created_at), "PPpp", {
                        locale: fr,
                      })
                    : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
