"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/lib/translations";

const PURPLE = "#543286";
const WA_NUMBER = "351937441344";

const WA_TEXT: Record<Locale, { formTitle: string; btn: string; successTitle: string; successMsg: string; fallback: string }> = {
  pt: {
    formTitle: "Envia uma mensagem pelo WhatsApp",
    btn: "Enviar pelo WhatsApp",
    successTitle: "WhatsApp aberto!",
    successMsg: "Se a janela não abriu automaticamente, usa o botão abaixo para enviar a mensagem.",
    fallback: "Abrir WhatsApp",
  },
  en: {
    formTitle: "Send a message via WhatsApp",
    btn: "Send via WhatsApp",
    successTitle: "WhatsApp opened!",
    successMsg: "If the window didn't open automatically, use the button below to send your message.",
    fallback: "Open WhatsApp",
  },
  es: {
    formTitle: "Envía un mensaje por WhatsApp",
    btn: "Enviar por WhatsApp",
    successTitle: "¡WhatsApp abierto!",
    successMsg: "Si la ventana no se abrió automáticamente, usa el botón de abajo para enviar tu mensaje.",
    fallback: "Abrir WhatsApp",
  },
  fr: {
    formTitle: "Envoyez un message via WhatsApp",
    btn: "Envoyer par WhatsApp",
    successTitle: "WhatsApp ouvert!",
    successMsg: "Si la fenêtre ne s'est pas ouverte automatiquement, utilisez le bouton ci-dessous.",
    fallback: "Ouvrir WhatsApp",
  },
};

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const inputClass =
  "rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-[#543286] focus:ring-2 focus:ring-[#543286]/20 transition";

export default function ContactForm() {
  const { t, locale } = useLanguage();
  const wa = WA_TEXT[locale] ?? WA_TEXT.pt;

  const [form, setForm] = useState({ nome: "", mensagem: "" });
  const [error, setError] = useState("");
  const [waUrl, setWaUrl] = useState("");
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!form.nome.trim() || !form.mensagem.trim()) {
      setError(t.contact.errorFill);
      return;
    }

    const text = `*${t.contact.nameLbl}:* ${form.nome}\n\n*${t.contact.messageLbl}:*\n${form.mensagem}`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    setForm({ nome: "", mensagem: "" });
  };

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50 p-8 text-center sm:p-10">
        <div
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(37,211,102,0.12)" }}
        >
          <WhatsAppIcon />
        </div>
        <h3 className="mb-2 text-2xl font-semibold text-zinc-900">{wa.successTitle}</h3>
        <p className="mb-6 text-base leading-relaxed text-zinc-500">{wa.successMsg}</p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#25D366" }}
        >
          <WhatsAppIcon />
          {wa.fallback}
        </a>
        <button
          onClick={() => setSent(false)}
          className="text-sm text-zinc-400 underline underline-offset-2 transition-colors hover:text-zinc-600"
        >
          {t.contact.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-8 sm:p-10">
      <h3 className="mb-8 text-2xl font-semibold text-zinc-900">
        {wa.formTitle}
      </h3>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-600" htmlFor="nome">
            {t.contact.nameLbl}
          </label>
          <input
            id="nome" name="nome" type="text"
            placeholder={t.contact.namePlaceholder}
            value={form.nome} onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-600" htmlFor="mensagem">
            {t.contact.messageLbl}
          </label>
          <textarea
            id="mensagem" name="mensagem" rows={6}
            placeholder={t.contact.messagePlaceholder}
            value={form.mensagem} onChange={handleChange}
            className={`resize-none ${inputClass}`}
          />
        </div>

        {error && (
          <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-base font-semibold text-white shadow-md transition-opacity hover:opacity-90"
          style={{ backgroundColor: PURPLE }}
        >
          <WhatsAppIcon />
          {wa.btn}
        </button>
      </form>
    </div>
  );
}
