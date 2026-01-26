import { useEffect } from "react";
import { useHeader } from "@/context/HeaderContext";
import { useTranslation } from "react-i18next";
import { Cards } from "@/components/interventions/Cards";
import ChartBar from "@/components/interventions/Chart";
import TableIntervention from "@/components/interventions/TableInterventions";

const Index = () => {
  const { t } = useTranslation();
  const { setBreadcrumbs } = useHeader();

  useEffect(() => {
    setBreadcrumbs([{ label: t("sidebar.dashboard") }]);
  }, [t, setBreadcrumbs]);
  return (
    <div className="flex flex-col py-4 px-2 md:gap-6 md:py-6 md:px-4 max-w-full overflow-hidden">
      <Cards />
      <ChartBar />
      <TableIntervention />
    </div>
  );
};

export default Index;
