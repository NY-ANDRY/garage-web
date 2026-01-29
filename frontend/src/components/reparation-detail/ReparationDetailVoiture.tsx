import type { Voiture } from "@/types/Types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Car } from "lucide-react";

type ReparationDetailVoitureProps = {
  voiture: Voiture | null;
  loading?: boolean;
};

const ReparationDetailVoiture = ({
  voiture,
  loading = false,
}: ReparationDetailVoitureProps) => {
  if (loading || !voiture) {
    return (
      <Card className="border rounded-xl shadow-none">
        <CardHeader className="px-4">
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Véhicule
          </CardTitle>
          <CardDescription>Véhicule concerné par la réparation</CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-28 rounded-lg shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border rounded-xl shadow-none">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Véhicule
        </CardTitle>
        <CardDescription>Véhicule concerné par la réparation</CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <div className="flex items-center gap-4">
          {voiture.url_img ? (
            <img
              src={voiture.url_img}
              alt={voiture.nom}
              className="h-20 w-28 rounded-lg object-cover border shrink-0"
            />
          ) : (
            <div className="h-20 w-28 rounded-lg bg-muted flex items-center justify-center border shrink-0">
              <Car className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <div className="space-y-1 min-w-0">
            <p className="font-medium truncate">{voiture.nom}</p>
            <p className="text-sm text-muted-foreground">
              Immatriculation : {voiture.numero}
            </p>
            {(voiture.marque || voiture.annee) && (
              <p className="text-sm text-muted-foreground">
                {[voiture.marque, voiture.annee].filter(Boolean).join(" • ")}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReparationDetailVoiture;
