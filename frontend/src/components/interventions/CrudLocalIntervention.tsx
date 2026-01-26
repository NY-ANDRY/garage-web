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
import { CloudUpload } from "lucide-react";
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
import { useFirestoreMutation } from "@/hooks/useFirestoreMutation";
import { toast } from "sonner";

type CrudLocalInterventionProps = {
  intervention: Intervention;
};

const CrudLocalIntervention = ({
  intervention,
}: CrudLocalInterventionProps) => {
  const { mutate } = useFirestoreMutation<Intervention>("interventions");
  const [interventionForm, setInterventionForm] = useState<Intervention | null>(
    null,
  );

  useEffect(() => {
    if (intervention) {
      setInterventionForm(intervention);
    }
  }, [intervention]);

  const handleChange = (field: keyof Intervention, value: string) => {
    setInterventionForm((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", interventionForm);
  };

  const handleUpload = async () => {
    if (!interventionForm?.id) {
      console.error("ID manquant pour la mise à jour");
      return;
    }

    toast.promise(
      async () => {
        await mutate(interventionForm, {
          type: "set",
          id: interventionForm.id,
        });
        return interventionForm;
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
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <FieldLegend>Local</FieldLegend>
          <FieldDescription>Intervention dans la base locale</FieldDescription>
        </div>

        <div className="flex flex-col">
          <Dialog>
            <form onSubmit={handleSubmit}>
              <DialogTrigger asChild>
                <Button
                  size="icon-sm"
                  variant="outline"
                  className="rounded-full"
                  aria-label="Upload"
                >
                  <CloudUpload />
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                  <DialogTitle>Upload Firestore</DialogTitle>
                  <DialogDescription>
                    Cette action écrasera les données existantes dans Firestore.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button" onClick={handleUpload}>
                      Upload
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>

      <FieldGroup className="gap-4">
        <Field className="gap-1">
          <FieldLabel htmlFor="nom">Nom</FieldLabel>
          <Input
            id="nom"
            type="text"
            placeholder="Nom de l'intervention"
            value={interventionForm?.nom ?? ""}
            onChange={(e) => handleChange("nom", e.target.value)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-1">
            <FieldLabel htmlFor="prix">Prix</FieldLabel>
            <Input
              id="prix"
              type="number"
              placeholder="Prix"
              value={interventionForm?.prix ?? ""}
              onChange={(e) => handleChange("prix", e.target.value)}
            />
          </Field>

          <Field className="gap-1">
            <FieldLabel htmlFor="duree">Durée</FieldLabel>
            <Input
              id="duree"
              type="number"
              placeholder="Durée en minutes"
              value={interventionForm?.duree ?? ""}
              onChange={(e) => handleChange("duree", e.target.value)}
            />
          </Field>
        </div>
      </FieldGroup>

      <Field orientation="horizontal" className="flex justify-end">
        <Button type="submit" size="sm" onClick={handleSubmit}>
          Sauvegarder
        </Button>
      </Field>
    </FieldSet>
  );
};

export default CrudLocalIntervention;
