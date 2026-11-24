import type { MetadataRoute } from "next";
import { disciplinas } from "@/content/disciplinas";
import { projetos } from "@/content/projetos";
import { publicos } from "@/content/publicos";
import { artigos } from "@/content/artigos";
import { cidades, servicosLocais } from "@/content/cidades";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string, priority = 0.6): MetadataRoute.Sitemap[number] => ({ url: `${site.url}${path}`, lastModified: now, priority });
  return [
    u("/", 1),
    u("/servicos", 0.9),
    u("/orcamento", 0.9),
    u("/projetos", 0.8),
    u("/metodo", 0.7),
    u("/solucoes", 0.7),
    {
      ...u("/investidores", 0.7),
      alternates: { languages: { "pt-BR": `${site.url}/investidores`, en: `${site.url}/en/investors` } },
    },
    u("/en/investors", 0.5),
    u("/sobre", 0.6),
    u("/sobre/integridade", 0.5),
    u("/esg-e-seguranca", 0.5),
    u("/rede-de-mestres", 0.6),
    u("/insights", 0.6),
    u("/contato", 0.6),
    u("/canal-de-etica", 0.3),
    u("/privacidade", 0.2),
    u("/termos", 0.2),
    u("/cookies", 0.2),
    ...disciplinas.map((d) => u(`/servicos/${d.slug}`, 0.8)),
    ...disciplinas.flatMap((d) => d.servicos.map((s) => u(`/servicos/${d.slug}/${s.slug}`, 0.7))),
    ...publicos.map((p) => u(`/solucoes/${p.slug}`, 0.7)),
    ...projetos.map((p) => u(`/projetos/${p.slug}`, 0.6)),
    ...artigos.map((a) => u(`/insights/${a.slug}`, 0.5)),
    ...cidades.flatMap((c) => servicosLocais.map((s) => u(`/${c.slug}/${s.slug}`, 0.6))),
  ];
}
