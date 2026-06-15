"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { type ShopifyProduct, type ShopifyImage, formatPrice } from "@/lib/shopify";
import { useLanguage } from "@/context/LanguageContext";

const PURPLE = "#543286";

type Selection = Record<string, string>;

function findVariant(product: ShopifyProduct, selection: Selection) {
  return product.variants.find((v) =>
    v.selectedOptions.every((opt) => selection[opt.name] === opt.value),
  );
}

function isValueAvailable(
  product: ShopifyProduct,
  optionName: string,
  optionValue: string,
  selection: Selection,
): boolean {
  return product.variants.some(
    (v) =>
      v.availableForSale &&
      v.selectedOptions.every((opt) =>
        opt.name === optionName
          ? opt.value === optionValue
          : selection[opt.name] === opt.value,
      ),
  );
}

function buildInitialSelection(product: ShopifyProduct): Selection {
  const selection: Selection = {};
  for (const opt of product.options) {
    selection[opt.name] = opt.values[0];
  }
  return selection;
}

const isSingleDefault =
  (product: ShopifyProduct) =>
    product.options.length === 1 &&
    product.options[0].name === "Title" &&
    product.options[0].values[0] === "Default Title";

function Gallery({
  images,
  activeUrl,
  title,
  noImageLabel,
}: {
  images: ShopifyImage[];
  activeUrl: string | null;
  title: string;
  noImageLabel: string;
}) {
  const [localActive, setLocalActive] = useState<string | null>(null);
  const displayed = localActive ?? activeUrl ?? images[0]?.url ?? null;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-50">
        {displayed ? (
          <Image
            key={displayed}
            src={displayed}
            alt={title}
            fill
            priority
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-300">
            {noImageLabel}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLocalActive(img.url)}
              className="relative h-20 w-20 flex-none overflow-hidden rounded-xl bg-zinc-50 ring-2 transition-all"
              style={{
                outline: displayed === img.url ? `2px solid ${PURPLE}` : "2px solid transparent",
              }}
              aria-label={`Ver imagem ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${title} ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductDetails({ product }: { product: ShopifyProduct }) {
  const { t } = useLanguage();
  const [selection, setSelection] = useState<Selection>(() =>
    buildInitialSelection(product),
  );

  const selectedVariant = useMemo(
    () => findVariant(product, selection),
    [product, selection],
  );

  const showOptions = !isSingleDefault(product);
  const variantImageUrl = selectedVariant?.image?.url ?? null;

  function selectOption(optionName: string, value: string) {
    setSelection((prev) => ({ ...prev, [optionName]: value }));
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

      <Gallery
        images={product.images}
        activeUrl={variantImageUrl}
        title={product.title}
        noImageLabel={t.productDetail.noImage}
      />

      <div className="flex flex-col gap-8 lg:py-4">
        <div>
          <h1 className="text-3xl font-semibold leading-tight text-zinc-900 sm:text-4xl">
            {product.title}
          </h1>
          {product.description && (
            <p className="mt-4 text-base leading-relaxed text-zinc-500">
              {product.description}
            </p>
          )}
        </div>

        <div className="h-px bg-zinc-100" />

        <p className="text-3xl font-semibold" style={{ color: PURPLE }}>
          {selectedVariant
            ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
            : formatPrice(
                product.priceRange.minVariantPrice.amount,
                product.priceRange.minVariantPrice.currencyCode,
              )}
        </p>

        {showOptions && (
          <div className="flex flex-col gap-5">
            {product.options.map((option) => (
              <div key={option.name} className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-zinc-700">
                  {option.name}
                  {selection[option.name] && (
                    <span className="ml-2 font-normal text-zinc-400">
                      {selection[option.name]}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const available = isValueAvailable(product, option.name, value, selection);
                    const active = selection[option.name] === value;
                    return (
                      <button
                        key={value}
                        onClick={() => available && selectOption(option.name, value)}
                        disabled={!available}
                        className="relative rounded-full border px-4 py-2 text-sm font-medium transition-all disabled:opacity-40"
                        style={
                          active
                            ? { backgroundColor: PURPLE, borderColor: PURPLE, color: "#fff" }
                            : { borderColor: "rgb(228 228 231)", color: "rgb(63 63 70)" }
                        }
                      >
                        {value}
                        {!available && (
                          <span
                            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
                            aria-hidden="true"
                          >
                            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <line x1="0" y1="100" x2="100" y2="0" stroke="rgb(161 161 170)" strokeWidth="1.5" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedVariant ? (
          <AddToCartButton
            variantId={selectedVariant.id}
            availableForSale={selectedVariant.availableForSale}
            productTitle={product.title}
            variantTitle={selectedVariant.title !== "Default Title" ? selectedVariant.title : null}
            price={selectedVariant.price.amount}
            currencyCode={selectedVariant.price.currencyCode}
            image={product.images[0]?.url ?? null}
          />
        ) : (
          <button
            disabled
            className="w-full rounded-full border border-zinc-200 py-3 text-sm font-medium text-zinc-400 cursor-not-allowed"
          >
            {t.productDetail.unavailable}
          </button>
        )}

        <p className="text-xs text-zinc-400">
          {t.productDetail.secureCheckout}
        </p>
      </div>
    </div>
  );
}
