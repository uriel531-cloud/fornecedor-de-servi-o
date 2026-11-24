import type { Metadata } from "next";
import { LegalPage } from "@/components/page/Legal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a LASTRO trata dados pessoais, conforme a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018).",
  alternates: { canonical: "/privacidade" },
};

export default function Page() {
  return (
    <LegalPage title="Política de Privacidade" slug="privacidade" updated="23 de novembro de 2026">
      <p>
        Esta política explica como a {site.legalName} (&quot;LASTRO&quot;) coleta, usa, compartilha e protege dados pessoais, em conformidade com a Lei Geral de Proteção
        de Dados (Lei 13.709/2018).
      </p>
      <h2>1. Dados que coletamos</h2>
      <ul>
        <li>Dados de contato informados nos formulários: nome, e-mail, telefone/WhatsApp, cidade e CEP.</li>
        <li>Dados do projeto: tipo de imóvel, metragem, serviços de interesse, faixa de investimento e arquivos enviados.</li>
        <li>Para candidatos à Rede de Mestres: ofício, experiência, certificações e forma de contratação.</li>
        <li>Dados de navegação, somente com o seu consentimento (cookies de análise e marketing).</li>
      </ul>
      <h2>2. Para que usamos</h2>
      <ul>
        <li>Responder pedidos, elaborar propostas e agendar visitas técnicas (execução de contrato e procedimentos preliminares).</li>
        <li>Avaliar candidaturas de profissionais (procedimentos preliminares a contrato).</li>
        <li>Cumprir obrigações legais e regulatórias.</li>
        <li>Melhorar o site e as campanhas, com base no seu consentimento.</li>
      </ul>
      <h2>3. Compartilhamento</h2>
      <p>
        Compartilhamos dados apenas com fornecedores que nos ajudam a operar (hospedagem, CRM, e-mail), sob contrato e com as mesmas obrigações de proteção. Não vendemos
        dados pessoais.
      </p>
      <h2>4. Seus direitos</h2>
      <p>
        Você pode pedir confirmação, acesso, correção, anonimização, portabilidade e exclusão dos seus dados, além de revogar consentimentos, a qualquer momento, pelo
        e-mail do encarregado: <a href={`mailto:${site.emailDpo}`}>{site.emailDpo}</a>.
      </p>
      <h2>5. Retenção e segurança</h2>
      <p>Mantemos os dados pelo tempo necessário às finalidades acima ou exigido por lei, com controles técnicos e administrativos de segurança.</p>
      <h2>6. Encarregado (DPO)</h2>
      <p>
        [Nome do encarregado] — <a href={`mailto:${site.emailDpo}`}>{site.emailDpo}</a>
      </p>
    </LegalPage>
  );
}
