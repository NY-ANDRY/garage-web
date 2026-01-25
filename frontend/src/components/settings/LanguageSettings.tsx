import { useI18n } from "@/hooks/useI18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function LanguageSettings() {
  const { t, changeLanguage, currentLanguage } = useI18n();

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="language-select">{t("common.language")}</Label>
      <Select value={currentLanguage} onValueChange={changeLanguage}>
        <SelectTrigger id="language-select" className="w-full">
          <SelectValue placeholder={t("common.language")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="mg">Malagasy</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
