"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function BackButton() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <button
      onClick={() => router.back()}
      className="mb-10 flex w-fit items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-700"
    >
      <span aria-hidden="true">←</span> {t.backButton}
    </button>
  );
}
