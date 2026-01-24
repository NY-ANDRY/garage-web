import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IconSun, IconMoon } from "@tabler/icons-react"
import { useTheme } from "@/hooks/useTheme"

export function SiteHeader() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="flex h-(--header-height) items-center border-b">
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1 cursor-pointer" />

        <Separator orientation="vertical" className="mx-2 h-4" />

        <h1 className="text-base font-medium">Documents</h1>

        <div className="ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
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
  )
}
