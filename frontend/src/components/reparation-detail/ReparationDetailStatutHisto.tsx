import type { Statut_histo } from "@/types/Types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getStatutLabel, formatFirestoreTimestamp } from "@/lib/utils";
import { CalendarDays } from "lucide-react";

type ReparationDetailStatutHistoProps = {
  statutHisto: Statut_histo[];
  loading?: boolean;
};

const ReparationDetailStatutHisto = ({
  statutHisto,
  loading = false,
}: ReparationDetailStatutHistoProps) => {
  if (loading) {
    return (
      <Card className="border rounded-xl shadow-none">
        <CardHeader className="px-4">
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Historique du statut
          </CardTitle>
          <CardDescription>Évolution de la réparation</CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border rounded-xl shadow-none">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Historique du statut
        </CardTitle>
        <CardDescription>Évolution de la réparation</CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        {statutHisto?.length ? (
          <ul className="space-y-2">
            {statutHisto.map((h, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <Badge variant="outline" className="text-xs">
                  {getStatutLabel(h.statut).label}
                </Badge>
                <span className="text-muted-foreground shrink-0">
                  {formatFirestoreTimestamp(h.date)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Aucun historique.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ReparationDetailStatutHisto;
