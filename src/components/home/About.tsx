import Link from "next/link";
import { getLocale } from "@/lib/get-locale";
import { getTranslation } from "@/lib/translations";

export default async function About() {
  const locale = await getLocale();
  const t = getTranslation(locale);

  return (
    <section id="sobre" className="w-full bg-white py-24 px-6">
      <div className="mx-auto max-w-3xl">

        <div className="mb-10 flex items-center gap-5">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            {t.about.sectionLabel}
          </span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        <h2 className="mb-12 text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
          {t.about.title1}{" "}
          <span style={{ color: "#543286" }}>Ponto Fly</span>
        </h2>

        <p
          className="mb-10 border-l-4 pl-6 text-xl font-medium italic leading-relaxed text-zinc-700 sm:text-2xl"
          style={{ borderColor: "#543286" }}
        >
          {t.about.quote}
        </p>

        <div className="space-y-6 text-lg leading-relaxed text-zinc-600">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
          <p>{t.about.p4}</p>
        </div>

        <p className="mt-10 text-xl font-semibold italic" style={{ color: "#543286" }}>
          {t.about.closing}
        </p>

        <div className="mt-12">
          <Link
            href="/produtos"
            className="inline-block rounded-full px-8 py-3.5 text-base font-semibold text-white shadow-md transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#543286" }}
          >
            {t.about.cta}
          </Link>
        </div>

      </div>
    </section>
  );
}
