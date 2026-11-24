import { cn } from "@/lib/cn";

/** Símbolo: um quadrado com a base preenchida (o "lastro"). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-7 w-7", className)} aria-hidden>
      <rect x="1" y="1" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="1" y="21" width="30" height="10" fill="var(--color-signal)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark />
      <span className="font-display-x text-[1.35rem] tracking-[0.02em]">Lastro</span>
    </span>
  );
}
