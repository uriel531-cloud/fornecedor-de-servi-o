import type { Metadata } from "next";
import { esgStats, seals } from "@/content/site";
import { CtaBand, PageHero, SectionHead } from "@/components/page/common";
import { Counter, RevealBox } from "@/components/ui/motion";
import { Photo } from "@/components/ui/Photo";
import { Ph } from "@/components/ui/Ph";

export const metadata: Metadata = {
  title: "ESG e Segurança",
  description: "Segurança do trabalho (NR-18, NR-35, NR-10), gestão de resíduos conforme a CONAMA 307, treinamento contínuo e certificações ISO.",
  alternates: { canonical: "/esg-e-seguranca" },
};

const seguranca = [
  { t: "Análise de risco antes de cada atividade", d: "APR e permissão de trabalho para atividades críticas: altura, eletricidade, espaço confinado e içamento." },
  { t: "EPI completo, sempre", d: "Fornecido, conferido e registrado. Sem EPI, a frente de obra não começa." },
  { t: "NRs cumpridas e documentadas", d: "NR-18, NR-35, NR-10, NR-33 e NR-12, com certificados disponíveis para o cliente no portal." },
  { t: "Direito de recusa", d: "Qualquer profissional pode parar uma atividade insegura, sem punição." },
];

const ambiental = [
  { t: "Gestão de resíduos", d: "Plano de gerenciamento de resíduos por obra, com separação por classe e destinação conforme a Resolução CONAMA 307." },
  { t: "Madeira de origem legal", d: "Só trabalhamos com madeira com DOF (Documento de Origem Florestal)." },
  { t: "Eficiência energética", d: "Energia solar, automação e esquadrias de desempenho como padrão das propostas." },
  { t: "Água", d: "Reúso e captação de chuva sempre avaliados em obras novas e reformas completas." },
];

export default function EsgPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "ESG e Segurança", href: "/esg-e-seguranca" }]}
        label="[ ESG e Segurança ]"
        title={
          <>
            Segurança não é departamento. <span className="serif-accent text-signal">É método.</span>
          </>
        }
        sub="Uma obra só é bem feita se todos voltam para casa. E se o que sobra dela vai para o lugar certo."
        image="obra-equipe"
      />

      <section className="border-b border-paper/10 bg-graphite-950 text-paper">
        <dl className="container-x grid gap-px sm:grid-cols-3">
          {esgStats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-3 py-12">
              <dt className="text-muted">{s.label}</dt>
              <dd className="font-display-c text-[clamp(3rem,6vw,6rem)] tabular-nums">
                <Counter value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHead n="01" label="Segurança do trabalho" title="Zero acidente é meta, não slogan." />
            <ul className="mt-10 space-y-8">
              {seguranca.map((s) => (
                <li key={s.t} className="border-t border-paper/15 pt-5">
                  <h3 className="text-xl font-medium">{s.t}</h3>
                  <p className="text-muted mt-2">{s.d}</p>
                </li>
              ))}
            </ul>
          </div>
          <RevealBox className="aspect-[4/5] bg-graphite-800">
            <Photo k="solda-2" sizes="(min-width: 1024px) 50vw, 100vw" />
          </RevealBox>
        </div>
      </section>

      <section className="theme-light section-y">
        <div className="container-x">
          <SectionHead n="02" label="Meio ambiente" title="O que sai da obra também é responsabilidade nossa." light />
          <ul className="mt-12 grid gap-px bg-ink/15 md:grid-cols-2 lg:grid-cols-4">
            {ambiental.map((a) => (
              <li key={a.t} className="bg-concrete-100 p-8">
                <h3 className="text-lg font-medium">{a.t}</h3>
                <p className="text-muted mt-2">{a.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x">
          <SectionHead n="03" label="Certificações" title="Sistemas de gestão." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {seals.map((s) => (
              <li key={s.name} className="border border-paper/20 p-6">
                <p className="font-display-x text-2xl">{s.name}</p>
                <p className="text-muted mt-2">{s.desc}</p>
                <Ph as="p" className="mono-label mt-4 text-signal">
                  {s.status}
                </Ph>
              </li>
            ))}
          </ul>
          <p className="text-muted mt-8 text-sm">
            <Ph>[Relatório ESG e de segurança anual — disponível na área de investidores após publicação.]</Ph>
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
