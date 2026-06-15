import Image from "next/image";
import Link from "next/link";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { getLocale } from "@/lib/get-locale";
import { getTranslation } from "@/lib/translations";

const PURPLE = "#543286";

export default async function ProductCard({ product }: { product: ShopifyProduct }) {
  const locale = await getLocale();
  const t = getTranslation(locale);

  const firstVariant = product.variants[0];
  const price = firstVariant
    ? formatPrice(firstVariant.price.amount, firstVariant.price.currencyCode)
    : formatPrice(
        product.priceRange.minVariantPrice.amount,
        product.priceRange.minVariantPrice.currencyCode,
      );

  const excerpt =
    product.description.length > 100
      ? product.description.slice(0, 100).trimEnd() + "…"
      : product.description;

  return (
    <article className="group flex flex-col rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100 transition-shadow hover:shadow-md overflow-hidden">
      <Link href={`/produtos/${product.handle}`} className="relative block aspect-square w-full bg-zinc-50">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs text-zinc-300">{t.products.noImage}</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex-1">
          <Link href={`/produtos/${product.handle}`}>
            <h3 className="text-lg font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-[#543286]">
              {product.title}
            </h3>
          </Link>
          {excerpt && (
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">{excerpt}</p>
          )}
        </div>

        <p className="text-xl font-semibold" style={{ color: PURPLE }}>
          {price}
        </p>

        <Link
          href={`/produtos/${product.handle}`}
          className="w-full rounded-full border py-3 text-center text-sm font-medium text-zinc-700 transition-colors hover:border-[#543286] hover:text-[#543286]"
          style={{ borderColor: "rgb(228 228 231)" }}
        >
          {t.products.viewProduct}
        </Link>
      </div>
    </article>
  );
}
