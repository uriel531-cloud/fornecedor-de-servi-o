import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionLabel({ n, children, className }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("mono-label text-muted flex items-center gap-3", className)}>
      {n && <span>§ {n}</span>}
      {n && <span aria-hidden className="h-px w-8 bg-current opacity-50" />}
      <span>{children}</span>
    </p>
  );
}
