import type { Metadata } from "next";
import { getAllWines } from "@/lib/wines";
import { harvestTypeSlugs, type HarvestType, type WineCategory } from "@/data/wines";
import WineCatalog from "@/components/WineCatalog";

export const metadata: Metadata = {
  title: "Eshop — Vinařství Metroflora",
  description: "Vína rodinného vinařství Metroflora přímo z Milotic u Kyjova.",
};

const validCategories: WineCategory[] = ["bile", "cervene", "rose", "frizzante"];

export default async function EshopPage({
  searchParams,
}: {
  searchParams: Promise<{ kategorie?: string; sber?: string }>;
}) {
  const { kategorie, sber } = await searchParams;
  const wines = await getAllWines();

  const initialCategory = validCategories.includes(kategorie as WineCategory)
    ? (kategorie as WineCategory)
    : "vse";
  const initialHarvestType: NonNullable<HarvestType> | "vse" =
    (sber && harvestTypeSlugs[sber]) || "vse";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
      <div className="mb-8">
        <div className="mb-2 text-xs tracking-[0.15em] text-gold-dark">ESHOP</div>
        <h1 className="mb-2 font-serif text-3xl text-ink">Naše vína</h1>
        <p className="text-xs text-ink-faint">Všechny ceny jsou uvedeny včetně DPH 21 %.</p>
      </div>
      <WineCatalog wines={wines} initialCategory={initialCategory} initialHarvestType={initialHarvestType} />
    </div>
  );
}
