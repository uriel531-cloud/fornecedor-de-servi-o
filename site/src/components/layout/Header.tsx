"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { disciplinas, totalServicos } from "@/content/disciplinas";
import { publicos } from "@/content/publicos";
import { TLink } from "@/components/ui/TLink";
import { Photo } from "@/components/ui/Photo";
import { Arrow } from "@/components/ui/Arrow";
import { Logo } from "./Logo";
import { startScroll, stopScroll } from "./SmoothScroll";
import { cn } from "@/lib/cn";

type Panel = "servicos" | "solucoes" | null;

const nav = [
  { label: "Projetos", href: "/projetos" },
  { label: "Método", href: "/metodo" },
  { label: "Investidores", href: "/investidores" },
  { label: "Sobre", href: "/sobre" },
];

const mobileLinks = [
  { label: "Serviços", href: "/servicos" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Projetos", href: "/projetos" },
  { label: "Método", href: "/metodo" },
  { label: "Investidores", href: "/investidores" },
  { label: "Sobre", href: "/sobre" },
  { label: "Rede de Mestres", href: "/rede-de-mestres" },
  { label: "Insights", href: "/insights" },
  { label: "Contato", href: "/contato" },
];

export function openSearch() {
  window.dispatchEvent(new Event("lastro:search"));
}

export function Header() {
  const pathname = usePathname();
  const [panel, setPanel] = useState<Panel>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [hover, setHover] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > 240);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setPanel(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanel(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (mobile) {
      stopScroll();
      document.body.style.overflow = "hidden";
    } else {
      startScroll();
      document.body.style.overflow = "";
    }
  }, [mobile]);

  const openPanel = (p: Panel) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPanel(p);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setPanel(null), 180);
  };

  const solid = scrolled || panel !== null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-paper transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out-expo)]",
        hidden && panel === null && !mobile ? "-translate-y-full" : "translate-y-0",
        solid ? "border-b border-paper/10 bg-graphite-950/85 backdrop-blur-md" : "border-b border-transparent",
      )}
      onMouseLeave={scheduleClose}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <TLink href="/" aria-label="LASTRO — página inicial" className="shrink-0">
          <Logo />
        </TLink>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {(["servicos", "solucoes"] as const).map((p) => (
            <button
              key={p}
              type="button"
              aria-expanded={panel === p}
              aria-controls={`painel-${p}`}
              onMouseEnter={() => openPanel(p)}
              onClick={() => setPanel(panel === p ? null : p)}
              className={cn("mono-label flex min-h-11 items-center gap-1.5 px-3 transition-colors hover:text-signal", panel === p && "text-signal")}
            >
              {p === "servicos" ? "Serviços" : "Soluções"}
              <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden className={cn("transition-transform", panel === p && "rotate-180")}>
                <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          ))}
          {nav.map((n) => (
            <TLink
              key={n.href}
              href={n.href}
              onMouseEnter={() => openPanel(null)}
              className={cn("mono-label flex min-h-11 items-center px-3 transition-colors hover:text-signal", pathname.startsWith(n.href) && "text-signal")}
            >
              {n.label}
            </TLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openSearch}
            className="mono-label hidden min-h-11 items-center gap-2 border border-paper/25 px-3 transition-colors hover:border-paper sm:flex"
            aria-label="Buscar serviços (Ctrl + K)"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
            <kbd className="text-muted font-mono text-[0.6875rem]">⌘K</kbd>
          </button>
          <TLink href="/orcamento" className="btn btn-primary hidden md:inline-flex">
            Solicitar proposta <Arrow />
          </TLink>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={mobile}
            aria-controls="menu-mobile"
            aria-label={mobile ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMobile((m) => !m)}
          >
            <span className="relative block h-3 w-6">
              <span className={cn("absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500", mobile && "translate-y-1.5 rotate-45")} />
              <span className={cn("absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500", mobile && "-translate-y-1.5 -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      {/* Mega-menu de serviços */}
      <div
        id="painel-servicos"
        role="region"
        aria-label="Serviços"
        hidden={panel !== "servicos"}
        onMouseEnter={() => openPanel("servicos")}
        className="border-t border-paper/10 bg-graphite-950"
      >
        <div className="container-x grid grid-cols-[1fr_22rem] gap-10 py-10">
          <ul className="grid grid-cols-5 gap-x-6 gap-y-8">
            {disciplinas.map((d, i) => (
              <li key={d.slug} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)}>
                <TLink href={`/servicos/${d.slug}`} className="group block">
                  <span className="mono-label text-muted">{d.numero}</span>
                  <span className="mt-1 block text-[0.9375rem] leading-snug font-medium group-hover:text-signal">{d.nome}</span>
                </TLink>
                <ul className="mt-3 space-y-1.5">
                  {d.servicos.slice(0, 4).map((s) => (
                    <li key={s.slug}>
                      <TLink href={`/servicos/${d.slug}/${s.slug}`} className="text-muted link-underline text-sm hover:text-paper">
                        {s.nome}
                      </TLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="flex flex-col">
            <div className="relative aspect-[4/5] overflow-hidden bg-graphite-800">
              {disciplinas.map((d, i) => (
                <div key={d.slug} className={cn("absolute inset-0 transition-opacity duration-700", hover === i ? "opacity-100" : "opacity-0")}>
                  <Photo k={d.imagem} sizes="22rem" />
                </div>
              ))}
              <p className="mono-label absolute bottom-3 left-3 bg-graphite-950/70 px-2 py-1">
                Disc. {disciplinas[hover].numero} — {disciplinas[hover].curto}
              </p>
            </div>
            <TLink href="/servicos" className="btn btn-secondary mt-4 justify-between">
              Ver todas as {totalServicos} especialidades <Arrow />
            </TLink>
          </div>
        </div>
      </div>

      {/* Painel de soluções */}
      <div
        id="painel-solucoes"
        role="region"
        aria-label="Soluções"
        hidden={panel !== "solucoes"}
        onMouseEnter={() => openPanel("solucoes")}
        className="border-t border-paper/10 bg-graphite-950"
      >
        <ul className="container-x grid grid-cols-5 gap-6 py-10">
          {publicos.map((p) => (
            <li key={p.slug}>
              <TLink href={`/solucoes/${p.slug}`} className="img-zoom group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-graphite-800">
                  <Photo k={p.imagem} sizes="20vw" />
                </div>
                <span className="mt-3 block font-medium group-hover:text-signal">{p.nome}</span>
                <span className="text-muted mt-1 block text-sm">{p.titulo}</span>
              </TLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Menu mobile em tela cheia */}
      <div
        id="menu-mobile"
        hidden={!mobile}
        data-lenis-prevent
        className="fixed inset-0 top-[var(--header-h)] h-[calc(100dvh-var(--header-h))] overflow-y-auto bg-graphite-950 lg:hidden"
      >
        <nav aria-label="Menu" className="container-x flex min-h-full flex-col justify-between gap-10 py-8">
          <ul className="space-y-1">
            {mobileLinks.map((l, i) => (
              <li key={l.href} style={{ animationDelay: `${i * 50}ms` }} className="mobile-link">
                <TLink href={l.href} className="font-display-x block py-1.5 text-[clamp(2rem,9vw,3.5rem)] hover:text-signal">
                  {l.label}
                </TLink>
              </li>
            ))}
          </ul>
          <div className="grid gap-3">
            <TLink href="/orcamento" className="btn btn-primary justify-between">
              Solicitar proposta <Arrow />
            </TLink>
            <button type="button" onClick={openSearch} className="btn btn-secondary justify-between">
              Buscar serviços
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
