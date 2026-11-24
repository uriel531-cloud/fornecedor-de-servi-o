import type { Metadata } from "next";
import { lideranca } from "@/content/pessoas";
import { seals, site, stats } from "@/content/site";
import { CtaBand, PageHero, SectionHead } from "@/components/page/common";
import { Counter, RevealBox } from "@/components/ui/motion";
import { Photo } from "@/components/ui/Photo";
import { Ph } from "@/components/ui/Ph";
import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";
import { CoordPlot } from "@/components/page/CoordPlot";

export const metadata: Metadata = {
  title: "Sobre a LASTRO — engenharia integrada",
  description: "História, missão, liderança, governança e escritórios da LASTRO Engenharia Integrada.",
  alternates: { canonical: "/sobre" },
};

const valores = [
  { t: "Responsabilidade", d: "Um nome responde por cada obra. Não terceirizamos a culpa." },
  { t: "Precisão", d: "Medimos antes de prometer. Prometemos o que está no contrato." },
  { t: "Ofício", d: "Respeitamos quem constrói. Profissional bem pago e bem treinado entrega melhor." },
  { t: "Integridade", d: "Nenhum contrato vale um atalho. Tolerância zero com corrupção." },
];

export default function SobrePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Sobre", href: "/sobre" }]}
        label="[ Sobre a LASTRO ]"
        title={
          <>
            Lastro é a base que sustenta. <span className="serif-accent text-signal">E a garantia que dá valor.</span>
          </>
        }
        sub="Nascemos para resolver o problema mais antigo da construção: ninguém responde pela obra inteira. Reunimos engenharia, gestão e os melhores profissionais de ofício sob um único contrato."
        image="obra-equipe"
      />

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHead n="01" label="História" title="De uma obra para mais de mil." />
            <div className="prose-lastro mt-8 text-paper/85">
              <p>
                <Ph>
                  [História da fundação: ano, fundadores, a primeira obra e o problema que motivou a criação da empresa. Ex.: &quot;Em 20XX, depois de coordenar quinze
                  fornecedores na reforma da própria casa, o engenheiro [nome] decidiu criar a empresa que ele gostaria de ter contratado.&quot;]
                </Ph>
              </p>
              <p>
                Hoje, a LASTRO atua em <Ph>{site.offices.length} capitais</Ph>, com uma rede de profissionais certificados e um núcleo próprio de engenharia, gestão e tecnologia.
              </p>
            </div>
          </div>
          <RevealBox className="aspect-[4/5] bg-graphite-800">
            <Photo k="concreto-predio" sizes="(min-width: 1024px) 50vw, 100vw" />
          </RevealBox>
        </div>
      </section>

      <section className="border-y border-paper/10 bg-graphite-950 text-paper">
        <dl className="container-x grid grid-cols-2 md:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-3 border-paper/10 py-10 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
              <dt className="mono-label text-muted">{s.label}</dt>
              <dd className="font-display-c text-[clamp(2rem,4.4vw,4.5rem)] tabular-nums">
                <Counter value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="theme-light section-y">
        <div className="container-x">
          <SectionHead n="02" label="Valores" title="O que não negociamos." light />
          <ul className="mt-12 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map((v) => (
              <li key={v.t} className="bg-concrete-100 p-8">
                <h3 className="font-display-x text-2xl">{v.t}</h3>
                <p className="text-muted mt-3">{v.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x">
          <SectionHead n="03" label="Liderança" title="Quem responde pela LASTRO." />
          <ul className="mt-12 grid gap-px bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
            {lideranca.map((l) => (
              <li key={l.cargo} className="bg-graphite-950 p-6">
                <p className="text-lg font-medium">
                  <Ph>{l.nome}</Ph>
                </p>
                <p className="mono-label text-muted mt-1">{l.cargo}</p>
                <p className="text-muted mt-3 text-sm">
                  <Ph>{l.bio}</Ph>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-graphite-900 text-paper">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead n="04" label="Governança" title="Estrutura de empresa grande desde o primeiro dia." />
            <p className="text-muted mt-6 max-w-lg text-lg">
              Conselho, auditoria independente, programa de integridade e canal de ética independente. Porque quem contrata uma obra, e quem investe nela, precisa
              confiar em quem executa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TLink href="/sobre/integridade" className="btn btn-secondary">
                Programa de integridade <Arrow />
              </TLink>
              <TLink href="/investidores" className="btn btn-secondary">
                Investidores <Arrow />
              </TLink>
            </div>
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2">
            {seals.map((s) => (
              <li key={s.name} className="border border-paper/20 p-5">
                <p className="font-mono">{s.name}</p>
                <p className="text-muted mt-1 text-sm">
                  {s.desc} · <Ph>{s.status}</Ph>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-graphite-950 text-paper">
        <div className="container-x">
          <SectionHead n="05" label="Escritórios" title="Onde estamos." />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <ul className="space-y-6">
              {site.offices.map((o) => (
                <li key={o.city} className="border-t border-paper/15 pt-4">
                  <p className="mono-label text-muted">
                    {o.city} — {o.uf}
                  </p>
                  <Ph as="p" className="mt-1 text-lg">
                    {o.address}
                  </Ph>
                </li>
              ))}
            </ul>
            <CoordPlot points={site.offices.map((o) => ({ id: o.city, label: o.city, sub: o.uf, lat: o.lat, lng: o.lng }))} bounds={{ minLat: -27, maxLat: -18, minLng: -51, maxLng: -41 }} />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
