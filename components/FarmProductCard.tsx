import Image from "next/image";
import type { FarmProduct } from "@/lib/farm-products";
import { urlFor } from "@/sanity/lib/image";

type Size = "lg" | "md" | "sm";

const imageAspect: Record<Size, string> = {
  lg: "aspect-[4/3] md:aspect-auto",
  md: "aspect-[2/1]",
  sm: "aspect-square",
};

const nameSize: Record<Size, string> = {
  lg: "text-2xl",
  md: "text-lg",
  sm: "text-base",
};

const descSize: Record<Size, string> = {
  lg: "text-sm",
  md: "text-sm",
  sm: "text-xs",
};

export default function FarmProductCard({ product, size }: { product: FarmProduct; size: Size }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border ${
        size === "lg" ? "md:grid md:grid-cols-2" : ""
      }`}
    >
      <div className={`relative bg-cream-3 ${imageAspect[size]}`}>
        {product.image ? (
          <Image
            src={urlFor(product.image).width(900).fit("max").url()}
            alt={product.name}
            fill
            sizes={size === "lg" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
            className="object-contain p-4"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink-faint">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M4 16l4.5-5 3.5 4 3-3.5L20 16" />
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
            </svg>
          </div>
        )}
      </div>
      <div className={`p-4 ${size === "lg" ? "md:flex md:flex-col md:justify-center md:p-8" : ""}`}>
        <div className={`mb-1 font-serif text-ink ${nameSize[size]}`}>{product.name}</div>
        {product.description && (
          <p className={`mb-3 leading-relaxed text-ink-muted ${descSize[size]}`}>{product.description}</p>
        )}
        <div className="font-medium text-ink">
          {product.price} Kč <span className="text-ink-faint">/ {product.unit}</span>
        </div>
      </div>
    </div>
  );
}
