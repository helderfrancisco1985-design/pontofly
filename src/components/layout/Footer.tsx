import Link from "next/link";
import Image from "next/image";
import { getLocale } from "@/lib/get-locale";
import { getTranslation } from "@/lib/translations";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ponto.fly/",
    ariaLabel: "Instagram da Ponto Fly",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1Ey56KqdC4/",
    ariaLabel: "Facebook da Ponto Fly",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/351937441344",
    ariaLabel: "WhatsApp Ponto Fly",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
];

export default async function Footer() {
  const locale = await getLocale();
  const t = getTranslation(locale);

  const quickLinks = [
    { href: "/", label: t.nav.home },
    { href: "/#produtos", label: t.nav.products },
    { href: "/#sobre", label: t.nav.about },
    { href: "/#blog", label: t.nav.blog },
    { href: "/#contactos", label: t.nav.contacts },
  ];

  return (
    <footer className="w-full border-t border-zinc-200">

      <div className="bg-zinc-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-14 sm:grid-cols-3">

          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Ponto Fly — Página Inicial">
              <Image
                src="/assets/logo-transparent.png"
                alt="Ponto Fly"
                width={120}
                height={120}
                className="h-24 w-auto"
              />
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
              {t.footer.description}
            </p>

            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.ariaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-colors hover:border-[#543286] hover:text-[#543286]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              {t.footer.quickLinks}
            </p>
            <nav className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-600 transition-colors hover:text-[#543286]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              {t.footer.contact}
            </p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="mailto:geral@pontofly.pt" className="text-zinc-600 transition-colors hover:text-[#543286]">
                geral@pontofly.pt
              </a>
              <a href="tel:+351937441344" className="text-zinc-600 transition-colors hover:text-[#543286]">
                +351 937 441 344
              </a>
              <a href="https://wa.me/351937441344" target="_blank" rel="noopener noreferrer" className="text-zinc-600 transition-colors hover:text-[#543286]">
                WhatsApp
              </a>
              <span className="text-zinc-500">Portugal</span>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-4 text-xs text-zinc-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Ponto Fly. {t.footer.rights}</p>
          <a
            href="https://www.livroreclamacoes.pt"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Livro de Reclamações Online"
            className="flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 shadow-sm transition-shadow hover:shadow-md"
          >
            <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="6" fill="#CC0000"/>
              <rect x="8" y="10" width="24" height="20" rx="2" fill="white"/>
              <rect x="11" y="15" width="18" height="2" rx="1" fill="#CC0000"/>
              <rect x="11" y="19" width="14" height="2" rx="1" fill="#CC0000"/>
              <rect x="11" y="23" width="10" height="2" rx="1" fill="#CC0000"/>
            </svg>
            <div>
              <p className="text-xs font-bold text-zinc-800">Livro de Reclamações</p>
              <p className="text-[10px] text-zinc-400">livroreclamacoes.pt</p>
            </div>
          </a>
          <p>{t.footer.madeWith}</p>
        </div>
      </div>

    </footer>
  );
}
