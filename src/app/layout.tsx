import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cookies } from "next/headers";
import Providers from "@/components/cart/Providers";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";
import InstallBanner from "@/components/pwa/InstallBanner";
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
    apple: "/assets/logo.jpeg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const store = await cookies();
  const locale = store.get("locale")?.value ?? "pt";

  return (
    <html lang={locale} className={`${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Providers initialLocale={locale}>
          {children}
          <InstallBanner />
        </Providers>
        <ServiceWorkerRegister />
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
