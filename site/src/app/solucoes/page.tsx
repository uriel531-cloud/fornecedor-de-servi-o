import type { Metadata } from "next";
import { publicos } from "@/content/publicos";
import { CtaBand, PageHero } from "@/components/page/common";
import { PublicosList } from "@/components/home/interactive";

export const metadata: Metadata = {
  title: "Soluções — para quem construímos",
  description: "Soluções para residencial alto padrão, corporativo e varejo, incorporadoras e fundos, indústria e logística, condomínios e facilities.",
  alternates: { canonical: "/solucoes" },
};

export default function SolucoesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Soluções", href: "/solucoes" }]}
        label={`[ ${publicos.length} frentes de atuação ]`}
        title={
          <>
            Para quem <span className="serif-accent text-signal">construímos.</span>
          </>
        }
        sub="Cada cliente tem uma dor diferente. A resposta é sempre a mesma: um contrato, um responsável e todas as disciplinas."
        image="casa-varandas"
        compact
      />
      <section className="theme-light section-y">
        <div className="container-x">
          <PublicosList />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
