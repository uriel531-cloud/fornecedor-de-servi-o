/**
 * SEO local programático: /[cidade]/[servico].
 * Só cidades realmente atendidas, com conteúdo próprio por cidade.
 */
export type Cidade = {
  slug: string;
  nome: string;
  uf: string;
  bairros: string[];
  equipe: number;
  obras: number;
  visita: string;
  nota: string;
};

export const cidades: Cidade[] = [
  {
    slug: "sao-paulo",
    nome: "São Paulo",
    uf: "SP",
    bairros: ["Jardins", "Itaim Bibi", "Pinheiros", "Vila Nova Conceição", "Moema", "Alto de Pinheiros", "Morumbi", "Higienópolis"],
    equipe: 240,
    obras: 610,
    visita: "24 a 48 horas",
    nota: "Em São Paulo, a maioria dos condomínios exige plano de reforma conforme a NBR 16280 antes do início da obra. Nós preparamos e aprovamos o plano com a administração.",
  },
  {
    slug: "rio-de-janeiro",
    nome: "Rio de Janeiro",
    uf: "RJ",
    bairros: ["Leblon", "Ipanema", "Lagoa", "Gávea", "Barra da Tijuca", "Jardim Botânico", "Botafogo"],
    equipe: 120,
    obras: 280,
    visita: "48 horas",
    nota: "No Rio, a maresia exige especificação cuidadosa de metais, esquadrias e sistemas de pintura. Isso entra na proposta desde o início.",
  },
  {
    slug: "belo-horizonte",
    nome: "Belo Horizonte",
    uf: "MG",
    bairros: ["Savassi", "Lourdes", "Belvedere", "Funcionários", "Sion", "Vila da Serra", "Nova Lima"],
    equipe: 80,
    obras: 190,
    visita: "48 horas",
    nota: "Em Belo Horizonte e Nova Lima, atendemos condomínios horizontais com aprovação de projeto junto à associação e logística adaptada a terrenos em declive.",
  },
  {
    slug: "curitiba",
    nome: "Curitiba",
    uf: "PR",
    bairros: ["Batel", "Bigorrilho", "Água Verde", "Ecoville", "Cabral", "Juvevê", "Santa Felicidade"],
    equipe: 60,
    obras: 120,
    visita: "48 horas",
    nota: "Em Curitiba, o clima frio pede atenção ao isolamento térmico, aos vidros insulados e ao aquecimento de água, especificados já na visita técnica.",
  },
];

/** Ofícios mais buscados, ligados à disciplina e ao serviço principal. */
export const servicosLocais = [
  { slug: "eletricista", nome: "Eletricista", disciplina: "instalacoes-eletricas", servico: "instalacoes-baixa-tensao", schemaType: "Electrician" },
  { slug: "pintor", nome: "Pintor", disciplina: "pintura", servico: "pintura-residencial", schemaType: "HousePainter" },
  { slug: "pedreiro", nome: "Pedreiro", disciplina: "estrutura-e-alvenaria", servico: "alvenaria", schemaType: "GeneralContractor" },
  { slug: "marceneiro", nome: "Marceneiro", disciplina: "marcenaria-e-carpintaria", servico: "marcenaria-sob-medida", schemaType: "GeneralContractor" },
  { slug: "soldador", nome: "Soldador", disciplina: "metal-e-solda", servico: "solda-tig", schemaType: "GeneralContractor" },
  { slug: "encanador", nome: "Encanador", disciplina: "hidraulica-e-gas", servico: "instalacoes-hidrossanitarias", schemaType: "Plumber" },
  { slug: "gesseiro", nome: "Gesseiro", disciplina: "acabamentos", servico: "gesso-e-sancas", schemaType: "GeneralContractor" },
  { slug: "reforma-completa", nome: "Reforma completa", disciplina: "engenharia-projetos-e-gestao", servico: "gerenciamento-de-obra", schemaType: "GeneralContractor" },
] as const;

export const getCidade = (slug: string) => cidades.find((c) => c.slug === slug);
export const getServicoLocal = (slug: string) => servicosLocais.find((s) => s.slug === slug);
