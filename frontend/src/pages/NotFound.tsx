import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackOffice = () => {
    navigate("/backoffice");
  };

  const handleFrontOffice = () => {
    navigate("/frontoffice");
  };

  return (
    <section className="flex items-center justify-center w-screen h-screen pb-28">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>404 - Not Found</EmptyTitle>
          <EmptyDescription className=" whitespace-nowrap">
            <div>The page you&apos;re looking for doesn&apos;t</div>
            <div>exist. where do you want to go?</div>
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <ButtonGroup>
            <Button variant="outline" size="sm" onClick={handleBackOffice}>
              Backoffice
            </Button>
            <Button variant="outline" size="sm" onClick={handleFrontOffice}>
              FrontOffice
            </Button>
          </ButtonGroup>
          <ButtonGroup></ButtonGroup>
        </EmptyContent>
      </Empty>
    </section>
  );
};

export default NotFound;
