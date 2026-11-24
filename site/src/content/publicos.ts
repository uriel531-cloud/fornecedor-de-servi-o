import type { ImageKey } from "./images";

export type Publico = {
  slug: string;
  nome: string;
  chip: string;
  titulo: string;
  sub: string;
  heroSub: string;
  cta: string;
  ctaHref: string;
  dores: string[];
  entregas: { titulo: string; texto: string }[];
  disciplinas: string[];
  imagem: ImageKey;
};

export const publicos: Publico[] = [
  {
    slug: "residencial-alto-padrao",
    nome: "Residencial alto padrão",
    chip: "Proprietário",
    titulo: "Sua casa com um único responsável.",
    sub: "Casas, coberturas e reformas completas com gestor dedicado, obra limpa, discrição e preço fechado em contrato.",
    heroSub: "Sua casa ou cobertura com um único responsável, do projeto à última demão. Gestor dedicado, obra limpa e preço fechado em contrato.",
    cta: "Agendar visita técnica",
    ctaHref: "/orcamento?perfil=residencial",
    dores: ["Coordenar 15 fornecedores que não conversam entre si", "Aditivos que aparecem no meio da obra", "Prazo que ninguém cumpre e ninguém assume", "Obra suja e vizinhos reclamando"],
    entregas: [
      { titulo: "Gestor dedicado", texto: "Uma pessoa responde por tudo, com nome, telefone e relatório semanal." },
      { titulo: "Preço fechado", texto: "Escopo detalhado e preço fechado por etapa, sem aditivos surpresa." },
      { titulo: "Obra limpa e discreta", texto: "Proteções, horários combinados e comunicação com o condomínio." },
      { titulo: "Portal do cliente", texto: "Fotos diárias, cronograma, medições e documentos, de qualquer lugar." },
    ],
    disciplinas: ["acabamentos", "marcenaria-e-carpintaria", "instalacoes-eletricas", "pintura"],
    imagem: "interior-living",
  },
  {
    slug: "corporativo-e-varejo",
    nome: "Corporativo e varejo",
    chip: "Empresa",
    titulo: "Seu espaço pronto no dia em que a operação precisa.",
    sub: "Escritórios, sedes e redes de lojas entregues no prazo, com obra noturna e SLA em contrato.",
    heroSub: "Escritórios e lojas entregues no prazo, com obra noturna quando for preciso e um SLA que a sua operação pode cobrar.",
    cta: "Solicitar proposta corporativa",
    ctaHref: "/orcamento?perfil=corporativo",
    dores: ["Atraso que adia mudança ou inauguração", "Obra que atrapalha a operação", "Padrão diferente em cada unidade", "Fornecedores sem escala para várias cidades"],
    entregas: [
      { titulo: "Obra noturna e por zonas", texto: "Planejamento que mantém a operação funcionando." },
      { titulo: "Escala nacional", texto: "Equipes simultâneas em várias cidades com o mesmo padrão." },
      { titulo: "SLA em contrato", texto: "Prazos e penalidades claros, com painel de avanço por unidade." },
      { titulo: "Facilities depois da entrega", texto: "Manutenção recorrente com a mesma equipe que construiu." },
    ],
    disciplinas: ["instalacoes-eletricas", "climatizacao-esquadrias-e-fachadas", "acabamentos", "engenharia-projetos-e-gestao"],
    imagem: "fachada-vidro",
  },
  {
    slug: "incorporadoras",
    nome: "Incorporadoras e fundos",
    chip: "Incorporadora",
    titulo: "Execução integral com governança institucional.",
    sub: "Empreendimentos executados com BIM, custo por m² sob controle e relatórios no padrão que o seu comitê exige.",
    heroSub: "Execução integral de empreendimentos com BIM, custo por m² sob controle e governança de padrão institucional.",
    cta: "Falar com a diretoria comercial",
    ctaHref: "/orcamento?perfil=incorporadora",
    dores: ["Estouro de custo por m²", "Subempreiteiros sem padrão de qualidade", "Relatórios que não servem para o investidor", "Risco trabalhista e de compliance"],
    entregas: [
      { titulo: "BIM do início ao fim", texto: "Quantitativos, interferências e cronograma extraídos do modelo." },
      { titulo: "Custo por m² rastreado", texto: "Curva ABC, medições e desvios reportados mensalmente." },
      { titulo: "Compliance da cadeia", texto: "Due diligence de fornecedores e documentação trabalhista auditável." },
      { titulo: "Relatórios para investidores", texto: "Indicadores de avanço físico-financeiro no formato do seu fundo." },
    ],
    disciplinas: ["engenharia-projetos-e-gestao", "estrutura-e-alvenaria", "climatizacao-esquadrias-e-fachadas", "instalacoes-eletricas"],
    imagem: "concreto-predio",
  },
  {
    slug: "industria-e-logistica",
    nome: "Indústria e logística",
    chip: "Indústria",
    titulo: "Paradas programadas que terminam na hora marcada.",
    sub: "Estruturas metálicas, solda qualificada, subestações e pisos industriais com as NRs cumpridas e documentadas.",
    heroSub: "Estruturas metálicas, solda qualificada e instalações em paradas programadas, com NRs cumpridas e documentadas.",
    cta: "Solicitar visita de engenharia",
    ctaHref: "/orcamento?perfil=industria",
    dores: ["Parada que estoura a janela", "Solda sem rastreabilidade", "Documentação de segurança incompleta", "Fornecedores diferentes para cada disciplina"],
    entregas: [
      { titulo: "Pré-fabricação máxima", texto: "O que pode ser feito em oficina não é feito na sua planta." },
      { titulo: "Solda rastreável", texto: "Soldadores qualificados, procedimentos e ensaios documentados." },
      { titulo: "Segurança documentada", texto: "APR, PT, NR-10, NR-35 e NR-33 cumpridas e entregues." },
      { titulo: "Turnos contínuos", texto: "Equipes em revezamento para cumprir a janela de parada." },
    ],
    disciplinas: ["metal-e-solda", "instalacoes-eletricas", "estrutura-e-alvenaria", "pintura"],
    imagem: "solda-4",
  },
  {
    slug: "condominios-e-facilities",
    nome: "Condomínios e facilities",
    chip: "Condomínio",
    titulo: "Manutenção com SLA, não com promessa.",
    sub: "Manutenção predial preventiva e corretiva, fachadas e áreas comuns, com contrato anual e relatórios mensais.",
    heroSub: "Manutenção predial com SLA em contrato, plano preventivo conforme a NBR 5674 e relatórios mensais para o síndico.",
    cta: "Contratar manutenção",
    ctaHref: "/orcamento?perfil=condominio&tipo=manutencao",
    dores: ["Chamados que demoram dias", "Fornecedor diferente para cada problema", "Falta de registro para a assembleia", "Fachada e impermeabilização sempre adiadas"],
    entregas: [
      { titulo: "SLA por criticidade", texto: "Tempo de atendimento definido em contrato e medido." },
      { titulo: "Plano preventivo", texto: "Plano de manutenção conforme a NBR 5674, com calendário anual." },
      { titulo: "Relatórios para a assembleia", texto: "Chamados, custos e fotos organizados por mês." },
      { titulo: "Obras de maior porte", texto: "Fachada, impermeabilização e retrofit com a mesma equipe." },
    ],
    disciplinas: ["engenharia-projetos-e-gestao", "pintura", "impermeabilizacao-e-coberturas", "hidraulica-e-gas"],
    imagem: "casa-varandas",
  },
];

export const getPublico = (slug: string) => publicos.find((p) => p.slug === slug);

/** Perfis do seletor "Sou..." do hero (inclui investidor). */
export const heroPerfis = [
  ...publicos.slice(0, 4).map((p) => ({ id: p.slug, chip: p.chip, sub: p.heroSub, cta: p.cta, href: p.ctaHref })),
  {
    id: "investidor",
    chip: "Investidor",
    sub: "Uma plataforma que organiza um dos maiores mercados do país: engenharia, garantia e tecnologia sobre uma rede certificada de mestres de ofício.",
    cta: "Conhecer a tese de investimento",
    href: "/investidores",
  },
];
