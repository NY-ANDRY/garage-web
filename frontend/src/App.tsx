import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import { AuthProvider } from "./context/AuthContext";
import { useI18n } from "@/hooks/useI18n";
import { ThemeProvider } from "./context/ThemeContext";
import { HeaderProvider } from "./context/HeaderContext";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  useI18n();

  return (
    <>
      <Toaster />
      <ThemeProvider>
        <HeaderProvider>
          <AuthProvider>
            <BrowserRouter>
              <AppRoute />
            </BrowserRouter>
          </AuthProvider>
        </HeaderProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
