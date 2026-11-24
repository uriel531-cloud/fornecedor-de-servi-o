"use client";

import { useEffect, useState } from "react";
import { TLink } from "@/components/ui/TLink";

type Consent = { necessary: true; analytics: boolean; marketing: boolean; date: string };
const KEY = "lastro-consent";

function save(c: Omit<Consent, "necessary" | "date">) {
  const value: Consent = { necessary: true, ...c, date: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {}
  window.dispatchEvent(new CustomEvent("lastro:consent", { detail: value }));
}

export function CookiePrefsButton() {
  return (
    <button type="button" className="link-underline hover:text-paper" onClick={() => window.dispatchEvent(new Event("lastro:cookies"))}>
      Preferências de cookies
    </button>
  );
}

/** Consentimento granular (LGPD). Nenhum script de rastreamento roda antes do aceite. */
export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
    const reopen = () => {
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener("lastro:cookies", reopen);
    return () => window.removeEventListener("lastro:cookies", reopen);
  }, []);

  if (!open) return null;

  const close = (c: { analytics: boolean; marketing: boolean }) => {
    save(c);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed right-4 bottom-20 left-4 z-[70] max-w-sm border border-paper/15 bg-graphite-900 p-5 text-paper shadow-none sm:right-auto lg:bottom-6 lg:left-6"
    >
      <h2 id="cookie-title" className="mono-label">
        Privacidade e cookies
      </h2>
      <p className="text-muted mt-2 text-[0.8125rem] leading-relaxed">
        Usamos cookies necessários e, com a sua permissão, cookies de análise e marketing.{" "}
        <TLink href="/cookies" className="text-paper underline underline-offset-4">
          Saiba mais
        </TLink>
        .
      </p>
      {custom && (
        <fieldset className="mt-5 space-y-3 border-t border-paper/10 pt-4 text-sm">
          <legend className="sr-only">Categorias de cookies</legend>
          <label className="flex items-center justify-between gap-4">
            <span>
              Necessários <span className="text-muted">(sempre ativos)</span>
            </span>
            <input type="checkbox" checked disabled className="h-5 w-5 accent-[var(--color-signal)]" />
          </label>
          <label className="flex items-center justify-between gap-4">
            <span>Análise</span>
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="h-5 w-5 accent-[var(--color-signal)]" />
          </label>
          <label className="flex items-center justify-between gap-4">
            <span>Marketing</span>
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="h-5 w-5 accent-[var(--color-signal)]" />
          </label>
        </fieldset>
      )}
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary min-h-11 px-4" onClick={() => close({ analytics: true, marketing: true })}>
          Aceitar todos
        </button>
        {custom ? (
          <button type="button" className="btn btn-secondary min-h-11 px-4" onClick={() => close({ analytics, marketing })}>
            Salvar escolhas
          </button>
        ) : (
          <button type="button" className="btn btn-secondary min-h-11 px-4" onClick={() => setCustom(true)}>
            Personalizar
          </button>
        )}
        <button type="button" className="mono-label min-h-11 px-2 underline underline-offset-4" onClick={() => close({ analytics: false, marketing: false })}>
          Só necessários
        </button>
      </div>
    </div>
  );
}
