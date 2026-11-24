import type { ReactNode } from "react";
import { Photo } from "@/components/ui/Photo";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { SplitReveal } from "@/components/ui/motion";
import { JsonLd } from "@/components/seo/JsonLd";
import type { ImageKey } from "@/content/images";
import type { Faq } from "@/content/disciplinas";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Início", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Trilha de navegação" className="mono-label text-paper/70">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-paper">
                  {c.label}
                </span>
              ) : (
                <TLink href={c.href} className="link-underline hover:text-paper">
                  {c.label}
                </TLink>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${site.url}${c.href}` })),
        }}
      />
    </>
  );
}

export function PageHero({
  crumbs,
  label,
  title,
  sub,
  image,
  children,
  compact = false,
}: {
  crumbs: Crumb[];
  label?: string;
  title: ReactNode;
  sub?: ReactNode;
  image?: ImageKey;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={cn("grain relative flex flex-col overflow-hidden bg-graphite-950 text-paper", compact ? "min-h-[62svh]" : "min-h-[86svh]")}>
      {image && (
        <div className="absolute inset-0" aria-hidden>
          <Photo k={image} priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/70 to-graphite-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-graphite-950/80 via-graphite-950/20 to-transparent" />
        </div>
      )}
      {!image && <div className="blueprint-grid absolute inset-0 opacity-60" aria-hidden />}
      <div className="container-x relative z-10 flex flex-1 flex-col justify-between gap-12 pt-[calc(var(--header-h)+2rem)] pb-12">
        <Breadcrumbs items={crumbs} />
        <div>
          {label && <p className="mono-label text-paper/80">{label}</p>}
          <SplitReveal as="h1" immediate className="font-display-x mt-5 max-w-[22ch] text-[clamp(2rem,6.4vw,7rem)]">
            {title}
          </SplitReveal>
          {sub && <div className="mt-8 max-w-2xl text-[clamp(1.0625rem,1.3vw,1.25rem)] leading-relaxed text-paper/85">{sub}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function FaqList({ items, light = false }: { items: Faq[]; light?: boolean }) {
  return (
    <>
      <div className={cn("faq", light && "theme-light-faq")}>
        {items.map((f) => (
          <details key={f.q}>
            <summary>
              <span>{f.q}</span>
              <span className="faq-icon" aria-hidden />
            </summary>
            <div className="text-muted max-w-3xl leading-relaxed">{f.a}</div>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}

export function CtaBand({
  title = (
    <>
      Vamos <span className="serif-accent text-signal">construir?</span>
    </>
  ),
  sub = "Visita técnica em até 48 horas. Proposta com preço fechado e prazo em contrato.",
  href = "/orcamento",
  cta = "Solicitar proposta",
}: {
  title?: ReactNode;
  sub?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <section className="grain section-y bg-graphite-900 text-paper">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h2 className="font-display-x text-[clamp(2rem,7vw,7rem)] leading-[0.9]">{title}</h2>
          <p className="text-muted mt-6 max-w-xl text-lg">{sub}</p>
        </div>
        <TLink href={href} className="btn btn-primary btn-lg self-start lg:self-auto">
          {cta} <Arrow />
        </TLink>
      </div>
    </section>
  );
}

export function SectionHead({ n, label, title, children, light = false }: { n?: string; label: string; title: ReactNode; children?: ReactNode; light?: boolean }) {
  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
      <div>
        <p className={cn("mono-label flex items-center gap-3", light ? "text-pedra-escura" : "text-muted")}>
          {n && <span>§ {n}</span>}
          {n && <span aria-hidden className="h-px w-8 bg-current opacity-50" />}
          <span>{label}</span>
        </p>
        <h2 className="font-display-x mt-5 max-w-[24ch] text-[clamp(2rem,4.4vw,4.5rem)]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose-lastro measure">{children}</div>;
}
