"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
  type CSSProperties,
} from "react";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { formatStat, parseStat } from "@/lib/format";
import { cn } from "@/lib/cn";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* -------------------------------------------------------------------------- */
/* Revelação de títulos por linha (GSAP SplitText com máscara)                */
/* -------------------------------------------------------------------------- */
export function SplitReveal({
  as: Tag = "h2",
  className,
  children,
  delay = 0,
  immediate = false,
  id,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  delay?: number;
  immediate?: boolean;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("split-ready");
      return;
    }
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          el.classList.add("split-ready");
          return gsap.from(self.lines, {
            yPercent: 140, // além da folga da máscara, para a linha começar totalmente escondida
            stagger: 0.08,
            duration: 1.1,
            ease: "expo.out",
            delay,
            scrollTrigger: immediate ? undefined : { trigger: el, start: "top 90%", once: true },
          });
        },
      });
    });
    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [delay, immediate]);
  return (
    <Tag ref={ref} id={id} data-split="" className={className}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* Revelação de imagem: clip-path + escala                                    */
/* -------------------------------------------------------------------------- */
export function RevealBox({
  className,
  children,
  style,
  cursor,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  cursor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    const inner = el.querySelector("img");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.out" });
      if (inner) tl.fromTo(inner, { scale: 1.15 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0);
    });
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} style={style} data-cursor={cursor}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Contador animado. Renderiza o valor final no servidor (SEO / sem JS).      */
/* -------------------------------------------------------------------------- */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { prefix, value: target, suffix, decimals } = parseStat(value);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || target === 0) return;
    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: target,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${formatStat(obj.v, decimals)}${suffix}`;
        },
      });
      el.textContent = `${prefix}${formatStat(0, decimals)}${suffix}`;
    });
    return () => ctx.revert();
  }, [target]);
  return (
    <span ref={ref} className={className} data-placeholder="true">
      {value}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Cota técnica: linha de dimensão desenhada conforme o scroll                */
/* -------------------------------------------------------------------------- */
export function Cota({ label, className }: { label?: string; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const line = el.querySelector<SVGLineElement>("[data-line]");
    if (!line) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: "50% 50%", ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 55%", scrub: true } },
      );
    });
    return () => ctx.revert();
  }, []);
  return (
    <div className={cn("relative flex items-center gap-4", className)} aria-hidden>
      <svg ref={ref} className="h-4 flex-1 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 16">
        <line x1="0" y1="2" x2="0" y2="14" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.5" />
        <line x1="100" y1="2" x2="100" y2="14" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.5" />
        <line data-line x1="0" y1="8" x2="100" y2="8" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.5" />
      </svg>
      {label && <span className="mono-label text-muted shrink-0">{label}</span>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Marquee com pausa (WCAG 2.2.2)                                             */
/* -------------------------------------------------------------------------- */
export function Marquee({ children, label, duration = 48 }: { children: ReactNode; label: string; duration?: number }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="relative">
      <div className="marquee" data-paused={paused} style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        <div className="marquee-track">
          <div className="flex shrink-0 items-center">{children}</div>
          <div className="flex shrink-0 items-center" aria-hidden>
            {children}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="mono-label text-muted mt-4 inline-flex min-h-11 items-center gap-2 hover:text-current"
        aria-pressed={paused}
      >
        <span aria-hidden>{paused ? "▶" : "❚❚"}</span>
        {paused ? `Retomar ${label}` : `Pausar ${label}`}
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Efeito magnético (só desktop)                                              */
/* -------------------------------------------------------------------------- */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return (
    <div ref={ref} className={cn("inline-block", className)}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Linha SVG desenhada com o scroll (timeline do Método)                      */
/* -------------------------------------------------------------------------- */
export function useScrubDraw<T extends SVGGeometryElement>(start = "top 75%", end = "bottom 60%") {
  const ref = useRef<T>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const len = el.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: el.ownerSVGElement ?? el, start, end, scrub: true } },
      );
    });
    return () => ctx.revert();
  }, [start, end]);
  return ref;
}

export { ScrollTrigger };
