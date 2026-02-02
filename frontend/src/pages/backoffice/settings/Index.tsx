import { useI18n } from "@/hooks/useI18n";
import { LanguageSettings } from "@/components/settings/LanguageSettings";
import { ThemeSettings } from "@/components/settings/ThemeSettings";

import { useEffect } from "react";
import { useHeader } from "@/context/HeaderContext";

const Settings = () => {
  const { t } = useI18n();
  const { setBreadcrumbs } = useHeader();

  useEffect(() => {
    setBreadcrumbs([
      { label: t("sidebar.dashboard"), href: "/backoffice/dashboard" },
      { label: t("sidebar.settings") },
    ]);
  }, [t, setBreadcrumbs]);

  return (
    <section className="p-6 flex flex-col gap-8 max-w-md">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {t("sidebar.settings")}
      </h3>

      <div className="flex flex-col gap-6">
        <LanguageSettings />
        <ThemeSettings />
      </div>
    </section>
  );
};

export default Settings;