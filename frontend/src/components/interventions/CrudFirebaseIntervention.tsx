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
import {
  useInterventionFirestoreDoc,
  useInterventionsFirestoreMutation,
  useUpdateInterventionLocal,
} from "@/domain";
import { toast } from "sonner";

type CrudLocalInterventionProps = {
  intervention: Intervention;
  reload?: () => void;
};

const CrudLocalIntervention = ({
  intervention,
  reload,
}: CrudLocalInterventionProps) => {
  const { mutate: mutateFirebase } = useInterventionsFirestoreMutation();
  const { data: dataFirebase } = useInterventionFirestoreDoc(intervention.id);
  const { mutate: mutateLocal } = useUpdateInterventionLocal(intervention.id);

  const handleDelete = () => {
    if (!intervention?.id) {
      console.error("ID manquant pour etre effacer");
      return;
    }

    toast.promise(
      async () => {
        await mutateFirebase(intervention, {
          type: "delete",
          id: intervention.id,
        });
        return intervention;
      },
      {
        loading: "Delete en cours...",
        success: (data) => `${data.nom} a été effacer avec succès !`,
        error: "Erreur lors du delete",
      },
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataFirebase?.id) {
      console.error("ID manquant pour la mise à jour");
      return;
    }

    dataFirebase.prix = Number(dataFirebase.prix);
    dataFirebase.duree = Number(dataFirebase.duree);

    toast.promise(
      async () => {
        await mutateLocal(dataFirebase);
        if (reload) {
          reload();
        }
        return dataFirebase;
      },
      {
        loading: "Mise à jour en cours...",
        success: (data) => `${data.nom} a été mise à jour avec succès !`,
        error: "Erreur lors de la mise à jour",
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
                  <Button onClick={handleSubmit} type="submit">
                    Download
                  </Button>
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
            readOnly
            value={dataFirebase?.nom ?? ""}
            id="street"
            type="text"
            placeholder="..."
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-1">
            <FieldLabel htmlFor="city">Prix</FieldLabel>
            <Input
              readOnly
              value={dataFirebase?.prix ?? ""}
              id="city"
              type="text"
              placeholder="..."
            />
          </Field>
          <Field className="gap-1">
            <FieldLabel htmlFor="zip">Duree</FieldLabel>
            <Input
              readOnly
              value={dataFirebase?.duree ?? ""}
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
                <DialogTitle>Delete Firestore</DialogTitle>
                <DialogDescription>
                  cette action va effacer ce type d'intervention dans firestore
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
      </Field>
    </FieldSet>
  );
};

export default CrudLocalIntervention;
