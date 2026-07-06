import { BOTTLES_PER_CARTON } from "@/lib/cart-context";
import { BottleSilhouette, CheckIcon, XIcon } from "@/components/icons";

function MiniCarton({ filled, complete }: { filled: number; complete: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`grid grid-cols-3 gap-1 rounded-md border p-1.5 ${
          complete ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
        }`}
      >
        {Array.from({ length: BOTTLES_PER_CARTON }).map((_, i) => (
          <div key={i} className="flex aspect-[2/3] w-3.5 items-center justify-center">
            <BottleSilhouette
              className={`h-full w-auto ${i < filled ? (complete ? "text-green-700" : "text-red-700") : "text-border"}`}
            />
          </div>
        ))}
      </div>
      <div className={`flex items-center gap-1 text-[11px] font-medium ${complete ? "text-green-700" : "text-red-700"}`}>
        {complete ? (
          <>
            <CheckIcon className="h-3 w-3" /> OK
          </>
        ) : (
          <>
            <XIcon className="h-3 w-3" /> Doplnit
          </>
        )}
      </div>
    </div>
  );
}

export default function CartonSummary({ totalBottles }: { totalBottles: number }) {
  const completeCartons = Math.floor(totalBottles / BOTTLES_PER_CARTON);
  const remainder = totalBottles % BOTTLES_PER_CARTON;

  if (completeCartons === 0 && remainder === 0) return null;

  return (
    <div className="mt-6">
      <div className="mb-3 text-xs text-ink-faint">Úplnost kartonů pro odeslání přepravní službou</div>
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: completeCartons }).map((_, i) => (
          <MiniCarton key={`full-${i}`} filled={BOTTLES_PER_CARTON} complete />
        ))}
        {remainder > 0 && <MiniCarton filled={remainder} complete={false} />}
      </div>
    </div>
  );
}
