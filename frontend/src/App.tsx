import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import { AuthProvider } from "./context/AuthContext";
import { useI18n } from "@/hooks/useI18n";
import { ThemeProvider } from "./context/ThemeContext";
import { HeaderProvider } from "./context/HeaderContext";

const App = () => {
  useI18n();
  
  return (
    <ThemeProvider>
      <HeaderProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoute />
          </BrowserRouter>
        </AuthProvider>
      </HeaderProvider>
    </ThemeProvider>
  );
};

export default App;
