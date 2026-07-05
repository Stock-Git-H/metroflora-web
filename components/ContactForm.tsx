"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-cream-3 p-6 text-sm text-ink-muted">
        Odeslání poptávky přímo z webu se ještě dokončuje — chybí napojení na e-mailovou službu.
        Prosím ozvěte se nám zatím telefonicky, viz kontakty vlevo.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-3"
    >
      <input
        required
        placeholder="Jméno a příjmení"
        className="w-full rounded-md border border-border px-3 py-2 text-sm"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          type="email"
          placeholder="E-mail"
          className="w-full rounded-md border border-border px-3 py-2 text-sm"
        />
        <input placeholder="Telefon" className="w-full rounded-md border border-border px-3 py-2 text-sm" />
      </div>
      <textarea
        required
        placeholder="Vaše zpráva nebo poptávka"
        rows={4}
        className="w-full rounded-md border border-border px-3 py-2 text-sm"
      />
      <button type="submit" className="rounded-md bg-ink px-6 py-3 text-sm font-medium text-cream">
        Odeslat poptávku
      </button>
    </form>
  );
}
