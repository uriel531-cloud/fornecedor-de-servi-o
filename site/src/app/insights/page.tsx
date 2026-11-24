import type { Metadata } from "next";
import { artigos } from "@/content/artigos";
import { CtaBand, PageHero } from "@/components/page/common";
import { Photo } from "@/components/ui/Photo";
import { TLink } from "@/components/ui/TLink";

export const metadata: Metadata = {
  title: "Insights — guias e conhecimento de obra",
  description: "Guias de custos, engenharia e segurança para quem constrói, reforma ou investe em obras de alto padrão.",
  alternates: { canonical: "/insights" },
};

const data = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

export default function InsightsPage() {
  const [destaque, ...resto] = artigos;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Insights", href: "/insights" }]}
        label="[ Insights ]"
        title={
          <>
            Conhecimento <span className="serif-accent text-signal">de obra.</span>
          </>
        }
        sub="Guias práticos para quem constrói, reforma ou investe. Escritos por quem está no canteiro todos os dias."
        compact
      />
      <section className="theme-light section-y">
        <div className="container-x">
          <TLink href={`/insights/${destaque.slug}`} className="img-zoom group grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div className="relative aspect-[16/10] overflow-hidden bg-concrete-300">
              <Photo k={destaque.imagem} sizes="(min-width: 1024px) 60vw, 100vw" priority />
            </div>
            <div>
              <p className="mono-label text-muted">
                {destaque.categoria} · {data(destaque.data)} · {destaque.leitura}
              </p>
              <h2 className="font-display-x mt-4 text-[clamp(1.75rem,3.4vw,3.25rem)] group-hover:underline group-hover:underline-offset-8">{destaque.titulo}</h2>
              <p className="text-muted mt-4 text-lg">{destaque.resumo}</p>
            </div>
          </TLink>
          <ul className="mt-20 grid gap-10 md:grid-cols-2">
            {resto.map((a) => (
              <li key={a.slug}>
                <TLink href={`/insights/${a.slug}`} className="img-zoom group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-concrete-300">
                    <Photo k={a.imagem} sizes="(min-width: 768px) 50vw, 100vw" />
                  </div>
                  <p className="mono-label text-muted mt-5">
                    {a.categoria} · {data(a.data)} · {a.leitura}
                  </p>
                  <h2 className="mt-2 text-2xl leading-snug font-medium group-hover:underline group-hover:underline-offset-4">{a.titulo}</h2>
                  <p className="text-muted mt-2">{a.resumo}</p>
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
