import Image from "next/image";
import Link from "next/link";
import { getFeaturedWines } from "@/lib/wines";
import { getActiveFarmProducts } from "@/lib/farm-products";
import { getActiveAnnouncement } from "@/lib/announcement";
import WineCarousel from "@/components/WineCarousel";
import FarmProductCard from "@/components/FarmProductCard";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { PackageIcon } from "@/components/icons";
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
      <section className="relative flex min-h-[420px] items-center overflow-hidden md:min-h-[560px]">
        <div className="absolute inset-0">
          {announcement?.image ? (
            <Image
              src={urlFor(announcement.image).width(1920).fit("max").url()}
              alt={announcement.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <Image src="/vinohrady-uvod.jpg" alt="Vinice Metroflora" fill priority sizes="100vw" className="object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/10" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-8">
          <div className="max-w-lg">
            <div className="mb-3 text-xs tracking-[0.15em] text-gold">
              RODINNÉ VINAŘSTVÍ · SLOVÁCKO
            </div>
            <h1 className="mb-4 font-serif text-3xl leading-tight text-cream sm:text-4xl">
              {announcement?.title ?? defaultTitle}
            </h1>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-cream-2/90">
              {announcement?.text ?? defaultText}
            </p>
            <div className="flex flex-wrap gap-3">
              {hasCustomCta ? (
                <Link
                  href={announcement!.ctaHref!}
                  className="rounded-md bg-cream px-6 py-3 text-sm font-medium text-ink"
                >
                  {announcement!.ctaLabel}
                </Link>
              ) : (
                <>
                  <Link href="/eshop" className="rounded-md bg-cream px-6 py-3 text-sm font-medium text-ink">
                    Nakoupit vína
                  </Link>
                  <Link
                    href="/o-vinarstvi"
                    className="rounded-md border border-cream-2/50 px-6 py-3 text-sm text-cream"
                  >
                    Náš příběh
                  </Link>
                </>
              )}
            </div>
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

      <section id="kontakt" className="scroll-mt-20 bg-cream-2">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-2">
          <div>
            <div className="mb-2 text-xs tracking-[0.15em] text-gold-dark">KONTAKT</div>
            <h2 className="mb-6 font-serif text-2xl text-ink">Spojte se s námi</h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-cream p-5">
                <h3 className="mb-2 font-serif text-base text-ink">METROFLORA s.r.o.</h3>
                <div className="space-y-1 text-sm text-ink-muted">
                  <p>Dubňanská 376, 696 05 Milotice</p>
                  <p>Sídlo: Záluží 448, Milotice 696 05</p>
                  <p>IČO: 25587846</p>
                  <p>Spisová značka: C 35459, Krajský soud v Brně</p>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-cream p-5">
                <h3 className="mb-2 font-serif text-base text-ink">Telefon</h3>
                <div className="space-y-1 text-sm text-ink-muted">
                  <p>Obecné dotazy: +420 602 766 560</p>
                  <p>Prodej vína — Tomáš Gregorovič: +420 602 524 552</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-serif text-lg text-ink">Napište nám poptávku</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      <div className="relative h-80 w-full sm:h-96">
        <iframe
          title="Mapa — Metroflora s.r.o., Milotice"
          src={
            process.env.GOOGLE_MAPS_EMBED_KEY
              ? `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_EMBED_KEY}&q=${encodeURIComponent(
                  "Metroflora s.r.o., Milotice"
                )}&zoom=14`
              : "https://www.openstreetmap.org/export/embed.html?bbox=17.1206502,48.9496895,17.1326502,48.9576895&marker=48.9536895,17.1266502"
          }
          loading="lazy"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}
