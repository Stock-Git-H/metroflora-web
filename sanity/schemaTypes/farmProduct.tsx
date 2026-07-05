import { defineField, defineType } from "sanity";
import { ActiveToggle } from "../components/ActiveToggle";

export default defineType({
  name: "farmProduct",
  title: "Prodej ze dvora",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Název produktu", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Popis", type: "text" }),
    defineField({ name: "price", title: "Cena", type: "number", validation: (r) => r.required().min(0) }),
    defineField({
      name: "unit",
      title: "Jednotka",
      description: "Např. kg, ks, l — cokoliv dává pro daný produkt smysl.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Fotografie",
      description: "Doporučený formát: WebP, čtvercový nebo mírně na šířku.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "active",
      title: "Aktivní (zobrazit na webu)",
      description: "Jen aktivní produkty se zobrazí na úvodní straně v sekci Prodej ze dvora (max. 4 najednou).",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "active", id: "_id", active: "active" },
    prepare: ({ title, id, active }) => ({
      title,
      subtitle: active ? "Aktivní" : "Neaktivní",
      media: <ActiveToggle id={id} active={Boolean(active)} />,
    }),
  },
});
