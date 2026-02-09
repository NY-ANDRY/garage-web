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
import { toast } from "sonner";
import { useInterventionsFirestoreMutation, useUpdateInterventionLocal } from "@/domain";
import { useTranslation } from "react-i18next";

type CrudLocalInterventionProps = {
  intervention: Intervention;
  reload?: () => void;
};

const CrudLocalIntervention = ({
  intervention,
  reload,
}: CrudLocalInterventionProps) => {
  const { t } = useTranslation();
  const { mutate: mutateFirebase } = useInterventionsFirestoreMutation();
  const [interventionForm, setInterventionForm] = useState<Intervention | null>(
    null,
  );

  const { mutate: mutateLocal } = useUpdateInterventionLocal(intervention.id);

  useEffect(() => {
    if (intervention) {
      intervention.prix = Number(intervention.prix);
      intervention.duree = Number(intervention.duree);
      setInterventionForm(intervention);
    }
  }, [intervention]);

  const handleChange = (field: keyof Intervention, value: string) => {
    setInterventionForm((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interventionForm?.id) {
      console.error("ID manquant pour la mise à jour");
      return;
    }

    interventionForm.prix = Number(interventionForm.prix);
    interventionForm.duree = Number(interventionForm.duree);

    toast.promise(
      async () => {
        await mutateLocal(interventionForm);
        if (reload) {
          reload();
        }
        return interventionForm;
      },
      {
        loading: t("interventions_crud.updating"),
        success: (data) => t("interventions_crud.update_success", { name: data.nom }),
        error: t("interventions_crud.update_error"),
      },
    );
  };

  const handleUpload = async () => {
    if (!interventionForm?.id) {
      console.error("ID manquant pour la mise à jour");
      return;
    }

    toast.promise(
      async () => {
        await mutateFirebase(interventionForm, {
          type: "set",
          id: interventionForm.id,
        });
        return interventionForm;
      },
      {
        loading: t("interventions_crud.updating"),
        success: (data) => t("interventions_crud.update_success", { name: data.nom }),
        error: t("interventions_crud.update_error"),
      },
    );
  };

  return (
    <FieldSet className="w-full max-w-sm">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <FieldLegend>{t("interventions_crud.local_title")}</FieldLegend>
          <FieldDescription>{t("interventions_crud.local_desc")}</FieldDescription>
        </div>

        <div className="flex flex-col">
          <Dialog>
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
                <DialogTitle>{t("interventions_crud.upload_firestore_title")}</DialogTitle>
                <DialogDescription>
                  {t("interventions_crud.upload_firestore_desc")}
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{t("interventions_crud.cancel")}</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="button" onClick={handleUpload}>
                    {t("interventions_crud.upload")}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <FieldGroup className="gap-4">
          <Field className="gap-1">
            <FieldLabel htmlFor="nom">{t("interventions_crud.nom_label")}</FieldLabel>
            <Input
              id="nom"
              type="text"
              placeholder={t("interventions_crud.nom_placeholder")}
              value={interventionForm?.nom ?? ""}
              onChange={(e) => handleChange("nom", e.target.value)}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-1">
              <FieldLabel htmlFor="prix">{t("interventions_crud.prix_label")}</FieldLabel>
              <Input
                id="prix"
                type="number"
                placeholder={t("interventions_crud.prix_placeholder")}
                value={interventionForm?.prix ?? ""}
                onChange={(e) => handleChange("prix", e.target.value)}
              />
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="duree">{t("interventions_crud.duree_label")}</FieldLabel>
              <Input
                id="duree"
                type="number"
                placeholder={t("interventions_crud.duree_placeholder")}
                value={interventionForm?.duree ?? ""}
                onChange={(e) => handleChange("duree", e.target.value)}
              />
            </Field>
          </div>
        </FieldGroup>

        <Field orientation="horizontal" className="flex justify-end">
          <Button type="submit" size="sm" onClick={handleSubmit}>
            {t("interventions_crud.save")}
          </Button>
        </Field>
      </form>
    </FieldSet>
  );
};

export default CrudLocalIntervention;
