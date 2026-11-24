"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type W = Window & { __lenis?: Lenis };

export function stopScroll() {
  (window as W).__lenis?.stop();
}
export function startScroll() {
  (window as W).__lenis?.start();
}

/** Lenis (lerp 0,1) integrado ao ScrollTrigger. Desligado com movimento reduzido. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    (window as W).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as W).__lenis;
    };
  }, []);

  useEffect(() => {
    if (location.hash) return;
    const lenis = (window as W).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
