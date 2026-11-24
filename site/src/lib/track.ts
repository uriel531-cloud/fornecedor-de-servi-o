"use client";

/**
 * Eventos de conversão. Só são enviados depois do consentimento de "análise"
 * (banner de cookies). Conecte GA4, Plausible ou outro provedor em window.dataLayer.
 */
export type TrackEvent =
  | "form_start"
  | `form_step_${number}`
  | "lead_submit"
  | "lead_priority_a"
  | "whatsapp_click"
  | "data_room_request"
  | "rede_application"
  | "audience_select"
  | "search_open";

type Consent = { necessary: true; analytics: boolean; marketing: boolean };

export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem("lastro-consent");
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function track(event: TrackEvent, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (!getConsent()?.analytics) return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...props, ts: Date.now() });
}
