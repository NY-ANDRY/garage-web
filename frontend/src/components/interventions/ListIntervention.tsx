import type { Intervention } from "@/types/Types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { EyeIcon, Clock1Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type ListInterventionProps = {
  intervention: Intervention;
  selected: boolean;
  onSelect?: (intervention: Intervention) => void;
};

const ListIntervention = ({
  intervention,
  selected,
  onSelect,
}: ListInterventionProps) => {
  const { t } = useTranslation();

  const handleClick = () => {
    if (onSelect) {
      onSelect(intervention);
    }
  };

  return (
    <>
      <Item
        variant="outline"
        onClick={handleClick}
        className={cn(
          "cursor-pointer hover:bg-accent",
          selected && "bg-accent",
        )}
      >
        <ItemMedia>
          <Avatar className=" border border-background size-10">
            <AvatarImage src={intervention.image} />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{intervention.nom}</ItemTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock1Icon size={12}></Clock1Icon>
              <div className="flex items-center justify-center">
                {intervention.duree}
              </div>
            </Badge>

            <Badge variant="outline" className="flex items-center gap-1">
              {t("interventions.currency")}
              <div className="flex items-center justify-center">
                {intervention.prix}
              </div>
            </Badge>
          </div>
        </ItemContent>
        <ItemActions>
          <div className="flex w-8 h-8 items-center justify-center border border-input rounded-full">
            <EyeIcon size={16} />
          </div>
        </ItemActions>
      </Item>
    </>
  );
};

export default ListIntervention;
