import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/page/common";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { Ph } from "@/components/ui/Ph";

export const metadata: Metadata = {
  title: "Programa de integridade",
  description: "Programa de integridade da LASTRO, alinhado à Lei Anticorrupção (Lei 12.846/2013): código de conduta, due diligence, treinamentos e canal de ética independente.",
  alternates: { canonical: "/sobre/integridade" },
};

const pilares = [
  { t: "Comprometimento da alta direção", d: "O conselho e a diretoria aprovam e patrocinam o programa, com orçamento e responsável dedicados." },
  { t: "Código de conduta", d: "Regras claras sobre relacionamento com agentes públicos, brindes, doações, conflitos de interesse e concorrência." },
  { t: "Avaliação de riscos", d: "Mapeamento periódico dos riscos de integridade por tipo de cliente, obra e região." },
  { t: "Due diligence de terceiros", d: "Fornecedores, parceiros e profissionais da rede passam por verificação documental, trabalhista e reputacional." },
  { t: "Treinamento contínuo", d: "Todos os colaboradores e profissionais da rede são treinados no código de conduta, com reciclagem anual." },
  { t: "Canal de ética independente", d: "Relatos anônimos, apuração independente e proteção contra retaliação." },
  { t: "Controles internos e auditoria", d: "Segregação de funções, alçadas de aprovação e auditoria independente das demonstrações financeiras." },
  { t: "Monitoramento e melhoria", d: "Indicadores do programa reportados ao conselho, com revisão anual." },
];

export default function IntegridadePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Sobre", href: "/sobre" },
          { label: "Integridade", href: "/sobre/integridade" },
        ]}
        label="[ Programa de integridade ]"
        title={
          <>
            Nenhum contrato vale <span className="serif-accent text-signal">um atalho.</span>
          </>
        }
        sub="Tolerância zero com corrupção, fraude e assédio. Nosso programa de integridade segue a Lei Anticorrupção (Lei 12.846/2013) e o Decreto 11.129/2022."
        compact
      >
        <TLink href="/canal-de-etica" className="btn btn-primary btn-lg">
          Canal de Ética <Arrow />
        </TLink>
      </PageHero>

      <section className="theme-light section-y">
        <div className="container-x">
          <SectionHead n="01" label="Pilares" title="Oito pilares, um compromisso." light />
          <ol className="mt-12 grid gap-px bg-ink/15 md:grid-cols-2 lg:grid-cols-4">
            {pilares.map((p, i) => (
              <li key={p.t} className="bg-concrete-100 p-8">
                <span className="font-display-c text-4xl text-signal-dark">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-4 text-lg font-medium">{p.t}</h2>
                <p className="text-muted mt-2 text-[0.9375rem]">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <SectionHead n="02" label="Documentos" title="Políticas públicas." />
          <ul className="divide-y divide-paper/10 border-y border-paper/10">
            {["Código de conduta", "Política anticorrupção", "Política de brindes, presentes e hospitalidade", "Política de conflito de interesses", "Política de partes relacionadas", "Política de privacidade (LGPD)"].map(
              (d) => (
                <li key={d} className="flex items-center justify-between gap-4 py-5">
                  <span>{d}</span>
                  <Ph className="mono-label text-muted">PDF — em breve</Ph>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>
      <CtaBand
        title={
          <>
            Viu algo errado? <span className="serif-accent text-signal">Fale.</span>
          </>
        }
        sub="O Canal de Ética aceita relatos anônimos. Toda denúncia é apurada de forma independente, com proteção contra retaliação."
        href="/canal-de-etica"
        cta="Acessar o Canal de Ética"
      />
    </>
  );
}
