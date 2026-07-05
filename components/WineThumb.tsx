import Image from "next/image";
import type { Wine } from "@/data/wines";
import { urlFor } from "@/sanity/lib/image";
import { BottleSilhouette } from "@/components/icons";

const categoryColor: Record<Wine["category"], string> = {
  bile: "text-gold-dark",
  cervene: "text-wine-red",
  rose: "text-wine-red",
  frizzante: "text-gold-dark",
};

export default function WineThumb({
  wine,
  sizes,
  className = "aspect-[2/3]",
}: {
  wine: Wine;
  sizes: string;
  className?: string;
}) {
  if (wine.image) {
    return (
      <div className={`relative overflow-hidden rounded-lg bg-cream-3 ${className}`}>
        <Image
          src={urlFor(wine.image).width(1000).fit("max").url()}
          alt={`${wine.name} ${wine.vintage}`}
          fill
          sizes={sizes}
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center rounded-lg bg-cream-3 ${className}`}>
      <BottleSilhouette className={`h-2/5 w-auto ${categoryColor[wine.category]}`} />
    </div>
  );
}
