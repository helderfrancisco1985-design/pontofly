import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import BrandsCarousel from "@/components/products/BrandsCarousel";
import { getProducts, isShopifyConfigured } from "@/lib/shopify";
import { getLocale } from "@/lib/get-locale";
import { getTranslation } from "@/lib/translations";

const PURPLE = "#543286";

export const metadata = {
  title: "Produtos — Ponto Fly",
  description: "Fios, agulhas e acessórios para quem ama criar com as mãos.",
};

export default async function ProdutosPage() {
  const locale = await getLocale();
  const t = getTranslation(locale);

  if (!isShopifyConfigured()) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="mx-auto max-w-2xl px-6 py-24 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Configuração necessária
            </p>
            <h1 className="mb-4 text-3xl font-semibold text-zinc-900">
              Shopify não configurado
            </h1>
            <p className="text-base leading-relaxed text-zinc-500">
              Adiciona as seguintes variáveis ao ficheiro{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">.env.local</code>:
            </p>
            <pre className="mt-6 rounded-2xl bg-zinc-50 p-6 text-left text-sm text-zinc-700 ring-1 ring-zinc-200">
              {`NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=a-tua-loja.myshopify.com\nNEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=o-teu-token`}
            </pre>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const products = await getProducts(50);

  const brands = [...new Set(
    products.filter((p) => p.vendor).map((p) => p.vendor.trim())
  )].sort();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

        <div className="bg-zinc-50 px-6 py-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            {t.productPage.collection}
          </p>
          <h1 className="text-4xl font-semibold text-zinc-900 sm:text-5xl">
            {t.productPage.title1} <span style={{ color: PURPLE }}>{t.productPage.title2}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-zinc-500">
            {t.productPage.description}
          </p>
          <div className="mx-auto mt-5 h-px w-16" style={{ backgroundColor: PURPLE }} />
        </div>

        <div className="flex items-center justify-center gap-2 border-b border-zinc-100 bg-white py-3 text-sm text-zinc-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#543286" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          {t.productPage.freeShipping} <strong className="ml-1" style={{ color: PURPLE }}>60 €</strong>
        </div>

        <BrandsCarousel brands={brands} />

        <div className="mx-auto max-w-7xl px-6 py-10">
          {products.length === 0 ? (
            <p className="text-center text-zinc-500">{t.productPage.noProducts}</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </main>
      <Footer />
    </>
  );
}
