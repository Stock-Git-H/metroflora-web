import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import CartonToast from "@/components/CartonToast";
import FloatingLogo from "@/components/FloatingLogo";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Vinařství Metroflora — rodinné víno z Milotic",
  description:
    "Rodinné vinařství Metroflora v Miloticích u Kyjova. Vlastní vína ze Slovácké podoblasti přímo z vinice k vám domů.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${inter.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <CartProvider>
          <AgeGate />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartonToast />
          <FloatingLogo />
        </CartProvider>
      </body>
    </html>
  );
}
