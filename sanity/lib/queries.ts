import { groq } from "next-sanity";

const wineFields = groq`
  "slug": slug.current,
  name,
  vintage,
  sweetness,
  category,
  harvestType,
  price,
  originalPrice,
  origin,
  "description": coalesce(description, ""),
  featured,
  image,
  nutritionImage,
  bottleVolume,
  alcoholPercent,
  totalAcids,
  sugarFreeExtract,
  residualSugar,
  batchNumber
`;

export const allWinesQuery = groq`
  *[_type == "wine" && active != false] | order(vintage desc, name asc) {
    ${wineFields}
  }
`;

export const wineBySlugQuery = groq`
  *[_type == "wine" && slug.current == $slug && active != false][0] {
    ${wineFields}
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]
`;

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    excerpt,
    publishedAt
  }
`;

export const activeFarmProductsQuery = groq`
  *[_type == "farmProduct" && active == true] | order(_createdAt asc) [0...4] {
    "_id": _id,
    name,
    description,
    price,
    unit,
    image
  }
`;

export const activeAnnouncementQuery = groq`
  *[_type == "homepageAnnouncement"
    && (!defined(validFrom) || validFrom <= now())
    && (!defined(validUntil) || validUntil >= now())
  ] | order(_updatedAt desc) [0] {
    title,
    text,
    ctaLabel,
    ctaHref,
    image
  }
`;
