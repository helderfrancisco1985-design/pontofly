"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { LOCALES, type Locale } from "@/lib/translations";

const NAMES: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
  fr: "Français",
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleSelect(newLocale: Locale) {
    setLocale(newLocale);
    setOpen(false);
    router.refresh();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Selecionar idioma"
        className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white/75 transition-colors hover:bg-white/10 hover:text-white"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        {locale.toUpperCase()}
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl bg-white py-1 shadow-xl ring-1 ring-zinc-100">
            {LOCALES.map((loc) => (
              <button
                key={loc}
                onClick={() => handleSelect(loc)}
                className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left transition-colors hover:bg-zinc-50"
              >
                <span className={`w-7 rounded text-center text-[10px] font-bold ${loc === locale ? "text-[#543286]" : "text-zinc-400"}`}>
                  {loc.toUpperCase()}
                </span>
                <span className={`text-sm ${loc === locale ? "font-semibold text-zinc-900" : "text-zinc-600"}`}>
                  {NAMES[loc]}
                </span>
                {loc === locale && (
                  <svg className="ml-auto shrink-0" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#543286" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
