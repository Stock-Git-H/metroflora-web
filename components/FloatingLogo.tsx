import Image from "next/image";
import Link from "next/link";

export default function FloatingLogo() {
  return (
    <Link
      href="/"
      aria-label="Vinařství Metroflora — domů"
      className="fixed bottom-5 left-5 z-30 hidden h-[150px] w-[150px] items-center justify-center rounded-full bg-cream shadow-lg sm:flex"
    >
      <Image src="/logo.svg" alt="" width={164} height={164} aria-hidden="true" />
    </Link>
  );
}
