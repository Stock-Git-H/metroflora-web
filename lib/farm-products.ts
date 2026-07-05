import type { SanityImageSource } from "@sanity/image-url";
import { isSanityConfigured, sanityClient } from "@/sanity/lib/client";
import { activeFarmProductsQuery } from "@/sanity/lib/queries";

export interface FarmProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  unit: string;
  image?: SanityImageSource;
}

const fetchOptions = { next: { revalidate: 30 } };

export async function getActiveFarmProducts(): Promise<FarmProduct[]> {
  if (!isSanityConfigured) return [];
  const result = await sanityClient.fetch<FarmProduct[]>(activeFarmProductsQuery, {}, fetchOptions);
  return result ?? [];
}
