import type { Metadata } from "next";
import { garantias, metodo } from "@/content/metodo";
import type { ImageKey } from "@/content/images";
import { CtaBand, FaqList, PageHero, SectionHead } from "@/components/page/common";
import { MetodoTimeline } from "@/components/home/interactive";
import { Ph } from "@/components/ui/Ph";
import { Photo } from "@/components/ui/Photo";
import { RevealBox } from "@/components/ui/motion";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Método LASTRO — seis etapas, nenhuma surpresa",
  description: "Visita técnica em 48 horas, compatibilização BIM, preço fechado, gestor dedicado, entrega com checklist de 200 itens e garantia por escrito.",
  alternates: { canonical: "/metodo" },
};

const fotos: ImageKey[] = ["obra-planta", "projeto-planta", "projeto-pranchas", "obra-estrutura", "interior-living", "casa-noite"];

const faq = [
  { q: "O preço é mesmo fechado?", a: "Sim. Depois da visita técnica e da compatibilização dos projetos, a proposta traz o preço por etapa. Mudanças só acontecem se o cliente alterar o escopo, sempre com aprovação prévia por escrito." },
  { q: "O que acontece se a obra atrasar?", a: "O prazo é cláusula contratual. Se o atraso for de responsabilidade da LASTRO, aplica-se a multa prevista em contrato." },
  { q: "Como acompanho a obra sem estar presente?", a: "Pelo portal do cliente: fotos diárias, diário de obra, cronograma atualizado, medições e documentos. E pelo gestor dedicado, com relatório semanal." },
  { q: "Quem responde tecnicamente pela obra?", a: "Um engenheiro da LASTRO, com ART emitida. O nome dele está no contrato." },
];

export default function MetodoPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Método", href: "/metodo" }]}
        label="[ Método LASTRO ]"
        title={
          <>
            Seis etapas. <span className="serif-accent text-signal">Nenhuma surpresa.</span>
          </>
        }
        sub="Um método desenhado para tirar o risco do cliente: tudo o que pode dar errado numa obra é resolvido antes, no papel, ou previsto em contrato."
        image="obra-planta"
        compact
      />
      <section className="theme-light section-y">
        <div className="container-x">
          <SectionHead n="01" label="Linha do tempo" title="Do primeiro contato à garantia." light />
          <MetodoTimeline light />
        </div>
      </section>

      {metodo.map((m, i) => (
        <section key={m.n} className={cn("section-y text-paper", i % 2 ? "bg-graphite-900" : "bg-graphite-950")}>
          <div className="container-x grid items-center gap-12 lg:grid-cols-2">
            <div className={i % 2 ? "lg:order-2" : ""}>
              <p className="font-display-c text-[clamp(5rem,10vw,9rem)] leading-none text-signal">{m.n}</p>
              <h2 className="font-display-x mt-4 text-[clamp(1.75rem,3.4vw,3.25rem)]">{m.titulo}</h2>
              <p className="mt-5 max-w-lg text-lg text-paper/85">{m.texto}</p>
            </div>
            <RevealBox className="aspect-[4/3] bg-graphite-800">
              <Photo k={fotos[i]} sizes="(min-width: 1024px) 50vw, 100vw" />
            </RevealBox>
          </div>
        </section>
      ))}

      <section className="theme-light section-y">
        <div className="container-x">
          <SectionHead n="07" label="Garantias" title="O risco é nosso." light />
          <ul className="mt-12 grid gap-px bg-ink/15 md:grid-cols-2">
            {garantias.map((g) => (
              <li key={g.titulo} className="bg-concrete-100 p-8">
                <h3 className="text-xl font-medium">{g.titulo}</h3>
                <p className="text-muted mt-2">{g.icon === "prazo" || g.icon === "garantia" ? <Ph>{g.texto}</Ph> : g.texto}</p>
              </li>
            ))}
          </ul>
          <p className="text-muted mt-6 text-sm">Condições detalhadas em contrato.</p>
        </div>
      </section>

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionHead n="08" label="Dúvidas" title="Perguntas frequentes." />
          <FaqList items={faq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
