import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { artigos, getArtigo } from "@/content/artigos";
import { CtaBand, Breadcrumbs } from "@/components/page/common";
import { Photo } from "@/components/ui/Photo";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { Ph } from "@/components/ui/Ph";
import { SplitReveal } from "@/components/ui/motion";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return artigos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArtigo((await params).slug);
  if (!a) return {};
  return {
    title: a.titulo,
    description: a.resumo,
    alternates: { canonical: `/insights/${a.slug}` },
    openGraph: { type: "article", publishedTime: a.data },
  };
}

/** Trechos entre colchetes são placeholders de valores (marcados para revisão). */
function withPh(text: string) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return parts.map((p, i) => (p.startsWith("[") ? <Ph key={i}>{p.slice(1, -1)}</Ph> : p));
}

export default async function ArtigoPage({ params }: Props) {
  const a = getArtigo((await params).slug);
  if (!a) notFound();
  const outros = artigos.filter((x) => x.slug !== a.slug);
  const data = new Date(`${a.data}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <article>
      <header className="grain relative bg-graphite-950 pt-[calc(var(--header-h)+2rem)] text-paper">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: "Insights", href: "/insights" },
              { label: a.categoria, href: `/insights/${a.slug}` },
            ]}
          />
          <p className="mono-label mt-14 text-paper/80">
            {a.categoria} · {data} · {a.leitura} de leitura
          </p>
          <SplitReveal as="h1" immediate className="font-display-x mt-5 max-w-[24ch] text-[clamp(2rem,5vw,5.25rem)]">
            {a.titulo}
          </SplitReveal>
          <p className="mt-6 max-w-2xl text-xl text-paper/85">{a.resumo}</p>
          <p className="mono-label text-muted mt-6">Por {a.autor}</p>
        </div>
        <div className="container-x mt-14">
          <div className="relative aspect-[21/9] overflow-hidden bg-graphite-800">
            <Photo k={a.imagem} priority sizes="100vw" />
          </div>
        </div>
      </header>

      <div className="theme-light section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_minmax(0,44rem)_1fr]">
          <div className="prose-lastro lg:col-start-2">
            {a.corpo.map((b, i) => (
              <div key={i}>
                {b.h2 && <h2>{b.h2}</h2>}
                {b.p?.map((p, j) => (
                  <p key={j} className={b.h2 ? "mt-4" : ""}>
                    {withPh(p)}
                  </p>
                ))}
                {b.lista && (
                  <ul className="mt-4">
                    {b.lista.map((l) => (
                      <li key={l}>{withPh(l)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="mt-16 border-t border-ink/15 pt-8">
              <p className="text-lg">Quer aplicar isso na sua obra?</p>
              <TLink href="/orcamento" className="btn btn-primary mt-4">
                Solicitar proposta <Arrow />
              </TLink>
            </div>
          </div>
        </div>
      </div>

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x">
          <p className="mono-label text-muted">Continue lendo</p>
          <ul className="mt-8 grid gap-10 md:grid-cols-2">
            {outros.map((o) => (
              <li key={o.slug}>
                <TLink href={`/insights/${o.slug}`} className="img-zoom group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-graphite-800">
                    <Photo k={o.imagem} sizes="(min-width: 768px) 50vw, 100vw" />
                  </div>
                  <h2 className="mt-5 text-2xl leading-snug font-medium group-hover:text-signal">{o.titulo}</h2>
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.titulo,
          description: a.resumo,
          datePublished: a.data,
          author: { "@type": "Organization", name: a.autor },
          publisher: { "@type": "Organization", name: site.fullName, "@id": `${site.url}/#org` },
          image: `${site.url}${"/images/" + a.imagem + ".jpg"}`,
          mainEntityOfPage: `${site.url}/insights/${a.slug}`,
        }}
      />
    </article>
  );
}
