import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconCarCrash } from "@tabler/icons-react";
import { ArrowUpRightIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const EmptyReparation = () => {
  const { t } = useTranslation();
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconCarCrash />
        </EmptyMedia>
        <EmptyTitle>{t("frontoffice.no_reparation")}</EmptyTitle>
        <EmptyDescription>
          {t("frontoffice.select_another_user")}
        </EmptyDescription>
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

export default EmptyReparation;
