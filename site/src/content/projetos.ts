import type { ImageKey } from "./images";

/**
 * PROJETOS ILUSTRATIVOS. Todos os nomes, números e depoimentos são fictícios
 * e devem ser substituídos por obras reais, com autorização dos clientes.
 */
export type Projeto = {
  slug: string;
  nome: string;
  cidade: string;
  uf: string;
  setor: "Residencial" | "Corporativo" | "Varejo" | "Indústria" | "Hotelaria";
  publico: string;
  ano: number;
  area: number;
  porte: "Até 500 m²" | "500 a 2.000 m²" | "Acima de 2.000 m²";
  prazoPrevisto: number;
  prazoReal: number;
  orcamentoVar: string;
  equipe: number;
  disciplinas: string[];
  resumo: string;
  desafio: string;
  solucao: string;
  resultados: { valor: string; label: string }[];
  imagem: ImageKey;
  galeria: ImageKey[];
  antes: ImageKey;
  depois: ImageKey;
  depoimento?: { texto: string; autor: string; cargo: string };
  coords: [number, number];
};

export const projetos: Projeto[] = [
  {
    slug: "residencia-mirante",
    nome: "Residência Mirante",
    cidade: "São Paulo",
    uf: "SP",
    setor: "Residencial",
    publico: "residencial-alto-padrao",
    ano: 2026,
    area: 1240,
    porte: "500 a 2.000 m²",
    prazoPrevisto: 18,
    prazoReal: 17.5,
    orcamentoVar: "−1,8%",
    equipe: 64,
    disciplinas: ["estrutura-e-alvenaria", "metal-e-solda", "instalacoes-eletricas", "hidraulica-e-gas", "impermeabilizacao-e-coberturas", "acabamentos", "pintura", "marcenaria-e-carpintaria", "climatizacao-esquadrias-e-fachadas", "engenharia-projetos-e-gestao"],
    resumo: "Residência de 1.240 m² em concreto aparente, com balanço de 6 metros e piscina de borda infinita.",
    desafio: "Terreno em declive acentuado, balanço estrutural de 6 metros e um cliente que exigia uma única pessoa respondendo por tudo, do projeto de contenção à última peça de marcenaria.",
    solucao: "Compatibilização BIM de 11 disciplinas antes do primeiro dia de obra, contenção em cortina atirantada e estrutura metálica oculta para o balanço. Gestor de obra dedicado e relatório semanal com fotos e cronograma atualizado.",
    resultados: [
      { valor: "17,5", label: "meses (previsto: 18)" },
      { valor: "−1,8%", label: "abaixo do orçamento" },
      { valor: "11", label: "disciplinas sob um contrato" },
      { valor: "0", label: "acidentes com afastamento" },
    ],
    imagem: "casa-concreto",
    galeria: ["casa-piscina", "interior-living", "interior-marmore", "casa-noite"],
    antes: "concreto-predio",
    depois: "casa-concreto",
    depoimento: { texto: "Construí duas casas antes desta, com doze fornecedores cada. Desta vez eu tinha um nome e um telefone. A obra terminou antes do prazo.", autor: "R. Albuquerque", cargo: "Proprietária" },
    coords: [-23.5505, -46.7],
  },
  {
    slug: "cobertura-jardins",
    nome: "Cobertura Jardins",
    cidade: "São Paulo",
    uf: "SP",
    setor: "Residencial",
    publico: "residencial-alto-padrao",
    ano: 2025,
    area: 480,
    porte: "Até 500 m²",
    prazoPrevisto: 9,
    prazoReal: 8.5,
    orcamentoVar: "0,0%",
    equipe: 28,
    disciplinas: ["acabamentos", "marcenaria-e-carpintaria", "instalacoes-eletricas", "hidraulica-e-gas", "pintura", "climatizacao-esquadrias-e-fachadas"],
    resumo: "Reforma integral de cobertura duplex com mármore contínuo, marcenaria em freijó e automação completa.",
    desafio: "Reforma completa em edifício ocupado, com regras rígidas de horário, elevador compartilhado e plano de reforma exigido pelo condomínio.",
    solucao: "Plano de reforma conforme a NBR 16280 aprovado em 15 dias, logística de materiais em horários fixos e pré-fabricação da marcenaria para reduzir o tempo na obra.",
    resultados: [
      { valor: "8,5", label: "meses (previsto: 9)" },
      { valor: "0", label: "aditivos de contrato" },
      { valor: "0", label: "reclamações do condomínio" },
      { valor: "6", label: "disciplinas integradas" },
    ],
    imagem: "interior-marmore",
    galeria: ["banheiro-marmore", "interior-corredor", "interior-sala", "revestimento-cozinha"],
    antes: "obra-sala",
    depois: "interior-marmore",
    depoimento: { texto: "O condomínio é conhecido por ser difícil. Nenhuma advertência em nove meses de obra.", autor: "F. Moretti", cargo: "Proprietário" },
    coords: [-23.565, -46.66],
  },
  {
    slug: "sede-corporativa-leblon",
    nome: "Sede corporativa Leblon",
    cidade: "Rio de Janeiro",
    uf: "RJ",
    setor: "Corporativo",
    publico: "corporativo-e-varejo",
    ano: 2026,
    area: 3600,
    porte: "Acima de 2.000 m²",
    prazoPrevisto: 7,
    prazoReal: 7,
    orcamentoVar: "−0,6%",
    equipe: 92,
    disciplinas: ["estrutura-e-alvenaria", "instalacoes-eletricas", "climatizacao-esquadrias-e-fachadas", "acabamentos", "pintura", "engenharia-projetos-e-gestao"],
    resumo: "Retrofit de quatro lajes corporativas com obra noturna e o edifício em plena operação.",
    desafio: "Retrofit completo de quatro andares em edifício ocupado, sem interromper as operações dos andares vizinhos.",
    solucao: "Obra noturna planejada por zonas, VRF instalado em etapas e cabeamento estruturado certificado antes da mudança da equipe do cliente.",
    resultados: [
      { valor: "7", label: "meses, no prazo" },
      { valor: "3.600", label: "m² entregues" },
      { valor: "100%", label: "dos pontos de rede certificados" },
      { valor: "0", label: "interrupções na operação" },
    ],
    imagem: "fachada-vidro",
    galeria: ["fachada-reflexo", "interior-chaise", "eletrica-painel", "fachada-ondulada"],
    antes: "concreto-obra",
    depois: "fachada-vidro",
    depoimento: { texto: "Entramos numa segunda-feira com tudo funcionando: rede, climatização, salas. A obra simplesmente não apareceu para os nossos vizinhos.", autor: "D. Carvalho", cargo: "Diretora de Operações" },
    coords: [-22.9844, -43.2238],
  },
  {
    slug: "rede-varejo-14-lojas",
    nome: "Expansão de rede — 14 lojas",
    cidade: "SP, RJ, MG e PR",
    uf: "BR",
    setor: "Varejo",
    publico: "corporativo-e-varejo",
    ano: 2025,
    area: 3080,
    porte: "Acima de 2.000 m²",
    prazoPrevisto: 4,
    prazoReal: 4,
    orcamentoVar: "−2,4%",
    equipe: 140,
    disciplinas: ["estrutura-e-alvenaria", "instalacoes-eletricas", "acabamentos", "pintura", "marcenaria-e-carpintaria", "climatizacao-esquadrias-e-fachadas"],
    resumo: "14 lojas de 220 m² entregues em 120 dias, em quatro estados, com o mesmo padrão de acabamento.",
    desafio: "Abrir 14 lojas em quatro estados em 120 dias, com padrão idêntico e prazo de inauguração já anunciado.",
    solucao: "Kit de obra padronizado, marcenaria pré-fabricada em lote, equipes simultâneas e um gestor central com painel de avanço por loja.",
    resultados: [
      { valor: "14", label: "lojas em 120 dias" },
      { valor: "4", label: "estados" },
      { valor: "−2,4%", label: "abaixo do orçamento" },
      { valor: "100%", label: "inaugurações na data" },
    ],
    imagem: "interior-corredor",
    galeria: ["marcenaria-bancada", "interior-sala", "pintura-rolo", "revestimento-placa"],
    antes: "obra-sala",
    depois: "interior-corredor",
    coords: [-23.0, -46.2],
  },
  {
    slug: "centro-logistico-cajamar",
    nome: "Centro logístico Cajamar",
    cidade: "Cajamar",
    uf: "SP",
    setor: "Indústria",
    publico: "industria-e-logistica",
    ano: 2026,
    area: 12000,
    porte: "Acima de 2.000 m²",
    prazoPrevisto: 5,
    prazoReal: 4.6,
    orcamentoVar: "−1,1%",
    equipe: 76,
    disciplinas: ["metal-e-solda", "instalacoes-eletricas", "estrutura-e-alvenaria", "pintura", "engenharia-projetos-e-gestao"],
    resumo: "Mezanino metálico de 4.000 m², subestação e piso epóxi em centro logístico em operação.",
    desafio: "Ampliar a capacidade de armazenagem sem parar a operação 24/7 do centro de distribuição.",
    solucao: "Estrutura metálica pré-fabricada, montagem em janelas noturnas, solda inspecionada por ultrassom e subestação comissionada em parada programada de 36 horas.",
    resultados: [
      { valor: "4,6", label: "meses (previsto: 5)" },
      { valor: "4.000", label: "m² de mezanino" },
      { valor: "36 h", label: "de parada para a subestação" },
      { valor: "0", label: "acidentes com afastamento" },
    ],
    imagem: "solda-2",
    galeria: ["solda-1", "obra-grua", "eletrica-instalacao", "solda-4"],
    antes: "obra-grua",
    depois: "solda-1",
    depoimento: { texto: "Montaram 4.000 m² de mezanino sem parar a operação um único turno.", autor: "M. Tavares", cargo: "Gerente de Engenharia" },
    coords: [-23.3555, -46.8768],
  },
  {
    slug: "casa-serra",
    nome: "Casa Serra",
    cidade: "Nova Lima",
    uf: "MG",
    setor: "Residencial",
    publico: "residencial-alto-padrao",
    ano: 2025,
    area: 860,
    porte: "500 a 2.000 m²",
    prazoPrevisto: 14,
    prazoReal: 14,
    orcamentoVar: "−0,9%",
    equipe: 41,
    disciplinas: ["estrutura-e-alvenaria", "marcenaria-e-carpintaria", "impermeabilizacao-e-coberturas", "hidraulica-e-gas", "acabamentos", "instalacoes-eletricas"],
    resumo: "Casa de campo em madeira laminada e pedra, com deck suspenso e energia solar.",
    desafio: "Construir em área de preservação, com acesso restrito para caminhões e exigência de baixo impacto ambiental.",
    solucao: "Estrutura em madeira laminada pré-fabricada, logística com veículos menores, gestão de resíduos com 94% de reaproveitamento e usina solar dimensionada para autonomia.",
    resultados: [
      { valor: "14", label: "meses, no prazo" },
      { valor: "94%", label: "dos resíduos reaproveitados" },
      { valor: "100%", label: "da energia gerada no local" },
      { valor: "860", label: "m² construídos" },
    ],
    imagem: "casa-deck",
    galeria: ["marcenaria-marcacao", "casa-patio", "casa-varandas", "marcenaria-pregador"],
    antes: "marcenaria-mesa",
    depois: "casa-deck",
    coords: [-19.9858, -43.8466],
  },
];

export const getProjeto = (slug: string) => projetos.find((p) => p.slug === slug);
