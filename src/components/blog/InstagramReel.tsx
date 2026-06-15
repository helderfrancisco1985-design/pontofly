import Link from "next/link";
import Image from "next/image";
import { getLocale } from "@/lib/get-locale";
import { getTranslation } from "@/lib/translations";

const PURPLE = "#543286";

export default async function InstagramReel({ url }: { url: string }) {
  const locale = await getLocale();
  const t = getTranslation(locale);

  return (
    <div className="my-12">
      <div className="relative overflow-hidden rounded-3xl">

        <Image
          src="/assets/blog-reel-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 672px"
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        <div className="relative z-10 px-8 py-12 text-center">

          <div
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
            style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
            </svg>
          </div>

          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/60">
            {t.article.reelLabel}
          </p>
          <h3 className="mb-3 text-2xl font-semibold text-white">
            {t.article.reelTitle}
          </h3>
          <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-white/75">
            {t.article.reelDesc}
          </p>

          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold shadow-md transition-opacity hover:opacity-90"
            style={{ color: PURPLE }}
          >
            {t.article.viewReel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
