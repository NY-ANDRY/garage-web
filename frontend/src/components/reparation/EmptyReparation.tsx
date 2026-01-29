import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconFolderCode, IconCarCrash } from "@tabler/icons-react";
import { ArrowUpRightIcon } from "lucide-react";

const EmptyReparation = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconCarCrash />
        </EmptyMedia>
        <EmptyTitle>Aucun reparation</EmptyTitle>
        <EmptyDescription>
          Selectioner un autre utilisateur
        </EmptyDescription>
      </EmptyHeader>
      {/* <EmptyContent className="flex-row justify-center gap-2"> */}
        {/* <Button>Create Project</Button> */}
        {/* <Button variant="outline">Import Project</Button> */}
      {/* </EmptyContent> */}
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  );
};

export default EmptyReparation;
