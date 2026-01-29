import type { Reparation } from "@/types/Types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getStatutLabel, getPaiementLabel, formatFirestoreTimestamp } from "@/lib/utils";
import { FileText } from "lucide-react";

type ReparationDetailHeaderProps = {
  reparation: Reparation | null;
  loading?: boolean;
};

const ReparationDetailHeader = ({
  reparation,
  loading = false,
}: ReparationDetailHeaderProps) => {
  if (loading || !reparation) {
    return (
      <Card className="border-0 rounded-xl shadow-none bg-transparent">
        <CardHeader className="px-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <Skeleton className="h-7 w-40" />
        </CardContent>
      </Card>
    );
  }

  const statut = getStatutLabel(reparation.statut);
  const paiement = getPaiementLabel(reparation.paiement_statut);

  return (
    <Card className="border-0 rounded-xl shadow-none bg-transparent">
      <CardHeader className="px-0 flex flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Réparation
          </CardTitle>
          <CardDescription>
            {formatFirestoreTimestamp(reparation.date)}
          </CardDescription>
        </div>
        <div className="flex gap-2 shrink-0">
          <Badge variant={statut.variant}>{statut.label}</Badge>
          <Badge variant={paiement.variant}>{paiement.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex items-center gap-4 text-lg font-semibold">
          <span className="text-muted-foreground">Total à payer</span>
          <span>{reparation.total_a_payer.toFixed(2)} €</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReparationDetailHeader;
