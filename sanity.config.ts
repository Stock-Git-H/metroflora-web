import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { BarChartIcon } from "@sanity/icons";
import { schemaTypes } from "./sanity/schemaTypes";
import { projectId, dataset } from "./sanity/lib/client";
import { Dashboard } from "./sanity/components/Dashboard";

export default defineConfig({
  name: "metroflora",
  title: "Vinařství Metroflora",
  projectId: projectId || "placeholder",
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Obsah")
          .items([
            S.listItem()
              .title("Přehled")
              .icon(BarChartIcon)
              .child(S.component(Dashboard).title("Přehled")),
            S.divider(),
            ...S.documentTypeListItems(),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
