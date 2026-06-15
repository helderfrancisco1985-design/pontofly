"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { type LaunchItem } from "@/lib/shopify";

const PURPLE = "#543286";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function LaunchTimeline({ items }: { items: LaunchItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    trackRef.current?.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  }

  if (items.length === 0) return null;

  return (
    <div className="relative">
      {/* Seta esquerda */}
      <button
        onClick={() => scroll("left")}
        aria-label="Anterior"
        className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 shadow-md ring-1 ring-zinc-100 transition hover:shadow-lg md:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      {/* Seta direita */}
      <button
        onClick={() => scroll("right")}
        aria-label="Seguinte"
        className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 shadow-md ring-1 ring-zinc-100 transition hover:shadow-lg md:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-0 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div key={item.id} className="flex flex-none flex-col items-center" style={{ minWidth: 180 }}>

            {/* Cartão */}
            <Link
              href={`/produtos/${item.handle}`}
              className="group mx-3 flex w-36 flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100 transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-square w-full bg-zinc-50">
                {item.featuredImage ? (
                  <Image
                    src={item.featuredImage.url}
                    alt={item.featuredImage.altText ?? item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="144px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-zinc-300">—</div>
                )}
              </div>
              <div className="px-3 py-2.5">
                <p className="truncate text-xs font-semibold text-zinc-800">{item.title}</p>
                <p className="mt-0.5 text-[10px] text-zinc-400">{formatDate(item.createdAt)}</p>
              </div>
            </Link>

            {/* Linha da timeline */}
            <div className="mt-4 flex w-full items-center">
              <div className={`h-px flex-1 ${i === 0 ? "bg-transparent" : "bg-zinc-200"}`} />
              <div className="h-3 w-3 flex-none rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: PURPLE }} />
              <div className={`h-px flex-1 ${i === items.length - 1 ? "bg-transparent" : "bg-zinc-200"}`} />
            </div>

            {/* Etiqueta de novo lançamento (só no primeiro) */}
            {i === 0 && (
              <span className="mt-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white" style={{ backgroundColor: PURPLE }}>
                Novo
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
