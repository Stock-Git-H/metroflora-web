"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/", label: "Domů" },
  { href: "/o-vinarstvi", label: "O vinařství" },
  { href: "/eshop", label: "Eshop" },
  { href: "/#kontakt", label: "Kontakt" },
];

const PHONE = "+420 602 766 560";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalBottles } = useCart();
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Metroflora" width={60} height={60} />
          <span className="font-serif text-2xl font-bold tracking-wide text-ink">METROFLORA</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          {navLinks.map((link) => {
            const isActive = link.href !== "/#kontakt" && pathname === link.href;
            return (
              <div key={link.href} className="group relative py-1">
                <Link href={link.href} className="transition-colors hover:text-ink">
                  {link.label}
                </Link>
                <Image
                  src="/hrozen-pikto.webp"
                  alt=""
                  aria-hidden="true"
                  width={16}
                  height={14}
                  className={`pointer-events-none absolute left-1/2 top-full -translate-x-1/2 transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            className="hidden items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink lg:flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4.5 4h3l1.8 4.5-2 1.5a11.5 11.5 0 0 0 5.7 5.7l1.5-2L19 15.5v3a1 1 0 0 1-1.1 1C10.6 18.9 5.1 13.4 4.5 6.1 4.4 5.5 4.5 4 4.5 4Z" />
            </svg>
            {PHONE}
          </a>

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
          <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="rounded-md px-2 py-2 hover:bg-cream-2">
            {PHONE}
          </a>
        </nav>
      )}
    </header>
  );
}
