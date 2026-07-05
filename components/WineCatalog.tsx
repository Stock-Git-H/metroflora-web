"use client";

import { useMemo, useState } from "react";
import type { HarvestType, Wine, WineCategory } from "@/data/wines";
import { categoryLabels } from "@/data/wines";
import WineCard from "@/components/WineCard";

const categories: Array<WineCategory | "vse"> = ["vse", "bile", "cervene", "rose", "frizzante"];
const harvestTypes: Array<NonNullable<HarvestType> | "vse"> = [
  "vse",
  "pozdní sběr",
  "výběr z hroznů",
  "výběr z bobulí",
];

export default function WineCatalog({
  wines,
  initialCategory = "vse",
  initialHarvestType = "vse",
}: {
  wines: Wine[];
  initialCategory?: WineCategory | "vse";
  initialHarvestType?: NonNullable<HarvestType> | "vse";
}) {
  const [category, setCategory] = useState<WineCategory | "vse">(initialCategory);
  const [harvestType, setHarvestType] = useState<NonNullable<HarvestType> | "vse">(initialHarvestType);
  const [vintage, setVintage] = useState<number | "vse">("vse");

  const vintages = useMemo(
    () => Array.from(new Set(wines.map((w) => w.vintage))).sort((a, b) => b - a),
    [wines]
  );

  const filtered = wines.filter(
    (w) =>
      (category === "vse" || w.category === category) &&
      (harvestType === "vse" || w.harvestType === harvestType) &&
      (vintage === "vse" || w.vintage === vintage)
  );

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-3 py-1.5 text-xs ${
              category === c ? "border-ink bg-ink text-cream" : "border-border text-ink-soft"
            }`}
          >
            {c === "vse" ? "Vše" : categoryLabels[c]}
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        {harvestTypes.map((h) => (
          <button
            key={h}
            onClick={() => setHarvestType(h)}
            className={`rounded-full border px-3 py-1.5 text-xs capitalize ${
              harvestType === h ? "border-ink bg-ink text-cream" : "border-border text-ink-soft"
            }`}
          >
            {h === "vse" ? "Jakýkoli sběr" : h}
          </button>
        ))}
        <select
          value={vintage}
          onChange={(e) => setVintage(e.target.value === "vse" ? "vse" : Number(e.target.value))}
          className="rounded-full border border-border px-3 py-1.5 text-xs text-ink-soft"
        >
          <option value="vse">Všechny ročníky</option>
          {vintages.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <span className="ml-auto text-xs text-ink-faint">{filtered.length} vín</span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((wine) => (
          <WineCard key={wine.slug} wine={wine} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-ink-faint">V této kategorii aktuálně nemáme žádné víno.</p>
      )}
    </div>
  );
}
