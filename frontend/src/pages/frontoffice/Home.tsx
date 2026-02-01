import { useHeader } from "@/context/HeaderContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { IconMoodHappy } from "@tabler/icons-react";
import { ArrowUpRightIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const { setBreadcrumbs } = useHeader();

  useEffect(() => {
    setBreadcrumbs([{ label: t("sidebar.clients"), href: "/backoffice/dashboard" }]);
  }, [t, setBreadcrumbs]);

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconMoodHappy />
        </EmptyMedia>
        <EmptyTitle>{t("frontoffice.home_title")}</EmptyTitle>
        <EmptyDescription>{t("frontoffice.home_description")}</EmptyDescription>
      </EmptyHeader>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          {t("frontoffice.learn_more")} <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  );
};

export default Home;
