"use client";

import { Command } from "cmdk";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { allServicos, disciplinas, totalServicos } from "@/content/disciplinas";
import { projetos } from "@/content/projetos";
import { site } from "@/content/site";
import { gsap } from "@/lib/gsap";
import { track } from "@/lib/track";
import { waLink } from "@/lib/wa";
import { startScroll, stopScroll } from "./SmoothScroll";

/* -------------------------------------------------------------------------- */
/* Busca ⌘K sobre o índice de serviços                                        */
/* -------------------------------------------------------------------------- */
const paginas = [
  { label: "Solicitar proposta", href: "/orcamento" },
  { label: "Todas as especialidades", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Método LASTRO", href: "/metodo" },
  { label: "Investidores", href: "/investidores" },
  { label: "Rede de Mestres (trabalhe conosco)", href: "/rede-de-mestres" },
  { label: "Portal do cliente", href: "/portal" },
  { label: "Contato", href: "/contato" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("lastro:search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("lastro:search", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      stopScroll();
      track("search_open");
    } else startScroll();
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label={`Buscar entre ${totalServicos} serviços`} loop>
      <div className="flex items-center gap-3 border-b border-paper/15 px-5">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className="text-muted shrink-0">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
        <Command.Input placeholder={`Buscar entre ${totalServicos} serviços: solda TIG, porcelanato, SPDA...`} />
        <kbd className="mono-label text-muted hidden shrink-0 sm:block">Esc</kbd>
      </div>
      <Command.List data-lenis-prevent>
        <Command.Empty>
          Nenhum serviço encontrado. Descreva o que precisa no{" "}
          <button type="button" className="underline underline-offset-4" onClick={() => go("/orcamento")}>
            orçamento
          </button>
          .
        </Command.Empty>
        <Command.Group heading="Páginas">
          {paginas.map((p) => (
            <Command.Item key={p.href} value={p.label} onSelect={() => go(p.href)}>
              {p.label}
            </Command.Item>
          ))}
        </Command.Group>
        {disciplinas.map((d) => (
          <Command.Group key={d.slug} heading={`${d.numero} — ${d.nome}`}>
            <Command.Item value={d.nome} keywords={d.oficios} onSelect={() => go(`/servicos/${d.slug}`)}>
              <span>{d.nome}</span>
              <span className="text-muted ml-auto text-xs">disciplina</span>
            </Command.Item>
            {d.servicos.map((s) => (
              <Command.Item key={s.slug} value={`${s.nome} — ${d.nome}`} keywords={d.oficios} onSelect={() => go(`/servicos/${d.slug}/${s.slug}`)}>
                <span>{s.nome}</span>
                <span className="text-muted ml-auto hidden max-w-[50%] truncate text-xs sm:block">{s.resumo}</span>
              </Command.Item>
            ))}
          </Command.Group>
        ))}
        <Command.Group heading="Projetos">
          {projetos.map((p) => (
            <Command.Item key={p.slug} value={`${p.nome} ${p.cidade} ${p.setor}`} onSelect={() => go(`/projetos/${p.slug}`)}>
              <span>{p.nome}</span>
              <span className="text-muted ml-auto text-xs">
                {p.cidade} · {p.setor}
              </span>
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/* WhatsApp flutuante (desktop) + barra fixa na zona do polegar (mobile)      */
/* -------------------------------------------------------------------------- */
function messageFor(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "servicos" && parts[2]) {
    const s = allServicos.find((x) => x.slug === parts[2]);
    if (s) return `Olá! Gostaria de um orçamento de ${s.nome.toLowerCase()} com a LASTRO.`;
  }
  if (parts[0] === "servicos" && parts[1]) {
    const d = disciplinas.find((x) => x.slug === parts[1]);
    if (d) return `Olá! Gostaria de falar sobre ${d.nome.toLowerCase()} com um especialista da LASTRO.`;
  }
  if (parts[0] === "projetos" && parts[1]) {
    const p = projetos.find((x) => x.slug === parts[1]);
    if (p) return `Olá! Vi o projeto ${p.nome} e quero algo parecido.`;
  }
  if (parts[0] === "investidores" || parts[0] === "en") return "Olá! Gostaria de falar com Relações com Investidores da LASTRO.";
  if (parts[0] === "rede-de-mestres") return "Olá! Quero fazer parte da rede de profissionais da LASTRO.";
  return "Olá! Gostaria de falar com um especialista da LASTRO.";
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4 5.2 5.2 0 0 0 3.2.7 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

export function FloatingActions() {
  const pathname = usePathname();
  if (pathname.startsWith("/portal")) return null;
  const href = waLink(messageFor(pathname));
  const onQuote = pathname.startsWith("/orcamento");
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { pathname })}
        className="fixed right-6 bottom-6 z-40 hidden h-14 w-14 place-items-center rounded-full border border-paper/20 bg-graphite-900 text-paper transition-colors hover:border-signal hover:text-signal lg:grid"
        aria-label="Conversar pelo WhatsApp"
      >
        <WaIcon />
      </a>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-paper/15 bg-graphite-950/95 p-2 backdrop-blur lg:hidden">
        {onQuote ? (
          <a href={`tel:${site.phone.replace(/\D/g, "")}`} className="btn btn-secondary min-h-12 justify-center text-paper">
            Ligar
          </a>
        ) : (
          <a href="/orcamento" className="btn btn-primary min-h-12 justify-center">
            Orçamento
          </a>
        )}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { pathname })}
          className="btn min-h-12 justify-center text-paper"
        >
          <WaIcon /> WhatsApp
        </a>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Preloader: contador 0 → 100 + cota; só na primeira visita da sessão        */
/* -------------------------------------------------------------------------- */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("is-preloading")) return;
    const el = ref.current;
    const count = countRef.current;
    const line = lineRef.current;
    if (!el || !count || !line) return;
    const obj = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        root.classList.remove("is-preloading");
        try {
          sessionStorage.setItem("lastro-preloaded", "1");
        } catch {}
        window.dispatchEvent(new Event("lastro:preloaded"));
      },
    });
    tl.to(obj, { v: 100, duration: 0.9, ease: "power2.inOut", onUpdate: () => (count.textContent = String(Math.round(obj.v)).padStart(3, "0")) })
      .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0)
      .to(el, { yPercent: -100, duration: 0.7, ease: "expo.inOut" }, "+=0.05");
    return () => {
      tl.kill();
      root.classList.remove("is-preloading");
    };
  }, []);

  return (
    <div ref={ref} className="preloader fixed inset-0 z-[100] flex-col justify-between bg-graphite-900 p-[var(--gutter)] text-paper" aria-hidden>
      <span className="mono-label text-muted">LASTRO — Engenharia integrada</span>
      <div>
        <div className="flex items-end justify-between">
          <span className="mono-label text-muted">Carregando projeto</span>
          <span ref={countRef} className="font-display-c text-[clamp(4rem,14vw,12rem)] tabular-nums">
            000
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="h-3 w-px bg-paper/60" />
          <div ref={lineRef} className="h-px flex-1 origin-left bg-paper/60" />
          <span className="h-3 w-px bg-paper/60" />
        </div>
        <p className="mono-label text-muted mt-2 text-center">100.000 mm</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Shift + Alt + P: destaca todos os placeholders                             */
/* -------------------------------------------------------------------------- */
export function PlaceholderToggle() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && e.code === "KeyP") {
        const on = document.documentElement.classList.toggle("show-ph");
        try {
          localStorage.setItem("lastro-show-ph", on ? "1" : "0");
        } catch {}
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
