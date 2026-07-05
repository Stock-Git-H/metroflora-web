import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";

export const isSanityConfigured = Boolean(projectId);

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  // Malý web s nízkým provozem — čerstvost obsahu po úpravě ve Studiu je
  // důležitější než latence CDN, proto čteme rovnou z live API.
  useCdn: false,
});
