import { wines as seedWines, type Wine } from "@/data/wines";
import { isSanityConfigured, sanityClient } from "@/sanity/lib/client";
import { allWinesQuery, wineBySlugQuery } from "@/sanity/lib/queries";

const fetchOptions = { next: { revalidate: 30 } };

export async function getAllWines(): Promise<Wine[]> {
  if (isSanityConfigured) {
    const result = await sanityClient.fetch<Wine[]>(allWinesQuery, {}, fetchOptions);
    if (result?.length) return result;
  }
  return seedWines;
}

export async function getWineBySlug(slug: string): Promise<Wine | null> {
  if (isSanityConfigured) {
    const result = await sanityClient.fetch<Wine | null>(wineBySlugQuery, { slug }, fetchOptions);
    if (result) return result;
  }
  return seedWines.find((w) => w.slug === slug) ?? null;
}

export async function getFeaturedWines(count = 8): Promise<Wine[]> {
  const all = await getAllWines();
  const featured = all.filter((w) => w.featured);
  const rest = all.filter((w) => !w.featured);
  return [...featured, ...rest].slice(0, count);
}
