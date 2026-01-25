import { useThemeContext } from "@/context/ThemeContext";
import { useI18n } from "@/hooks/useI18n";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function ThemeSettings() {
  const { t } = useI18n();
  const { theme, setTheme } = useThemeContext();

  return (
    <div className="flex flex-col gap-3">
      <Label>{t("common.theme")}</Label>
      <div className="flex gap-2 p-1 bg-muted rounded-lg w-fit">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center gap-2 cursor-pointer",
            theme === "light" && "bg-background shadow-sm hover:bg-background"
          )}
        >
          <IconSun className="size-4" />
          <span>{t("common.light")}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center gap-2 cursor-pointer",
            theme === "dark" && "bg-background shadow-sm hover:bg-background"
          )}
        >
          <IconMoon className="size-4" />
          <span>{t("common.dark")}</span>
        </Button>
      </div>
    </div>
  );
}
