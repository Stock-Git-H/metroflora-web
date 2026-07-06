import type { SanityImageSource } from "@sanity/image-url";

export type WineCategory = "bile" | "cervene" | "rose" | "frizzante";
export type HarvestType = "pozdní sběr" | "výběr z hroznů" | "výběr z bobulí" | null;
export type Sweetness = "suché" | "polosuché" | "polosladké" | "sladké" | null;

export interface Wine {
  slug: string;
  name: string;
  vintage: number;
  sweetness?: Sweetness;
  category: WineCategory;
  harvestType: HarvestType;
  price: number;
  originalPrice?: number;
  origin?: string;
  description: string;
  featured?: boolean;
  image?: SanityImageSource;
  nutritionImage?: SanityImageSource;
  bottleVolume?: number;
  alcoholPercent?: number;
  totalAcids?: number;
  sugarFreeExtract?: number;
  residualSugar?: number;
  batchNumber?: string;
}

export const categoryLabels: Record<WineCategory, string> = {
  bile: "Bílé",
  cervene: "Červené",
  rose: "Rosé",
  frizzante: "Frizzante",
};

export const harvestTypeSlugs: Record<string, NonNullable<HarvestType>> = {
  "pozdni-sber": "pozdní sběr",
  "vyber-z-hroznu": "výběr z hroznů",
  "vyber-z-bobuli": "výběr z bobulí",
};

export const harvestTypeToSlug: Record<NonNullable<HarvestType>, string> = {
  "pozdní sběr": "pozdni-sber",
  "výběr z hroznů": "vyber-z-hroznu",
  "výběr z bobulí": "vyber-z-bobuli",
};

// Krátké obecné popisy odrůd (veřejně známé ampelografické charakteristiky).
// Konkrétní degustační poznámky k jednotlivým ročníkům doplní vinařství přes Sanity Studio.
const varietalNotes: Record<string, string> = {
  Aurelius: "Odrůda vzniklá křížením Tramínu a Muškátu Ottonel, dává vína s výraznou kořenitou vůní.",
  Chardonnay: "Světově nejrozšířenější bílá odrůda, poskytuje plná vína s jemnou ovocnou vůní.",
  Děvín: "Česká odrůda vyšlechtěná křížením Tramínu a Muškátu Ottonel, harmonická a kořenitá.",
  "Frizzante Rulandské šedé": "Jemně perlivé víno z odrůdy Rulandské šedé, svěží a lehce nasládlé.",
  Hibernal: "Odolná odrůda s plnou chutí a nižší kyselinou, vhodná i pro zrání v sudu.",
  "Irsai Oliver": "Raně zrající muškátová odrůda s výraznou květinovou a broskvovou vůní.",
  Pálava: "Aromatická jihomoravská odrůda, křížení Tramínu červeného a Muškátu Ottonel.",
  "Rulandské bílé": "Odrůda z rodiny Pinot, dává plná vína s jemnou oříškovou tóninou.",
  "Rulandské modré": "Odrůda Pinot noir, u nás často zpracovávaná i do svěžího růžového vína.",
  "Rulandské modré rosé": "Odrůda Pinot noir zpracovaná do svěžího, ovocného růžového vína.",
  "Rulandské šedé": "Odrůda z rodiny Pinot, plná vína se stopami medu a sušeného ovoce.",
  "Ryzlink rýnský": "Ušlechtilá odrůda s vysokou kyselinou, dává elegantní a dlouhověká vína.",
  "Ryzlink vlašský": "Nejrozšířenější bílá odrůda na Moravě, svěží vína s nižším obsahem alkoholu.",
  Sauvignon: "Aromatická odrůda s typickou vůní rybízu a kopřivy.",
  Solaris: "Odolná raná odrůda s výraznou muškátovou vůní a vyšší cukernatostí.",
  "Sylvánské zelené": "Neutrálnější odrůda, dává lehká a svěží vína vhodná k běžnému stolování.",
  "Tramín červený": "Aromatická odrůda s výraznou kořenitou, růžovou vůní.",
  "Veltlínské zelené": "Klasická odrůda středoevropských vinic, svěží vína s nádechem bílého pepře.",
};

function wine(
  baseName: string,
  vintage: number,
  category: WineCategory,
  harvestType: HarvestType,
  price: number,
  opts: { originalPrice?: number; featured?: boolean; slugSuffix?: string } = {}
): Wine {
  const slugBase = baseName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const slug = `${slugBase}${opts.slugSuffix ? `-${opts.slugSuffix}` : ""}-${vintage}`;
  return {
    slug,
    name: baseName,
    vintage,
    category,
    harvestType,
    price,
    originalPrice: opts.originalPrice,
    description: varietalNotes[baseName] ?? "",
    featured: opts.featured,
  };
}

export const wines: Wine[] = [
  wine("Aurelius", 2025, "bile", "pozdní sběr", 200, { featured: true }),
  wine("Chardonnay", 2023, "bile", "pozdní sběr", 200),
  wine("Chardonnay", 2025, "bile", "pozdní sběr", 200, { featured: true }),
  wine("Děvín", 2023, "bile", "pozdní sběr", 200),
  wine("Děvín", 2024, "bile", "výběr z bobulí", 200),
  wine("Frizzante Rulandské šedé", 2025, "frizzante", null, 200, { featured: true }),
  wine("Hibernal", 2024, "cervene", "výběr z hroznů", 200),
  wine("Hibernal", 2025, "cervene", "pozdní sběr", 200, { featured: true }),
  wine("Irsai Oliver", 2023, "bile", null, 160, { originalPrice: 210 }),
  wine("Pálava", 2023, "bile", "výběr z bobulí", 200),
  wine("Pálava", 2024, "bile", "výběr z bobulí", 240),
  wine("Rulandské bílé", 2024, "bile", "pozdní sběr", 200),
  wine("Rulandské modré", 2025, "rose", "pozdní sběr", 200),
  wine("Rulandské modré rosé", 2023, "rose", "pozdní sběr", 160, { originalPrice: 210 }),
  wine("Rulandské modré rosé", 2024, "rose", "výběr z hroznů", 160, { originalPrice: 200 }),
  wine("Rulandské šedé", 2023, "bile", "pozdní sběr", 200),
  wine("Rulandské šedé", 2024, "bile", "výběr z hroznů", 200),
  wine("Ryzlink rýnský", 2023, "bile", "pozdní sběr", 200),
  wine("Ryzlink rýnský", 2024, "bile", "pozdní sběr", 200),
  wine("Ryzlink rýnský", 2025, "bile", "pozdní sběr", 200),
  wine("Ryzlink vlašský", 2024, "bile", "pozdní sběr", 200),
  wine("Ryzlink vlašský", 2025, "bile", "pozdní sběr", 200),
  wine("Sauvignon", 2023, "bile", "pozdní sběr", 200),
  wine("Sauvignon", 2025, "bile", "pozdní sběr", 200),
  wine("Solaris", 2024, "bile", "výběr z bobulí", 200),
  wine("Solaris", 2025, "bile", "výběr z hroznů", 200),
  wine("Sylvánské zelené", 2025, "bile", "pozdní sběr", 200),
  wine("Tramín červený", 2023, "bile", "výběr z hroznů", 200),
  wine("Tramín červený", 2024, "bile", "výběr z bobulí", 200),
  wine("Tramín červený", 2025, "bile", "pozdní sběr", 200),
  wine("Veltlínské zelené", 2024, "bile", "pozdní sběr", 200),
];
