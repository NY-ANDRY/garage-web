import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const { register, registerLoading, registerError } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      navigate("/backoffice", { replace: true });
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <>
      <CardHeader className="w-full">
        <CardTitle className="text-xl">{t("auth.inscription")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel>{t("auth.name")}</FieldLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Field>

            <Field>
              <FieldLabel>{t("common.email")}</FieldLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>{t("common.password")}</FieldLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>{t("auth.confirm_password")}</FieldLabel>
              <Input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </Field>

            {registerError && (
              <p className="text-sm text-red-500 font-medium">{registerError.message}</p>
            )}

            <Button className="w-full" type="submit" disabled={registerLoading}>
              {registerLoading ? t("auth.registering") : t("auth.register")}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </>
  );
};

export default RegisterForm;
