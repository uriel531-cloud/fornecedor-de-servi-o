import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { disciplinas, getServico } from "@/content/disciplinas";
import { projetos } from "@/content/projetos";
import { CtaBand, FaqList, PageHero, SectionHead } from "@/components/page/common";
import { ProjetoGridCard } from "@/components/page/cards";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";

type Props = { params: Promise<{ disciplina: string; servico: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return disciplinas.flatMap((d) => d.servicos.map((s) => ({ disciplina: d.slug, servico: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { disciplina, servico } = await params;
  const r = getServico(disciplina, servico);
  if (!r) return {};
  return {
    title: `${r.servico.nome} — ${r.disciplina.nome}`,
    description: `${r.servico.resumo} Escopo, normas, processo e orçamento com preço fechado. LASTRO Engenharia Integrada.`,
    alternates: { canonical: `/servicos/${r.disciplina.slug}/${r.servico.slug}` },
  };
}

export default async function ServicoPage({ params }: Props) {
  const { disciplina, servico } = await params;
  const r = getServico(disciplina, servico);
  if (!r) notFound();
  const { disciplina: d, servico: s } = r;
  const normas = Array.from(new Set([...(s.normas ?? []), ...d.normas]));
  const irmaos = d.servicos.filter((x) => x.slug !== s.slug).slice(0, 4);
  const outras = d.complementares
    .map((slug) => disciplinas.find((x) => x.slug === slug)!)
    .filter(Boolean)
    .map((x) => ({ d: x, s: x.servicos[0] }));
  const relacionados = projetos.filter((p) => p.disciplinas.includes(d.slug)).slice(0, 3);
  const orcHref = `/orcamento?disciplina=${d.slug}&servico=${s.slug}`;

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Serviços", href: "/servicos" },
          { label: d.nome, href: `/servicos/${d.slug}` },
          { label: s.nome, href: `/servicos/${d.slug}/${s.slug}` },
        ]}
        label={`[ ${d.nome} ]`}
        title={s.nome}
        sub={s.resumo}
        image={d.imagem}
        compact
      >
        <div className="flex flex-wrap gap-3">
          <TLink href={orcHref} className="btn btn-primary btn-lg">
            Orçar {s.nome.toLowerCase()} <Arrow />
          </TLink>
          <TLink href="/orcamento?agendar=1" className="btn btn-secondary btn-lg">
            Agendar visita técnica
          </TLink>
        </div>
      </PageHero>

      {/* Escopo + formulário curto */}
      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHead n="01" label="Escopo" title="O que está incluído." />
            <ul className="mt-10 divide-y divide-paper/10 border-y border-paper/10">
              {s.escopo.map((e, i) => (
                <li key={e} className="grid grid-cols-[3rem_1fr] gap-4 py-5 text-lg">
                  <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
                  {e}
                </li>
              ))}
              <li className="grid grid-cols-[3rem_1fr] gap-4 py-5 text-lg">
                <span className="font-mono text-sm text-signal">+</span>
                Gestão, limpeza da obra, ART e garantia por escrito
              </li>
            </ul>
            <p className="mono-label text-muted mt-10">Normas e certificações aplicáveis</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {normas.map((n) => (
                <li key={n} className="border border-paper/20 px-3 py-2 font-mono text-sm">
                  {n}
                </li>
              ))}
            </ul>
            <p className="mono-label text-muted mt-8">Executado por</p>
            <p className="mt-2">{d.oficios.join(" · ")}</p>
          </div>
          <aside className="h-fit border border-paper/15 bg-graphite-900 p-8 lg:sticky lg:top-24" aria-labelledby="form-curto">
            <h2 id="form-curto" className="font-display-x text-2xl">
              Orçamento rápido
            </h2>
            <p className="text-muted mt-2 text-sm">Resposta em até 1 dia útil. Para escopos maiores, use o orçamento completo.</p>
            <LeadForm origem={`servico:${d.slug}/${s.slug}`} servico={s.nome} compact />
          </aside>
        </div>
      </section>

      {/* Processo */}
      <section className="theme-light section-y">
        <div className="container-x">
          <SectionHead n="02" label="Processo" title="Como executamos." light />
          <ol className="mt-12 grid gap-px bg-ink/15 md:grid-cols-5">
            {d.processo.map((e, i) => (
              <li key={e.titulo} className="bg-concrete-100 p-6 md:pt-10">
                <span className="font-display-c text-5xl text-signal-dark">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg leading-snug font-medium">{e.titulo}</h3>
                <p className="text-muted mt-2 text-[0.9375rem]">{e.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x">
          <SectionHead n="03" label="Antes e depois" title="Resultado." />
          <div className="mt-12">
            <BeforeAfter antes={d.antes} depois={d.depois} label={`Antes e depois — ${s.nome}`} />
            <p className="text-muted mt-3 text-sm">Arraste para comparar. Imagens ilustrativas.</p>
          </div>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="section-y border-t border-paper/10 bg-graphite-950 text-paper">
          <div className="container-x">
            <SectionHead n="04" label="Projetos relacionados" title="Em obras entregues." />
            <ul className="mt-12 grid gap-8 md:grid-cols-3">
              {relacionados.map((p) => (
                <li key={p.slug}>
                  <ProjetoGridCard p={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section-y bg-graphite-900 text-paper">
        <div className="container-x">
          <SectionHead n="05" label="Serviços complementares" title={<>Quem contrata {s.nome.toLowerCase()} também contrata…</>} />
          <ul className="mt-12 grid gap-px bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
            {[...irmaos.map((x) => ({ d, s: x })), ...outras].slice(0, 8).map(({ d: dd, s: ss }) => (
              <li key={`${dd.slug}/${ss.slug}`} className="bg-graphite-900">
                <TLink href={`/servicos/${dd.slug}/${ss.slug}`} className="group flex h-full flex-col gap-3 p-6 hover:bg-graphite-800">
                  <span className="mono-label text-muted">{dd.curto}</span>
                  <span className="text-lg font-medium group-hover:text-signal">{ss.nome}</span>
                  <span className="text-muted text-sm">{ss.resumo}</span>
                </TLink>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col justify-between gap-6 border border-paper/15 p-8 md:flex-row md:items-center">
            <p className="max-w-xl text-lg">Juntar serviços em uma obra completa reduz prazo, retrabalho e custo de coordenação. Tudo sob um contrato.</p>
            <TLink href="/orcamento?tipo=completa" className="btn btn-primary shrink-0">
              Planejar obra completa <Arrow />
            </TLink>
          </div>
        </div>
      </section>

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionHead n="06" label="Dúvidas" title="Perguntas frequentes." />
          <FaqList items={d.faq} />
        </div>
      </section>

      <CtaBand
        title={
          <>
            Orçar <span className="serif-accent text-signal">{s.nome.toLowerCase()}.</span>
          </>
        }
        href={orcHref}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.nome,
          serviceType: d.nome,
          description: s.resumo,
          provider: { "@type": d.schemaType, name: site.fullName, "@id": `${site.url}/#org`, telephone: site.phone },
          areaServed: site.offices.map((o) => ({ "@type": "City", name: o.city })),
          url: `${site.url}/servicos/${d.slug}/${s.slug}`,
        }}
      />
    </>
  );
}
