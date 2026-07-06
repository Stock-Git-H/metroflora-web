import type { Metadata } from "next";
import VineDecoration from "@/components/VineDecoration";

export const metadata: Metadata = {
  title: "O vinařství — Vinařství Metroflora",
  description: "Příběh rodinného vinařství Metroflora v Miloticích u Kyjova.",
};

const vlastniOdrudy = [
  "Aurelius",
  "Sylvánské zelené",
  "Rulandské šedé",
  "Sauvignon",
  "Pálava",
  "Tramín",
  "Ryzlink rýnský",
  "Chardonnay",
  "Děvín",
  "Solaris",
];

const trate = ["Kopce", "Šidleny", "Zášidlení"];

const oceneni = [
  { year: "2008", text: "Chardonnay ps 2007 — šampion výstavy Vinum Juvenale" },
  { year: "2009", text: "Salon vín ČR — Rulandské bílé, výběr z hroznů" },
  {
    year: "2010",
    text: "Salon vín ČR — Ryzlink rýnský ps 2008; 3. místo v soutěži Vinař roku",
  },
  { year: "2011", text: "Salon vín ČR — Sylvánské zelené, výběr z hroznů 2009" },
  {
    year: "2012",
    text: "Salon vín ČR — Hibernal PS, Tramín červený PS a Sylvánské zelené PS, ročník 2010",
  },
  {
    year: "2013",
    text: "Salon vín ČR — Cabernet Sauvignon, výběr z hroznů 2009; Cena hejtmana Jihomoravského kraje za nejlépe hodnocenou kolekci vín, Vinum Juvenale 2013",
  },
  {
    year: "2014",
    text: "Salon vín ČR — Aurelius, výběr z hroznů 2011; Pálava, ledové víno 2011",
  },
];

export default function OVinarstviPage() {
  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden px-4 py-14 sm:px-8">
      <VineDecoration className="pointer-events-none absolute -left-20 -top-6 hidden h-56 w-[26rem] -scale-x-100 text-ink-soft/15 sm:block" />
      <div className="relative">
        <div className="mb-3 text-xs tracking-[0.15em] text-gold-dark">RODINNÉ VINAŘSTVÍ</div>
        <h1 className="mb-6 font-serif text-3xl text-ink">Metroflora</h1>

      <div className="space-y-4 text-sm leading-relaxed text-ink-muted">
        <p>
          Společnost METROFLORA vznikla už v roce 1997 jako velkoobchodní prodejce živých
          řezaných i pokojových květin — dvakrát týdně dovážela čerstvé květiny z holandské burzy
          a rozvážela je do květinářství po celé Moravě. V roce 2017 oslavila dvacáté výročí
          založení.
        </p>
        <p>
          Vinařství Metroflora založil v roce 2007 Lubomír Gregorovič, který zúročil letité
          zkušenosti ve výrobě vína, přenášející se z generace na generaci.
        </p>
        <p>
          Sídlem vinařství je obec Milotice u Kyjova, nacházející se ve Slovácké podoblasti.
          Vinařství zde obhospodařuje 10 hektarů vinic na prosluněných polohách, kde hrozny
          dozrávají do vysoké cukernatosti a vynikající kvality.
        </p>
        <p>
          Vinice, řídící se do integrované produkce, jsou rozmístěny ve všech možných vinařských
          tratích v Miloticích:
        </p>
        <ul className="list-inside list-disc pl-2">
          {trate.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p>
          I přes pestrou skladbu odrůd ve vlastních vinicích nakupuje vinařství pro doplnění
          sortimentu surovinu od prověřených pěstitelů révy vinné, kterou následně zpracovává
          šetrnou technologií Della Toffola v moderní zrekonstruované provozovně, kde vzniká víno
          nejvyšší kvality, na čemž si Metroflora zakládá.
        </p>
        <p>
          Vinařské úspěchy přišly rychle — na první profesionální výstavě mladých vín Vinum
          Juvenale ročníku 2007 získalo víno Chardonnay pozdní sběr titul šampiona výstavy,
          standard, který se vinařství snaží držet dodnes.
        </p>
      </div>

      <div className="mt-10 rounded-xl border border-border p-6">
        <h2 className="mb-4 font-serif text-lg text-ink">Odrůdová skladba z vlastní vinice</h2>
        <div className="flex flex-wrap gap-2">
          {vlastniOdrudy.map((odruda) => (
            <span
              key={odruda}
              className="rounded-full bg-cream-3 px-3 py-1 text-xs text-ink-soft"
            >
              {odruda}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border p-6">
        <h2 className="mb-4 font-serif text-lg text-ink">Ocenění</h2>
        <ul className="space-y-2 text-sm text-ink-muted">
          {oceneni.map(({ year, text }) => (
            <li key={year}>
              <span className="font-medium text-ink">{year}</span> — {text}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}
