import Link from "next/link";
import ProductCarousel from "@/components/products/ProductCarousel";
import { getProducts, isShopifyConfigured } from "@/lib/shopify";
import { getLocale } from "@/lib/get-locale";
import { getTranslation } from "@/lib/translations";

const PURPLE = "#543286";

export default async function Products() {
  const locale = await getLocale();
  const t = getTranslation(locale);

  let products: Awaited<ReturnType<typeof getProducts>> = [];

  if (isShopifyConfigured()) {
    try {
      products = await getProducts(12);
    } catch {
      // Se a API falhar, mostra a secção vazia
    }
  }

  return (
    <section id="produtos" className="w-full bg-zinc-50 py-20 px-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            {t.products.sectionLabel}
          </p>
          <h2 className="text-4xl font-semibold text-zinc-900 sm:text-5xl">
            {t.products.title1} <span style={{ color: PURPLE }}>{t.products.title2}</span>
          </h2>
          <div className="mx-auto mt-5 h-px w-16" style={{ backgroundColor: PURPLE }} />
          <Link
            href="/produtos"
            className="mt-6 inline-block rounded-full px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: PURPLE }}
          >
            {t.products.viewStore}
          </Link>
        </div>

        <div className="mb-8 flex items-center justify-center gap-2 rounded-2xl border border-zinc-100 bg-white py-3 text-sm text-zinc-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#543286" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          {t.productPage.freeShipping} <strong className="ml-1" style={{ color: PURPLE }}>60 €</strong>
        </div>

        {products.length > 0 ? (
          <ProductCarousel products={products} />
        ) : (
          <div className="min-h-[300px]" />
        )}

        <div className="mt-12 text-center">
          <Link
            href="/produtos"
            className="inline-block rounded-full px-8 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: PURPLE }}
          >
            {t.products.viewStore}
          </Link>
        </div>

      </div>
    </section>
  );
}
