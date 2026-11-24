import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublico, publicos } from "@/content/publicos";
import { disciplinas } from "@/content/disciplinas";
import { projetos } from "@/content/projetos";
import { CtaBand, PageHero, SectionHead } from "@/components/page/common";
import { ProjetoGridCard } from "@/components/page/cards";
import { MetodoTimeline } from "@/components/home/interactive";
import { LeadForm } from "@/components/forms/LeadForm";
import { Photo } from "@/components/ui/Photo";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";

type Props = { params: Promise<{ publico: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return publicos.map((p) => ({ publico: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPublico((await params).publico);
  if (!p) return {};
  return { title: `${p.nome} — ${p.titulo}`, description: p.sub, alternates: { canonical: `/solucoes/${p.slug}` } };
}

export default async function SolucaoPage({ params }: Props) {
  const p = getPublico((await params).publico);
  if (!p) notFound();
  const discs = p.disciplinas.map((s) => disciplinas.find((d) => d.slug === s)!).filter(Boolean);
  const cases = projetos.filter((x) => x.publico === p.slug);
  const lista = cases.length ? cases : projetos.slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Soluções", href: "/solucoes" },
          { label: p.nome, href: `/solucoes/${p.slug}` },
        ]}
        label={`[ Soluções — ${p.nome} ]`}
        title={p.titulo}
        sub={p.sub}
        image={p.imagem}
      >
        <TLink href={p.ctaHref} className="btn btn-primary btn-lg">
          {p.cta} <Arrow />
        </TLink>
      </PageHero>

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x">
          <SectionHead n="01" label="O problema" title="Sem um responsável único, a obra é assim." />
          <div className="mt-14 grid gap-px bg-paper/10 lg:grid-cols-2">
            <div className="bg-graphite-950 p-8 lg:p-12">
              <p className="mono-label text-muted">Modelo tradicional</p>
              <ul className="mt-6 space-y-4">
                {p.dores.map((d) => (
                  <li key={d} className="flex gap-4 text-lg text-paper/70">
                    <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-paper/40" />
                    <span className="line-through decoration-paper/30">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-graphite-900 p-8 lg:p-12">
              <p className="mono-label text-signal">Com a LASTRO</p>
              <ul className="mt-6 grid gap-8 sm:grid-cols-2">
                {p.entregas.map((e) => (
                  <li key={e.titulo}>
                    <h3 className="text-lg font-medium">{e.titulo}</h3>
                    <p className="text-muted mt-2">{e.texto}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="theme-light section-y">
        <div className="container-x">
          <SectionHead n="02" label="Disciplinas mais contratadas" title="O que mais fazemos para você." light />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {discs.map((d) => (
              <li key={d.slug}>
                <TLink href={`/servicos/${d.slug}`} className="img-zoom group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-concrete-300">
                    <Photo k={d.imagem} sizes="(min-width: 1024px) 25vw, 50vw" />
                  </div>
                  <p className="mono-label text-muted mt-4">Disc. {d.numero}</p>
                  <h3 className="mt-1 text-xl font-medium group-hover:underline group-hover:underline-offset-4">{d.nome}</h3>
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x">
          <SectionHead n="03" label="Projetos" title="Obras para quem pensa como você." />
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {lista.map((x) => (
              <li key={x.slug}>
                <ProjetoGridCard p={x} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="theme-light section-y">
        <div className="container-x">
          <SectionHead n="04" label="Método" title="Seis etapas. Nenhuma surpresa." light />
          <MetodoTimeline light />
        </div>
      </section>

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead n="05" label="Fale com um especialista" title={`${p.cta}.`} />
            <p className="text-muted mt-6 max-w-md text-lg">Resposta em até 1 dia útil. Para um orçamento detalhado, use o configurador completo.</p>
            <TLink href={p.ctaHref} className="btn btn-secondary mt-8">
              Configurador de orçamento <Arrow />
            </TLink>
          </div>
          <div className="border border-paper/15 bg-graphite-900 p-8">
            <LeadForm origem={`solucao:${p.slug}`} />
          </div>
        </div>
      </section>

      <CtaBand href={p.ctaHref} cta={p.cta} />
    </>
  );
}
