import AuthForm from "./AuthForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

const AuthView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onBack = () => {
    navigate("/");
  };

  return (
    <>
      <Button
        onClick={onBack}
        variant="outline"
        className="fixed top-4 left-4 w-28"
      >
        {t("common.back")}
      </Button>
      <div className="bg-background flex min-h-svh items-center justify-center p-0 transition-all">
        <div className="flex w-150 justify-center">
        <AuthForm />
        </div>
      </div>
    </>
  );
};

export default AuthView;
