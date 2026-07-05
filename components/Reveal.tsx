"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/use-in-view";

const hiddenTransform: Record<"up" | "left", string> = {
  up: "translate-y-4",
  left: "-translate-x-8",
};

export default function Reveal({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? "translate-x-0 translate-y-0 opacity-100" : `${hiddenTransform[direction]} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  );
}
