import Header from "@/components/layout/Header";
import Blog from "@/components/home/Blog";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Blog — Ponto Fly",
  description: "Dicas, inspiração e novidades do mundo do tricô e croché.",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <Blog />
      <Footer />
    </>
  );
}
