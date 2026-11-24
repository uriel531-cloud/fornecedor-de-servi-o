"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { camadas } from "@/content/metodo";
import { Photo } from "@/components/ui/Photo";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/ui/motion";
import { ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const LayersScene = dynamic(() => import("./LayersScene"), { ssr: false, loading: () => null });

const SPAN = 0.92;

function Title() {
  return (
    <>
      <SectionLabel n="01">A obra em camadas</SectionLabel>
      <SplitReveal className="font-display-x mt-5 text-[clamp(2rem,4.2vw,4.75rem)]">
        Uma obra são 40 ofícios. <span className="serif-accent text-signal">Nós orquestramos todos.</span>
      </SplitReveal>
    </>
  );
}

/** Versão estática: mobile, movimento reduzido ou sem WebGL. */
function LayersList() {
  return (
    <section className="section-y bg-graphite-950 text-paper" aria-labelledby="camadas-titulo">
      <div className="container-x">
        <div id="camadas-titulo">
          <Title />
        </div>
        <ol className="mt-14 grid gap-px bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {camadas.map((c) => (
            <li key={c.n} className="bg-graphite-950">
              <TLink href={`/servicos/${c.disciplina}`} className="img-zoom group block p-5">
                <div className="relative aspect-[4/3] overflow-hidden bg-graphite-800">
                  <Photo k={c.imagem} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                </div>
                <p className="mono-label text-muted mt-5">Etapa {c.n} / 08</p>
                <h3 className="mt-2 text-xl font-medium group-hover:text-signal">{c.nome}</h3>
                <p className="serif-accent mt-2 text-lg text-paper/85">{c.frase}</p>
                <p className="text-muted mt-3 text-sm">{c.oficios.join(" · ")}</p>
              </TLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function LayersSection() {
  const [mode, setMode] = useState<"list" | "pinned">("list");
  const [webgl, setWebgl] = useState(true);
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);
  const outer = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setMode(mq.matches ? "pinned" : "list");
    update();
    mq.addEventListener("change", update);
    try {
      const c = document.createElement("canvas");
      setWebgl(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setWebgl(false);
    }
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = outer.current;
    if (mode !== "pinned" || !el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress.current = self.progress;
        setStep(Math.min(camadas.length - 1, Math.max(0, Math.floor((self.progress / SPAN) * (camadas.length - 1) + 0.4))));
      },
    });
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "200px 0px" });
    io.observe(el);
    return () => {
      st.kill();
      io.disconnect();
    };
  }, [mode]);

  if (mode === "list") return <LayersList />;

  const c = camadas[step];

  return (
    <section aria-labelledby="camadas-titulo-pin" className="bg-graphite-950 text-paper">
      <div ref={outer} className="relative" style={{ height: `${camadas.length * 70 + 100}vh` }}>
        <div className="sticky top-0 grid h-screen grid-cols-[1.4fr_1fr] overflow-hidden">
          {/* Modelo */}
          <div className="blueprint-grid relative border-r border-paper/10">
            <div className="absolute inset-0">
              {webgl ? (
                <LayersScene progress={progress} active={active} />
              ) : (
                camadas.map((x, i) => (
                  <div key={x.n} className={cn("absolute inset-0 transition-opacity duration-700", i === step ? "opacity-100" : "opacity-0")}>
                    <Photo k={x.imagem} sizes="60vw" />
                  </div>
                ))
              )}
            </div>
            <p className="mono-label text-muted absolute top-[calc(var(--header-h)+1.5rem)] left-[var(--gutter)]">
              Folha {c.n}/08 — Axonometria explodida
            </p>
            <p className="mono-label text-muted absolute right-6 bottom-6">Esc. 1:200</p>
          </div>

          {/* Painel */}
          <div className="flex flex-col justify-between px-[var(--gutter)] pt-[calc(var(--header-h)+1.5rem)] pb-10">
            <div id="camadas-titulo-pin">
              <Title />
            </div>

            <div key={c.n} className="step-in">
              <p className="font-display-c text-[clamp(4rem,7vw,7.5rem)] leading-none text-signal tabular-nums">
                {c.n}
                <span className="text-paper/30">/08</span>
              </p>
              <h3 className="font-display-x mt-4 text-[clamp(1.75rem,2.6vw,2.75rem)]">{c.nome}</h3>
              <p className="serif-accent mt-3 text-[clamp(1.375rem,1.8vw,1.875rem)] text-paper/90">{c.frase}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.oficios.map((o) => (
                  <span key={o} className="chip chip-sm">
                    {o}
                  </span>
                ))}
              </div>
              <p className="mono-label text-muted mt-4">{c.normas.join("  ·  ")}</p>
              <TLink href={`/servicos/${c.disciplina}`} className="mono-label link-underline mt-6 inline-flex min-h-11 items-center gap-2 hover:text-signal">
                Ver a disciplina <Arrow />
              </TLink>
            </div>

            {/* Régua de progresso com cotas (pr: espaço para o botão flutuante do WhatsApp) */}
            <div aria-hidden className="pr-20">
              <div className="flex items-end justify-between">
                {camadas.map((x, i) => (
                  <div key={x.n} className="flex flex-col items-center gap-2">
                    <span className={cn("block w-px transition-all duration-500", i <= step ? "h-5 bg-signal" : "h-3 bg-paper/30")} />
                    <span className={cn("font-mono text-[0.6875rem]", i === step ? "text-paper" : "text-muted")}>{x.n}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 h-px bg-paper/15">
                <div className="h-px origin-left bg-signal transition-transform duration-300" style={{ transform: `scaleX(${(step + 1) / camadas.length})` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
