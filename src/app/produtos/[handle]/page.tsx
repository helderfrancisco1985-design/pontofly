import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/ui/BackButton";
import ProductDetails from "@/components/products/ProductDetails";
import { getProduct, getProducts } from "@/lib/shopify";

export async function generateStaticParams() {
  try {
    const products = await getProducts(100);
    return products.map((p) => ({ handle: p.handle }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  try {
    const product = await getProduct(handle);
    if (!product) return {};
    return {
      title: `${product.title} — Ponto Fly`,
      description: product.description,
    };
  } catch {
    return {};
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <BackButton />
          <ProductDetails product={product} />
        </div>
      </main>
      <Footer />
    </>
  );
}
