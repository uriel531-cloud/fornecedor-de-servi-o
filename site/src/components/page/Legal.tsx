import type { ReactNode } from "react";
import { Breadcrumbs } from "./common";
import { Ph } from "@/components/ui/Ph";

export function LegalPage({ title, slug, updated, children }: { title: string; slug: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section className="bg-graphite-950 pt-[calc(var(--header-h)+2rem)] pb-16 text-paper">
        <div className="container-x">
          <Breadcrumbs items={[{ label: title, href: `/${slug}` }]} />
          <h1 className="font-display-x mt-14 text-[clamp(2rem,5vw,5rem)]">{title}</h1>
          <p className="mono-label text-muted mt-4">Última atualização: {updated}</p>
        </div>
      </section>
      <section className="theme-light section-y">
        <div className="container-x">
          <Ph as="p" className="mb-10 block max-w-3xl border border-ink/20 p-4 text-sm">
            Modelo de texto. Precisa ser revisado e aprovado pelo jurídico e pelo encarregado de dados (DPO) antes da publicação.
          </Ph>
          <div className="prose-lastro">{children}</div>
        </div>
      </section>
    </>
  );
}
