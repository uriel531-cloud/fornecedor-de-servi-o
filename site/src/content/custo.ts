/**
 * Tabela de custo por m² usada na ESTIMATIVA INDICATIVA do configurador.
 * PLACEHOLDER: substituir pelos valores reais da área comercial.
 * Valores em R$/m², faixa [mínimo, máximo].
 */
export type Padrao = "alto" | "premium" | "assinatura";
export type TipoProjeto = "avulso" | "completa" | "nova" | "manutencao";

export const padroes: { id: Padrao; nome: string; desc: string; imagem: "interior-sofa" | "interior-living" | "interior-marmore" }[] = [
  { id: "alto", nome: "Alto padrão", desc: "Materiais nacionais de primeira linha, marcenaria em MDF especial.", imagem: "interior-sofa" },
  { id: "premium", nome: "Premium", desc: "Porcelanatos de grande formato, lâmina natural, automação básica.", imagem: "interior-living" },
  { id: "assinatura", nome: "Assinatura", desc: "Pedras naturais selecionadas, marcenaria de autor, automação completa.", imagem: "interior-marmore" },
];

export const custoM2: Record<Exclude<TipoProjeto, "avulso" | "manutencao">, Record<Padrao, [number, number]>> = {
  completa: { alto: [3800, 5200], premium: [5200, 7800], assinatura: [7800, 12000] },
  nova: { alto: [6500, 8500], premium: [8500, 11500], assinatura: [11500, 18000] },
};

/** Serviço avulso: R$/m² por disciplina (faixa de referência). */
export const custoAvulsoPorDisciplina: Record<string, [number, number]> = {
  "estrutura-e-alvenaria": [420, 900],
  "metal-e-solda": [600, 1500],
  "instalacoes-eletricas": [220, 480],
  "hidraulica-e-gas": [200, 450],
  "impermeabilizacao-e-coberturas": [180, 420],
  acabamentos: [380, 1400],
  pintura: [70, 160],
  "marcenaria-e-carpintaria": [900, 2800],
  "climatizacao-esquadrias-e-fachadas": [350, 1200],
  "engenharia-projetos-e-gestao": [60, 180],
};

export const multiplicadorPadrao: Record<Padrao, number> = { alto: 1, premium: 1.35, assinatura: 1.8 };

/** Manutenção recorrente: R$/m² por mês. */
export const custoManutencaoMes: [number, number] = [2.5, 6];
