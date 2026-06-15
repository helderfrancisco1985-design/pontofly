"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

const PURPLE = "#543286";

const NUM_LOCALE: Record<string, string> = {
  pt: "pt-PT", en: "en-IE", es: "es-ES", fr: "fr-FR",
};

function fmt(amount: number, currency: string, locale: string) {
  return new Intl.NumberFormat(NUM_LOCALE[locale] ?? "pt-PT", { style: "currency", currency }).format(amount);
}

export default function CartDrawer() {
  const { items, totalQuantity, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const { t, locale } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const currency = items[0]?.currencyCode ?? "EUR";

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.checkoutUrl) {
        setError(data.error ?? t.cart.errorCheckout);
        setLoading(false);
        return;
      }

      window.location.href = data.checkoutUrl;
    } catch {
      setError(t.cart.errorConnection);
      setLoading(false);
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label={t.cart.title}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            {t.cart.title}
            {totalQuantity > 0 && (
              <span className="ml-2 rounded-full px-2 py-0.5 text-xs font-semibold text-white" style={{ backgroundColor: PURPLE }}>
                {totalQuantity}
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            aria-label={t.cart.closeCart}
            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Lista de produtos */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-300">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p className="text-sm text-zinc-400">{t.cart.empty}</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4">
                  <div className="relative h-20 w-20 flex-none overflow-hidden rounded-xl bg-zinc-50">
                    {item.image ? (
                      <Image src={item.image} alt={item.productTitle} fill className="object-cover" sizes="80px" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-zinc-300">—</div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm font-semibold leading-snug text-zinc-900">{item.productTitle}</p>
                    {item.variantTitle && (
                      <p className="text-xs text-zinc-400">{item.variantTitle}</p>
                    )}
                    <p className="text-sm font-semibold" style={{ color: PURPLE }}>
                      {fmt(parseFloat(item.price), item.currencyCode, locale)}
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-400"
                        aria-label={t.cart.decrease}
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-zinc-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-400"
                        aria-label={t.cart.increase}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="ml-auto text-xs text-zinc-300 transition-colors hover:text-red-400"
                        aria-label={t.cart.removeProduct}
                      >
                        {t.cart.remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Rodapé */}
        {items.length > 0 && (
          <div className="border-t border-zinc-100 px-6 py-5 flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">{t.cart.subtotal}</span>
              <span className="text-lg font-semibold text-zinc-900">
                {fmt(subtotal, currency, locale)}
              </span>
            </div>
            {subtotal < 60 ? (
              <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2.5 text-xs text-zinc-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                <span>
                  {t.cart.shippingCost} — {t.cart.shippingMissing.replace("{amount}", fmt(60 - subtotal, currency, locale))}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium" style={{ backgroundColor: `${PURPLE}15`, color: PURPLE }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {t.cart.shippingFree}
              </div>
            )}
            <p className="text-xs text-zinc-400">{t.cart.taxNote}</p>

            {error && (
              <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-xs text-red-600">
                {error}
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full rounded-full py-3.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: PURPLE }}
            >
              {loading ? t.cart.processing : t.cart.checkout}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
