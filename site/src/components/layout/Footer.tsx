import { disciplinas } from "@/content/disciplinas";
import { publicos } from "@/content/publicos";
import { site } from "@/content/site";
import { TLink } from "@/components/ui/TLink";
import { Ph } from "@/components/ui/Ph";
import { LogoMark } from "./Logo";
import { CookiePrefsButton } from "./CookieBanner";

const empresa = [
  { label: "Sobre", href: "/sobre" },
  { label: "Método", href: "/metodo" },
  { label: "Projetos", href: "/projetos" },
  { label: "ESG e Segurança", href: "/esg-e-seguranca" },
  { label: "Rede de Mestres", href: "/rede-de-mestres" },
  { label: "Insights", href: "/insights" },
  { label: "Orçamento", href: "/orcamento" },
  { label: "Portal do cliente", href: "/portal" },
  { label: "Contato", href: "/contato" },
];

const investidores = [
  { label: "Relações com investidores", href: "/investidores" },
  { label: "Investors (English)", href: "/en/investors" },
  { label: "Programa de integridade", href: "/sobre/integridade" },
  { label: "Canal de Ética", href: "/canal-de-etica" },
];

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mono-label text-muted mb-5">{title}</h2>
      <ul className="space-y-2.5 text-[0.9375rem]">{children}</ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-graphite-950 pb-28 text-paper lg:pb-0">
      <div className="container-x grid gap-12 pt-20 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <Col title="Serviços">
          {disciplinas.map((d) => (
            <li key={d.slug}>
              <TLink href={`/servicos/${d.slug}`} className="link-underline hover:text-signal">
                <span className="text-muted mr-2 font-mono text-xs">{d.numero}</span>
                {d.nome}
              </TLink>
            </li>
          ))}
        </Col>
        <Col title="Soluções">
          {publicos.map((p) => (
            <li key={p.slug}>
              <TLink href={`/solucoes/${p.slug}`} className="link-underline hover:text-signal">
                {p.nome}
              </TLink>
            </li>
          ))}
        </Col>
        <Col title="Empresa">
          {empresa.map((l) => (
            <li key={l.href}>
              <TLink href={l.href} className="link-underline hover:text-signal">
                {l.label}
              </TLink>
            </li>
          ))}
        </Col>
        <Col title="Investidores e governança">
          {investidores.map((l) => (
            <li key={l.href}>
              <TLink href={l.href} className="link-underline hover:text-signal">
                {l.label}
              </TLink>
            </li>
          ))}
        </Col>
      </div>

      <div className="container-x grid gap-10 border-t border-paper/10 py-12 md:grid-cols-2 lg:grid-cols-4">
        {site.offices.map((o) => (
          <address key={o.city} className="not-italic">
            <p className="mono-label text-muted">
              {o.city} — {o.uf}
            </p>
            <Ph as="p" className="mt-2 text-[0.9375rem]">
              {o.address}
            </Ph>
          </address>
        ))}
      </div>

      <div className="container-x flex flex-col gap-6 border-t border-paper/10 py-8 text-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="text-muted space-y-1">
          <p>
            <Ph>{site.legalName}</Ph> · CNPJ <Ph>{site.cnpj}</Ph> · <Ph>{site.crea}</Ph>
          </p>
          <p>
            <a href={site.phoneHref} className="link-underline hover:text-paper">
              <Ph>{site.phone}</Ph>
            </a>{" "}
            ·{" "}
            <a href={`mailto:${site.email}`} className="link-underline hover:text-paper">
              <Ph>{site.email}</Ph>
            </a>
          </p>
        </div>
        <ul className="text-muted flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <TLink href="/privacidade" className="link-underline hover:text-paper">
              Privacidade
            </TLink>
          </li>
          <li>
            <TLink href="/termos" className="link-underline hover:text-paper">
              Termos
            </TLink>
          </li>
          <li>
            <TLink href="/cookies" className="link-underline hover:text-paper">
              Cookies
            </TLink>
          </li>
          <li>
            <CookiePrefsButton />
          </li>
          {site.social.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-paper">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-x flex items-end justify-between gap-[3vw] overflow-hidden" aria-hidden>
        <p className="font-display-x -mb-[0.16em] text-[15.5vw] leading-[0.8] tracking-[-0.04em] whitespace-nowrap text-paper/95 select-none 2xl:text-[14rem]">
          Lastro
        </p>
        <LogoMark className="mb-[2.4vw] hidden h-[7vw] max-h-28 w-[7vw] max-w-28 shrink-0 md:block" />
      </div>
    </footer>
  );
}
