import Header from "@/components/layout/Header";
import AppDownload from "@/components/pwa/AppDownload";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Instala a App — Ponto Fly",
  description: "Instala a app Ponto Fly gratuita no teu telemóvel, sem precisares de ir à loja de apps.",
};

export default function AppPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <AppDownload />
      </main>
      <Footer />
    </>
  );
}
