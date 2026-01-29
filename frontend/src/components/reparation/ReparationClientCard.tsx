import type { Reparation } from "@/types/Types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Car,
  CreditCard,
  Wrench,
  ArrowRight,
} from "lucide-react";
import {
  getStatutLabel,
  getPaiementLabel,
  formatFirestoreTimestamp,
} from "@/lib/utils";
import { useNavigate } from "react-router-dom";

type ReparationClientCardProps = {
  reparation: Reparation;
  onClick?: (reparation: Reparation) => void;
};

const ReparationClientCard = ({
  reparation,
  onClick,
}: ReparationClientCardProps) => {
  const navigate = useNavigate();
  const statut = getStatutLabel(reparation.statut);
  const paiement = getPaiementLabel(reparation.paiement_statut);

  const handleClick = () => {
    onClick?.(reparation);
    navigate(`/frontoffice/reparations/${reparation.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="group cursor-pointer transition-all rounded-xl gap-2 pt-2 pb-5 border-0 shadow-none"
    >
      <CardContent className="p-4 space-y-3 flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center gap-3">
          {reparation.voiture.url_img ? (
            <img
              src={reparation.voiture.url_img}
              alt={reparation.voiture.nom}
              className="h-12 w-12 rounded-xl object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
              <Car className="h-5 w-5 text-muted-foreground" />
            </div>
          )}

          <div className="flex-1">
            <p className="font-semibold leading-tight">
              {reparation.voiture.nom}
            </p>
            <p className="text-xs text-muted-foreground">
              {reparation.voiture.numero}
            </p>
          </div>

          <Badge variant={statut.variant}>{statut.label}</Badge>
        </div>

        <Separator />

        {/* Infos principales */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span>{formatFirestoreTimestamp(reparation.date)}</span>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <Badge variant={paiement.variant}>{paiement.label}</Badge>
          </div>
        </div>

        {/* Interventions */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Wrench className="h-4 w-4" />
          <span>
            {reparation.interventions.length} intervention
            {reparation.interventions.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Montant */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Total à payer</span>
          <span className="font-bold text-lg">
            {reparation.total_a_payer.toFixed(2)} €
          </span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-center gap-1">
        {/* Texte */}
        <span
          className="
                      text-sm text-muted-foreground
                      opacity-100 translate-x-3
                      transition-all duration-300
                      group-hover:translate-x-0
                    "
        >
          Voir détails
        </span>

        {/* Flèche */}
        <ArrowRight
          className="
                      h-4 w-4 opacity-0
                      transition-all duration-300
                      group-hover:translate-x-2
                      group-hover:opacity-70
                    "
        />
      </CardFooter>
    </Card>
  );
};

export default ReparationClientCard;
