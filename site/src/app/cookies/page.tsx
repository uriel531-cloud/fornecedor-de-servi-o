import type { Metadata } from "next";
import { LegalPage } from "@/components/page/Legal";
import { CookiePrefsButton } from "@/components/layout/CookieBanner";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Quais cookies o site da LASTRO usa e como gerenciar suas preferências.",
  alternates: { canonical: "/cookies" },
};

export default function Page() {
  return (
    <LegalPage title="Política de Cookies" slug="cookies" updated="23 de novembro de 2026">
      <p>Usamos cookies e tecnologias semelhantes em três categorias. Só as necessárias funcionam sem o seu consentimento.</p>
      <h2>Necessários</h2>
      <p>Guardam suas preferências de consentimento, o rascunho do orçamento e configurações de navegação. Sem eles, o site não funciona corretamente.</p>
      <h2>Análise</h2>
      <p>Medem visitas e conversões de forma agregada para melhorar o site. Só são ativados com o seu consentimento.</p>
      <h2>Marketing</h2>
      <p>Permitem medir campanhas e mostrar anúncios relevantes. Só são ativados com o seu consentimento.</p>
      <h2>Gerenciar preferências</h2>
      <p>
        Você pode mudar sua escolha a qualquer momento: <CookiePrefsButton />.
      </p>
    </LegalPage>
  );
}
