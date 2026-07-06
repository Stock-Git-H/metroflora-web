import Image from "next/image";
import Link from "next/link";
import type { Wine } from "@/data/wines";
import { urlFor } from "@/sanity/lib/image";
import { BottleSilhouette, ChevronIcon } from "@/components/icons";

const categoryColor: Record<Wine["category"], string> = {
  bile: "text-gold-dark",
  cervene: "text-wine-red",
  rose: "text-wine-red",
  frizzante: "text-gold-dark",
};

function NeighborPeek({ wine, side }: { wine: Wine; side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <Link
      href={`/eshop/${wine.slug}`}
      aria-label={`${isLeft ? "Předchozí víno" : "Další víno"}: ${wine.name} ${wine.vintage}`}
      className={`group fixed top-1/2 z-20 hidden h-56 w-16 -translate-y-1/2 items-center overflow-hidden border border-border bg-cream shadow-lg transition-all duration-300 hover:w-28 lg:flex ${
        isLeft ? "left-0 rounded-r-xl justify-start" : "right-0 rounded-l-xl justify-end"
      }`}
    >
      {wine.image ? (
        <div className="relative h-full w-full">
          <Image
            src={urlFor(wine.image).width(400).fit("max").url()}
            alt=""
            fill
            sizes="120px"
            className="object-contain p-2 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <BottleSilhouette className={`h-1/2 w-auto opacity-70 transition-opacity duration-300 group-hover:opacity-100 ${categoryColor[wine.category]}`} />
        </div>
      )}
      <ChevronIcon
        className={`absolute top-1/2 -translate-y-1/2 text-ink-faint ${
          isLeft ? "left-1 rotate-180" : "right-1"
        }`}
      />
    </Link>
  );
}

export default function WineNeighborNav({ prev, next }: { prev: Wine | null; next: Wine | null }) {
  return (
    <>
      {prev && <NeighborPeek wine={prev} side="left" />}
      {next && <NeighborPeek wine={next} side="right" />}
    </>
  );
}
