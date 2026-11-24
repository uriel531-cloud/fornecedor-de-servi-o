import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/page/common";
import { LeadForm } from "@/components/forms/LeadForm";
import { Ph } from "@/components/ui/Ph";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { waLink } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a LASTRO: WhatsApp, telefone, e-mail ou formulário. Visita técnica em até 48 horas.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  const canais = [
    { k: "WhatsApp", v: "Falar agora com um especialista", href: waLink("Olá! Gostaria de falar com um especialista da LASTRO."), ext: true },
    { k: "Telefone", v: site.phone, href: site.phoneHref, ph: true },
    { k: "E-mail comercial", v: site.email, href: `mailto:${site.email}`, ph: true },
    { k: "Investidores", v: site.emailRi, href: `mailto:${site.emailRi}`, ph: true },
    { k: "Privacidade (DPO)", v: site.emailDpo, href: `mailto:${site.emailDpo}`, ph: true },
  ];
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contato", href: "/contato" }]}
        label="[ Contato ]"
        title={
          <>
            Uma conversa. <span className="serif-accent text-signal">Um responsável.</span>
          </>
        }
        sub="Atendimento de segunda a sexta, das 8h às 19h, e aos sábados, das 9h às 13h."
        compact
      />
      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <ul className="divide-y divide-paper/10 border-y border-paper/10">
              {canais.map((c) => (
                <li key={c.k}>
                  <a href={c.href} target={c.ext ? "_blank" : undefined} rel={c.ext ? "noopener noreferrer" : undefined} className="group flex items-center justify-between gap-4 py-6">
                    <span>
                      <span className="mono-label text-muted block">{c.k}</span>
                      <span className="mt-1 block text-xl group-hover:text-signal">{c.ph ? <Ph>{c.v}</Ph> : c.v}</span>
                    </span>
                    <Arrow dir="up-right" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {site.offices.map((o) => (
                <address key={o.city} className="not-italic">
                  <p className="mono-label text-muted">
                    {o.city} — {o.uf}
                  </p>
                  <Ph as="p" className="mt-1">
                    {o.address}
                  </Ph>
                </address>
              ))}
            </div>
          </div>
          <div>
            <div className="border border-paper/15 bg-graphite-900 p-8">
              <h2 className="font-display-x text-3xl">Envie uma mensagem</h2>
              <LeadForm origem="contato" />
            </div>
            <p className="text-muted mt-6">
              Já sabe o que precisa?{" "}
              <TLink href="/orcamento" className="text-paper underline underline-offset-4">
                Use o configurador de orçamento
              </TLink>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
