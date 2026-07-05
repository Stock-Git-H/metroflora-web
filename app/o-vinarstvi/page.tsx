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

export default function OVinarstviPage() {
  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden px-4 py-14 sm:px-8">
      <VineDecoration className="pointer-events-none absolute -left-20 -top-6 hidden h-56 w-[26rem] -scale-x-100 text-ink-soft/15 sm:block" />
      <div className="relative">
        <div className="mb-3 text-xs tracking-[0.15em] text-gold-dark">RODINNÉ VINAŘSTVÍ</div>
        <h1 className="mb-6 font-serif text-3xl text-ink">Metroflora</h1>

      <div className="space-y-4 text-sm leading-relaxed text-ink-muted">
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
      </div>
    </div>
  );
}
