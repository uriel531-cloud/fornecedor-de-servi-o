import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cidades, getCidade, getServicoLocal, servicosLocais } from "@/content/cidades";
import { getDisciplina } from "@/content/disciplinas";
import { projetos } from "@/content/projetos";
import { CtaBand, FaqList, PageHero, SectionHead } from "@/components/page/common";
import { ProjetoGridCard } from "@/components/page/cards";
import { LeadForm } from "@/components/forms/LeadForm";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { Ph } from "@/components/ui/Ph";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";

type Props = { params: Promise<{ cidade: string; servico: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return cidades.flatMap((c) => servicosLocais.map((s) => ({ cidade: c.slug, servico: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cidade, servico } = await params;
  const c = getCidade(cidade);
  const s = getServicoLocal(servico);
  if (!c || !s) return {};
  return {
    title: `${s.nome} em ${c.nome} — alto padrão, com garantia`,
    description: `${s.nome} em ${c.nome}/${c.uf} com profissionais certificados, gestor de obra, preço fechado e garantia por escrito. Atendemos ${c.bairros.slice(0, 4).join(", ")} e região.`,
    alternates: { canonical: `/${c.slug}/${s.slug}` },
  };
}

export default async function LocalPage({ params }: Props) {
  const { cidade, servico } = await params;
  const c = getCidade(cidade);
  const s = getServicoLocal(servico);
  if (!c || !s) notFound();
  const d = getDisciplina(s.disciplina)!;
  const sv = d.servicos.find((x) => x.slug === s.servico) ?? d.servicos[0];
  const locais = projetos.filter((p) => p.cidade === c.nome || p.uf === c.uf);
  const lista = locais.length ? locais : projetos.filter((p) => p.disciplinas.includes(d.slug)).slice(0, 3);

  const faqLocal = [
    { q: `Em quanto tempo vocês fazem a visita técnica em ${c.nome}?`, a: `Em ${c.nome}, a visita técnica acontece em ${c.visita} após o pedido, com um engenheiro da equipe local.` },
    { q: `Quais bairros de ${c.nome} vocês atendem?`, a: `Atendemos toda a cidade e região metropolitana, com mais frequência em ${c.bairros.join(", ")}.` },
    { q: `O ${s.nome.toLowerCase()} é da LASTRO ou terceirizado?`, a: `É um profissional da rede LASTRO, certificado e avaliado a cada obra, trabalhando sob gestão e responsabilidade técnica da LASTRO, com garantia por escrito.` },
    ...d.faq.slice(0, 2),
  ];

  return (
    <>
      <PageHero
        crumbs={[
          { label: d.nome, href: `/servicos/${d.slug}` },
          { label: `${s.nome} em ${c.nome}`, href: `/${c.slug}/${s.slug}` },
        ]}
        label={`[ ${c.nome} — ${c.uf} ]`}
        title={
          <>
            {s.nome} em {c.nome}. <span className="serif-accent text-signal">Com responsável e garantia.</span>
          </>
        }
        sub={`${d.descricao} Equipe local de ${c.equipe} profissionais e visita técnica em ${c.visita}.`}
        image={d.imagem}
        compact
      >
        <TLink href={`/orcamento?disciplina=${d.slug}&servico=${sv.slug}`} className="btn btn-primary btn-lg">
          Orçar {s.nome.toLowerCase()} em {c.nome} <Arrow />
        </TLink>
      </PageHero>

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHead n="01" label={`${c.nome} em números`} title="Presença local, padrão nacional." />
            <dl className="mt-10 grid grid-cols-2 gap-px bg-paper/10">
              <div className="flex flex-col-reverse gap-1 bg-graphite-950 p-6">
                <dt className="text-muted text-sm">obras entregues em {c.nome}</dt>
                <dd className="font-display-c text-5xl">
                  <Ph>{c.obras}</Ph>
                </dd>
              </div>
              <div className="flex flex-col-reverse gap-1 bg-graphite-950 p-6">
                <dt className="text-muted text-sm">profissionais na equipe local</dt>
                <dd className="font-display-c text-5xl">
                  <Ph>{c.equipe}</Ph>
                </dd>
              </div>
            </dl>
            <p className="mt-10 text-lg text-paper/85">{c.nota}</p>
            <p className="mono-label text-muted mt-10">Bairros com mais obras</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {c.bairros.map((b) => (
                <li key={b} className="chip chip-sm">
                  {b}
                </li>
              ))}
            </ul>
            <p className="mono-label text-muted mt-10">O que inclui</p>
            <ul className="mt-3 space-y-2">
              {sv.escopo.map((e) => (
                <li key={e} className="flex gap-3">
                  <span className="mt-[0.75em] h-px w-3 shrink-0 bg-signal" aria-hidden />
                  {e}
                </li>
              ))}
            </ul>
            <TLink href={`/servicos/${d.slug}`} className="btn btn-secondary mt-8">
              Todos os serviços de {d.curto.toLowerCase()} <Arrow />
            </TLink>
          </div>
          <aside className="h-fit border border-paper/15 bg-graphite-900 p-8 lg:sticky lg:top-24">
            <h2 className="font-display-x text-2xl">
              {s.nome} em {c.nome}
            </h2>
            <p className="text-muted mt-2 text-sm">Resposta em até 1 dia útil.</p>
            <LeadForm origem={`local:${c.slug}/${s.slug}`} servico={`${s.nome} — ${c.nome}`} compact />
          </aside>
        </div>
      </section>

      <section className="section-y border-t border-paper/10 bg-graphite-950 text-paper">
        <div className="container-x">
          <SectionHead n="02" label="Projetos" title="Obras na região." />
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {lista.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <ProjetoGridCard p={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-graphite-900 text-paper">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionHead n="03" label="Dúvidas" title={`${s.nome} em ${c.nome}: perguntas frequentes.`} />
          <FaqList items={faqLocal} />
        </div>
      </section>

      <section className="bg-graphite-950 py-16 text-paper">
        <div className="container-x">
          <p className="mono-label text-muted">Outros serviços em {c.nome}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {servicosLocais
              .filter((x) => x.slug !== s.slug)
              .map((x) => (
                <li key={x.slug}>
                  <TLink href={`/${c.slug}/${x.slug}`} className="chip hover:bg-paper hover:text-ink">
                    {x.nome}
                  </TLink>
                </li>
              ))}
          </ul>
          <p className="mono-label text-muted mt-8">{s.nome} em outras cidades</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {cidades
              .filter((x) => x.slug !== c.slug)
              .map((x) => (
                <li key={x.slug}>
                  <TLink href={`/${x.slug}/${s.slug}`} className="chip hover:bg-paper hover:text-ink">
                    {x.nome}
                  </TLink>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <CtaBand href={`/orcamento?disciplina=${d.slug}&servico=${sv.slug}`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": s.schemaType,
          name: `${site.fullName} — ${s.nome} em ${c.nome}`,
          "@id": `${site.url}/${c.slug}/${s.slug}#local`,
          url: `${site.url}/${c.slug}/${s.slug}`,
          telephone: site.phone,
          areaServed: { "@type": "City", name: c.nome },
          address: { "@type": "PostalAddress", addressLocality: c.nome, addressRegion: c.uf, addressCountry: "BR" },
          parentOrganization: { "@id": `${site.url}/#org` },
        }}
      />
    </>
  );
}
