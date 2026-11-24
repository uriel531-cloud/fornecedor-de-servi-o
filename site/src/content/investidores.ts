/**
 * Relações com investidores. TODOS os números são PLACEHOLDERS ilustrativos
 * e precisam ser substituídos por dados auditados antes de publicar.
 */

export const receitaAnual = [
  { ano: "2022", valor: 38 },
  { ano: "2023", valor: 61 },
  { ano: "2024", valor: 94 },
  { ano: "2025", valor: 142 },
  { ano: "2026", valor: 210 },
];

export const recorrenteShare = [
  { ano: "2022", valor: 6 },
  { ano: "2023", valor: 9 },
  { ano: "2024", valor: 13 },
  { ano: "2025", valor: 17 },
  { ano: "2026", valor: 22 },
];

export const kpis = [
  { value: "210", unit: "R$ mi", label: "Receita 2026", note: "estimada" },
  { value: "48%", unit: "", label: "Crescimento anual composto", note: "2022–2026" },
  { value: "22%", unit: "", label: "Receita recorrente", note: "manutenção e facilities" },
  { value: "380", unit: "R$ mi", label: "Backlog contratado", note: "nov/2026" },
  { value: "27%", unit: "", label: "Margem bruta", note: "2026" },
  { value: "1,2", unit: "R$ mi", label: "Ticket médio", note: "obras completas" },
  { value: "78", unit: "", label: "NPS", note: "clientes 2026" },
  { value: "1.800", unit: "", label: "Profissionais na rede", note: "certificados" },
] as const;

export const tese = [
  { n: "01", titulo: "Mercado gigante e fragmentado", texto: "A construção é um dos maiores setores da economia brasileira, e a maior parte dos serviços de obra ainda é prestada por profissionais informais, sem padrão, garantia ou gestão.", fonte: "[Inserir dados com fonte: CBIC, IBGE-PAIC]" },
  { n: "02", titulo: "Demanda por responsabilidade única", texto: "Clientes de alto padrão e empresas pagam prêmio para ter um responsável, um contrato e uma garantia. Essa é a dor que resolvemos." },
  { n: "03", titulo: "Modelo híbrido e leve em ativos", texto: "Um núcleo próprio de engenharia, gestão e garantia orquestra uma rede certificada de mestres de ofício. A capacidade cresce sem crescer o imobilizado." },
  { n: "04", titulo: "Receita recorrente", texto: "Contratos de manutenção e facilities transformam clientes de obra em receita previsível, com a mesma equipe que construiu." },
  { n: "05", titulo: "Tecnologia proprietária", texto: "Orçamento inteligente, gestão da rede, portal do cliente e dados de produtividade de cada ofício. Cada obra torna a próxima mais precisa." },
] as const;

export const governanca = [
  { titulo: "Conselho de administração", texto: "[Estrutura do conselho, número de membros independentes e comitês]" },
  { titulo: "Auditoria independente", texto: "Demonstrações financeiras auditadas anualmente por auditoria independente." },
  { titulo: "Programa de integridade", texto: "Alinhado à Lei Anticorrupção (Lei 12.846/2013): código de conduta, treinamentos e controles internos." },
  { titulo: "Canal de ética independente", texto: "Denúncias anônimas, com apuração independente e proteção contra retaliação." },
  { titulo: "Due diligence de fornecedores", texto: "Verificação documental, trabalhista e reputacional de toda a cadeia." },
  { titulo: "Partes relacionadas", texto: "Política formal para transações com partes relacionadas, aprovada pelo conselho." },
] as const;

export const pracas = [
  { cidade: "São Paulo", uf: "SP", lat: -23.55, lng: -46.63, status: "atual" },
  { cidade: "Campinas", uf: "SP", lat: -22.91, lng: -47.06, status: "atual" },
  { cidade: "Rio de Janeiro", uf: "RJ", lat: -22.91, lng: -43.17, status: "atual" },
  { cidade: "Belo Horizonte", uf: "MG", lat: -19.92, lng: -43.94, status: "atual" },
  { cidade: "Curitiba", uf: "PR", lat: -25.43, lng: -49.27, status: "atual" },
  { cidade: "Florianópolis", uf: "SC", lat: -27.59, lng: -48.55, status: "planejada" },
  { cidade: "Porto Alegre", uf: "RS", lat: -30.03, lng: -51.23, status: "planejada" },
  { cidade: "Brasília", uf: "DF", lat: -15.79, lng: -47.88, status: "atual" },
  { cidade: "Goiânia", uf: "GO", lat: -16.68, lng: -49.25, status: "planejada" },
  { cidade: "Salvador", uf: "BA", lat: -12.97, lng: -38.5, status: "planejada" },
  { cidade: "Recife", uf: "PE", lat: -8.05, lng: -34.88, status: "planejada" },
  { cidade: "Fortaleza", uf: "CE", lat: -3.73, lng: -38.52, status: "planejada" },
] as const;

export const documentos = [
  { titulo: "Apresentação institucional", formato: "PDF", tamanho: "8 MB" },
  { titulo: "One-pager para investidores", formato: "PDF", tamanho: "1 MB" },
  { titulo: "Relatório anual 2025", formato: "PDF", tamanho: "12 MB" },
  { titulo: "Relatório ESG e de segurança", formato: "PDF", tamanho: "6 MB" },
] as const;
