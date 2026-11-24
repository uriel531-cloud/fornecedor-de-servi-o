"use client";

import { useEffect, useState } from "react";
import { heroPerfis } from "@/content/publicos";
import { Photo } from "@/components/ui/Photo";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { SplitReveal } from "@/components/ui/motion";
import { Ph } from "@/components/ui/Ph";
import { track } from "@/lib/track";
import { cn } from "@/lib/cn";
import type { ImageKey } from "@/content/images";

/**
 * Sequência de "cortes" do hero. Em produção, trocar por vídeo HLS
 * (o primeiro frame continua como poster e elemento LCP).
 */
const cortes: { k: ImageKey; coord: string; label: string }[] = [
  { k: "solda-2", coord: "-23.3555° S / -46.8768° W", label: "Solda TIG — Cajamar, SP" },
  { k: "casa-concreto", coord: "-23.5505° S / -46.7000° W", label: "Residência Mirante — São Paulo, SP" },
  { k: "marcenaria-bancada", coord: "-19.9858° S / -43.8466° W", label: "Marcenaria — Nova Lima, MG" },
  { k: "concreto-concretagem", coord: "-22.9844° S / -43.2238° W", label: "Concretagem — Rio de Janeiro, RJ" },
  { k: "casa-noite", coord: "-23.5650° S / -46.6600° W", label: "Entrega — São Paulo, SP" },
];

const defaultSub =
  "Pedreiros, soldadores, eletricistas, marceneiros, pintores e engenheiros. Mais de 40 especialidades sob uma única gestão, com preço fechado, prazo em contrato e garantia por escrito.";

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [perfil, setPerfil] = useState<string | null>(null);

  useEffect(() => {
    setLoaded(true);
    try {
      const saved = localStorage.getItem("lastro-perfil");
      if (saved && heroPerfis.some((p) => p.id === saved)) setPerfil(saved);
    } catch {}
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % cortes.length), 4200);
    return () => clearInterval(id);
  }, [paused]);

  const p = heroPerfis.find((x) => x.id === perfil);
  const choose = (id: string) => {
    const next = id === perfil ? null : id;
    setPerfil(next);
    try {
      if (next) localStorage.setItem("lastro-perfil", next);
      else localStorage.removeItem("lastro-perfil");
    } catch {}
    if (next) track("audience_select", { perfil: next });
  };

  // Não é renderizado no HTML: pode divergir entre servidor e cliente sem quebrar a hidratação.
  const [introDelay] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("is-preloading") ? 1.55 : 0.15,
  );

  return (
    <section className={cn("grain relative flex min-h-[100svh] flex-col overflow-hidden bg-graphite-950 text-paper", paused && "hero-paused")}>
      {/* Cortes */}
      <div className="absolute inset-0" aria-hidden>
        {cortes.map((c, i) => (
          <div key={c.k} className={cn("hero-frame absolute inset-0", i === active && "is-active")}>
            {(i === 0 || loaded) && <Photo k={c.k} priority={i === 0} sizes="100vw" />}
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/55 to-graphite-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-950/70 via-transparent to-transparent" />
      </div>

      <div className="container-x relative z-10 flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+3rem)] pb-8">
        <p className="mono-label text-paper/80">[ Engenharia integrada — 40+ especialidades ]</p>
        <SplitReveal as="h1" immediate delay={introDelay} className="font-display-x mt-6 text-[clamp(2rem,7.2vw,8.25rem)]">
          Do alicerce ao acabamento. <span className="serif-accent text-signal">Um só contrato.</span>
        </SplitReveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,38rem)_1fr] lg:items-end">
          <div>
            <p className="min-h-[7.5rem] max-w-[38rem] text-[clamp(1.0625rem,1.3vw,1.25rem)] leading-relaxed text-paper/85 sm:min-h-[6rem]" aria-live="polite">
              {p ? p.sub : defaultSub}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <TLink href={p ? p.href : "/orcamento"} className="btn btn-primary btn-lg min-w-[17rem] justify-between">
                {p ? p.cta : "Solicitar proposta"} <Arrow />
              </TLink>
              <TLink href="/projetos" className="btn btn-secondary btn-lg">
                Ver obras entregues
              </TLink>
            </div>
            <TLink href="/investidores" className="mono-label link-underline mt-5 inline-flex min-h-11 items-center gap-2 text-paper/80 hover:text-paper">
              Área do investidor <Arrow dir="up-right" />
            </TLink>
          </div>

          <div className="flex flex-col gap-6 lg:items-end">
            <div className="text-right max-lg:text-left">
              <p className="mono-label text-paper/70" aria-live="off">
                {cortes[active].label}
              </p>
              <Ph as="p" className="mono-label mt-1 text-paper/50 tabular-nums">
                {cortes[active].coord}
              </Ph>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-paper/15 pt-5 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Escolha o seu perfil" className="flex flex-wrap items-center gap-2">
            <span className="mono-label mr-2 text-paper/70">Sou</span>
            {heroPerfis.map((x) => (
              <button key={x.id} type="button" className="chip" aria-pressed={perfil === x.id} onClick={() => choose(x.id)}>
                {x.chip}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setPaused((v) => !v)}
              className="mono-label inline-flex min-h-11 items-center gap-2 text-paper/70 hover:text-paper"
              aria-pressed={paused}
            >
              <span aria-hidden>{paused ? "▶" : "❚❚"}</span> {paused ? "Retomar imagens" : "Pausar imagens"}
            </button>
            <div className="hidden items-center gap-3 md:flex" aria-hidden>
              <span className="mono-label text-paper/60">Role</span>
              <span className="scroll-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
