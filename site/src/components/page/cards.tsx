import { disciplinas } from "@/content/disciplinas";
import type { Projeto } from "@/content/projetos";
import { Photo } from "@/components/ui/Photo";
import { TLink } from "@/components/ui/TLink";
import { Ph } from "@/components/ui/Ph";
import { Arrow } from "@/components/ui/Arrow";
import { num } from "@/lib/format";

const curto = (slug: string) => disciplinas.find((d) => d.slug === slug)?.curto ?? slug;

export function ProjetoGridCard({ p }: { p: Projeto }) {
  return (
    <TLink href={`/projetos/${p.slug}`} data-cursor="VER OBRA" className="img-zoom group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-graphite-800">
        <Photo k={p.imagem} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        <span className="mono-label absolute top-3 left-3 bg-graphite-950/75 px-2 py-1 text-paper">{p.setor}</span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-medium group-hover:text-signal">
            <Ph>{p.nome}</Ph>
          </h3>
          <p className="text-muted mt-1 text-[0.9375rem]">
            {p.cidade}
            {p.uf !== "BR" && `, ${p.uf}`} · <Ph>{num(p.area)} m²</Ph> · <Ph>{p.ano}</Ph>
          </p>
        </div>
        <Arrow dir="up-right" className="mt-1.5 shrink-0" />
      </div>
      <p className="mono-label text-muted mt-3">{p.disciplinas.slice(0, 4).map(curto).join(" · ")}</p>
    </TLink>
  );
}
