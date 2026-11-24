"use client";

import { useEffect, useRef, useState } from "react";
import { projetos } from "@/content/projetos";
import { disciplinas } from "@/content/disciplinas";
import { metodo } from "@/content/metodo";
import { mestres } from "@/content/pessoas";
import { publicos } from "@/content/publicos";
import { Photo } from "@/components/ui/Photo";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { Ph } from "@/components/ui/Ph";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { num } from "@/lib/format";
import { cn } from "@/lib/cn";

const nomeDisc = (slug: string) => disciplinas.find((d) => d.slug === slug)?.curto ?? slug;

/* -------------------------------------------------------------------------- */
/* S07 — Projetos em galeria horizontal fixada                                */
/* -------------------------------------------------------------------------- */
function ProjetoCard({ p, i }: { p: (typeof projetos)[number]; i: number }) {
  return (
    <TLink
      href={`/projetos/${p.slug}`}
      data-cursor="VER OBRA"
      className="img-zoom group block w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[44vw] xl:w-[38vw]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-graphite-800 lg:aspect-[5/6]">
        <Photo k={p.imagem} sizes="(min-width: 1024px) 40vw, 82vw" />
        <span className="mono-label absolute top-4 left-4 bg-graphite-950/70 px-2 py-1">
          {String(i + 1).padStart(2, "0")} — {p.setor}
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-[clamp(1.375rem,2vw,1.875rem)] leading-tight font-medium group-hover:text-signal">
            <Ph>{p.nome}</Ph>
          </h3>
          <p className="text-muted mt-1">
            {p.cidade}
            {p.uf !== "BR" && `, ${p.uf}`} · <Ph>{num(p.area)} m²</Ph> · <Ph>{String(p.prazoReal).replace(".", ",")} meses</Ph>
          </p>
        </div>
        <Arrow dir="up-right" className="mt-2 shrink-0" />
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.disciplinas.slice(0, 5).map((d) => (
          <span key={d} className="chip chip-sm">
            {nomeDisc(d)}
          </span>
        ))}
        {p.disciplinas.length > 5 && <span className="chip chip-sm">+{p.disciplinas.length - 5}</span>}
      </div>
    </TLink>
  );
}

export function ProjetosHorizontal() {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const o = outer.current;
    const t = track.current;
    if (!pinned || !o || !t) return;
    const distance = () => Math.max(0, t.scrollWidth - window.innerWidth);
    const setHeight = () => {
      o.style.height = `${distance() + window.innerHeight}px`;
    };
    setHeight();
    const ctx = gsap.context(() => {
      gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: o, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
      });
    });
    const onResize = () => {
      setHeight();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    ScrollTrigger.refresh();
    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
      o.style.height = "";
    };
  }, [pinned]);

  const header = (
    <div className="flex flex-col justify-between gap-8 lg:w-[30vw] lg:shrink-0 lg:pr-12">
      <div>
        <p className="mono-label text-muted flex items-center gap-3">
          <span>§ 04</span>
          <span aria-hidden className="h-px w-8 bg-current opacity-50" />
          <span>Projetos em destaque</span>
        </p>
        <h2 className="font-display-x mt-5 text-[clamp(2rem,5vw,5.5rem)]">
          Obras que falam <span className="serif-accent text-signal">por nós.</span>
        </h2>
        <p className="text-muted mt-6 max-w-sm">Prazo previsto contra prazo real, orçamento contra executado. Os números de cada obra estão no estudo de caso.</p>
      </div>
      <TLink href="/projetos" className="btn btn-secondary self-start">
        Explorar portfólio completo <Arrow />
      </TLink>
    </div>
  );

  if (!pinned) {
    return (
      <section className="section-y bg-graphite-950 text-paper" aria-label="Projetos em destaque">
        <div className="container-x">{header}</div>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--gutter)] pb-4" data-lenis-prevent-wheel>
          {projetos.map((p, i) => (
            <ProjetoCard key={p.slug} p={p} i={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-graphite-950 text-paper" aria-label="Projetos em destaque">
      <div ref={outer} className="relative">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div ref={track} className="flex items-stretch gap-10 pr-[var(--gutter)] pl-[var(--gutter)] will-change-transform">
            {header}
            {projetos.map((p, i) => (
              <ProjetoCard key={p.slug} p={p} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* S08 — Método: timeline desenhada no scroll                                 */
/* -------------------------------------------------------------------------- */
export function MetodoTimeline({ light = false }: { light?: boolean }) {
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = lineRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top 80%", end: "bottom 65%", scrub: true } });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div className="relative mt-16">
      <div className="absolute top-[0.45rem] left-0 hidden h-px w-full bg-current opacity-20 lg:block" aria-hidden />
      <div ref={lineRef} className="absolute top-[0.4rem] left-0 hidden h-[2px] w-full origin-left bg-signal lg:block" aria-hidden />
      <ol className="grid gap-10 lg:grid-cols-6 lg:gap-6">
        {metodo.map((m) => (
          <li key={m.n} className="relative pl-8 lg:pt-10 lg:pl-0">
            <span className={cn("absolute top-1.5 left-0 h-4 w-4 border-2 border-signal lg:top-0", light ? "bg-concrete-100" : "bg-graphite-950")} aria-hidden />
            <span aria-hidden className="absolute top-6 bottom-[-2.5rem] left-[7px] w-px bg-current opacity-20 lg:hidden" />
            <p className="font-display-c text-5xl leading-none text-signal">{m.n}</p>
            <h3 className="mt-4 text-lg leading-snug font-medium">{m.titulo}</h3>
            <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed">{m.texto}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* S10 — Mestres de ofício: carrossel com botões                              */
/* -------------------------------------------------------------------------- */
export function MestresCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const t = track.current;
    if (!t) return;
    const card = t.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 24 : 320;
    t.scrollBy({ left: dir * w, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };
  return (
    <div className="mt-14">
      <ul ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2" aria-label="Mestres de ofício" data-cursor="ARRASTE">
        {mestres.map((m) => (
          <li key={m.nome} className="mono-portrait w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[23vw]">
            <figure>
              <div className="relative aspect-[3/4] overflow-hidden bg-graphite-800">
                <Photo k={m.imagem} sizes="(min-width: 1024px) 23vw, 78vw" alt={`Retrato ilustrativo: ${m.oficio}`} />
                <span className="mono-label absolute top-3 left-3 bg-graphite-950/75 px-2 py-1">{m.nivel}</span>
              </div>
              <figcaption className="mt-4">
                <p className="text-lg font-medium">
                  <Ph>{m.nome}</Ph>
                </p>
                <p className="text-muted text-sm">
                  {m.oficio} · <Ph>{m.anos} anos</Ph>
                </p>
                <p className="mono-label text-muted mt-2">{m.certificacoes.join(" · ")}</p>
                <blockquote className="serif-accent mt-3 text-xl leading-snug text-paper/90">“{m.frase}”</blockquote>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex gap-2">
        <button type="button" onClick={() => scrollBy(-1)} className="grid h-12 w-12 place-items-center border border-paper/30 hover:border-paper" aria-label="Anterior">
          <Arrow dir="left" />
        </button>
        <button type="button" onClick={() => scrollBy(1)} className="grid h-12 w-12 place-items-center border border-paper/30 hover:border-paper" aria-label="Próximo">
          <Arrow />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* S11 — Para quem construímos: lista com imagem que segue o cursor           */
/* -------------------------------------------------------------------------- */
export function PublicosList() {
  const [hover, setHover] = useState<number | null>(null);
  const floater = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = floater.current;
    const w = wrap.current;
    if (!f || !w || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(f, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(f, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = w.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    };
    w.addEventListener("pointermove", move);
    return () => w.removeEventListener("pointermove", move);
  }, []);

  return (
    <div ref={wrap} className="relative mt-14" onPointerLeave={() => setHover(null)}>
      <div
        ref={floater}
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-10 hidden h-[22rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-opacity duration-500 lg:block",
          hover === null ? "opacity-0" : "opacity-100",
        )}
        style={{ marginLeft: "-8.5rem", marginTop: "-11rem" }}
      >
        {publicos.map((p, i) => (
          <div key={p.slug} className={cn("absolute inset-0 transition-opacity duration-500", hover === i ? "opacity-100" : "opacity-0")}>
            <Photo k={p.imagem} sizes="17rem" />
          </div>
        ))}
      </div>
      <ul className="border-t border-current/15">
        {publicos.map((p, i) => (
          <li key={p.slug} className="border-b border-current/15">
            <TLink
              href={`/solucoes/${p.slug}`}
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              className="group grid gap-2 py-7 transition-[padding] duration-500 ease-[var(--ease-out-expo)] hover:pl-4 lg:grid-cols-[6rem_1fr_auto] lg:items-center"
            >
              <span className="mono-label text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display-x text-[clamp(1.75rem,3.4vw,3.5rem)] group-hover:text-signal-dark">{p.nome}</span>
              <span className="text-muted flex items-center gap-3 lg:max-w-xs lg:text-right">
                <span className="text-[0.9375rem]">{p.titulo}</span>
                <Arrow dir="up-right" className="shrink-0" />
              </span>
            </TLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Botão que abre a busca ⌘K                                                  */
/* -------------------------------------------------------------------------- */
export function SearchButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("lastro:search"))}>
      {children}
    </button>
  );
}
