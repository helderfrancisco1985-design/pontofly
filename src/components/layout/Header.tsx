"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Download } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const PURPLE = "#543286";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalQuantity, openCart } = useCart();
  const { t } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/#produtos", label: t.nav.products },
    { href: "/#sobre", label: t.nav.about },
    { href: "/#blog", label: t.nav.blog },
    { href: "/#contactos", label: t.nav.contacts },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full shadow-md"
      style={{ backgroundColor: "#4A3866" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1">


        {/* Nav desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + carrinho + idioma desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Link
            href="/produtos"
            className="rounded-full bg-white px-5 py-2 text-sm font-medium transition-colors hover:bg-white/90"
            style={{ color: PURPLE }}
          >
            {t.nav.viewStore}
          </Link>
          <button
            onClick={openCart}
            aria-label={t.cart.openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ShoppingBag size={20} />
            {totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold" style={{ color: PURPLE }}>
                {totalQuantity}
              </span>
            )}
          </button>
          <a
            href="/app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/60 hover:text-white"
          >
            <Download size={13} />
            {t.nav.app}
          </a>
        </div>

        {/* Carrinho + menu mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={openCart}
            aria-label={t.cart.openCart}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <ShoppingBag size={18} />
            {totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold" style={{ color: PURPLE }}>
                {totalQuantity}
              </span>
            )}
          </button>
          <button
            className="text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div
          className="border-t border-white/20 px-6 py-4 md:hidden"
          style={{ backgroundColor: "#4A3866" }}
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              <Download size={14} />
              {t.nav.app}
            </a>
          </nav>
          <div className="mt-5 flex items-center gap-3">
            <LanguageSwitcher />
          </div>
          <div className="mt-4">
            <Link
              href="/produtos"
              className="block w-full rounded-full bg-white py-2.5 text-center text-sm font-medium hover:bg-white/90"
              style={{ color: PURPLE }}
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.viewStore}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
