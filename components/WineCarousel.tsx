"use client";

import { useEffect, useRef, useState } from "react";
import type { Wine } from "@/data/wines";
import WineCard from "@/components/WineCard";

const CARD_WIDTH = 240;
const GAP = 16;
const STEP = CARD_WIDTH + GAP;
const INTERVAL_MS = 3000;
const TRANSITION_MS = 700;

export default function WineCarousel({ wines }: { wines: Wine[] }) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const paused = useRef(false);

  useEffect(() => {
    if (wines.length <= 1) return;
    const id = setInterval(() => {
      if (paused.current) return;
      setIndex((i) => i + 1);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [wines.length]);

  useEffect(() => {
    if (index !== wines.length) return;
    const timer = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }, TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [index, wines.length]);

  if (wines.length === 0) return null;

  const track = wines.length > 1 ? [...wines, ...wines] : wines;

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      <div
        style={{
          display: "flex",
          gap: GAP,
          transform: `translateX(-${index * STEP}px)`,
          transition: animate ? `transform ${TRANSITION_MS}ms ease` : "none",
        }}
      >
        {track.map((wine, i) => (
          <div key={`${wine.slug}-${i}`} className="shrink-0" style={{ width: CARD_WIDTH }}>
            <WineCard wine={wine} />
          </div>
        ))}
      </div>
    </div>
  );
}
