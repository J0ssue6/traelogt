import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LANGUAGES = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    flag: "🇬🇧",
  },
  {
    code: "es",
    label: "Spanish",
    nativeLabel: "Español",
    flag: "🇪🇸",
  },
] as const;

type LanguageCode = (typeof LANGUAGES)[number]["code"];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage =
    LANGUAGES.find((language) => language.code === i18n.language) ??
    LANGUAGES[0];

  const handleLanguageChange = (languageCode: LanguageCode | null) => {
    if (!languageCode) return;

    void i18n.changeLanguage(languageCode);
  };

  return (
    <Select value={currentLanguage.code} onValueChange={handleLanguageChange}>
      <SelectTrigger
        className="h-10 w-full rounded-lg border-accent/30 bg-accent/5 px-3 font-medium shadow-sm transition-colors hover:border-accent/50 hover:bg-accent/10 sm:w-[140px] sm:rounded-full"
        aria-label="Select language"
      >
        <Globe className="size-4 shrink-0 text-accent" />

        <SelectValue>
          <span className="flex items-center gap-2">
            <span className="text-base leading-none">
              {currentLanguage.flag}
            </span>

            <span className="hidden sm:inline">
              {currentLanguage.nativeLabel}
            </span>

            <span className="sm:hidden">
              {currentLanguage.code.toUpperCase()}
            </span>
          </span>
        </SelectValue>
      </SelectTrigger>

      <SelectContent align="end" className="min-w-[180px]">
        {LANGUAGES.map((language) => (
          <SelectItem
            key={language.code}
            value={language.code}
            className="cursor-pointer py-2.5"
          >
            <span className="flex items-center gap-3">
              <span className="text-lg leading-none">{language.flag}</span>

              <span className="flex flex-col">
                <span className="font-medium">{language.nativeLabel}</span>

                <span className="text-xs text-muted-foreground">
                  {language.label}
                </span>
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default LanguageSwitcher;
