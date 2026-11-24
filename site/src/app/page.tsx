import { Hero } from "@/components/home/Hero";
import { LayersSection } from "@/components/home/LayersSection";
import { MestresCarousel, MetodoTimeline, ProjetosHorizontal, PublicosList } from "@/components/home/interactive";
import { Bento, Esg, FinalCta, Garantias, Insights, InvestorTeaser, Modalidades, ProofBar, ProvaSocial } from "@/components/home/sections";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/ui/motion";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofBar />
      <LayersSection />
      <Bento />
      <Modalidades />
      <ProjetosHorizontal />

      {/* S08 — Método */}
      <section className="theme-light section-y" aria-labelledby="metodo-titulo">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <SectionLabel n="05">Método LASTRO</SectionLabel>
              <SplitReveal id="metodo-titulo" className="font-display-x mt-5 text-[clamp(2rem,6vw,6.25rem)]">
                Seis etapas. <span className="serif-accent text-signal-dark">Nenhuma surpresa.</span>
              </SplitReveal>
            </div>
            <TLink href="/metodo" className="btn btn-secondary self-start lg:self-auto">
              Conhecer o método <Arrow />
            </TLink>
          </div>
          <MetodoTimeline light />
        </div>
      </section>

      <Garantias />

      {/* S10 — Mestres de ofício */}
      <section className="section-y overflow-hidden bg-graphite-950 text-paper" aria-labelledby="mestres-titulo">
        <div className="container-x">
          <div className="flex flex-col gap-8">
            <div>
              <SectionLabel n="07">Mestres de ofício</SectionLabel>
              <SplitReveal id="mestres-titulo" className="font-display-x mt-5 text-[clamp(2rem,6vw,6.25rem)]">
                Por trás de cada detalhe, <span className="serif-accent text-signal">um mestre.</span>
              </SplitReveal>
            </div>
            <div className="flex flex-wrap gap-3">
              <TLink href="/rede-de-mestres" className="btn btn-secondary">
                Conheça a rede
              </TLink>
              <TLink href="/rede-de-mestres#candidatura" className="btn btn-primary">
                Seja um profissional LASTRO <Arrow />
              </TLink>
            </div>
          </div>
          <MestresCarousel />
        </div>
      </section>

      {/* S11 — Para quem construímos */}
      <section className="theme-light section-y" aria-labelledby="publicos-titulo">
        <div className="container-x">
          <SectionLabel n="08">Soluções</SectionLabel>
          <h2 id="publicos-titulo" className="font-display-x mt-5 text-[clamp(2rem,5vw,5rem)]">
            Para quem construímos.
          </h2>
          <PublicosList />
        </div>
      </section>

      <ProvaSocial />
      <Esg />
      <InvestorTeaser />
      <Insights />
      <FinalCta />
    </>
  );
}
