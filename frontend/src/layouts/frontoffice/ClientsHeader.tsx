import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useThemeContext } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useHeader } from "@/context/HeaderContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { fade } from "@/components/transitions/tansitions";

const SiteHeader = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { t } = useTranslation();
  const { breadcrumbs } = useHeader();

  return (
    <header className="flex h-(--header-height) items-center border-b py-2">
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1 cursor-pointer" />

        <Separator orientation="vertical" className="mx-2 h-4" />

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <AnimatePresence key={item.label} mode="wait">
                  <motion.div {...fade} className="flex items-center gap-2.5">
                    <BreadcrumbItem>
                      {item.href && !isLast ? (
                        <BreadcrumbLink asChild>
                          <Link to={item.href}>{item.label}</Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>

                    {!isLast && <BreadcrumbSeparator />}
                  </motion.div>
                </AnimatePresence>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={t("header.toggle_theme")}
          >
            {theme === "dark" ? (
              <IconMoon className="h-5 w-5" />
            ) : (
              <IconSun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;

// <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
//   <SidebarTrigger className="-ml-1" />
//   <Separator
//     orientation="vertical"
//     className="mr-2 data-[orientation=vertical]:h-4"
//   />
// </header>
