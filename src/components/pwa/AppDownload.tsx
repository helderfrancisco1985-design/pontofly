import QRCode from "qrcode";
import { Smartphone, Apple } from "lucide-react";
import { getLocale } from "@/lib/get-locale";
import { getTranslation } from "@/lib/translations";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pontofly.pt";

export default async function AppDownload() {
  const locale = await getLocale();
  const t = getTranslation(locale);

  const qrSvg = await QRCode.toString(SITE_URL, {
    type: "svg",
    width: 192,
    margin: 1,
    color: { dark: "#4A3866", light: "#ffffff" },
  });

  return (
    <section className="w-full bg-zinc-50 py-20 px-6">
      <div className="mx-auto max-w-5xl">

        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            {t.install.sectionLabel}
          </p>
          <h2 className="text-4xl font-semibold sm:text-5xl">
            <span style={{ color: "#4A3866" }}>{t.install.title}</span>
          </h2>
          <div className="mx-auto mt-5 h-px w-16" style={{ backgroundColor: "#4A3866" }} />
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-zinc-500">
            {t.install.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
            <div
              className="mb-5 overflow-hidden rounded-2xl p-3"
              style={{ backgroundColor: "#ffffff", border: "2px solid rgba(74,56,102,0.12)" }}
              aria-label={t.install.qrLabel}
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
            <p className="text-center text-sm font-medium text-zinc-600">{t.install.qrLabel}</p>
            <p className="mt-1 text-center text-xs text-zinc-400">{SITE_URL}</p>
          </div>

          {/* Instruções */}
          <div className="flex flex-col justify-center gap-5">

            <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(74,56,102,0.1)" }}
                >
                  <Smartphone size={18} style={{ color: "#4A3866" }} />
                </span>
                <p className="font-semibold text-zinc-800">Android (Chrome)</p>
              </div>
              <ol className="space-y-2 text-sm leading-relaxed text-zinc-500">
                <li><span className="font-medium text-zinc-700">1.</span> {t.install.androidStep1}</li>
                <li><span className="font-medium text-zinc-700">2.</span> {t.install.androidStep2}</li>
                <li><span className="font-medium text-zinc-700">3.</span> {t.install.androidStep3}</li>
              </ol>
            </div>

            <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(74,56,102,0.1)" }}
                >
                  <Apple size={18} style={{ color: "#4A3866" }} />
                </span>
                <p className="font-semibold text-zinc-800">iPhone / iPad (Safari)</p>
              </div>
              <ol className="space-y-2 text-sm leading-relaxed text-zinc-500">
                <li><span className="font-medium text-zinc-700">1.</span> {t.install.iosStep1}</li>
                <li><span className="font-medium text-zinc-700">2.</span> {t.install.iosStep2}</li>
                <li><span className="font-medium text-zinc-700">3.</span> {t.install.iosStep3}</li>
              </ol>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
