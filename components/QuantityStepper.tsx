"use client";

export default function QuantityStepper({
  value,
  step = 1,
  onChange,
}: {
  value: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(0, value - step))}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-ink-soft"
        aria-label="Ubrat"
      >
        −
      </button>
      <span className="w-8 text-center text-sm">{value}</span>
      <button
        onClick={() => onChange(value + step)}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-ink-soft"
        aria-label="Přidat"
      >
        +
      </button>
    </div>
  );
}
