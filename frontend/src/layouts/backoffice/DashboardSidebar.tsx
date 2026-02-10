import * as React from "react";
import {
  IconDashboard,
  IconInnerShadowTop,
  IconListDetails,
  IconSettings,
  IconUsers,
  IconCloudNetwork,
  IconCar,
  IconUser,
  IconCarCrash,
  IconHourglass,
} from "@tabler/icons-react";

import NavMain from "@/components/shadcn/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const data = {
    navMain: [
      {
        title: t("sidebar.dashboard"),
        url: "/backoffice/dashboard",
        icon: IconDashboard,
      },
      {
        title: t("sidebar.interventions"),
        url: "/backoffice/interventions",
        icon: IconListDetails,
      },
      {
        title: t("sidebar.clients"),
        url: "/backoffice/clients",
        icon: IconUsers,
      },
      {
        title: t("sidebar.synchronize"),
        url: "/backoffice/sync",
        icon: IconCloudNetwork,
      },
    ],
    navSecondary: [
      {
        title: t("sidebar.settings"),
        url: "/backoffice/settings",
        icon: IconSettings,
      },
    ],
    projects: [
      {
        title: t("sidebar.car"),
        url: "/backoffice/cars",
        icon: IconCar,
      },
      {
        title: t("sidebar.client"),
        url: "/backoffice/users",
        icon: IconUser,
      },
      {
        title: t("sidebar.repair"),
        url: "/backoffice/repairs",
        icon: IconCarCrash,
      },
    ],
    navInProgress: [
      {
        title: t("sidebar.repairs_in_progress"),
        url: "/backoffice/repairs/in-progress",
        icon: IconHourglass,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to="/backoffice">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">
                  {t("sidebar.brand")}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} title={t("sidebar.dashboards")} />
        <NavMain items={data.projects} title={t("sidebar.others")} />
        <NavMain items={data.navInProgress} title={t("common.reparations")} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
