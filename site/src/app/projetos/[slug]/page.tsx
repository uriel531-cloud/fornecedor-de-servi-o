import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjeto, projetos } from "@/content/projetos";
import { disciplinas } from "@/content/disciplinas";
import { CtaBand, SectionHead, Breadcrumbs } from "@/components/page/common";
import { ProjetoGridCard } from "@/components/page/cards";
import { Photo } from "@/components/ui/Photo";
import { Ph } from "@/components/ui/Ph";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Counter, RevealBox, SplitReveal } from "@/components/ui/motion";
import { num } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projetos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProjeto((await params).slug);
  if (!p) return {};
  return {
    title: `${p.nome} — ${p.cidade}`,
    description: p.resumo,
    alternates: { canonical: `/projetos/${p.slug}` },
  };
}

export default async function ProjetoPage({ params }: Props) {
  const p = getProjeto((await params).slug);
  if (!p) notFound();
  const discs = p.disciplinas.map((s) => disciplinas.find((d) => d.slug === s)!).filter(Boolean);
  const semelhantes = projetos.filter((x) => x.slug !== p.slug && (x.setor === p.setor || x.disciplinas.some((d) => p.disciplinas.includes(d)))).slice(0, 3);

  const ficha: [string, React.ReactNode][] = [
    ["Cliente", <Ph key="c">Confidencial</Ph>],
    ["Local", `${p.cidade}${p.uf !== "BR" ? `, ${p.uf}` : ""}`],
    ["Setor", p.setor],
    ["Área", <Ph key="a">{num(p.area)} m²</Ph>],
    ["Prazo previsto", <Ph key="pp">{String(p.prazoPrevisto).replace(".", ",")} meses</Ph>],
    ["Prazo real", <Ph key="pr">{String(p.prazoReal).replace(".", ",")} meses</Ph>],
    ["Orçamento × executado", <Ph key="o">{p.orcamentoVar}</Ph>],
    ["Equipe no pico", <Ph key="e">{p.equipe} profissionais</Ph>],
    ["Conclusão", <Ph key="y">{p.ano}</Ph>],
  ];

  return (
    <>
      <section className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-graphite-950 text-paper">
        <div className="absolute inset-0" aria-hidden>
          <Photo k={p.imagem} priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/40 to-graphite-950/30" />
        </div>
        <div className="container-x relative z-10 flex flex-1 flex-col justify-between pt-[calc(var(--header-h)+2rem)] pb-12">
          <Breadcrumbs
            items={[
              { label: "Projetos", href: "/projetos" },
              { label: p.nome, href: `/projetos/${p.slug}` },
            ]}
          />
          <div>
            <p className="mono-label text-paper/80">
              [ {p.setor} — {p.cidade} — <Ph>{p.ano}</Ph> ]
            </p>
            <SplitReveal as="h1" immediate className="font-display-x mt-5 text-[clamp(2rem,8vw,9rem)]">
              {p.nome}
            </SplitReveal>
            <p className="mt-6 max-w-2xl text-xl text-paper/85">{p.resumo}</p>
          </div>
        </div>
      </section>

      {/* Ficha técnica */}
      <section className="border-b border-paper/10 bg-graphite-950 py-16 text-paper" aria-labelledby="ficha">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
          <h2 id="ficha" className="mono-label text-muted">
            Ficha técnica
          </h2>
          <dl className="grid grid-cols-2 gap-px bg-paper/10 font-mono text-sm md:grid-cols-3">
            {ficha.map(([k, v]) => (
              <div key={k} className="bg-graphite-950 p-4">
                <dt className="text-muted text-xs uppercase tracking-wider">{k}</dt>
                <dd className="mt-1 text-paper">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Narrativa */}
      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x grid gap-16 lg:grid-cols-3">
          {[
            ["Desafio", p.desafio],
            ["Solução", p.solucao],
          ].map(([t, txt], i) => (
            <div key={t} className="reveal">
              <p className="font-display-c text-5xl text-signal">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="font-display-x mt-4 text-3xl">{t}</h2>
              <p className="mt-4 text-lg leading-relaxed text-paper/85">{txt}</p>
            </div>
          ))}
          <div className="reveal">
            <p className="font-display-c text-5xl text-signal">03</p>
            <h2 className="font-display-x mt-4 text-3xl">Resultado</h2>
            <dl className="mt-6 grid grid-cols-2 gap-6">
              {p.resultados.map((r) => (
                <div key={r.label} className="flex flex-col-reverse gap-1 border-t border-paper/15 pt-3">
                  <dt className="text-muted text-sm">{r.label}</dt>
                  <dd className="font-display-c text-4xl tabular-nums">
                    <Counter value={r.valor} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="bg-graphite-950 pb-24 text-paper">
        <div className="container-x grid gap-4 md:grid-cols-2">
          {p.galeria.map((g, i) => (
            <RevealBox key={g} className={i === 0 ? "aspect-[16/10] md:col-span-2" : "aspect-[4/5]"}>
              <Photo k={g} sizes={i === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"} />
            </RevealBox>
          ))}
        </div>
      </section>

      <section className="theme-light section-y">
        <div className="container-x">
          <SectionHead n="04" label="Antes e depois" title="A transformação." light />
          <div className="mt-12">
            <BeforeAfter antes={p.antes} depois={p.depois} label={`Antes e depois — ${p.nome}`} />
            <p className="text-muted mt-3 text-sm">Arraste para comparar. Imagens ilustrativas; o vídeo de drone entra aqui na versão final.</p>
          </div>
          <div className="mt-14">
            <p className="mono-label text-muted">Disciplinas envolvidas</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {discs.map((d) => (
                <li key={d.slug}>
                  <TLink href={`/servicos/${d.slug}`} className="chip hover:bg-ink hover:text-paper">
                    {d.numero} {d.nome}
                  </TLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {p.depoimento && (
        <section className="section-y bg-graphite-900 text-paper">
          <figure className="container-x">
            <blockquote className="serif-accent max-w-[28ch] text-[clamp(2rem,4.4vw,4rem)] leading-[1.15]">
              <Ph>“{p.depoimento.texto}”</Ph>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="h-px w-10 bg-signal" aria-hidden />
              <span>
                <Ph className="font-medium">{p.depoimento.autor}</Ph>
                <span className="text-muted block text-sm">{p.depoimento.cargo}</span>
              </span>
            </figcaption>
          </figure>
        </section>
      )}

      {semelhantes.length > 0 && (
        <section className="section-y bg-graphite-950 text-paper">
          <div className="container-x">
            <SectionHead n="05" label="Projetos semelhantes" title="Veja também.">
              <TLink href="/projetos" className="btn btn-secondary self-start">
                Todos os projetos <Arrow />
              </TLink>
            </SectionHead>
            <ul className="mt-12 grid gap-8 md:grid-cols-3">
              {semelhantes.map((x) => (
                <li key={x.slug}>
                  <ProjetoGridCard p={x} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title={
          <>
            Quero um projeto <span className="serif-accent text-signal">como este.</span>
          </>
        }
        href={`/orcamento?tipo=completa&perfil=${p.publico}`}
        cta="Quero um projeto como este"
      />
    </>
  );
}
