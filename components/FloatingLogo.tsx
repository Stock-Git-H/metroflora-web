import Image from "next/image";
import Link from "next/link";

export default function FloatingLogo() {
  return (
    <Link
      href="/"
      aria-label="Vinařství Metroflora — domů"
      className="fixed bottom-5 left-5 z-30 hidden h-[100px] w-[100px] items-center justify-center rounded-full bg-cream shadow-lg sm:flex"
    >
      <Image src="/logo.svg" alt="" width={84} height={84} aria-hidden="true" />
    </Link>
  );
}
