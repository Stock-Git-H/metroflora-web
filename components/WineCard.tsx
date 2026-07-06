"use client";

import Link from "next/link";
import type { Wine } from "@/data/wines";
import { categoryLabels } from "@/data/wines";
import { useCart } from "@/lib/cart-context";
import WineThumb from "@/components/WineThumb";

const categoryColor: Record<Wine["category"], string> = {
  bile: "text-gold-dark",
  cervene: "text-wine-red",
  rose: "text-wine-red",
  frizzante: "text-gold-dark",
};

export default function WineCard({ wine }: { wine: Wine }) {
  const { addItem } = useCart();
  const onSale = typeof wine.originalPrice === "number" && wine.originalPrice > wine.price;

  return (
    <div className="flex gap-3 rounded-xl border border-border p-3">
      <Link href={`/eshop/${wine.slug}`} className="shrink-0">
        <WineThumb wine={wine} sizes="96px" className="w-24 aspect-[2/3]" />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <Link href={`/eshop/${wine.slug}`}>
          <div className={`mb-1 text-[10px] tracking-wide ${categoryColor[wine.category]}`}>
            {categoryLabels[wine.category].toUpperCase()}
            {wine.harvestType ? ` · ${wine.harvestType.toUpperCase()}` : ""}
          </div>
          <div className="text-sm font-medium text-ink">
            {wine.name} {wine.vintage}
          </div>
        </Link>
        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="whitespace-nowrap text-[15px] font-medium text-ink">{wine.price} Kč</span>
            {onSale && (
              <span className="whitespace-nowrap text-xs text-ink-faint line-through">{wine.originalPrice} Kč</span>
            )}
          </div>
          <div className="text-[10px] text-ink-faint">vč. DPH</div>
          <button
            onClick={() => addItem({ slug: wine.slug, name: wine.name, vintage: wine.vintage, price: wine.price })}
            className="mt-2 w-full rounded-md bg-ink px-3 py-1.5 text-xs font-medium text-cream"
          >
            Přidat
          </button>
        </div>
      </div>
    </div>
  );
}
