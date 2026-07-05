import { notFound } from "next/navigation";
import { getAllWines, getWineBySlug } from "@/lib/wines";
import { categoryLabels } from "@/data/wines";
import AddToCartPanel from "@/components/AddToCartPanel";
import WineThumb from "@/components/WineThumb";
import NutritionButton from "@/components/NutritionButton";

export async function generateStaticParams() {
  const wines = await getAllWines();
  return wines.map((w) => ({ slug: w.slug }));
}

export default async function WineDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wine = await getWineBySlug(slug);
  if (!wine) notFound();

  const onSale = typeof wine.originalPrice === "number" && wine.originalPrice > wine.price;

  const details: Array<[string, string]> = [
    typeof wine.bottleVolume === "number" ? ["Objem lahve", `${wine.bottleVolume} l`] : null,
    typeof wine.bottleWeight === "number" ? ["Hmotnost lahve", `${wine.bottleWeight} g`] : null,
    typeof wine.alcoholPercent === "number" ? ["Obsah alkoholu", `${wine.alcoholPercent} % obj.`] : null,
    typeof wine.totalAcids === "number" ? ["Veškeré kyseliny", `${wine.totalAcids} g/l`] : null,
    typeof wine.sugarFreeExtract === "number" ? ["Bezcukerný extrakt", `${wine.sugarFreeExtract} g/l`] : null,
    typeof wine.residualSugar === "number" ? ["Zbytkový cukr", `${wine.residualSugar} g/l`] : null,
    wine.batchNumber ? ["Šarže", wine.batchNumber] : null,
  ].filter((row): row is [string, string] => row !== null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-8">
      <div className="grid gap-10 md:grid-cols-2">
        <WineThumb wine={wine} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[2/3]" />

        <div>
          <div className="mb-2 text-xs tracking-[0.15em] text-gold-dark">
            {categoryLabels[wine.category].toUpperCase()}
            {wine.harvestType ? ` · ${wine.harvestType.toUpperCase()}` : ""}
          </div>
          <h1 className="mb-4 font-serif text-3xl text-ink">
            {wine.name} {wine.vintage}
          </h1>
          <div className="mb-1 flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-medium text-ink">{wine.price} Kč</span>
              {onSale && <span className="text-sm text-ink-faint line-through">{wine.originalPrice} Kč</span>}
            </div>
            {wine.nutritionImage && <NutritionButton image={wine.nutritionImage} />}
          </div>
          <div className="mb-6 text-xs text-ink-faint">cena s DPH</div>
          {wine.description && (
            <p className="mb-6 text-sm leading-relaxed text-ink-muted">{wine.description}</p>
          )}
          <AddToCartPanel wine={wine} />

          {details.length > 0 && (
            <div className="mt-6 rounded-xl border border-border p-4 text-sm">
              <div className="mb-2 font-medium text-ink">Parametry vína</div>
              <dl className="divide-y divide-border">
                {details.map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2 text-ink-muted">
                    <dt>{label}</dt>
                    <dd className="text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
