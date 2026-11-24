"use client";

import { useId, useState } from "react";
import { Photo } from "./Photo";
import type { ImageKey } from "@/content/images";

/** Slider de comparação antes/depois. Teclado: setas no controle deslizante. */
export function BeforeAfter({ antes, depois, label = "Comparação antes e depois" }: { antes: ImageKey; depois: ImageKey; label?: string }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <figure className="relative aspect-[16/10] w-full overflow-hidden bg-graphite-800 select-none" data-cursor="ARRASTE">
      <Photo k={depois} sizes="(min-width: 1024px) 70vw, 100vw" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Photo k={antes} sizes="(min-width: 1024px) 70vw, 100vw" className="photo-before" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-paper" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-paper bg-graphite-950/70 backdrop-blur">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>
      <span className="mono-label pointer-events-none absolute top-4 left-4 bg-graphite-950/70 px-2 py-1 text-paper">Antes</span>
      <span className="mono-label pointer-events-none absolute top-4 right-4 bg-graphite-950/70 px-2 py-1 text-paper">Depois</span>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        aria-valuetext={`${pos}% antes`}
      />
    </figure>
  );
}
