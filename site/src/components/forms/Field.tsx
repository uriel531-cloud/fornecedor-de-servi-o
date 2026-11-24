"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Base = { label: string; error?: string; hint?: string; className?: string };

export function Field({ label, error, hint, className, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const errId = `${id}-err`;
  const hintId = `${id}-hint`;
  return (
    <div className={cn("field", className)}>
      <label htmlFor={id}>
        {label}
        {rest.required && <span aria-hidden> *</span>}
      </label>
      <input
        id={id}
        className="input"
        aria-invalid={error ? true : undefined}
        aria-describedby={[error && errId, hint && hintId].filter(Boolean).join(" ") || undefined}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="text-muted text-sm">
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextArea({ label, error, className, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <div className={cn("field", className)}>
      <label htmlFor={id}>
        {label}
        {rest.required && <span aria-hidden> *</span>}
      </label>
      <textarea id={id} className="input min-h-32 resize-y" aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-err` : undefined} {...rest} />
      {error && (
        <p id={`${id}-err`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Select({ label, error, className, children, ...rest }: Base & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  const id = useId();
  return (
    <div className={cn("field", className)}>
      <label htmlFor={id}>
        {label}
        {rest.required && <span aria-hidden> *</span>}
      </label>
      <select id={id} className="input" aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-err` : undefined} {...rest}>
        {children}
      </select>
      {error && (
        <p id={`${id}-err`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Consent({ error, name = "consent", children }: { error?: string; name?: string; children?: ReactNode }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-3 text-sm leading-relaxed">
        <input id={id} type="checkbox" name={name} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-signal)]" aria-invalid={error ? true : undefined} />
        <span className="text-muted">
          {children ?? (
            <>
              Concordo com o tratamento dos meus dados para contato comercial, conforme a{" "}
              <a href="/privacidade" className="underline underline-offset-4">
                Política de Privacidade
              </a>{" "}
              (LGPD).
            </>
          )}
        </span>
      </label>
      {error && (
        <p className="field-error mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Honeypot anti-spam: invisível e fora da ordem de tabulação. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Não preencha este campo
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function Success({ protocolo, children }: { protocolo?: string; children: ReactNode }) {
  return (
    <div role="status" className="border border-signal/60 p-6">
      <p className="mono-label text-signal">Recebido</p>
      <div className="mt-3 text-lg">{children}</div>
      {protocolo && <p className="mono-label text-muted mt-4">Protocolo: {protocolo}</p>}
    </div>
  );
}
