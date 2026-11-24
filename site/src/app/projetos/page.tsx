import type { Metadata } from "next";
import { Suspense } from "react";
import { CtaBand, PageHero } from "@/components/page/common";
import { ProjetosExplorer } from "@/components/page/ProjetosExplorer";
import { projetos } from "@/content/projetos";

export const metadata: Metadata = {
  title: "Projetos — obras entregues",
  description: "Portfólio de obras residenciais, corporativas, de varejo e industriais. Prazo previsto contra real e orçamento contra executado em cada estudo de caso.",
  alternates: { canonical: "/projetos" },
};

export default function ProjetosPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Projetos", href: "/projetos" }]}
        label={`[ ${projetos.length} estudos de caso — projetos ilustrativos ]`}
        title={
          <>
            Obras que falam <span className="serif-accent text-signal">por nós.</span>
          </>
        }
        sub="Cada estudo de caso mostra o desafio, a solução e os números: prazo previsto contra prazo real, orçamento contra executado e disciplinas envolvidas."
        image="casa-noite"
        compact
      />
      <section className="bg-graphite-950 pt-10 pb-28 text-paper">
        <div className="container-x">
          <Suspense fallback={null}>
            <ProjetosExplorer />
          </Suspense>
        </div>
      </section>
      <CtaBand
        title={
          <>
            Quer um projeto <span className="serif-accent text-signal">como estes?</span>
          </>
        }
      />
    </>
  );
}
