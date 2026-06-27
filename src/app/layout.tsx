import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cookies, headers } from "next/headers";
import Providers from "@/components/cart/Providers";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";
import InstallBanner from "@/components/pwa/InstallBanner";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#4A3866",
};

export const metadata: Metadata = {
  title: "Ponto Fly",
  description: "A tua loja de fios e acessórios para tricot e croché.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ponto Fly",
  },
  icons: {
    icon: "/assets/hook-transparent.png",
    apple: "/assets/logo-transparent.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const store = await cookies();
  const supported = ["pt", "en", "es", "fr"];
  let locale = store.get("locale")?.value;
  if (!locale) {
    const reqHeaders = await headers();
    const acceptLang = reqHeaders.get("accept-language") ?? "";
    const preferred = acceptLang.split(",")[0].split("-")[0].toLowerCase();
    locale = supported.includes(preferred) ? preferred : "pt";
  }

  return (
    <html lang={locale} className={`${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Providers initialLocale={locale}>
          {children}
          <InstallBanner />
          <WhatsAppFloat />
        </Providers>
        <ServiceWorkerRegister />
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
