import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconMoodEmpty } from "@tabler/icons-react";


const EmptyIntervention = () => {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconMoodEmpty />
        </EmptyMedia>
        <EmptyTitle>Select an intervention</EmptyTitle>
        <EmptyDescription>
          details of selected intervention will apear here
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyIntervention;
