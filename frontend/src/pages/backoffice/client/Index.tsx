import { useEffect } from "react";
import { useHeader } from "@/context/HeaderContext";
import { useTranslation } from "react-i18next";
import { Cards } from "@/components/clients/Cards";
import ChartBar from "@/components/clients/Chart";

const Index = () => {
  const { t } = useTranslation();
  const { setBreadcrumbs } = useHeader();

  useEffect(() => {
    setBreadcrumbs([
      { label: t("sidebar.dashboard"), href: "/backoffice/dashboard" },
      { label: t("sidebar.clients") },
    ]);
  }, [t, setBreadcrumbs]);
  return (
    <div className="flex flex-col py-4 px-2 md:gap-6 md:py-6 md:px-4 max-w-full overflow-hidden min-h-full">
      <Cards />
      <ChartBar />
    </div>
  );
};

export default Index;
