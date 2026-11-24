import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { disciplinas, getDisciplina } from "@/content/disciplinas";
import { projetos } from "@/content/projetos";
import { CtaBand, FaqList, PageHero, SectionHead } from "@/components/page/common";
import { ProjetoGridCard } from "@/components/page/cards";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { Photo } from "@/components/ui/Photo";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { RevealBox } from "@/components/ui/motion";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";

type Props = { params: Promise<{ disciplina: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return disciplinas.map((d) => ({ disciplina: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = getDisciplina((await params).disciplina);
  if (!d) return {};
  return {
    title: `${d.nome} — ${d.servicos.length} serviços`,
    description: `${d.descricao} ${d.servicos.map((s) => s.nome).join(", ")}.`,
    alternates: { canonical: `/servicos/${d.slug}` },
  };
}

export default async function DisciplinaPage({ params }: Props) {
  const d = getDisciplina((await params).disciplina);
  if (!d) notFound();
  const relacionados = projetos.filter((p) => p.disciplinas.includes(d.slug)).slice(0, 3);
  const comp = d.complementares.map((s) => disciplinas.find((x) => x.slug === s)!).filter(Boolean);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Serviços", href: "/servicos" },
          { label: d.nome, href: `/servicos/${d.slug}` },
        ]}
        label={`[ Disc. ${d.numero} — ${d.servicos.length} serviços ]`}
        title={d.nome}
        sub={
          <>
            <span className="serif-accent block text-[clamp(1.5rem,2.2vw,2.25rem)] text-paper">{d.promessa}</span>
            <span className="mt-4 block">{d.descricao}</span>
          </>
        }
        image={d.imagem}
      >
        <TLink href={`/orcamento?disciplina=${d.slug}`} className="btn btn-primary btn-lg">
          Orçar {d.curto.toLowerCase()} <Arrow />
        </TLink>
      </PageHero>

      {/* Serviços */}
      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x">
          <SectionHead n="01" label="Serviços" title="O que executamos." />
          <ul className="mt-12 grid gap-px bg-paper/10 md:grid-cols-2 xl:grid-cols-3">
            {d.servicos.map((s, i) => (
              <li key={s.slug} className="bg-graphite-950">
                <TLink href={`/servicos/${d.slug}/${s.slug}`} className="group flex h-full flex-col gap-6 p-8 transition-colors hover:bg-graphite-900">
                  <span className="mono-label text-muted">
                    {d.numero}.{String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl font-medium group-hover:text-signal">{s.nome}</h3>
                    <p className="text-muted mt-3 leading-relaxed">{s.resumo}</p>
                  </div>
                  <ul className="mt-auto space-y-1.5 text-[0.9375rem] text-paper/80">
                    {s.escopo.slice(0, 3).map((e) => (
                      <li key={e} className="flex gap-3">
                        <span className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" aria-hidden />
                        {e}
                      </li>
                    ))}
                  </ul>
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ofícios, normas e processo */}
      <section className="theme-light section-y">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHead n="02" label="Quem executa" title="Ofícios e normas." light />
            <ul className="mt-10 flex flex-wrap gap-2">
              {d.oficios.map((o) => (
                <li key={o} className="chip">
                  {o}
                </li>
              ))}
            </ul>
            <p className="mono-label mt-8">Normas aplicáveis</p>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {d.normas.map((n) => (
                <li key={n} className="border border-ink/20 px-3 py-2 font-mono text-sm">
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mono-label text-muted">Processo</p>
            <ol className="mt-6 divide-y divide-ink/15 border-y border-ink/15">
              {d.processo.map((e, i) => (
                <li key={e.titulo} className="grid grid-cols-[3.5rem_1fr] gap-4 py-6">
                  <span className="font-display-c text-4xl text-signal-dark">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg font-medium">{e.titulo}</h3>
                    <p className="text-muted mt-1">{e.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Antes e depois + galeria */}
      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x">
          <SectionHead n="03" label="Antes e depois" title="O resultado fala." />
          <div className="mt-12">
            <BeforeAfter antes={d.antes} depois={d.depois} label={`Antes e depois — ${d.nome}`} />
            <p className="text-muted mt-3 text-sm">Arraste para comparar. Imagens ilustrativas.</p>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {d.galeria.map((g) => (
              <li key={g}>
                <RevealBox className="aspect-[4/5] bg-graphite-800">
                  <Photo k={g} sizes="(min-width: 1024px) 25vw, 50vw" />
                </RevealBox>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="section-y border-t border-paper/10 bg-graphite-950 text-paper">
          <div className="container-x">
            <SectionHead n="04" label="Projetos" title={`${d.curto} em obras entregues.`}>
              <TLink href={`/projetos?disciplina=${d.slug}`} className="btn btn-secondary self-start">
                Ver todos <Arrow />
              </TLink>
            </SectionHead>
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

      {/* Complementares */}
      <section className="section-y bg-graphite-900 text-paper">
        <div className="container-x">
          <SectionHead n="05" label="Combine disciplinas" title={<>Quem contrata {d.curto.toLowerCase()} também contrata…</>} />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {comp.map((c) => (
              <li key={c.slug}>
                <TLink href={`/servicos/${c.slug}`} className="img-zoom group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-graphite-800">
                    <Photo k={c.imagem} sizes="(min-width: 768px) 33vw, 100vw" />
                  </div>
                  <p className="mono-label text-muted mt-4">Disc. {c.numero}</p>
                  <h3 className="mt-1 text-xl font-medium group-hover:text-signal">{c.nome}</h3>
                </TLink>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col justify-between gap-6 border border-paper/15 p-8 md:flex-row md:items-center">
            <p className="max-w-xl text-lg">
              Precisa de mais de uma disciplina? Na <strong className="font-medium">obra completa</strong>, todas ficam sob um único contrato, com um gestor e uma garantia.
            </p>
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
            Orçar <span className="serif-accent text-signal">{d.curto.toLowerCase()}.</span>
          </>
        }
        href={`/orcamento?disciplina=${d.slug}`}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: d.nome,
          serviceType: d.nome,
          description: d.descricao,
          provider: { "@type": d.schemaType, name: site.fullName, "@id": `${site.url}/#org` },
          areaServed: site.offices.map((o) => o.city),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: d.nome,
            itemListElement: d.servicos.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.nome, description: s.resumo } })),
          },
        }}
      />
    </>
  );
}
