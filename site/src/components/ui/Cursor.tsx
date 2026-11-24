"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Cursor customizado: ponto laranja que vira um círculo com rótulo ("VER OBRA", "ARRASTE")
 * sobre elementos com data-cursor. O cursor do sistema continua visível (acessibilidade).
 * Desativado em telas de toque.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    let current: string | null = null;
    const move = (e: PointerEvent) => {
      el.classList.add("is-visible");
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const label = target?.dataset.cursor || null;
      if (label !== current) {
        current = label;
        el.textContent = label ?? "";
        el.classList.toggle("has-label", !!label);
      }
    };
    const leave = () => el.classList.remove("is-visible");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <div ref={ref} className="cursor" aria-hidden />;
}
