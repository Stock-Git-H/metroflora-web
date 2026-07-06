"use client";

import { useState } from "react";
import type { Wine } from "@/data/wines";
import { useCart } from "@/lib/cart-context";
import QuantityStepper from "@/components/QuantityStepper";

export default function AddToCartPanel({ wine }: { wine: Wine }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <div className="rounded-xl border border-border p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-ink-soft">Množství (lahví)</span>
        <QuantityStepper value={quantity} step={1} onChange={setQuantity} />
      </div>
      <button
        onClick={() => {
          addItem({ slug: wine.slug, name: wine.name, vintage: wine.vintage, price: wine.price }, quantity);
          setAdded(true);
        }}
        className="w-full rounded-md bg-ink px-5 py-3 text-sm font-medium text-cream"
      >
        Přidat do košíku — {quantity * wine.price} Kč vč. DPH
      </button>
      {added && <p className="mt-2 text-xs text-ink-muted">Přidáno do košíku.</p>}
      <p className="mt-3 text-xs text-ink-faint">
        Prodej po kartonech (6 lahví) při dopravě přepravní službou. Osobní odběr umožňuje i menší
        množství.
      </p>
    </div>
  );
}
