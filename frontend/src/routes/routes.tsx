import DashboardLayout from "@/layouts/backoffice/DashboardLayout";
import ClientsLayout from "@/layouts/frontoffice/ClientsLayout";
import IndexIntervention from "@/pages/backoffice/interventions/Index";
import Interventions from "@/pages/backoffice/interventions/Crud";
import HomeFrontoffice from "@/pages/frontoffice/Home";
import ClientsFrontoffice from "@/pages/frontoffice/clients/Home";
import ReparationDetail from "@/pages/frontoffice/clients/ReparationDetail";
import Landing from "@/pages/Landing";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AuthView from "@/pages/backoffice/auth/AuthView";
import IndexClient from "@/pages/backoffice/client/Index";
import IndexSync from "@/pages/backoffice/sync/Index";
import Settings from "@/pages/backoffice/settings/Index";
import PageTransition from "@/components/transitions/PageTransition";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <PageTransition>
        <Landing />
      </PageTransition>
    ),
  },
  {
    path: "/frontoffice",
    children: [
      {
        path: "",
        element: (
          <PageTransition>
            <ClientsLayout />
          </PageTransition>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="home" replace />,
          },
          {
            path: "home",
            element: <HomeFrontoffice />,
          },
          {
            path: "clients/:uid",
            element: <ClientsFrontoffice />,
          },
          {
            path: "reparations/:id",
            element: <ReparationDetail />,
          },
        ],
      },
    ],
  },
  {
    path: "/backoffice",
    children: [
      {
        path: "auth",
        element: (
          <PageTransition>
            <AuthView />
          </PageTransition>
        ),
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <PageTransition>
              <DashboardLayout />
            </PageTransition>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <IndexIntervention />,
          },
          {
            path: "interventions",
            element: <Interventions />,
          },
          {
            path: "interventions/:id",
            element: <Interventions />,
          },
          {
            path: "clients",
            element: <IndexClient />,
          },
          {
            path: "sync",
            element: <IndexSync />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
];
