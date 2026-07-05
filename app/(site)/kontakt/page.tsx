import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt — Vinařství Metroflora",
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-8">
      <div className="mb-2 text-xs tracking-[0.15em] text-gold-dark">KONTAKT</div>
      <h1 className="mb-8 font-serif text-3xl text-ink">Spojte se s námi</h1>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-6">
          <h2 className="mb-3 font-serif text-lg text-ink">METROFLORA s.r.o.</h2>
          <div className="space-y-1 text-sm text-ink-muted">
            <p>Dubňanská 376, 696 05 Milotice</p>
            <p>Sídlo: Záluží 448, Milotice 696 05</p>
            <p>IČO: 25587846</p>
            <p>Spisová značka: C 35459, Krajský soud v Brně</p>
          </div>
        </div>

        <div className="rounded-xl border border-border p-6">
          <h2 className="mb-3 font-serif text-lg text-ink">Telefon</h2>
          <div className="space-y-1 text-sm text-ink-muted">
            <p>Obecné dotazy: +420 602 766 560</p>
            <p>Prodej vína — Tomáš Gregorovič: +420 602 524 552</p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-ink-muted">
        Vína si můžete vyzvednout osobně přímo v provozovně na adrese Dubňanská 376, Milotice, nebo
        objednat s doručením přepravní službou TOPTRANS — viz{" "}
        <a href="/doprava-a-platba" className="underline">
          doprava a platba
        </a>
        .
      </p>
    </div>
  );
}
