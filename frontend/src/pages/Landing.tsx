import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

import { useTranslation } from "react-i18next";

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onFrontOffice = () => {
    navigate("/frontoffice");
  };

  const onBackOffice = () => {
    navigate("/backoffice/auth");
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center pb-24">
      <div className="flex items-center justify-center flex-col md:flex-row gap-2 text-2xl md:gap-4 h-32">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex flex-col gap-4 ml-4">
            <div className="flex flex-col">
              <div className="font-medium">{t("landing.backoffice_title")}</div>
              <div className="text-muted-foreground text-lg">
                {t("landing.backoffice_desc")}
              </div>
            </div>
            <Button variant="outline" onClick={onBackOffice} size="sm" className="cursor-pointer">
              <span className="relative bottom-px">{t("landing.backoffice_btn")}</span>
              <IconArrowRight />
            </Button>
          </div>
        </div>

        <Separator
          orientation="vertical"
          className="hidden md:block mx-48"
        />
        <Separator
          orientation="horizontal"
          className="block md:hidden my-16 w-full"
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="font-medium">{t("landing.frontoffice_title")}</div>
            <div className="text-muted-foreground text-lg">{t("landing.frontoffice_desc")}</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onFrontOffice}
            className="flex items-center relative cursor-pointer"
          >
            <span className="relative bottom-px">{t("landing.frontoffice_btn")}</span>
            <IconArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
