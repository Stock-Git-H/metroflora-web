"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, BOTTLES_PER_CARTON } from "@/lib/cart-context";

type Doprava = "odber" | "toptrans";
type Platba = "hotove" | "dobirka" | "prevodem";

export default function PokladnaPage() {
  const { items, totalBottles, totalPrice } = useCart();
  const [doprava, setDoprava] = useState<Doprava>("odber");
  const [platba, setPlatba] = useState<Platba>("hotove");
  const [submitted, setSubmitted] = useState(false);

  const cartonBlocked = doprava === "toptrans" && totalBottles % BOTTLES_PER_CARTON !== 0;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-8">
        <h1 className="mb-3 font-serif text-2xl text-ink">Košík je prázdný</h1>
        <Link href="/eshop" className="rounded-md bg-ink px-6 py-3 text-sm font-medium text-cream">
          Prohlédnout vína
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-8">
        <h1 className="mb-3 font-serif text-2xl text-ink">Objednávkový formulář je připraven</h1>
        <p className="text-sm leading-relaxed text-ink-muted">
          Odeslání objednávky (rezervace zásilky, zálohová faktura s QR platbou a e-mailové
          potvrzení) se dokončuje ve druhé fázi projektu, jakmile bude nastaven bankovní účet pro
          QR platby a e-mailová služba. Zatím nás prosím do dokončení této funkce kontaktujte přímo
          telefonicky — viz stránka{" "}
          <Link href="/kontakt" className="underline">
            kontakt
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-8">
      <h1 className="mb-8 font-serif text-3xl text-ink">Dokončení objednávky</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!cartonBlocked) setSubmitted(true);
        }}
        className="space-y-8"
      >
        <fieldset>
          <legend className="mb-3 font-serif text-lg text-ink">Způsob doručení</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <label
              className={`cursor-pointer rounded-xl border p-4 text-sm ${
                doprava === "odber" ? "border-ink" : "border-border"
              }`}
            >
              <input
                type="radio"
                name="doprava"
                className="mr-2"
                checked={doprava === "odber"}
                onChange={() => setDoprava("odber")}
              />
              Osobní odběr ve vinařství (Milotice)
            </label>
            <label
              className={`cursor-pointer rounded-xl border p-4 text-sm ${
                doprava === "toptrans" ? "border-ink" : "border-border"
              }`}
            >
              <input
                type="radio"
                name="doprava"
                className="mr-2"
                checked={doprava === "toptrans"}
                onChange={() => setDoprava("toptrans")}
              />
              Přepravní služba TOPTRANS (80 Kč bez DPH / karton)
            </label>
          </div>
          {cartonBlocked && (
            <p className="mt-2 text-xs text-gold-dark">
              Pro dopravu TOPTRANS upravte prosím množství v košíku na násobky{" "}
              {BOTTLES_PER_CARTON} lahví — jinak nelze pokračovat.
            </p>
          )}
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-serif text-lg text-ink">Způsob platby</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {(
              [
                ["hotove", "Hotově při odběru"],
                ["dobirka", "Na dobírku"],
                ["prevodem", "Převodem předem (QR platba)"],
              ] as [Platba, string][]
            ).map(([value, label]) => (
              <label
                key={value}
                className={`cursor-pointer rounded-xl border p-4 text-sm ${
                  platba === value ? "border-ink" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="platba"
                  className="mr-2"
                  checked={platba === value}
                  onChange={() => setPlatba(value)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="grid gap-3 sm:grid-cols-2">
          <legend className="mb-1 font-serif text-lg text-ink">Kontaktní údaje</legend>
          <input required placeholder="Jméno a příjmení" className="rounded-md border border-border px-3 py-2 text-sm sm:col-span-2" />
          <input required type="email" placeholder="E-mail" className="rounded-md border border-border px-3 py-2 text-sm" />
          <input required placeholder="Telefon" className="rounded-md border border-border px-3 py-2 text-sm" />
          {doprava === "toptrans" && (
            <input required placeholder="Doručovací adresa" className="rounded-md border border-border px-3 py-2 text-sm sm:col-span-2" />
          )}
        </fieldset>

        <div className="flex items-center justify-between rounded-xl bg-cream-3 px-5 py-4">
          <div className="text-sm text-ink-muted">{totalBottles} lahví</div>
          <div className="font-serif text-xl text-ink">{totalPrice} Kč</div>
        </div>

        <button
          type="submit"
          disabled={cartonBlocked}
          className="w-full rounded-md bg-ink px-6 py-3 text-sm font-medium text-cream disabled:opacity-40"
        >
          Odeslat objednávku
        </button>
      </form>
    </div>
  );
}
