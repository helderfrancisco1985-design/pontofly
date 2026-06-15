"use client";
import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (localStorage.getItem("pwa-dismissed")) {
      setDismissed(true);
      return;
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferredPrompt || dismissed) return null;

  const install = async () => {
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    dismiss();
  };

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem("pwa-dismissed", "1");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div
        className="mx-4 mb-4 flex items-center gap-3 rounded-2xl p-4 shadow-2xl"
        style={{ backgroundColor: "#4A3866" }}
      >
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/15">
          <Download size={20} className="text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">{t.install.bannerTitle}</p>
          <p className="text-xs text-white/65">{t.install.bannerDesc}</p>
        </div>
        <button
          onClick={install}
          className="flex-shrink-0 rounded-full bg-white px-4 py-1.5 text-xs font-bold"
          style={{ color: "#4A3866" }}
        >
          {t.install.installBtn}
        </button>
        <button
          onClick={dismiss}
          className="flex-shrink-0 text-white/50 hover:text-white/80"
          aria-label="Fechar"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
