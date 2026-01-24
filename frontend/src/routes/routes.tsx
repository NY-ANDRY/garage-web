import DashboardLayout from "@/layouts/DashboardLayout";
import StatIntervention from "@/pages/backoffice/interventions/Statistique";
import Interventions from "@/pages/backoffice/interventions/Crud";
import Home from "@/pages/frontoffice/Home";
import Landing from "@/pages/Landing";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AuthView from "@/pages/backoffice/auth/AuthView";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/frontoffice",
    element: <Home />,
  },
  {
    path: "/backoffice",
    children: [
      {
        path: "auth",
        element: <AuthView />,
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <StatIntervention />,
          },
          {
            path: "interventions",
            element: <Interventions />,
          },
        ],
      },
    ],
  },
];
