import type { Metadata } from "next";
import { LegalPage } from "@/components/page/Legal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do site da LASTRO Engenharia Integrada.",
  alternates: { canonical: "/termos" },
};

export default function Page() {
  return (
    <LegalPage title="Termos de Uso" slug="termos" updated="23 de novembro de 2026">
      <p>Ao usar este site, você concorda com os termos abaixo.</p>
      <h2>1. Conteúdo informativo</h2>
      <p>
        As informações do site têm caráter informativo. Estimativas geradas pelo configurador de orçamento são indicativas e não constituem proposta comercial. Preço,
        prazo e escopo só valem quando formalizados em contrato assinado.
      </p>
      <h2>2. Projetos e imagens</h2>
      <p>Imagens e estudos de caso podem ser ilustrativos. Dados de clientes são publicados apenas com autorização.</p>
      <h2>3. Propriedade intelectual</h2>
      <p>Marca, textos, layout e demais conteúdos pertencem à {site.legalName} e não podem ser reproduzidos sem autorização.</p>
      <h2>4. Investidores</h2>
      <p>As informações da área de investidores não constituem oferta ou solicitação de investimento em valores mobiliários.</p>
      <h2>5. Foro</h2>
      <p>Fica eleito o foro da comarca de [cidade/UF] para dirimir questões relacionadas a estes termos.</p>
    </LegalPage>
  );
}
