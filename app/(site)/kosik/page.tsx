"use client";

import Link from "next/link";
import { useCart, BOTTLES_PER_CARTON } from "@/lib/cart-context";
import QuantityStepper from "@/components/QuantityStepper";
import CartonSummary from "@/components/CartonSummary";
import { splitVat } from "@/lib/vat";

export default function KosikPage() {
  const { items, setQuantity, removeItem, totalBottles, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-8">
        <h1 className="mb-3 font-serif text-2xl text-ink">Košík je prázdný</h1>
        <p className="mb-6 text-sm text-ink-muted">Přidejte si do košíku nějaké víno z naší nabídky.</p>
        <Link href="/eshop" className="rounded-md bg-ink px-6 py-3 text-sm font-medium text-cream">
          Prohlédnout vína
        </Link>
      </div>
    );
  }

  const notFullCarton = totalBottles % BOTTLES_PER_CARTON !== 0;
  const { net, vat, gross } = splitVat(totalPrice);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-8">
      <h1 className="mb-8 font-serif text-3xl text-ink">Košík</h1>

      <div className="divide-y divide-border rounded-xl border border-border">
        {items.map((item) => (
          <div key={item.slug} className="flex flex-wrap items-center gap-4 p-4">
            <div className="min-w-[160px] flex-1">
              <div className="text-sm font-medium text-ink">
                {item.name} {item.vintage}
              </div>
              <div className="text-xs text-ink-faint">{item.price} Kč / lahev, vč. DPH</div>
            </div>
            <QuantityStepper value={item.quantity} onChange={(q) => setQuantity(item.slug, q)} />
            <div className="w-20 text-right text-sm font-medium text-ink">
              {item.quantity * item.price} Kč
            </div>
            <button
              onClick={() => removeItem(item.slug)}
              className="text-xs text-ink-faint underline"
            >
              Odebrat
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-cream-3 px-5 py-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <div className="text-ink-muted">{totalBottles} lahví</div>
        </div>
        <div className="space-y-1 border-t border-border/60 pt-3 text-sm text-ink-muted">
          <div className="flex justify-between">
            <span>Cena bez DPH</span>
            <span>{net} Kč</span>
          </div>
          <div className="flex justify-between">
            <span>DPH 21 %</span>
            <span>{vat} Kč</span>
          </div>
          <div className="flex justify-between pt-1 font-serif text-xl text-ink">
            <span>Celkem s DPH</span>
            <span>{gross} Kč</span>
          </div>
        </div>
        {notFullCarton && (
          <div className="mt-3 text-xs text-gold-dark">
            Pro dopravu přepravní službou je nutný násobek {BOTTLES_PER_CARTON} lahví celkem.
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <Link href="/pokladna" className="rounded-md bg-ink px-6 py-3 text-sm font-medium text-cream">
          Pokračovat k objednávce
        </Link>
      </div>

      <CartonSummary totalBottles={totalBottles} />
    </div>
  );
}
