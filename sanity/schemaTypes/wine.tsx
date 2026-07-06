import { defineField, defineType } from "sanity";
import { ActiveToggle } from "../components/ActiveToggle";

export default defineType({
  name: "wine",
  title: "Víno",
  type: "document",
  fieldsets: [
    {
      name: "dalsiInformace",
      title: "Další informace",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({ name: "name", title: "Název odrůdy / vína", type: "string", validation: (r) => r.required() }),
    defineField({ name: "vintage", title: "Ročník", type: "number", validation: (r) => r.required() }),
    defineField({
      name: "sweetness",
      title: "Chuťová kategorie",
      type: "string",
      options: { list: ["suché", "polosuché", "polosladké", "sladké"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: (doc) => `${doc.name}-${doc.vintage}` }, validation: (r) => r.required() }),
    defineField({
      name: "active",
      title: "Aktivní (zobrazit v eshopu)",
      description: "Když vypnete, víno zmizí z eshopu, aniž byste ho museli mazat.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
      options: { list: [
        { title: "Bílé", value: "bile" },
        { title: "Červené", value: "cervene" },
        { title: "Rosé", value: "rose" },
        { title: "Frizzante", value: "frizzante" },
      ] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "harvestType",
      title: "Typ sběru",
      type: "string",
      options: { list: ["pozdní sběr", "výběr z hroznů", "výběr z bobulí"] },
    }),
    defineField({
      name: "price",
      title: "Cena s DPH (Kč / lahev)",
      description: "Konečná prodejní cena pro zákazníka, včetně DPH — stejně jako se zobrazovala na starém webu. DPH se nikde dopočítává, zadejte rovnou celkovou cenu.",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "originalPrice",
      title: "Původní cena s DPH (při slevě)",
      description: "Nepovinné — vyplňte jen pokud je víno ve slevě, cena se pak zobrazí přeškrtnutá.",
      type: "number",
    }),
    defineField({ name: "stockBottles", title: "Sklad (počet lahví)", type: "number" }),
    defineField({
      name: "origin",
      title: "Původ vína",
      description: "Např. \"Vinařská oblast Morava, podoblast Slovácká, vinařská obec Milotice, viniční trať Šidleny.\"",
      type: "text",
    }),
    defineField({ name: "description", title: "Popis", type: "text" }),
    defineField({ name: "tastingNotes", title: "Degustační poznámky", type: "text" }),
    defineField({
      name: "image",
      title: "Fotografie lahve",
      description: "Doporučený formát: WebP, 1000 × 600 px, průhledné pozadí (bez bílého podkladu).",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "nutritionImage",
      title: "Výživové údaje (obrázek štítku)",
      description: "Povinný přehled výživových údajů na 100 ml. Nahrajte obrázek štítku — v detailu vína se zobrazí jako odkaz \"Výživové údaje\", po kliknutí se obrázek otevře.",
      type: "image",
    }),
    defineField({ name: "featured", title: "Zobrazit na homepage", type: "boolean", initialValue: false }),
    defineField({ name: "soldOut", title: "Vyprodáno", type: "boolean", initialValue: false }),

    defineField({ name: "bottleVolume", title: "Objem lahve (l)", type: "number", fieldset: "dalsiInformace" }),
    defineField({ name: "alcoholPercent", title: "Obsah alkoholu (% obj.)", type: "number", fieldset: "dalsiInformace" }),
    defineField({ name: "totalAcids", title: "Veškeré kyseliny (g/l)", type: "number", fieldset: "dalsiInformace" }),
    defineField({ name: "sugarFreeExtract", title: "Bezcukerný extrakt (g/l)", type: "number", fieldset: "dalsiInformace" }),
    defineField({ name: "residualSugar", title: "Zbytkový cukr (g/l)", type: "number", fieldset: "dalsiInformace" }),
    defineField({ name: "batchNumber", title: "Šarže", type: "string", fieldset: "dalsiInformace" }),
  ],
  preview: {
    select: { title: "name", subtitle: "vintage", id: "_id", active: "active" },
    prepare: ({ title, subtitle, id, active }) => ({
      title,
      subtitle: subtitle ? `Ročník ${subtitle}` : undefined,
      media: <ActiveToggle id={id} active={active !== false} />,
    }),
  },
});
