import Image from "next/image";
import Link from "next/link";
import { getFeaturedWines } from "@/lib/wines";
import { getActiveFarmProducts } from "@/lib/farm-products";
import { getActiveAnnouncement } from "@/lib/announcement";
import WineCarousel from "@/components/WineCarousel";
import FarmProductCard from "@/components/FarmProductCard";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import VineDecoration from "@/components/VineDecoration";
import { PinIcon, CalendarIcon, LeafIcon, ToolsIcon, PackageIcon } from "@/components/icons";
import { urlFor } from "@/sanity/lib/image";

const farmGridCols: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

const farmCardSize: Record<number, "lg" | "md" | "sm"> = {
  1: "lg",
  2: "md",
  3: "md",
  4: "sm",
};

const defaultTitle = "Deset hektarů prosluněných vinic v srdci Milotic";
const defaultText =
  "Od roku 2007 zpracováváme hrozny z vlastních tratí Kopce, Šidleny a Zášidlení šetrnou technologií Della Toffola. Výsledkem jsou vína s výraznou odrůdovou charakteristikou přímo od rodiny Gregorovičových.";

export default async function HomePage() {
  const [featured, farmProducts, announcement] = await Promise.all([
    getFeaturedWines(),
    getActiveFarmProducts(),
    getActiveAnnouncement(),
  ]);

  const hasCustomCta = Boolean(announcement?.ctaLabel && announcement?.ctaHref);

  return (
    <div>
      <section className="relative overflow-hidden bg-cream-2">
        <VineDecoration className="pointer-events-none absolute -right-16 -top-10 hidden h-64 w-[30rem] text-ink-soft/15 md:block" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-8 md:grid-cols-2 md:py-20">
          <div>
            <div className="mb-3 text-xs tracking-[0.15em] text-gold-dark">
              RODINNÉ VINAŘSTVÍ · SLOVÁCKO
            </div>
            <h1 className="mb-4 font-serif text-3xl leading-tight text-ink sm:text-4xl">
              {announcement?.title ?? defaultTitle}
            </h1>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-ink-muted">
              {announcement?.text ?? defaultText}
            </p>
            <div className="flex flex-wrap gap-3">
              {hasCustomCta ? (
                <Link
                  href={announcement!.ctaHref!}
                  className="rounded-md bg-ink px-6 py-3 text-sm font-medium text-cream"
                >
                  {announcement!.ctaLabel}
                </Link>
              ) : (
                <>
                  <Link href="/eshop" className="rounded-md bg-ink px-6 py-3 text-sm font-medium text-cream">
                    Nakoupit vína
                  </Link>
                  <Link
                    href="/o-vinarstvi"
                    className="rounded-md border border-border px-6 py-3 text-sm text-ink"
                  >
                    Náš příběh
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="relative h-64 overflow-hidden rounded-xl bg-cream-3 md:h-72">
            {announcement?.image ? (
              <Image
                src={urlFor(announcement.image).width(900).fit("max").url()}
                alt={announcement.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-ink-faint">foto: vinice Kopce</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-serif text-xl text-ink">Vybíráme z aktuální nabídky</h2>
          <Link href="/eshop" className="text-xs text-ink">
            Celá nabídka →
          </Link>
        </div>
        <WineCarousel wines={featured} />
        <Reveal className="mt-8 flex flex-col items-center gap-2 text-center">
          <PackageIcon className="text-gold-dark" />
          <p className="max-w-md text-xs text-ink-muted">
            Vína expedujeme přepravní službou pouze po celých kartonech (6 lahví). Osobní odběr ve
            vinařství umožňuje i menší množství.
          </p>
        </Reveal>
      </section>

      {farmProducts.length > 0 && (
        <section className="bg-sage-tint">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
            <div className="mb-6">
              <div className="mb-2 text-xs tracking-[0.15em] text-sage">PRODEJ ZE DVORA</div>
              <h2 className="font-serif text-xl text-ink">Aktuálně nabízíme</h2>
            </div>
            <div className={`grid gap-6 ${farmGridCols[farmProducts.length]}`}>
              {farmProducts.map((product) => (
                <Reveal key={product._id} direction="left">
                  <FarmProductCard product={product} size={farmCardSize[farmProducts.length]} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="grid grid-cols-2 gap-6 bg-cream-2 px-4 py-10 sm:px-8 md:grid-cols-4">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <PinIcon className="text-gold-dark" />
          <div className="font-serif text-lg text-ink">
            <CountUp value={10} suffix=" ha" />
          </div>
          <div className="text-xs text-ink-soft">vinic v Miloticích</div>
        </Reveal>
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <CalendarIcon className="text-gold-dark" />
          <div className="font-serif text-lg text-ink">
            <CountUp value={2007} />
          </div>
          <div className="text-xs text-ink-soft">založení vinařství</div>
        </Reveal>
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <LeafIcon className="text-gold-dark" />
          <div className="text-xs text-ink-soft">Integrovaná produkce</div>
        </Reveal>
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <ToolsIcon className="text-gold-dark" />
          <div className="text-xs text-ink-soft">Technologie Della Toffola</div>
        </Reveal>
      </section>
    </div>
  );
}
