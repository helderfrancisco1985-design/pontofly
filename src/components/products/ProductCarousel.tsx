"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { type ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useLanguage } from "@/context/LanguageContext";

const PURPLE = "#543286";
const AUTO_INTERVAL = 3000;
const SCROLL_AMOUNT = 320;

export default function ProductCarousel({ products }: { products: ShopifyProduct[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { t } = useLanguage();

  const stopAuto = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    timerRef.current = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 8) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
      }
    }, AUTO_INTERVAL);
  }, [stopAuto]);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  function scroll(dir: "left" | "right") {
    trackRef.current?.scrollBy({
      left: dir === "right" ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
      behavior: "smooth",
    });
    startAuto();
  }

  return (
    <div
      className="relative"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      <button
        onClick={() => scroll("left")}
        aria-label="Anterior"
        className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 shadow-md ring-1 ring-zinc-100 transition hover:shadow-lg md:flex"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={() => scroll("right")}
        aria-label="Seguinte"
        className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 shadow-md ring-1 ring-zinc-100 transition hover:shadow-lg md:flex"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product) => {
          const variant = product.variants[0];
          const price = variant
            ? formatPrice(variant.price.amount, variant.price.currencyCode)
            : formatPrice(
                product.priceRange.minVariantPrice.amount,
                product.priceRange.minVariantPrice.currencyCode,
              );

          return (
            <article
              key={product.id}
              className="group flex w-[80vw] flex-none flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100 sm:w-72"
              style={{ scrollSnapAlign: "start" }}
            >
              <Link href={`/produtos/${product.handle}`} className="relative block aspect-square bg-zinc-50">
                {product.featuredImage ? (
                  <Image
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText ?? product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 80vw, 288px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-zinc-300">
                    {t.products.noImage}
                  </div>
                )}
              </Link>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <Link href={`/produtos/${product.handle}`}>
                  <h3 className="text-base font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-[#543286]">
                    {product.title}
                  </h3>
                </Link>

                <p className="text-lg font-semibold" style={{ color: PURPLE }}>
                  {price}
                </p>

                <div className="mt-auto">
                  <Link
                    href={`/produtos/${product.handle}`}
                    className="block w-full rounded-full border border-zinc-200 py-2 text-center text-sm font-medium text-zinc-700 transition-colors hover:border-[#543286] hover:text-[#543286]"
                  >
                    {t.products.viewProduct}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
