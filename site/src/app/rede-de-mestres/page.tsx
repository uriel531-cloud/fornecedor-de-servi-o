import type { Metadata } from "next";
import { niveis, vagas } from "@/content/pessoas";
import { PageHero, SectionHead } from "@/components/page/common";
import { MestresCarousel } from "@/components/home/interactive";
import { RedeForm } from "@/components/forms/forms";
import { JsonLd } from "@/components/seo/JsonLd";
import { Ph } from "@/components/ui/Ph";
import { Arrow } from "@/components/ui/Arrow";
import { waLink } from "@/lib/wa";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Rede de Mestres — trabalhe com a LASTRO",
  description: "Pedreiros, soldadores, eletricistas, marceneiros, pintores e outros profissionais: pagamento em dia, obras organizadas, EPI fornecido e crescimento.",
  alternates: { canonical: "/rede-de-mestres" },
};

const beneficios = [
  { t: "Pagamento em dia", d: "Você recebe no prazo combinado. Sempre." },
  { t: "Obra organizada", d: "Material no lugar, projeto na mão e gestor que resolve." },
  { t: "EPI fornecido", d: "Equipamento de proteção completo, sem custo para você." },
  { t: "Treinamento", d: "Cursos de NR e técnicas novas, pagos pela LASTRO." },
  { t: "Avaliação justa", d: "Nota por obra, com critérios claros. Quem é bom sobe." },
  { t: "Obra o ano inteiro", d: "Uma rede grande significa menos tempo parado." },
];

export default function RedePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Rede de Mestres", href: "/rede-de-mestres" }]}
        label="[ Rede de Mestres — trabalhe conosco ]"
        title={
          <>
            Seu ofício merece <span className="serif-accent text-signal">obra de primeira.</span>
          </>
        }
        sub="Somos a casa dos melhores profissionais de obra do país. Se você é bom no que faz, queremos você na rede."
        image="obra-ferramenta"
      >
        <div className="flex flex-wrap gap-3">
          <a href="#candidatura" className="btn btn-primary btn-lg">
            Quero fazer parte <Arrow />
          </a>
          <a href={waLink("Olá! Quero fazer parte da rede de profissionais da LASTRO.")} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
            Cadastro pelo WhatsApp
          </a>
        </div>
      </PageHero>

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x">
          <SectionHead n="01" label="Por que a LASTRO" title="O que você ganha." />
          <ul className="mt-12 grid gap-px bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
            {beneficios.map((b) => (
              <li key={b.t} className="bg-graphite-950 p-8">
                <h3 className="font-display-x text-2xl">{b.t}</h3>
                <p className="mt-3 text-lg text-paper/80">{b.d === "Você recebe no prazo combinado. Sempre." ? <Ph>{b.d}</Ph> : b.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="theme-light section-y">
        <div className="container-x">
          <SectionHead n="02" label="Crescimento" title="Três níveis. Você decide até onde vai." light />
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {niveis.map((n, i) => (
              <li key={n.nome} className="border border-ink/20 p-8">
                <span className="font-display-c text-5xl text-signal-dark">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display-x mt-4 text-3xl">{n.nome}</h3>
                <p className="text-muted mt-3 text-lg">{n.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y overflow-hidden bg-graphite-950 text-paper">
        <div className="container-x">
          <SectionHead n="03" label="Quem já está na rede" title="Mestres de ofício." />
          <MestresCarousel />
        </div>
      </section>

      <section className="section-y bg-graphite-900 text-paper">
        <div className="container-x">
          <SectionHead n="04" label="Vagas abertas" title="Estamos contratando." />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {vagas.map((v) => (
              <li key={v.slug} className="border border-paper/15 p-6">
                <h3 className="text-xl font-medium">{v.titulo}</h3>
                <p className="mono-label text-muted mt-1">
                  {v.local} · {v.tipo}
                </p>
                <ul className="text-muted mt-4 space-y-1 text-[0.9375rem]">
                  {v.requisitos.map((r) => (
                    <li key={r}>— {r}</li>
                  ))}
                </ul>
                <a href="#candidatura" className="mono-label mt-5 inline-flex min-h-11 items-center gap-2 hover:text-signal">
                  Candidatar-se <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="candidatura" className="section-y scroll-mt-20 bg-graphite-950 text-paper">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHead n="05" label="Candidatura" title="Leva 2 minutos." />
            <p className="text-muted mt-6 max-w-md text-lg">Depois do cadastro, marcamos uma avaliação técnica. Prefere falar? Mande uma mensagem no WhatsApp.</p>
          </div>
          <div className="border border-paper/15 bg-graphite-900 p-8">
            <RedeForm />
          </div>
        </div>
      </section>

      <JsonLd
        data={vagas.map((v) => ({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: v.titulo,
          description: v.requisitos.join(". "),
          datePosted: "2026-11-01",
          employmentType: v.tipo.includes("CLT") ? "FULL_TIME" : "CONTRACTOR",
          hiringOrganization: { "@type": "Organization", name: site.fullName, sameAs: site.url },
          jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: v.local.split(",")[0], addressRegion: v.local.split(", ")[1], addressCountry: "BR" } },
        }))}
      />
    </>
  );
}
