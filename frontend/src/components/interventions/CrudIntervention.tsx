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

type CrudInterventionsProps = {
  intervention: Intervention;
};

const CrudInterventions = ({ intervention }: CrudInterventionsProps) => {
  const [interventionForm, setInteventionForm] =
    useState<Intervention | null>();
  useEffect(() => {
    if (intervention) {
      setInteventionForm(intervention);
    }
  }, [intervention]);

  return (
    <div className="flex w-full h-full border rounded-lg border-dashed border-(--border) px-8 py-6">
      <FieldSet className="w-full max-w-sm">
        <FieldLegend>Intervention Local</FieldLegend>
        <FieldDescription>
          Intervention information from local database
        </FieldDescription>
        <FieldGroup className="gap-4">
          <Field className="gap-1">
            <FieldLabel htmlFor="street">Name</FieldLabel>
            <Input
              value={interventionForm?.nom}
              id="street"
              type="text"
              placeholder="123 Main St"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-1">
              <FieldLabel htmlFor="city">Prix</FieldLabel>
              <Input
                value={interventionForm?.prix}
                id="city"
                type="text"
                placeholder="New York"
              />
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="zip">Duree</FieldLabel>
              <Input
                value={interventionForm?.duree}
                id="zip"
                type="text"
                placeholder="90502"
              />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  );
};

export default CrudInterventions;
