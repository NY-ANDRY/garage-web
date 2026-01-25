import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import AuthForm from "./backoffice/auth/AuthForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Landing = () => {
  const navigate = useNavigate();
  const [showBackOffice, setShowBackOffice] = useState(false);

  const onFrontOffice = () => {
    navigate("/frontoffice");
  };

  const onBackOffice = () => {
    setShowBackOffice(!showBackOffice);
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center pb-24">
      <div className="flex items-center justify-center flex-col md:flex-row gap-2 text-2xl md:gap-4 h-32">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex flex-col gap-4 ml-4">
            <div className="flex flex-col">
              <div className="font-medium">BackOffice</div>
              <div className="text-muted-foreground text-lg">
                Manage your app
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={onBackOffice} size="sm">
                  <span className="relative bottom-px">backOffice</span>
                  <IconArrowRight />
                </Button>
              </DialogTrigger>
              <DialogContent className="h-132 sm:max-w-106.25 flex flex-col items-center justify-center">
                <AuthForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Separator
          orientation="vertical"
          className="hidden md:block mx-48" // vertical pour desktop
        />
        <Separator
          orientation="horizontal"
          className="block md:hidden my-16 w-full" // horizontal pour mobile
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="font-medium">FrontOffice</div>
            <div className="text-muted-foreground text-lg">for client</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onFrontOffice}
            className="flex items-center relative cursor-pointer"
          >
            <span className="relative bottom-px">frontOffice</span>
            <IconArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
