import type { ImageKey } from "./images";

export type Artigo = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  data: string;
  leitura: string;
  imagem: ImageKey;
  autor: string;
  corpo: { h2?: string; p?: string[]; lista?: string[] }[];
};

export const artigos: Artigo[] = [
  {
    slug: "quanto-custa-reformar-cobertura-alto-padrao-2026",
    titulo: "Quanto custa reformar uma cobertura de alto padrão em 2026",
    resumo: "O que realmente define o preço por m², onde estão os custos escondidos e como evitar aditivos no meio da obra.",
    categoria: "Guia de custos",
    data: "2026-10-14",
    leitura: "9 min",
    imagem: "interior-marmore",
    autor: "Equipe de Orçamentos LASTRO",
    corpo: [
      { p: ["Não existe preço por m² universal para uma reforma de alto padrão. Duas coberturas com a mesma metragem podem ter custos que variam mais de duas vezes, dependendo do escopo, do padrão de acabamento e do estado das instalações existentes. Este guia mostra o que pesa de verdade no orçamento."] },
      { h2: "As faixas de referência", p: ["Em reformas completas de coberturas em São Paulo, Rio de Janeiro e Belo Horizonte, nossas obras recentes ficaram nas faixas abaixo. Os valores incluem mão de obra, materiais, gestão e garantia, e não incluem móveis soltos nem eletrodomésticos."], lista: ["Alto padrão: [R$ 3.800 a R$ 5.200/m²]", "Premium: [R$ 5.200 a R$ 7.800/m²]", "Assinatura: [R$ 7.800 a R$ 12.000/m²]"] },
      { h2: "O que mais pesa no preço", lista: ["Troca completa das instalações elétricas e hidráulicas (comum em edifícios com mais de 25 anos)", "Impermeabilização de terraços e áreas descobertas", "Pedras naturais e porcelanatos de grande formato, que exigem base perfeita e mão de obra especializada", "Marcenaria: costuma representar de 20% a 35% do valor da reforma", "Automação e climatização central"] },
      { h2: "Os custos que aparecem no meio da obra", p: ["A maioria dos aditivos vem de três fontes: instalações antigas em pior estado que o previsto, mudanças de escopo durante a obra e projetos incompletos. A forma de evitá-los é investir no diagnóstico antes do contrato: abertura de inspeções, leitura dos projetos originais e compatibilização de todas as disciplinas."] },
      { h2: "A regra do condomínio", p: ["Desde a NBR 16280, reformas em apartamentos exigem um plano de reforma com responsável técnico, aprovado pelo condomínio antes do início. Isso leva de uma a três semanas e precisa estar no cronograma."] },
      { h2: "Como pedir um orçamento comparável", lista: ["Peça escopo detalhado por disciplina, não um valor global", "Exija cronograma físico-financeiro com marcos de pagamento", "Verifique se o preço é fechado e quais itens são excluídos", "Confirme quem é o responsável técnico e se haverá ART"] },
    ],
  },
  {
    slug: "steel-frame-ou-alvenaria-guia-para-incorporadores",
    titulo: "Steel frame ou alvenaria: guia para incorporadores",
    resumo: "Prazo, custo, desempenho e aceitação de mercado: como escolher o sistema construtivo para o próximo empreendimento.",
    categoria: "Engenharia",
    data: "2026-09-02",
    leitura: "11 min",
    imagem: "concreto-predio",
    autor: "Diretoria de Engenharia LASTRO",
    corpo: [
      { p: ["A escolha do sistema construtivo define prazo, fluxo de caixa e risco de execução do empreendimento. Steel frame e alvenaria convencional têm vantagens claras e não competem em todos os cenários."] },
      { h2: "Prazo", p: ["O steel frame é um sistema industrializado: painéis podem ser fabricados enquanto a fundação é executada, e a montagem é rápida e seca. Em casas e edifícios baixos, a redução de prazo da etapa de vedação costuma ser significativa. A alvenaria depende mais de mão de obra em campo e de tempos de cura."] },
      { h2: "Custo", p: ["O custo direto do steel frame por m² pode ser semelhante ou superior ao da alvenaria, dependendo da escala e da região. O ganho aparece no custo financeiro (giro mais rápido), na previsibilidade e na redução de desperdício. A análise correta compara o custo total do empreendimento, não o custo da parede."] },
      { h2: "Desempenho", p: ["Os dois sistemas podem atender à NBR 15575 (desempenho de edificações habitacionais). No steel frame, o desempenho acústico e térmico depende da composição de placas e isolamento; na alvenaria, da espessura e do tipo de bloco e revestimento."] },
      { h2: "Quando escolher cada um", lista: ["Steel frame: casas de alto padrão com prazo apertado, empreendimentos horizontais repetitivos, ampliações sobre estruturas existentes", "Alvenaria: edifícios altos com estrutura de concreto, mercados com baixa aceitação de sistemas secos, áreas com mão de obra industrializada escassa", "Híbrido: estrutura em concreto com vedações internas em drywall é a solução mais comum em empreendimentos verticais de alto padrão"] },
      { h2: "O ponto decisivo", p: ["Mais do que o sistema, o que define o resultado é a compatibilização do projeto. Interferências não resolvidas anulam qualquer ganho de prazo. Por isso, recomendamos modelar o empreendimento em BIM antes de decidir."] },
    ],
  },
  {
    slug: "nr-10-na-pratica-o-que-exigir-do-seu-eletricista",
    titulo: "NR-10 na prática: o que exigir do seu eletricista",
    resumo: "Os documentos, treinamentos e práticas que separam um eletricista habilitado de um risco para a sua obra.",
    categoria: "Segurança",
    data: "2026-08-19",
    leitura: "7 min",
    imagem: "eletrica-painel",
    autor: "Coordenação de Segurança LASTRO",
    corpo: [
      { p: ["A NR-10 é a norma regulamentadora que trata da segurança em instalações e serviços com eletricidade. Ela vale para qualquer trabalho em instalações elétricas, inclusive em reformas residenciais, e o contratante também tem responsabilidade sobre quem coloca para trabalhar."] },
      { h2: "Os documentos mínimos", lista: ["Certificado do curso básico de NR-10, com carga horária mínima de 40 horas", "Reciclagem dentro do prazo (no máximo a cada dois anos, ou antes em caso de troca de função, afastamento longo ou acidente)", "Atestado de saúde ocupacional (ASO) válido", "Autorização formal da empresa para trabalhar com eletricidade", "Curso complementar SEP para trabalhos no sistema elétrico de potência, quando aplicável"] },
      { h2: "O que observar na obra", lista: ["Desenergização e bloqueio do circuito antes da intervenção, com sinalização", "Teste de ausência de tensão antes de tocar nos condutores", "Uso de EPIs adequados: luvas isolantes, calçado de segurança, ferramentas isoladas", "Quadros identificados e circuitos etiquetados"] },
      { h2: "Por que isso importa para quem contrata", p: ["Além do risco à vida, um acidente elétrico gera responsabilidade civil e trabalhista para o contratante. Exigir a documentação não é burocracia: é a forma de saber que o profissional sabe o que está fazendo."] },
      { h2: "Como trabalhamos", p: ["Todos os eletricistas da rede LASTRO têm a documentação verificada antes da primeira obra e acompanhada continuamente. Os certificados ficam disponíveis para o cliente no portal da obra."] },
    ],
  },
];

export const getArtigo = (slug: string) => artigos.find((a) => a.slug === slug);
