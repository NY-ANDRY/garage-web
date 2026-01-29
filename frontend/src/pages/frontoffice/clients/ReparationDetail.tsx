import { useParams, useNavigate } from "react-router-dom";
import { useReparationById } from "@/domain/reparations/useReparationById";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ReparationDetailHeader,
  ReparationDetailUser,
  ReparationDetailVoiture,
  ReparationDetailInterventions,
  ReparationDetailPaiements,
  ReparationDetailStatutHisto,
} from "@/components/reparation-detail";
import { ArrowLeft } from "lucide-react";

const ReparationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: reparation, loading } = useReparationById(id);

  if (!loading && !reparation) {
    return (
      <div className="min-h-screen flex flex-1 flex-col gap-4 p-4">
        <p className="text-muted-foreground">Réparation introuvable.</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-1 flex-col w-full pb-24">
      <div className="flex flex-col w-full p-4 gap-0">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit -ml-1 mb-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>

        <ReparationDetailHeader
          reparation={reparation ?? null}
          loading={loading}
        />

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReparationDetailUser
            user={reparation?.user ?? null}
            loading={loading}
          />
          <ReparationDetailVoiture
            voiture={reparation?.voiture ?? null}
            loading={loading}
          />
        </div>

        <Separator className="my-6" />

        <ReparationDetailInterventions
          interventions={reparation?.interventions ?? []}
          loading={loading}
        />

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReparationDetailPaiements
            paiements={reparation?.paiements ?? []}
            paiementTotal={reparation?.paiement_total ?? 0}
            loading={loading}
          />
          <ReparationDetailStatutHisto
            statutHisto={reparation?.statut_histo ?? []}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ReparationDetail;
