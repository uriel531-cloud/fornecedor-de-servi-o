import type { Metadata } from "next";
import { disciplinas, modalidades, totalServicos } from "@/content/disciplinas";
import { CtaBand, PageHero } from "@/components/page/common";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { Photo } from "@/components/ui/Photo";
import { SearchButton } from "@/components/home/interactive";

export const metadata: Metadata = {
  title: "Serviços de obra — todas as especialidades",
  description: `${totalServicos} serviços em 10 disciplinas: estrutura, solda, elétrica, hidráulica, coberturas, acabamentos, pintura, marcenaria, fachadas e engenharia. Um só contrato.`,
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Serviços", href: "/servicos" }]}
        label={`[ ${totalServicos} serviços — 10 disciplinas ]`}
        title={
          <>
            Todas as especialidades. <span className="serif-accent text-signal">Um só contrato.</span>
          </>
        }
        sub="Do pedreiro ao engenheiro, do soldador ao marceneiro. Contrate um serviço avulso ou a obra completa, sempre com gestão, responsável técnico e garantia."
        image="obra-ferramenta"
      >
        <div className="flex flex-wrap gap-3">
          <SearchButton className="btn btn-secondary">
            Buscar serviço <kbd className="text-muted font-mono text-xs">⌘K</kbd>
          </SearchButton>
          <TLink href="/orcamento" className="btn btn-primary">
            Solicitar proposta <Arrow />
          </TLink>
        </div>
      </PageHero>

      <nav aria-label="Disciplinas" className="sticky top-0 z-30 hidden border-y border-paper/10 bg-graphite-950/90 backdrop-blur lg:block">
        <ul className="container-x no-scrollbar flex gap-6 overflow-x-auto py-3">
          {disciplinas.map((d) => (
            <li key={d.slug} className="shrink-0">
              <a href={`#${d.slug}`} className="mono-label text-muted hover:text-paper">
                {d.numero} {d.curto}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-graphite-950 text-paper">
        {disciplinas.map((d) => (
          <section key={d.slug} id={d.slug} className="scroll-mt-16 border-b border-paper/10 py-20" aria-labelledby={`t-${d.slug}`}>
            <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr]">
              <div>
                <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-graphite-800">
                  <Photo k={d.imagem} sizes="(min-width: 1024px) 26rem, 100vw" />
                </div>
                <p className="mono-label text-muted mt-6">Disc. {d.numero}</p>
                <h2 id={`t-${d.slug}`} className="font-display-x mt-2 text-[clamp(1.75rem,2.6vw,2.5rem)]">
                  {d.nome}
                </h2>
                <p className="serif-accent mt-3 text-xl text-paper/90">{d.promessa}</p>
                <p className="text-muted mt-4">{d.descricao}</p>
                <p className="mono-label text-muted mt-6">{d.normas.join(" · ")}</p>
                <TLink href={`/servicos/${d.slug}`} className="btn btn-secondary mt-8">
                  Ver disciplina <Arrow />
                </TLink>
              </div>
              <ul className="grid content-start gap-px bg-paper/10 sm:grid-cols-2">
                {d.servicos.map((s) => (
                  <li key={s.slug} className="bg-graphite-950">
                    <TLink href={`/servicos/${d.slug}/${s.slug}`} className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-graphite-900">
                      <div>
                        <h3 className="text-lg font-medium group-hover:text-signal">{s.nome}</h3>
                        <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed">{s.resumo}</p>
                      </div>
                      <span className="mono-label inline-flex items-center gap-2 text-paper/70 group-hover:text-signal">
                        Detalhes e orçamento <Arrow />
                      </span>
                    </TLink>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section className="theme-light section-y">
        <div className="container-x">
          <h2 className="font-display-x text-[clamp(2rem,4.4vw,4.5rem)]">Três formas de contratar.</h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {modalidades.map((m) => (
              <li key={m.nome} className="border border-ink/15 p-8">
                <h3 className="text-2xl font-medium">{m.nome}</h3>
                <p className="text-muted mt-3">{m.ideal}</p>
                <TLink href={`/orcamento?tipo=${m.tipo}`} className="btn btn-secondary mt-8">
                  {m.cta} <Arrow />
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
