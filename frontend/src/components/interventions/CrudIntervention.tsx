import type { Intervention } from "@/types/Types";
import { useEffect, useState } from "react";
import CrudLocalIntervention from "./CrudLocalIntervention";
import CrudFirebaseIntervention from "./CrudFirebaseIntervention";
import { Separator } from "@/components/ui/separator";

type CrudInterventionsProps = {
  intervention: Intervention;
  reload?: () => void;
};

const CrudInterventions = ({
  intervention,
  reload,
}: CrudInterventionsProps) => {
  const [interventionForm, setInteventionForm] =
    useState<Intervention | null>();
  useEffect(() => {
    if (intervention) {
      setInteventionForm(intervention);
    }
  }, [intervention]);

  return (
    <div className="flex flex-col w-full h-full border rounded-lg border-dashed border-(--border) px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4">
        <div className="flex-1 flex justify-center">
          <CrudLocalIntervention reload={reload} intervention={intervention} />
        </div>
        <Separator orientation="vertical" className="hidden md:flex" />
        <Separator orientation="horizontal" className="md:hidden flex h-px" />
        <div className="flex-1 flex justify-center">
          <CrudFirebaseIntervention
            reload={reload}
            intervention={intervention}
          />
        </div>
      </div>
    </div>
  );
};

export default CrudInterventions;
