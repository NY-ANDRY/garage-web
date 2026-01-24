import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import { useTheme } from "@/hooks/useTheme";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  useTheme();
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
