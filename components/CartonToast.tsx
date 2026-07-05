"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart, BOTTLES_PER_CARTON } from "@/lib/cart-context";
import { BottleSilhouette } from "@/components/icons";

function pluralizeLahev(n: number) {
  if (n === 1) return "lahev";
  if (n >= 2 && n <= 4) return "lahve";
  return "lahví";
}

export default function CartonToast() {
  const { totalBottles, lastAddedAt } = useCart();
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (lastAddedAt === null) return;
    // Reacts to an external event (an add-to-cart action recorded elsewhere),
    // not to state owned by this component — the effect is the right place.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    const enterFrame = requestAnimationFrame(() => setEntered(true));
    const leaveTimer = setTimeout(() => setEntered(false), 3600);
    const hideTimer = setTimeout(() => setVisible(false), 4000);
    return () => {
      cancelAnimationFrame(enterFrame);
      clearTimeout(leaveTimer);
      clearTimeout(hideTimer);
    };
  }, [lastAddedAt]);

  if (!visible) return null;

  const filled = totalBottles === 0 ? 0 : ((totalBottles - 1) % BOTTLES_PER_CARTON) + 1;
  const remaining = BOTTLES_PER_CARTON - filled;

  return (
    <Link
      href="/kosik"
      className={`fixed bottom-5 right-5 z-40 w-56 rounded-xl border border-border bg-cream p-4 shadow-lg transition-all duration-300 ${
        entered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <div className="mb-3 text-xs text-ink-soft">
        {filled === BOTTLES_PER_CARTON
          ? "Karton je plný!"
          : `Ještě ${remaining} ${pluralizeLahev(remaining)} do plného kartonu`}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: BOTTLES_PER_CARTON }).map((_, i) => (
          <div
            key={i}
            style={{ transitionDelay: `${i * 60}ms` }}
            className={`flex aspect-[2/3] items-center justify-center rounded-md border transition-colors duration-300 ${
              i < filled ? "border-ink bg-ink text-cream" : "border-border text-border"
            }`}
          >
            <BottleSilhouette />
          </div>
        ))}
      </div>
    </Link>
  );
}
