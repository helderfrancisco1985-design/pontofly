"use client";

const PURPLE = "#543286";

export default function BrandsCarousel({ brands }: { brands: string[] }) {
  if (brands.length === 0) return null;

  // Duplicar para loop contínuo sem saltos
  const doubled = [...brands, ...brands];

  return (
    <div className="w-full overflow-hidden border-y border-zinc-100 bg-white py-5">
      <div
        className="flex w-max gap-8 will-change-transform"
        style={{
          animation: `brands-scroll ${brands.length * 3}s linear infinite`,
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLDivElement).style.animationPlayState = "paused")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLDivElement).style.animationPlayState = "running")
        }
      >
        {doubled.map((brand, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold uppercase tracking-widest text-zinc-400 select-none"
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full flex-none"
              style={{ backgroundColor: PURPLE }}
              aria-hidden="true"
            />
            {brand}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes brands-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
