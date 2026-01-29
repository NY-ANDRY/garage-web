import type { Paiement } from "@/types/Types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatFirestoreTimestamp } from "@/lib/utils";
import { CreditCard } from "lucide-react";

type ReparationDetailPaiementsProps = {
  paiements: Paiement[];
  paiementTotal: number;
  loading?: boolean;
};

const ReparationDetailPaiements = ({
  paiements,
  paiementTotal,
  loading = false,
}: ReparationDetailPaiementsProps) => {
  if (loading) {
    return (
      <Card className="border rounded-xl shadow-none">
        <CardHeader className="px-4">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Paiements
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-28 inline-block" />
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border rounded-xl shadow-none">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Paiements
        </CardTitle>
        <CardDescription>
          Total payé : {paiementTotal.toFixed(2)} €
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        {paiements?.length ? (
          <ul className="space-y-2">
            {paiements.map((p, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {formatFirestoreTimestamp(p.date)}
                </span>
                <span className="font-medium">{p.montant.toFixed(2)} €</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            Aucun paiement enregistré.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ReparationDetailPaiements;
