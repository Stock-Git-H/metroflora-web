import Link from "next/link";
import { categoryLabels, harvestTypeToSlug, type WineCategory, type HarvestType } from "@/data/wines";

const categoryTags: WineCategory[] = ["bile", "cervene", "rose", "frizzante"];
const harvestTags: NonNullable<HarvestType>[] = ["pozdní sběr", "výběr z hroznů", "výběr z bobulí"];

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-cream-2">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-8 md:grid-cols-4">
        <div>
          <div className="mb-3 font-serif text-lg">Vinařství Metroflora</div>
          <p className="text-sm leading-relaxed text-cream-2/80">
            METROFLORA s.r.o. — rodinné vinařství v Miloticích u Kyjova, Slovácká podoblast.
          </p>
        </div>

        <div className="text-sm leading-relaxed text-cream-2/80">
          <div className="mb-3 font-serif text-base text-cream">Kontakt</div>
          <p>Dubňanská 376, 696 05 Milotice</p>
          <p>IČO: 25587846</p>
          <p>Tel.: +420 602 766 560</p>
          <p>Prodej vína (T. Gregorovič): +420 602 524 552</p>
        </div>

        <div className="text-sm leading-relaxed text-cream-2/80">
          <div className="mb-3 font-serif text-base text-cream">Odkazy</div>
          <ul className="flex flex-col gap-1">
            <li><Link href="/eshop" className="hover:text-cream">Eshop</Link></li>
            <li><Link href="/o-vinarstvi" className="hover:text-cream">O vinařství</Link></li>
            <li><Link href="/kontakt" className="hover:text-cream">Kontakt</Link></li>
            <li><Link href="/doprava-a-platba" className="hover:text-cream">Doprava a platba</Link></li>
          </ul>
        </div>

        <div className="text-sm leading-relaxed text-cream-2/80">
          <div className="mb-3 font-serif text-base text-cream">Vína</div>
          <div className="flex flex-wrap gap-2">
            {categoryTags.map((c) => (
              <Link
                key={c}
                href={`/eshop?kategorie=${c}`}
                className="rounded-full border border-cream-2/20 px-3 py-1 text-xs hover:border-cream-2/50 hover:text-cream"
              >
                {categoryLabels[c]}
              </Link>
            ))}
            {harvestTags.map((h) => (
              <Link
                key={h}
                href={`/eshop?sber=${harvestTypeToSlug[h]}`}
                className="rounded-full border border-cream-2/20 px-3 py-1 text-xs capitalize hover:border-cream-2/50 hover:text-cream"
              >
                {h}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-cream-2/10 px-4 py-4 text-center text-xs text-cream-2/60 sm:px-8">
        © {new Date().getFullYear()} METROFLORA s.r.o. — Milotice u Kyjova
      </div>
    </footer>
  );
}
