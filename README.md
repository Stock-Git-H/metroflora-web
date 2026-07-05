# Metroflora.cz — nový web a eshop

Next.js (App Router, TypeScript, Tailwind v4) web pro rodinné vinařství Metroflora, s eshopem
napojeným na Sanity CMS.

## Vývoj

```bash
npm run dev
```

Otevřete [http://localhost:3000](http://localhost:3000). Bez nastaveného Sanity projektu web
používá lokální ukázková data z [`data/wines.ts`](data/wines.ts) (reálný katalog 31 vín stažený
z aktuálního webu), takže je plně funkční i bez CMS.

## Napojení na Sanity CMS

1. Založte zdarma projekt na [sanity.io](https://www.sanity.io).
2. Zkopírujte `.env.example` do `.env.local` a doplňte `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. Spusťte web a otevřete `/studio` — zde lze přidávat/upravovat vína, blog a nastavení webu.
4. Jakmile v Sanity existují vína, web je automaticky použije místo lokálních dat
   (viz [`lib/wines.ts`](lib/wines.ts)).

## Stav projektu

**Fáze 1 (hotovo):** homepage, katalog s filtrováním, detail vína, stránka o vinařství, kontakt,
doprava a platba, věkové ověření 18+, plně funkční košík (client-side, localStorage), Sanity
schema a Studio.

**Fáze 2 (další krok):** odeslání objednávky — vyžaduje bankovní účet pro QR platbu
(`BANK_ACCOUNT_IBAN`) a e-mailovou službu (`RESEND_API_KEY`), viz `.env.example`. Formulář na
`/pokladna` je připravený, včetně validace, že doprava přepravní službou TOPTRANS vyžaduje
násobky 6 lahví (celé kartony).

## Struktura

- `app/` — stránky (App Router)
- `components/` — sdílené UI komponenty
- `data/wines.ts` — ukázková/záložní data vín
- `lib/wines.ts` — načítání dat (Sanity, s fallbackem na lokální data)
- `lib/cart-context.tsx` — košík
- `sanity/` — CMS schema a klient
