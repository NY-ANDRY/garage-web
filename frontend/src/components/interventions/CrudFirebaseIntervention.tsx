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
import { useTranslation } from "react-i18next";

type CrudFirebaseInterventionProps = {
  intervention: Intervention;
  reload?: () => void;
};

const CrudFirebaseIntervention = ({
  intervention,
  reload,
}: CrudFirebaseInterventionProps) => {
  const { t } = useTranslation();
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
        loading: t("interventions_crud.deleting"),
        success: (data) => t("interventions_crud.delete_success", { name: data.nom }),
        error: t("interventions_crud.delete_error"),
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
        loading: t("interventions_crud.updating"),
        success: (data) => t("interventions_crud.update_success", { name: data.nom }),
        error: t("interventions_crud.update_error"),
      },
    );
  };

  return (
    <FieldSet className="w-full max-w-sm">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <FieldLegend>{t("interventions_crud.firebase_title")}</FieldLegend>
          <FieldDescription>
            {t("interventions_crud.firebase_desc")}
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
                  <DialogTitle>{t("interventions_crud.download_firestore_title")}</DialogTitle>
                  <DialogDescription>
                    {t("interventions_crud.download_firestore_desc")}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">{t("interventions_crud.cancel")}</Button>
                  </DialogClose>
                  <Button onClick={handleSubmit} type="submit">
                    {t("interventions_crud.download")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
      <FieldGroup className="gap-4">
        <Field className="gap-1">
          <FieldLabel htmlFor="street">{t("interventions_crud.nom_label")}</FieldLabel>
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
            <FieldLabel htmlFor="city">{t("interventions_crud.prix_label")}</FieldLabel>
            <Input
              readOnly
              value={dataFirebase?.prix ?? ""}
              id="city"
              type="text"
              placeholder="..."
            />
          </Field>
          <Field className="gap-1">
            <FieldLabel htmlFor="zip">{t("interventions_crud.duree_label")}</FieldLabel>
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
                {t("interventions_crud.delete_button")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
              <DialogHeader>
                <DialogTitle>{t("interventions_crud.delete_firestore_title")}</DialogTitle>
                <DialogDescription>
                  {t("interventions_crud.delete_firestore_desc")}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{t("interventions_crud.cancel")}</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={handleDelete}
                    variant="destructive"
                    type="button"
                    size={"sm"}
                  >
                    {t("interventions_crud.delete_button")}
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

export default CrudFirebaseIntervention;
