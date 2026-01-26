import type { Intervention } from "@/types/Types";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { CloudDownload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFirestoreDoc } from "@/hooks/useFirestoreDoc";
import { useFirestoreMutation } from "@/hooks/useFirestoreMutation";
import { toast } from "sonner";

type CrudLocalInterventionProps = {
  intervention: Intervention;
};

const CrudLocalIntervention = ({
  intervention,
}: CrudLocalInterventionProps) => {
  const { mutate } = useFirestoreMutation<Intervention>("interventions");
  const { data: dataFire } = useFirestoreDoc<Intervention>(
    `interventions/${intervention.id}`,
  );

  const [interventionForm, setInteventionForm] =
    useState<Intervention | null>();

  useEffect(() => {
    if (intervention) {
      setInteventionForm(intervention);
    }
  }, [intervention]);

  const handleDelete = () => {
    if (!interventionForm?.id) {
      console.error("ID manquant pour etre effacer");
      return;
    }

    toast.promise(
      async () => {
        await mutate(interventionForm, {
          type: "delete",
          id: interventionForm.id,
        });
        return interventionForm;
      },
      {
        loading: "Delete en cours...",
        success: (data) => `${data.nom} a été effacer avec succès !`,
        error: "Erreur lors du delete",
      },
    );
  };

  return (
    <FieldSet className="w-full max-w-sm">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <FieldLegend>Firebase</FieldLegend>
          <FieldDescription>
            Interventions qui sera afficher au clients
          </FieldDescription>
        </div>
        <div className="flex-col">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button
                  size="icon-sm"
                  variant="outline"
                  className="rounded-full"
                  aria-label="Invite"
                >
                  <CloudDownload />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                  <DialogTitle>Download Firestore</DialogTitle>
                  <DialogDescription>
                    cette action va reecrire les valeur des intervention courant
                    avec les valeur des intervention de firestore
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Download</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
      <FieldGroup className="gap-4">
        <Field className="gap-1">
          <FieldLabel htmlFor="street">Nom</FieldLabel>
          <Input
            disabled
            readOnly
            value={dataFire?.nom ?? ""}
            id="street"
            type="text"
            placeholder="..."
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-1">
            <FieldLabel htmlFor="city">Prix</FieldLabel>
            <Input
              disabled
              readOnly
              value={dataFire?.prix ?? ""}
              id="city"
              type="text"
              placeholder="..."
            />
          </Field>
          <Field className="gap-1">
            <FieldLabel htmlFor="zip">Duree</FieldLabel>
            <Input
              disabled
              readOnly
              value={dataFire?.duree ?? ""}
              id="zip"
              type="text"
              placeholder="..."
            />
          </Field>
        </div>
      </FieldGroup>
      <Field orientation="horizontal" className="flex justify-end">
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="destructive" type="button" size={"sm"}>
                Effacer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
              <DialogHeader>
                <DialogTitle>Download Firestore</DialogTitle>
                <DialogDescription>
                  cette action va reecrire les valeur des intervention courant
                  avec les valeur des intervention de firestore
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={handleDelete}
                    variant="destructive"
                    type="button"
                    size={"sm"}
                  >
                    Effacer
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
        <Button type="submit" size={"sm"}>
          Recuperer
        </Button>
      </Field>
    </FieldSet>
  );
};

export default CrudLocalIntervention;
