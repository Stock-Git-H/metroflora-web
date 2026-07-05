import { defineField, defineType } from "sanity";
import { ActiveToggle } from "../components/ActiveToggle";

export default defineType({
  name: "blogPost",
  title: "Článek",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titulek", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Perex", type: "text" }),
    defineField({ name: "body", title: "Obsah", type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "coverImage", title: "Úvodní fotografie", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", title: "Datum publikace", type: "datetime" }),
    defineField({
      name: "active",
      title: "Aktivní (zveřejněno)",
      description: "Když vypnete, článek se nebude na webu zobrazovat.",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", id: "_id", active: "active" },
    prepare: ({ title, subtitle, id, active }) => ({
      title,
      subtitle,
      media: <ActiveToggle id={id} active={active !== false} />,
    }),
  },
});
