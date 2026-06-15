"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

const PURPLE = "#543286";

type Props = {
  variantId: string;
  availableForSale: boolean;
  productTitle: string;
  variantTitle?: string | null;
  price: string;
  currencyCode: string;
  image?: string | null;
};

export default function AddToCartButton({
  variantId,
  availableForSale,
  productTitle,
  variantTitle,
  price,
  currencyCode,
  image,
}: Props) {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [added, setAdded] = useState(false);

  if (!availableForSale) {
    return (
      <button
        disabled
        className="w-full rounded-full border border-zinc-200 py-3 text-sm font-medium text-zinc-400 cursor-not-allowed"
      >
        {t.addToCart.outOfStock}
      </button>
    );
  }

  function handleAdd() {
    addItem({
      variantId,
      productTitle,
      variantTitle: variantTitle ?? null,
      price,
      currencyCode,
      image: image ?? null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full rounded-full py-3 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90"
      style={{ backgroundColor: added ? "#22c55e" : PURPLE }}
    >
      {added ? t.addToCart.added : t.addToCart.add}
    </button>
  );
}
