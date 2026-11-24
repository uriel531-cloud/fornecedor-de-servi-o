import { documentos, governanca, kpis, pracas, receitaAnual, recorrenteShare, tese } from "@/content/investidores";
import { lideranca } from "@/content/pessoas";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/page/common";
import { CoordPlot } from "@/components/page/CoordPlot";
import { Ph } from "@/components/ui/Ph";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { SplitReveal } from "@/components/ui/motion";
import { DataRoomForm } from "@/components/forms/forms";
import { ColumnChart, LineChart } from "./Charts";

type Lang = "pt" | "en";

const t = {
  pt: {
    crumb: "Investidores",
    label: "[ Relações com investidores ]",
    h1a: "Construção é um dos maiores mercados do Brasil.",
    h1b: "Nós somos a camada que o organiza.",
    sub: "Engenharia, garantia e tecnologia sobre uma rede certificada de mestres de ofício. Um modelo leve em ativos, com receita recorrente e governança de padrão institucional.",
    ctaRoom: "Solicitar acesso ao data room",
    ctaDocs: "Documentos",
    other: { href: "/en/investors", label: "English version" },
    teseLabel: "Tese de investimento",
    teseTitle: "Por que agora, por que nós.",
    tese: tese.map((x) => ({ n: x.n, titulo: x.titulo, texto: x.texto, fonte: "fonte" in x ? x.fonte : undefined })),
    modeloLabel: "Modelo de negócio",
    modeloTitle: "Um contrato na frente. Uma rede inteira atrás.",
    flow: [
      { t: "Cliente", d: "Residencial, corporativo, incorporadoras, indústria e condomínios" },
      { t: "LASTRO", d: "Engenharia, gestão, garantia e tecnologia proprietária" },
      { t: "Rede de mestres", d: "Profissionais certificados, avaliados a cada obra" },
      { t: "Entrega e pós-obra", d: "Checklist, garantia e contrato de manutenção" },
    ],
    receitas: ["Obras completas", "Serviços avulsos", "Contratos recorrentes", "Gerenciamento e projetos"],
    receitasLabel: "Fontes de receita",
    kpiLabel: "Indicadores",
    kpiTitle: "Números do negócio.",
    kpiNote: "Valores ilustrativos até a publicação das demonstrações auditadas.",
    chart1: { title: "Receita anual", sub: "R$ milhões, 2022–2026 (2026 estimado)", unit: "R$ mi" },
    chart2: { title: "Receita recorrente", sub: "% da receita total, manutenção e facilities", unit: "%" },
    mapaLabel: "Expansão",
    mapaTitle: "Onde estamos. Para onde vamos.",
    atual: "Praça atual",
    planejada: "Praça planejada",
    govLabel: "Governança e integridade",
    govTitle: "Governança não é anexo. É a estrutura.",
    gov: governanca.map((g) => ({ titulo: g.titulo, texto: g.texto })),
    liderLabel: "Liderança",
    docsLabel: "Documentos",
    docsTitle: "Material para investidores.",
    docsBtn: "Solicitar",
    roomTitle: "Acesso ao data room.",
    roomSub: "Documentos financeiros, jurídicos e operacionais, liberados após validação do cadastro e aceite do termo de confidencialidade.",
    contato: "Relações com Investidores",
    disclaimer:
      "As informações desta página têm caráter institucional e não constituem oferta ou solicitação de investimento em valores mobiliários. Projeções e indicadores são ilustrativos e não representam garantia de resultados futuros.",
  },
  en: {
    crumb: "Investors",
    label: "[ Investor relations ]",
    h1a: "Construction is one of Brazil's largest markets.",
    h1b: "We are the layer that organizes it.",
    sub: "Engineering, warranty and technology on top of a certified network of master tradespeople. An asset-light model with recurring revenue and institutional-grade governance.",
    ctaRoom: "Request data room access",
    ctaDocs: "Documents",
    other: { href: "/investidores", label: "Versão em português" },
    teseLabel: "Investment thesis",
    teseTitle: "Why now, why us.",
    tese: [
      { n: "01", titulo: "A huge, fragmented market", texto: "Construction is one of the largest sectors of the Brazilian economy, and most on-site trade services are still delivered by informal providers with no standards, warranty or management.", fonte: "[Insert sourced data: CBIC, IBGE-PAIC]" },
      { n: "02", titulo: "Demand for single accountability", texto: "High-end homeowners and companies pay a premium for one accountable party, one contract and one warranty. That is the pain we solve." },
      { n: "03", titulo: "Hybrid, asset-light model", texto: "An in-house engineering, management and warranty core orchestrates a certified network of tradespeople. Capacity grows without growing fixed assets." },
      { n: "04", titulo: "Recurring revenue", texto: "Maintenance and facilities contracts turn construction clients into predictable revenue, served by the same team that built." },
      { n: "05", titulo: "Proprietary technology", texto: "Smart quoting, network management, client portal and per-trade productivity data. Every project makes the next one more accurate." },
    ],
    modeloLabel: "Business model",
    modeloTitle: "One contract in front. A whole network behind.",
    flow: [
      { t: "Client", d: "Residential, corporate, developers, industry and condominiums" },
      { t: "LASTRO", d: "Engineering, management, warranty and proprietary technology" },
      { t: "Trades network", d: "Certified professionals, rated on every project" },
      { t: "Delivery & after-care", d: "Checklist, warranty and maintenance contract" },
    ],
    receitas: ["Turnkey projects", "Single-trade services", "Recurring contracts", "Project management & design"],
    receitasLabel: "Revenue streams",
    kpiLabel: "Key metrics",
    kpiTitle: "The numbers.",
    kpiNote: "Illustrative figures until audited financial statements are published.",
    chart1: { title: "Annual revenue", sub: "BRL millions, 2022–2026 (2026 estimated)", unit: "BRL M" },
    chart2: { title: "Recurring revenue", sub: "% of total revenue, maintenance and facilities", unit: "%" },
    mapaLabel: "Expansion",
    mapaTitle: "Where we are. Where we're going.",
    atual: "Current market",
    planejada: "Planned market",
    govLabel: "Governance & integrity",
    govTitle: "Governance is not an appendix. It is the structure.",
    gov: [
      { titulo: "Board of directors", texto: "[Board structure, number of independent members and committees]" },
      { titulo: "Independent audit", texto: "Financial statements audited annually by an independent auditor." },
      { titulo: "Integrity program", texto: "Aligned with Brazil's Clean Company Act (Law 12,846/2013): code of conduct, training and internal controls." },
      { titulo: "Independent ethics hotline", texto: "Anonymous reports, independent investigation and protection against retaliation." },
      { titulo: "Supplier due diligence", texto: "Documentary, labor and reputational checks across the supply chain." },
      { titulo: "Related parties", texto: "Formal related-party transaction policy, approved by the board." },
    ],
    liderLabel: "Leadership",
    docsLabel: "Documents",
    docsTitle: "Investor materials.",
    docsBtn: "Request",
    roomTitle: "Data room access.",
    roomSub: "Financial, legal and operational documents, released after we validate your details and you accept the non-disclosure agreement.",
    contato: "Investor Relations",
    disclaimer:
      "The information on this page is institutional and does not constitute an offer or solicitation to invest in securities. Projections and metrics are illustrative and do not guarantee future results.",
  },
};

const kpiEn: Record<string, string> = {
  "Receita 2026": "2026 revenue",
  "Crescimento anual composto": "Revenue CAGR",
  "Receita recorrente": "Recurring revenue",
  "Backlog contratado": "Contracted backlog",
  "Margem bruta": "Gross margin",
  "Ticket médio": "Average ticket",
  NPS: "NPS",
  "Profissionais na rede": "Network professionals",
};

const lead = (lang: Lang, cargo: string) =>
  lang === "pt"
    ? cargo
    : ({ "CEO e fundador": "CEO & founder", "Diretor financeiro (CFO)": "Chief Financial Officer", "Diretor de operações (COO)": "Chief Operating Officer", "Diretor de tecnologia (CTO)": "Chief Technology Officer" } as Record<string, string>)[cargo] ?? cargo;

export function InvestorsPage({ lang }: { lang: Lang }) {
  const c = t[lang];
  const en = lang === "en";
  return (
    <div className="bg-[#11100d] text-paper">
      {/* Hero */}
      <section className="grain relative flex min-h-[92svh] flex-col overflow-hidden border-b border-brass/25">
        <div className="blueprint-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="container-x relative z-10 flex flex-1 flex-col justify-between gap-12 pt-[calc(var(--header-h)+2rem)] pb-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Breadcrumbs items={[{ label: c.crumb, href: en ? "/en/investors" : "/investidores" }]} />
            <TLink href={c.other.href} hrefLang={en ? "pt-BR" : "en"} className="mono-label link-underline text-brass">
              {c.other.label}
            </TLink>
          </div>
          <div>
            <p className="mono-label text-brass">{c.label}</p>
            <SplitReveal as="h1" immediate className="font-display-x mt-6 max-w-[22ch] text-[clamp(2rem,6vw,6.5rem)]">
              {c.h1a} <span className="serif-accent text-brass">{c.h1b}</span>
            </SplitReveal>
            <p className="mt-8 max-w-2xl text-[clamp(1.0625rem,1.3vw,1.25rem)] leading-relaxed text-paper/85">{c.sub}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#data-room" className="btn btn-lg border-brass bg-brass text-ink hover:text-paper [&::before]:bg-graphite-950">
                {c.ctaRoom} <Arrow />
              </a>
              <a href="#documentos" className="btn btn-lg btn-secondary">
                {c.ctaDocs}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tese */}
      <section className="section-y">
        <div className="container-x">
          <p className="mono-label text-brass">§ 01 — {c.teseLabel}</p>
          <h2 className="font-display-x mt-5 text-[clamp(2rem,4.4vw,4.5rem)]">{c.teseTitle}</h2>
          <ol className="mt-14 grid gap-px bg-brass/20 md:grid-cols-2 lg:grid-cols-5">
            {c.tese.map((x) => (
              <li key={x.n} className="flex flex-col gap-4 bg-[#11100d] p-7">
                <span className="font-display-c text-5xl text-brass">{x.n}</span>
                <h3 className="text-xl leading-snug font-medium">{x.titulo}</h3>
                <p className="text-muted text-[0.9375rem] leading-relaxed">{x.texto}</p>
                {x.fonte && <Ph className="mono-label text-muted mt-auto">{x.fonte}</Ph>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Modelo de negócio */}
      <section className="section-y border-y border-brass/20 bg-graphite-950">
        <div className="container-x">
          <p className="mono-label text-brass">§ 02 — {c.modeloLabel}</p>
          <h2 className="font-display-x mt-5 max-w-[22ch] text-[clamp(2rem,4.4vw,4.5rem)]">{c.modeloTitle}</h2>
          <ol className="mt-14 grid gap-4 lg:grid-cols-4">
            {c.flow.map((f, i) => (
              <li key={f.t} className="reveal relative">
                <div className={`h-full border p-6 ${i === 1 ? "border-brass bg-brass/10" : "border-paper/15"}`}>
                  <p className="mono-label text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <p className="font-display-x mt-3 text-2xl">{f.t}</p>
                  <p className="text-muted mt-3 text-[0.9375rem]">{f.d}</p>
                </div>
                {i < c.flow.length - 1 && (
                  <span aria-hidden className="absolute top-1/2 -right-4 z-10 hidden h-px w-4 bg-brass lg:block">
                    <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 border-t border-r border-brass" />
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mono-label text-muted mt-12">{c.receitasLabel}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {c.receitas.map((r) => (
              <li key={r} className="chip">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* KPIs e gráficos */}
      <section className="section-y">
        <div className="container-x">
          <p className="mono-label text-brass">§ 03 — {c.kpiLabel}</p>
          <h2 className="font-display-x mt-5 text-[clamp(2rem,4.4vw,4.5rem)]">{c.kpiTitle}</h2>
          <p className="text-muted mt-4">{c.kpiNote}</p>
          <dl className="mt-12 grid grid-cols-2 gap-px bg-brass/20 lg:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.label} className="flex flex-col-reverse gap-2 bg-[#11100d] p-6">
                <dt className="text-muted text-sm">
                  {en ? kpiEn[k.label] ?? k.label : k.label}
                  <span className="block text-xs">{k.note}</span>
                </dt>
                <dd className="font-display-c text-[clamp(2rem,3.6vw,3.5rem)] tabular-nums">
                  <Ph>
                    {k.unit === "R$ mi" ? (en ? "BRL " : "R$ ") : ""}
                    {k.value}
                    {k.unit === "R$ mi" ? (en ? "M" : " mi") : ""}
                  </Ph>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 grid gap-16 lg:grid-cols-2" data-placeholder="true">
            <ColumnChart data={receitaAnual} title={c.chart1.title} sub={c.chart1.sub} unit={c.chart1.unit} en={en} />
            <LineChart data={recorrenteShare} title={c.chart2.title} sub={c.chart2.sub} unit={c.chart2.unit} en={en} />
          </div>
        </div>
      </section>

      {/* Mapa de expansão */}
      <section className="section-y border-y border-brass/20 bg-graphite-950">
        <div className="container-x">
          <p className="mono-label text-brass">§ 04 — {c.mapaLabel}</p>
          <h2 className="font-display-x mt-5 text-[clamp(2rem,4.4vw,4.5rem)]">{c.mapaTitle}</h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <div className="grid content-start gap-10 sm:grid-cols-2 lg:grid-cols-1">
              {(["atual", "planejada"] as const).map((st) => (
                <div key={st}>
                  <p className="mono-label text-muted flex items-center gap-2">
                    <span className={st === "atual" ? "h-3 w-3 rounded-full bg-[#b9852f]" : "h-3 w-3 rounded-full border border-dashed border-[#b9852f]"} aria-hidden />
                    {st === "atual" ? c.atual : c.planejada}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {pracas
                      .filter((p) => p.status === st)
                      .map((p) => (
                        <li key={p.cidade} className="flex justify-between border-b border-paper/10 pb-2">
                          <span>{p.cidade}</span>
                          <span className="text-muted font-mono text-sm">{p.uf}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            <CoordPlot
              accent="#b9852f"
              textScale={1.7}
              points={pracas.map((p) => ({
                id: p.cidade,
                label: p.cidade,
                lat: p.lat,
                lng: p.lng,
                status: p.status,
                left: ["Goiânia", "Campinas", "Porto Alegre", "Florianópolis"].includes(p.cidade),
                down: p.cidade === "São Paulo",
              }))}
              bounds={{ minLat: -32, maxLat: -2, minLng: -60, maxLng: -32 }}
            />
          </div>
        </div>
      </section>

      {/* Governança — destaque visual */}
      <section className="theme-light section-y">
        <div className="container-x">
          <p className="mono-label text-pedra-escura">§ 05 — {c.govLabel}</p>
          <h2 className="font-display-x mt-5 max-w-[20ch] text-[clamp(2rem,5vw,5.5rem)]">{c.govTitle}</h2>
          <ul className="mt-14 grid gap-px bg-ink/15 md:grid-cols-2 lg:grid-cols-3">
            {c.gov.map((g, i) => (
              <li key={g.titulo} className="bg-concrete-100 p-8">
                <p className="font-mono text-sm text-pedra-escura">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-xl font-medium">{g.titulo}</h3>
                <p className="text-muted mt-3 leading-relaxed">{g.texto.startsWith("[") ? <Ph>{g.texto}</Ph> : g.texto}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <TLink href="/sobre/integridade" className="btn btn-secondary">
              {en ? "Integrity program" : "Programa de integridade"} <Arrow />
            </TLink>
            <TLink href="/canal-de-etica" className="btn btn-secondary">
              {en ? "Ethics hotline" : "Canal de Ética"} <Arrow />
            </TLink>
          </div>
        </div>
      </section>

      {/* Liderança */}
      <section className="section-y">
        <div className="container-x">
          <p className="mono-label text-brass">§ 06 — {c.liderLabel}</p>
          <ul className="mt-10 grid gap-px bg-brass/20 sm:grid-cols-2 lg:grid-cols-4">
            {lideranca.map((l) => (
              <li key={l.cargo} className="bg-[#11100d] p-6">
                <div className="grid aspect-square w-20 place-items-center border border-brass/40 font-display-x text-2xl text-brass" aria-hidden>
                  {l.cargo.match(/\((\w+)\)/)?.[1] ?? "CEO"}
                </div>
                <p className="mt-6 text-lg font-medium">
                  <Ph>{l.nome}</Ph>
                </p>
                <p className="mono-label text-muted mt-1">{lead(lang, l.cargo)}</p>
                {!en && (
                  <p className="text-muted mt-3 text-sm">
                    <Ph>{l.bio}</Ph>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Documentos + data room */}
      <section id="documentos" className="section-y scroll-mt-20 border-t border-brass/20 bg-graphite-950">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div>
            <p className="mono-label text-brass">§ 07 — {c.docsLabel}</p>
            <h2 className="font-display-x mt-5 text-[clamp(2rem,4vw,3.75rem)]">{c.docsTitle}</h2>
            <ul className="mt-10 divide-y divide-paper/10 border-y border-paper/10">
              {documentos.map((d) => (
                <li key={d.titulo} className="flex items-center justify-between gap-4 py-5">
                  <div>
                    <p className="font-medium">{d.titulo}</p>
                    <p className="mono-label text-muted mt-1">
                      {d.formato} · {d.tamanho} · {en ? "gated" : "acesso controlado"}
                    </p>
                  </div>
                  <a href="#data-room" className="mono-label inline-flex min-h-11 items-center gap-2 text-brass hover:text-paper">
                    {c.docsBtn} <Arrow />
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-muted mt-8 text-sm">
              {c.contato}:{" "}
              <a href={`mailto:${site.emailRi}`} className="text-paper underline underline-offset-4">
                <Ph>{site.emailRi}</Ph>
              </a>
            </p>
          </div>
          <div id="data-room" className="scroll-mt-24 border border-brass/40 p-8">
            <h2 className="font-display-x text-[clamp(1.75rem,3vw,2.75rem)]">{c.roomTitle}</h2>
            <p className="text-muted mt-3">{c.roomSub}</p>
            <div className="mt-8">
              <DataRoomForm lang={lang} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-brass/20 py-10">
        <p className="container-x text-muted max-w-4xl text-xs leading-relaxed">{c.disclaimer}</p>
      </section>
    </div>
  );
}
