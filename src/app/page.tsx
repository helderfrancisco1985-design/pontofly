import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import About from "@/components/home/About";
import Blog from "@/components/home/Blog";
import AppDownload from "@/components/pwa/AppDownload";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Products />
      <About />
      <Blog />
      <AppDownload />
      <Contact />
      <Footer />
    </>
  );
}
