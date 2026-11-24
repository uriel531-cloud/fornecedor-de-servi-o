import { disciplinas, modalidades, totalServicos } from "@/content/disciplinas";
import { garantias } from "@/content/metodo";
import { depoimentos } from "@/content/pessoas";
import { artigos } from "@/content/artigos";
import { clientLogos, esgStats, seals, stats } from "@/content/site";
import { kpis } from "@/content/investidores";
import { Photo } from "@/components/ui/Photo";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { Ph } from "@/components/ui/Ph";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Cota, Counter, Magnetic, Marquee, RevealBox, SplitReveal } from "@/components/ui/motion";
import { SearchButton } from "./interactive";
import { waLink } from "@/lib/wa";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/* S03 — Faixa de prova                                                       */
/* -------------------------------------------------------------------------- */
export function ProofBar() {
  return (
    <section aria-label="Números da LASTRO" className="border-y border-paper/10 bg-graphite-950 text-paper">
      <dl className="container-x grid grid-cols-2 md:grid-cols-5">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "flex flex-col-reverse gap-3 border-paper/10 py-10 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0",
              i === stats.length - 1 && "max-md:col-span-2",
              i % 2 === 1 && "max-md:border-l max-md:pl-5",
            )}
          >
            <dt className="mono-label text-muted">{s.label}</dt>
            <dd className="font-display-c text-[clamp(2rem,5.2vw,5.5rem)] tabular-nums">
              <Counter value={s.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* S05 — Bento das disciplinas                                                */
/* -------------------------------------------------------------------------- */
const areaBySlug: Record<string, string> = {
  "estrutura-e-alvenaria": "a",
  "metal-e-solda": "b",
  "instalacoes-eletricas": "c",
  "hidraulica-e-gas": "d",
  "impermeabilizacao-e-coberturas": "e",
  pintura: "f",
  "marcenaria-e-carpintaria": "g",
  acabamentos: "h",
  "climatizacao-esquadrias-e-fachadas": "i",
  "engenharia-projetos-e-gestao": "j",
};
// Ordem do DOM = ordem de prioridade (Estrutura e Acabamentos primeiro)
const bentoOrder = [
  "estrutura-e-alvenaria",
  "acabamentos",
  "metal-e-solda",
  "instalacoes-eletricas",
  "marcenaria-e-carpintaria",
  "pintura",
  "hidraulica-e-gas",
  "impermeabilizacao-e-coberturas",
  "climatizacao-esquadrias-e-fachadas",
  "engenharia-projetos-e-gestao",
];

export function Bento() {
  return (
    <section className="section-y bg-graphite-950 text-paper" aria-labelledby="bento-titulo">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel n="02">Especialidades</SectionLabel>
            <SplitReveal id="bento-titulo" className="font-display-x mt-5 text-[clamp(2rem,6vw,6.5rem)]">
              Todas as especialidades. <span className="serif-accent text-signal">Um só padrão.</span>
            </SplitReveal>
          </div>
          <p className="text-muted max-w-sm">
            {totalServicos} serviços em 10 disciplinas, executados por profissionais certificados e coordenados por um único gestor.
          </p>
        </div>

        <ul className="bento mt-14">
          {bentoOrder.map((slug) => {
            const d = disciplinas.find((x) => x.slug === slug)!;
            const big = slug === "estrutura-e-alvenaria" || slug === "acabamentos";
            return (
              <li key={slug} className={`t-${areaBySlug[slug]}`}>
                <TLink href={`/servicos/${d.slug}`} className="img-zoom group relative flex h-full flex-col justify-between overflow-hidden bg-graphite-800 p-6">
                  <Photo k={d.imagem} sizes={big ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"} className="opacity-70 transition-opacity duration-700 group-hover:opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/95 via-graphite-950/40 to-graphite-950/10" />
                  <p className="mono-label relative z-10">Disc. {d.numero}</p>
                  <div className="relative z-10">
                    <h3 className={cn("font-display-x", big ? "text-[clamp(2rem,3.6vw,3.75rem)]" : "text-[clamp(1.375rem,1.7vw,1.75rem)]")}>{d.curto}</h3>
                    <p className="mt-2 text-sm text-paper/80">{d.servicos.slice(0, 3).map((s) => s.nome).join(" · ")}</p>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="pt-2 text-sm text-paper/60">{d.servicos.slice(3, 7).map((s) => s.nome).join(" · ")}</p>
                      </div>
                    </div>
                    <span className="mono-label mt-4 inline-flex items-center gap-2 text-signal">
                      {d.servicos.length} serviços <Arrow />
                    </span>
                  </div>
                </TLink>
              </li>
            );
          })}
          <li className="t-s">
            <SearchButton className="group flex h-full w-full flex-col justify-between gap-6 border border-paper/15 p-6 text-left transition-colors hover:border-signal sm:flex-row sm:items-center">
              <span>
                <span className="mono-label text-muted block">Busca rápida — ⌘K</span>
                <span className="font-display-x mt-3 block text-[clamp(1.5rem,3vw,2.75rem)]">Procurando algo específico?</span>
              </span>
              <span className="btn btn-secondary shrink-0">
                Buscar entre {totalServicos} serviços <Arrow />
              </span>
            </SearchButton>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* S06 — Modalidades                                                          */
/* -------------------------------------------------------------------------- */
export function Modalidades() {
  return (
    <section className="section-y bg-graphite-900 text-paper" aria-labelledby="modalidades-titulo">
      <div className="container-x">
        <SectionLabel n="03">Modalidades</SectionLabel>
        <SplitReveal id="modalidades-titulo" className="font-display-x mt-5 max-w-[18ch] text-[clamp(2rem,5vw,5rem)]">
          Do reparo pontual à <span className="serif-accent text-signal">obra completa.</span>
        </SplitReveal>
        <ul className="mt-14 grid gap-4 lg:grid-cols-3 lg:items-stretch">
          {modalidades.map((m) => {
            const dest = "destaque" in m && m.destaque;
            return (
              <li key={m.nome} className={cn("reveal flex flex-col justify-between gap-10 border p-8 lg:p-10", dest ? "theme-light border-transparent lg:-my-6 lg:py-16" : "border-paper/15")}>
                <div>
                  {dest && (
                    <Ph as="p" className="mono-label mb-6 inline-block bg-signal px-2 py-1 text-ink">
                      Mais escolhido por clientes alto padrão
                    </Ph>
                  )}
                  <h3 className="font-display-x text-[clamp(1.75rem,2.6vw,2.5rem)]">{m.nome}</h3>
                  <p className="mono-label text-muted mt-6">Ideal para</p>
                  <p className="mt-2">{m.ideal}</p>
                  <p className="text-muted mt-1 text-[0.9375rem] italic">{m.exemplo}</p>
                  <p className="mono-label text-muted mt-8">Como funciona</p>
                  <ol className="mt-3 space-y-2">
                    {m.como.map((c, i) => (
                      <li key={c} className="flex gap-3 text-[0.9375rem]">
                        <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                        {c}
                      </li>
                    ))}
                  </ol>
                </div>
                <TLink href={`/orcamento?tipo=${m.tipo}`} className={cn("btn justify-between", dest ? "btn-primary" : "btn-secondary")}>
                  {m.cta} <Arrow />
                </TLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* S09 — Garantias                                                            */
/* -------------------------------------------------------------------------- */
function GarantiaIcon({ name }: { name: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, vectorEffect: "non-scaling-stroke" as const };
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden>
      {name === "preco" && (
        <>
          <rect x="6" y="10" width="36" height="28" {...common} />
          <path d="M6 18h36M14 28h8M14 32h14" {...common} />
          <circle cx="34" cy="30" r="4" {...common} />
        </>
      )}
      {name === "prazo" && (
        <>
          <circle cx="24" cy="26" r="15" {...common} />
          <path d="M24 17v9l6 4M19 6h10M24 6v5" {...common} />
        </>
      )}
      {name === "garantia" && (
        <>
          <path d="M24 5l15 6v11c0 10-6.5 17-15 21C15.5 39 9 32 9 22V11z" {...common} />
          <path d="M17 24l5 5 9-10" {...common} />
        </>
      )}
      {name === "seguro" && (
        <>
          <path d="M6 30h36M10 30V18l14-9 14 9v12M18 30v-8h12v8" {...common} />
          <path d="M4 40h40" {...common} />
        </>
      )}
    </svg>
  );
}

export function Garantias() {
  return (
    <section className="theme-light section-y" aria-labelledby="garantias-titulo">
      <div className="container-x">
        <SectionLabel n="06">Garantias</SectionLabel>
        <SplitReveal id="garantias-titulo" className="font-display-x mt-5 text-[clamp(2rem,8vw,8.5rem)]">
          O risco é <span className="serif-accent text-signal-dark">nosso.</span>
        </SplitReveal>
        <Cota label="Cláusulas em contrato" className="mt-10" />
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {garantias.map((g) => (
            <li key={g.titulo} className="reveal">
              <GarantiaIcon name={g.icon} />
              <h3 className="mt-6 text-xl leading-snug font-medium">{g.titulo}</h3>
              <p className="text-muted mt-3 leading-relaxed">
                {g.icon === "garantia" ? (
                  <>
                    Solidez e segurança conforme o Código Civil, mais garantia estendida de <Ph>5 anos</Ph> em acabamentos e instalações.
                  </>
                ) : g.icon === "prazo" ? (
                  <Ph>{g.texto}</Ph>
                ) : (
                  g.texto
                )}
              </p>
            </li>
          ))}
        </ul>
        <p className="text-muted mt-14 text-sm">Condições detalhadas em contrato.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* S12 — Prova social                                                         */
/* -------------------------------------------------------------------------- */
export function ProvaSocial() {
  return (
    <section className="section-y bg-graphite-900 text-paper" aria-labelledby="prova-titulo">
      <div className="container-x">
        <SectionLabel n="09">Clientes</SectionLabel>
        <h2 id="prova-titulo" className="sr-only">
          O que dizem os clientes
        </h2>
        <ul className="mt-10 grid gap-12 lg:grid-cols-3">
          {depoimentos.map((d, i) => (
            <li key={d.autor} className={cn("reveal", i === 0 && "lg:col-span-3")}>
              <figure>
                <blockquote className={cn("serif-accent leading-[1.15]", i === 0 ? "max-w-[30ch] text-[clamp(2rem,4.4vw,4.25rem)]" : "text-[clamp(1.5rem,2vw,2rem)]")}>
                  <Ph>“{d.texto}”</Ph>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <span className="h-px w-10 bg-signal" aria-hidden />
                  <span>
                    <Ph className="font-medium">{d.autor}</Ph>
                    <span className="text-muted block text-sm">{d.cargo}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-24 border-y border-paper/10 py-10">
        <div className="container-x">
          <p className="mono-label text-muted mb-8">Empresas que confiam na LASTRO (marcas ilustrativas)</p>
          <Marquee label="logos">
            {clientLogos.map((l, i) => (
              <span
                key={l}
                data-placeholder="true"
                className={cn("mx-10 text-[clamp(1.25rem,2vw,1.75rem)] whitespace-nowrap text-paper/60", i % 3 === 0 ? "font-display-x" : i % 3 === 1 ? "serif-accent" : "font-mono uppercase tracking-widest")}
              >
                {l}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* S13 — Segurança e ESG                                                      */
/* -------------------------------------------------------------------------- */
export function Esg() {
  return (
    <section className="section-y relative overflow-hidden bg-graphite-950 text-paper" aria-labelledby="esg-titulo">
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionLabel n="10">Segurança e ESG</SectionLabel>
          <SplitReveal id="esg-titulo" className="font-display-x mt-5 text-[clamp(2rem,4.6vw,4.75rem)]">
            Segurança não é departamento. <span className="serif-accent text-signal">É método.</span>
          </SplitReveal>
          <dl className="mt-12 grid gap-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {esgStats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-2 border-t border-paper/15 pt-5">
                <dt className="text-muted text-sm leading-snug">{s.label}</dt>
                <dd className="font-display-c text-[clamp(2rem,4vw,4rem)] tabular-nums">
                  <Counter value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
          <ul className="mt-10 flex flex-wrap gap-3">
            {seals.map((s) => (
              <li key={s.name} className="border border-paper/20 px-4 py-3">
                <p className="font-mono text-sm">{s.name}</p>
                <p className="text-muted text-xs">
                  {s.desc} · <Ph>{s.status}</Ph>
                </p>
              </li>
            ))}
          </ul>
          <TLink href="/esg-e-seguranca" className="btn btn-secondary mt-10">
            Política de segurança e ESG <Arrow />
          </TLink>
        </div>
        <RevealBox className="aspect-[4/5] bg-graphite-800 lg:aspect-auto">
          <Photo k="obra-equipe" sizes="(min-width: 1024px) 50vw, 100vw" />
          <p className="mono-label absolute bottom-4 left-4 bg-graphite-950/75 px-2 py-1">EPI completo em 100% das frentes de obra</p>
        </RevealBox>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* S14 — Chamada para investidores (latão)                                    */
/* -------------------------------------------------------------------------- */
export function InvestorTeaser() {
  const top = kpis.filter((k) => ["Crescimento anual composto", "Receita recorrente", "Backlog contratado"].includes(k.label));
  return (
    <section className="grain section-y relative overflow-hidden border-y border-brass/25 bg-[#11100d] text-paper" aria-labelledby="inv-titulo">
      <div className="blueprint-grid absolute inset-0 opacity-50" aria-hidden />
      <div className="container-x relative">
        <p className="mono-label text-brass">[ Relações com investidores ]</p>
        <SplitReveal id="inv-titulo" className="font-display-x mt-6 max-w-[20ch] text-[clamp(2rem,5.4vw,5.75rem)]">
          Um dos maiores mercados do país. <span className="serif-accent text-brass">Um dos mais fragmentados.</span>
        </SplitReveal>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <p className="max-w-xl text-lg leading-relaxed text-paper/85">
            A construção movimenta <Ph>R$ X bilhões</Ph> por ano no Brasil <Ph className="text-muted text-sm">[fonte: CBIC / IBGE-PAIC]</Ph>, e a maior parte ainda
            é executada por prestadores informais e sem padrão. A LASTRO é a camada que organiza esse mercado: engenharia, garantia e tecnologia sobre uma rede
            certificada de mestres de ofício.
          </p>
          <dl className="grid grid-cols-1 gap-px bg-brass/25 sm:grid-cols-3">
            {top.map((k) => (
              <div key={k.label} className="flex flex-col-reverse gap-2 bg-[#11100d] p-6">
                <dt className="text-muted text-sm">
                  {k.label} <span className="block text-xs">{k.note}</span>
                </dt>
                <dd className="font-display-c text-[clamp(2rem,4vw,4rem)] text-brass tabular-nums">
                  <Ph>
                    {k.unit === "R$ mi" ? "R$ " : ""}
                    {k.value}
                    {k.unit === "R$ mi" ? " mi" : ""}
                  </Ph>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <TLink href="/investidores" className="btn btn-lg mt-14 border-brass text-brass hover:text-ink [&::before]:bg-brass">
          Conheça a tese de investimento <Arrow />
        </TLink>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* S15 — Insights                                                             */
/* -------------------------------------------------------------------------- */
export function Insights() {
  return (
    <section className="theme-light section-y" aria-labelledby="insights-titulo">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel n="12">Insights</SectionLabel>
            <h2 id="insights-titulo" className="font-display-x mt-5 text-[clamp(2rem,5vw,5rem)]">
              Conhecimento de obra.
            </h2>
          </div>
          <TLink href="/insights" className="btn btn-secondary self-start md:self-auto">
            Todos os artigos <Arrow />
          </TLink>
        </div>
        <ul className="mt-14 grid gap-10 md:grid-cols-3">
          {artigos.map((a) => (
            <li key={a.slug}>
              <TLink href={`/insights/${a.slug}`} className="img-zoom group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-concrete-300">
                  <Photo k={a.imagem} sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <p className="mono-label text-muted mt-5">
                  {a.categoria} · {a.leitura}
                </p>
                <h3 className="mt-2 text-[clamp(1.25rem,1.6vw,1.5rem)] leading-snug font-medium group-hover:underline group-hover:underline-offset-4">{a.titulo}</h3>
                <p className="text-muted mt-2 text-[0.9375rem]">{a.resumo}</p>
              </TLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* S16 — CTA final                                                            */
/* -------------------------------------------------------------------------- */
export function FinalCta() {
  return (
    <section className="grain section-y relative overflow-hidden bg-graphite-950 text-paper" aria-labelledby="cta-titulo">
      <div className="container-x">
        <SplitReveal id="cta-titulo" className="font-display-x text-[clamp(3.5rem,13vw,14rem)] leading-[0.85]">
          Vamos <span className="serif-accent text-signal">construir?</span>
        </SplitReveal>
        <div className="mt-14 grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <Magnetic>
            <TLink href="/orcamento" className="btn btn-primary btn-lg min-h-[5.5rem] px-10 text-base">
              Solicitar proposta <Arrow />
            </TLink>
          </Magnetic>
          <ul className="grid gap-px bg-paper/10 sm:grid-cols-3">
            <li className="bg-graphite-950">
              <a href={waLink("Olá! Gostaria de falar com um especialista da LASTRO.")} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col gap-2 p-6 hover:bg-graphite-900">
                <span className="mono-label text-muted">WhatsApp</span>
                <span className="text-lg group-hover:text-signal">Falar agora com um especialista</span>
              </a>
            </li>
            <li className="bg-graphite-950">
              <a href={site.phoneHref} className="group flex h-full flex-col gap-2 p-6 hover:bg-graphite-900">
                <span className="mono-label text-muted">Telefone</span>
                <Ph className="text-lg group-hover:text-signal">{site.phone}</Ph>
              </a>
            </li>
            <li className="bg-graphite-950">
              <TLink href="/orcamento?agendar=1" className="group flex h-full flex-col gap-2 p-6 hover:bg-graphite-900">
                <span className="mono-label text-muted">Visita técnica</span>
                <span className="text-lg group-hover:text-signal">Agendar em até 48 horas</span>
              </TLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
