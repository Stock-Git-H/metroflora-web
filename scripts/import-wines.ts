import { createClient } from "@sanity/client";
import { wines } from "../data/wines";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Chybí NEXT_PUBLIC_SANITY_PROJECT_ID nebo SANITY_API_WRITE_TOKEN v .env.local."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function run() {
  const tx = client.transaction();

  for (const w of wines) {
    tx.createIfNotExists({
      _id: `wine-${w.slug}`,
      _type: "wine",
      name: w.name,
      vintage: w.vintage,
      slug: { _type: "slug", current: w.slug },
      category: w.category,
      ...(w.harvestType ? { harvestType: w.harvestType } : {}),
      price: w.price,
      ...(w.originalPrice ? { originalPrice: w.originalPrice } : {}),
      ...(w.description ? { description: w.description } : {}),
      featured: Boolean(w.featured),
      soldOut: false,
    });
  }

  const result = await tx.commit();
  console.log(`Hotovo — zpracováno ${wines.length} vín (nové dokumenty vytvořeny, existující s ID "wine-<slug>" přeskočeny).`);
  console.log(`Sanity transaction result:`, result.results?.length, "operací");
}

run().catch((err) => {
  console.error("Import selhal:", err);
  process.exit(1);
});
