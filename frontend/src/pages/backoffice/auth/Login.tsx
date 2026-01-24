import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/useAuth";

const Login = () => {
  const [email, setEmail] = useState("abc@gmail.com");
  const [password, setPassword] = useState("abcabcabc");
  const { login, loginLoading, loginError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/backoffice/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <CardHeader className="w-full pb-4">
        <CardTitle className="text-xl flex">Admin</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <FieldGroup>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>

        <Field>
          <FieldLabel>Password</FieldLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>

        {loginError && <p className="text-sm text-red-500 font-medium">{loginError.message}</p>}

        <Button type="submit" className="w-full" disabled={loginLoading}>
          {loginLoading ? "Logging in..." : "Login"}
        </Button>
      </FieldGroup>
        </form>
      </CardContent>
    </>
  );
};

export default Login;
