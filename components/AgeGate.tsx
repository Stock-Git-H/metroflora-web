"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "metroflora-age-verified";

export default function AgeGate() {
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const verified = window.localStorage.getItem(STORAGE_KEY);
    // Reading localStorage is only possible client-side after mount, so the
    // gate necessarily starts hidden on the server and reveals itself here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!verified) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  if (!visible) return null;

  const confirm = () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-ink/90 px-4 transition-opacity duration-300 ${
        entered ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`max-w-sm rounded-xl border border-border bg-cream p-8 text-center transition-all duration-300 ${
          entered ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink font-serif text-lg">
          G
        </div>
        <h2 className="mb-3 font-serif text-xl text-ink">Prodej alkoholu</h2>
        <p className="mb-6 text-sm leading-relaxed text-ink-muted">
          Tento web nabízí k prodeji alkoholické nápoje. Vstupem potvrzujete, že jste starší 18 let.
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={confirm}
            className="rounded-md bg-ink px-5 py-3 text-sm font-medium text-cream"
          >
            Je mi 18 let a více, pokračovat
          </button>
          <a
            href="https://www.seznam.cz"
            className="rounded-md border border-border px-5 py-3 text-sm text-ink-soft"
          >
            Odejít
          </a>
        </div>
      </div>
    </div>
  );
}
