import { createContext, useContext, useState } from "react";
import { translations as roTranslations } from "@/translations/ro";
import { translations as enTranslations } from "@/translations/en";

type Language = "ro" | "en";
type Translations = typeof roTranslations;
type TranslationKey = keyof Translations;
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}` | K
          : K
        : never;
    }[keyof T]
  : never;

type Path = NestedKeyOf<Translations>;

const translations = {
  ro: roTranslations,
  en: enTranslations,
} as const;

const DEFAULT_LANGUAGE: Language = "ro";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: Path, params?: Record<string, string | number>) => string;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

function getNestedValue(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage, if not found use Romanian
    const stored = localStorage.getItem("language") as Language;
    return (stored && translations[stored]) ? stored : DEFAULT_LANGUAGE;
  });

  const t = (path: Path, params?: Record<string, string | number>) => {
    let value = getNestedValue(translations[language], path);

    // If value is an object (for handling pluralization)
    if (typeof value === "object" && value !== null) {
      const count = params?.count as number;
      if (typeof count === "number") {
        if (count === 0 && value.zero) return value.zero;
        if (count === 1 && value.one) return value.one;
        if (value.other) {
          return value.other.replace(/\{\{count\}\}/g, count.toString());
        }
      }
      // Fallback to first available value if no matching plural form
      return Object.values(value)[0];
    }

    // Handle regular string values
    if (typeof value === "string") {
      return Object.entries(params || {}).reduce(
        (str, [key, val]) => str.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), val.toString()),
        value
      );
    }

    // Fallback to path if translation is missing
    console.warn(`Translation missing for key: ${path}`);
    return path;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
