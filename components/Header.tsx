"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/", label: "Domů" },
  { href: "/o-vinarstvi", label: "O vinařství" },
  { href: "/eshop", label: "Eshop" },
  { href: "/#kontakt", label: "Kontakt" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalBottles } = useCart();

  return (
    <header className="border-b border-border bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Vinařství Metroflora" width={40} height={40} />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg tracking-wide text-ink">Vinařství Metroflora</span>
            <span className="text-[10px] tracking-[0.15em] text-ink-faint">MILOTICE · OD 2007</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-ink-soft md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/kosik" className="relative text-ink" aria-label="Košík">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M3 6h2l2.4 11.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6" />
              <circle cx="9.5" cy="20.5" r="1" fill="currentColor" stroke="none" />
              <circle cx="17.5" cy="20.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            {totalBottles > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] text-cream">
                {totalBottles}
              </span>
            )}
          </Link>
          <button
            className="text-ink md:hidden"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 text-sm text-ink-soft md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2 hover:bg-cream-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
