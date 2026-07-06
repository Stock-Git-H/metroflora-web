"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";

export default function NutritionButton({ image }: { image: SanityImageSource }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="group relative inline-block">
        <button
          onClick={() => setOpen(true)}
          aria-label="Výživové údaje"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink-soft"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M7.5 8h9M7.5 12h9M7.5 16h5" />
          </svg>
        </button>
        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-xs text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Výživové údaje
        </span>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-h-[85vh] max-w-md overflow-auto rounded-xl bg-cream p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Zavřít"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-cream-3 text-ink"
            >
              ✕
            </button>
            <div className="mb-2 text-sm font-medium text-ink">Výživové údaje na 100 ml</div>
            <Image
              src={urlFor(image).width(700).fit("max").url()}
              alt="Výživové údaje"
              width={700}
              height={900}
              className="h-auto w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
