import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteConfigurator } from "@/components/forms/QuoteConfigurator";
import { Breadcrumbs } from "@/components/page/common";

export const metadata: Metadata = {
  title: "Solicitar proposta — orçamento de obra",
  description: "Configure seu projeto em 10 passos e receba uma estimativa indicativa. Visita técnica em até 48 horas e proposta com preço fechado.",
  alternates: { canonical: "/orcamento" },
};

export default function OrcamentoPage() {
  return (
    <section className="min-h-screen bg-graphite-950 pt-[calc(var(--header-h)+2rem)] pb-28 text-paper">
      <div className="container-x">
        <Breadcrumbs items={[{ label: "Orçamento", href: "/orcamento" }]} />
        <div className="mt-10 mb-14 max-w-3xl">
          <p className="mono-label text-paper/80">[ Orçamento — 10 passos, cerca de 3 minutos ]</p>
          <h1 className="font-display-x mt-5 text-[clamp(2rem,5vw,5rem)]">
            Conte o projeto. <span className="serif-accent text-signal">Nós cuidamos do resto.</span>
          </h1>
        </div>
        <Suspense fallback={<p className="text-muted">Carregando…</p>}>
          <QuoteConfigurator />
        </Suspense>
      </div>
    </section>
  );
}
