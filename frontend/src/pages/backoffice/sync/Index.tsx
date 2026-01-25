import { useEffect } from "react";
import { useHeader } from "@/context/HeaderContext";
import { useTranslation } from "react-i18next";
import SonnerTypes from "@/components/test/SonnerType";

const Index = () => {
  const { t } = useTranslation();
  const { setBreadcrumbs } = useHeader();

  useEffect(() => {
    setBreadcrumbs([
      { label: t("sidebar.dashboard"), href: "/backoffice/dashboard" },
      { label: t("sidebar.synchronize") },
    ]);
  }, [t, setBreadcrumbs]);
  return (
    <div className="py-4 px-2 md:gap-6 md:py-6 md:px-4 max-w-full overflow-hidden">
      {t("common.sync")}
      <SonnerTypes></SonnerTypes>
    </div>
  );
};

export default Index;
