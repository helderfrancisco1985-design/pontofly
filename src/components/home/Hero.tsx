"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3", maxHeight: "85vh" }}>

      <Image
        src="/assets/hero.jpg"
        alt="Fios e lãs artesanais Ponto Fly"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/10" />

      <div className="relative z-10 flex h-full flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div
          className={`max-w-xl transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="mb-4 inline-block rounded-full bg-white/85 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] backdrop-blur-sm" style={{ color: "#543286" }}>
            {t.hero.badge}
          </p>

          <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            {t.hero.title1}
            <br />
            <span style={{ color: "#543286" }}>{t.hero.title2}</span>
          </h1>

          <p
            className={`mt-6 text-base leading-relaxed text-zinc-200 sm:text-lg transition-all duration-700 ease-out delay-200 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {t.hero.description}
          </p>

          <div
            className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 ease-out delay-300 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <Link
              href="/produtos"
              className="rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
              style={{ backgroundColor: "#543286" }}
            >
              {t.hero.cta1}
            </Link>
            <Link
              href="/sobre"
              className="rounded-full border px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:opacity-90"
              style={{ borderColor: "#543286", backgroundColor: "rgba(84,50,134,0.35)" }}
            >
              {t.hero.cta2}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="text-[10px] uppercase tracking-widest text-white/40">{t.hero.scroll}</span>
        <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>

    </section>
  );
}
