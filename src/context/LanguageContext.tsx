"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { getTranslation, type Translation, type Locale } from "@/lib/translations";

type LanguageContextType = {
  locale: Locale;
  t: Translation;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
  initialLocale = "pt",
}: {
  children: ReactNode;
  initialLocale?: string;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale as Locale);

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale);
    document.cookie = `locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
  }

  return (
    <LanguageContext.Provider value={{ locale, t: getTranslation(locale), setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
