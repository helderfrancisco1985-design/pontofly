"use client";

import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import CartDrawer from "./CartDrawer";

export default function Providers({
  children,
  initialLocale = "pt",
}: {
  children: React.ReactNode;
  initialLocale?: string;
}) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </LanguageProvider>
  );
}
