import { Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import { getLocale } from "@/lib/get-locale";
import { getTranslation } from "@/lib/translations";

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#543286" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#543286" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#543286">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export default async function Contact() {
  const locale = await getLocale();
  const t = getTranslation(locale);

  const contactCards = [
    {
      renderIcon: () => <Phone size={20} style={{ color: "#543286" }} />,
      label: t.contact.phoneLabel,
      value: "+351 937 441 344",
      href: "tel:+351937441344",
    },
    {
      renderIcon: () => <InstagramIcon />,
      label: "Instagram",
      value: "@ponto.fly",
      href: "https://www.instagram.com/ponto.fly/",
    },
    {
      renderIcon: () => <FacebookIcon />,
      label: "Facebook",
      value: "Ponto Fly",
      href: "https://www.facebook.com/share/1Ey56KqdC4/",
    },
    {
      renderIcon: () => <WhatsAppIcon />,
      label: "WhatsApp",
      value: "+351 937 441 344",
      href: "https://wa.me/351937441344",
    },
  ];

  return (
    <section id="contactos" className="w-full bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            {t.contact.sectionLabel}
          </p>
          <h2 className="text-4xl font-semibold text-zinc-900 sm:text-5xl">
            <span style={{ color: "#543286" }}>{t.contact.title}</span>
          </h2>
          <div className="mx-auto mt-5 h-px w-16" style={{ backgroundColor: "#543286" }} />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

          <div className="flex flex-col gap-10">
            <div>
              <p className="text-xl leading-relaxed text-zinc-700">
                {t.contact.intro1}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-zinc-500">
                {t.contact.intro2}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {contactCards.map(({ renderIcon, label, value, href }) => (
                <a
                  key={label + href}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-5 rounded-2xl border border-zinc-100 bg-zinc-50 px-6 py-5 transition-shadow hover:shadow-md"
                >
                  <span
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "rgba(84,50,134,0.1)" }}
                  >
                    {renderIcon()}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                      {label}
                    </p>
                    <p className="mt-0.5 text-base font-medium text-zinc-800">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <ContactForm />

        </div>
      </div>
    </section>
  );
}
