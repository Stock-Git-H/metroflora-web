import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepageAnnouncement",
  title: "Úvodní článek (novinka)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nadpis", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Text", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "image",
      title: "Fotografie",
      description: "Nepovinné — pokud nahrajete fotku, nahradí se jí obecný obrázek vinice v úvodní sekci.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ctaLabel",
      title: "Text tlačítka",
      description: "Nepovinné — pokud vyplníte spolu s odkazem níže, nahradí se jím výchozí dvě tlačítka (Nakoupit vína / Náš příběh) jedním vlastním.",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "Odkaz tlačítka",
      description: "Např. /eshop nebo /o-vinarstvi",
      type: "string",
    }),
    defineField({ name: "validFrom", title: "Platnost od", type: "datetime" }),
    defineField({
      name: "validUntil",
      title: "Platnost do",
      description: "Po tomto datu se na úvodní straně automaticky vrátí obecný text o vinařství.",
      type: "datetime",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "validUntil", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle ? `Platí do ${subtitle}` : "Bez omezení platnosti",
      media,
    }),
  },
});
