import type { SanityImageSource } from "@sanity/image-url";
import { isSanityConfigured, sanityClient } from "@/sanity/lib/client";
import { activeAnnouncementQuery } from "@/sanity/lib/queries";

export interface HomepageAnnouncement {
  title: string;
  text: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: SanityImageSource;
}

const fetchOptions = { next: { revalidate: 30 } };

export async function getActiveAnnouncement(): Promise<HomepageAnnouncement | null> {
  if (!isSanityConfigured) return null;
  const result = await sanityClient.fetch<HomepageAnnouncement | null>(
    activeAnnouncementQuery,
    {},
    fetchOptions
  );
  return result ?? null;
}
