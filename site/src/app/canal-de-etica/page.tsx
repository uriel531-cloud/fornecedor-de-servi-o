import type { Metadata } from "next";
import { PageHero } from "@/components/page/common";
import { EticaForm } from "@/components/forms/forms";

export const metadata: Metadata = {
  title: "Canal de Ética",
  description: "Relate, inclusive de forma anônima, situações de corrupção, fraude, assédio, discriminação ou riscos de segurança. Apuração independente.",
  alternates: { canonical: "/canal-de-etica" },
  robots: { index: true, follow: true },
};

export default function EticaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Canal de Ética", href: "/canal-de-etica" }]}
        label="[ Canal de Ética — anônimo e independente ]"
        title={
          <>
            Viu algo errado? <span className="serif-accent text-signal">Fale.</span>
          </>
        }
        sub="Qualquer pessoa, cliente, profissional, fornecedor ou vizinho de obra, pode relatar. Não é preciso se identificar."
        compact
      />
      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-8">
            {[
              ["Anonimato", "Você escolhe se identificar ou não. O protocolo gerado no final permite acompanhar o caso sem revelar quem você é."],
              ["Apuração independente", "Os relatos são analisados por um comitê independente, fora da linha hierárquica das pessoas envolvidas. [Em produção: canal operado por empresa externa especializada.]"],
              ["Sem retaliação", "Retaliação contra quem relata de boa-fé é falta grave, punida conforme o código de conduta."],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-paper/15 pt-5">
                <h2 className="text-xl font-medium">{t}</h2>
                <p className="text-muted mt-2">{d}</p>
              </div>
            ))}
          </div>
          <div className="border border-paper/15 bg-graphite-900 p-8">
            <EticaForm />
          </div>
        </div>
      </section>
    </>
  );
}
