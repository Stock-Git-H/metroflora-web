import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doprava a platba — Vinařství Metroflora",
};

export default function DopravaAPlatbaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-8">
      <div className="mb-2 text-xs tracking-[0.15em] text-gold-dark">DOPRAVA A PLATBA</div>
      <h1 className="mb-8 font-serif text-3xl text-ink">Jak k vám doputuje víno</h1>

      <div className="mb-8 rounded-xl border border-border p-6">
        <h2 className="mb-3 font-serif text-lg text-ink">Doprava</h2>
        <ul className="space-y-2 text-sm leading-relaxed text-ink-muted">
          <li>
            <span className="font-medium text-ink">Osobní odběr</span> — libovolné množství lahví
            přímo v provozovně vinařství, Dubňanská 376, Milotice.
          </li>
          <li>
            <span className="font-medium text-ink">Přepravní služba TOPTRANS</span> — vína
            expedujeme pouze po celých kartonech (6 lahví), s výjimkou akčních setů. Cena dopravy
            je 97 Kč s DPH za karton a počítá se automaticky podle počtu objednaných kartonů.
          </li>
        </ul>
      </div>

      <div className="rounded-xl border border-border p-6">
        <h2 className="mb-3 font-serif text-lg text-ink">Platba</h2>
        <ul className="space-y-2 text-sm leading-relaxed text-ink-muted">
          <li>
            <span className="font-medium text-ink">Hotově</span> — pouze při osobním odběru ve
            vinařství.
          </li>
          <li>
            <span className="font-medium text-ink">Na dobírku</span> — platba přepravci při
            převzetí zásilky.
          </li>
          <li>
            <span className="font-medium text-ink">Převodem předem</span> — po dokončení
            objednávky vám rezervujeme zboží a zašleme e-mail se zálohovou fakturou s QR platbou.
            Jako variabilní symbol slouží číslo objednávky.
          </li>
        </ul>
      </div>
    </div>
  );
}
