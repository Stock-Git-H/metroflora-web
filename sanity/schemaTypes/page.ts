import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Volná stránka",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titulek", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "body", title: "Obsah", type: "array", of: [{ type: "block" }, { type: "image" }] }),
  ],
});
