import { useState } from "react";
import { AnimatePresence, motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import Login from "./Login";
import RegisterForm from "./Register";

const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  const containerMotion = {
    layout: true,
    transition: { duration: 0.4, ease: easeOut },
  };

  const formMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.35, ease: easeOut },
    layout: true,
  };

  const handleToggle = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  return (
    <div className="max-w-sm h-full w-full flex items-center">
      <motion.div {...containerMotion} className="flex flex-col w-full">
        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <motion.div key="login" {...formMotion} className="flex flex-col pt-16 pb-8 md:pt-0 md:pb-0">
              <Login />
              <div className="px-6 mt-4">
                <Button
                  variant="link"
                  className="w-full"
                  onClick={handleToggle}
                >
                  Créer un compte
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              {...formMotion}
              className="flex flex-col"
            >
              <RegisterForm />
              <div className="px-6 mt-4">
                <Button
                  variant="link"
                  className="w-full"
                  onClick={handleToggle}
                >
                  Déjà un compte ? Se connecter
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthForm;
