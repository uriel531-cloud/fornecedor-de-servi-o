/** Conteúdo da seção "A obra em camadas", do Método e das Garantias. */

export const camadas = [
  { n: "01", nome: "Fundação e estrutura", frase: "Tudo começa no que ninguém vê.", oficios: ["Pedreiro", "Armador", "Carpinteiro de fôrma"], normas: ["NBR 6118", "NBR 6122"], disciplina: "estrutura-e-alvenaria", imagem: "concreto-concretagem" },
  { n: "02", nome: "Estrutura metálica", frase: "Aço qualificado, solda inspecionada.", oficios: ["Soldador", "Montador"], normas: ["NBR 8800", "AWS D1.1"], disciplina: "metal-e-solda", imagem: "solda-2" },
  { n: "03", nome: "Elétrica e hidráulica", frase: "A infraestrutura que a casa vai usar por 50 anos.", oficios: ["Eletricista NR-10", "Encanador"], normas: ["NBR 5410", "NBR 5626"], disciplina: "instalacoes-eletricas", imagem: "hidraulica-tubos" },
  { n: "04", nome: "Impermeabilização e cobertura", frase: "A garantia começa na laje.", oficios: ["Impermeabilizador", "Telhadista"], normas: ["NBR 9575", "NBR 9574"], disciplina: "impermeabilizacao-e-coberturas", imagem: "telhado-telhas" },
  { n: "05", nome: "Esquadrias e fachada", frase: "A envoltória que define o conforto.", oficios: ["Vidraceiro", "Serralheiro"], normas: ["NBR 10821", "NBR 7199"], disciplina: "climatizacao-esquadrias-e-fachadas", imagem: "fachada-ondulada" },
  { n: "06", nome: "Acabamentos e pintura", frase: "O milímetro que separa o bom do impecável.", oficios: ["Azulejista", "Marmorista", "Gesseiro", "Pintor"], normas: ["NBR 13753", "NBR 13245"], disciplina: "acabamentos", imagem: "interior-marmore" },
  { n: "07", nome: "Marcenaria", frase: "Feita para o espaço, não adaptada a ele.", oficios: ["Marceneiro", "Montador"], normas: ["NBR 15930"], disciplina: "marcenaria-e-carpintaria", imagem: "marcenaria-bancada" },
  { n: "08", nome: "Entrega", frase: "Checklist de 200 itens, manual do proprietário e garantia.", oficios: ["Gestor de obra", "Engenheiro responsável"], normas: ["NBR 15575", "NBR 5674"], disciplina: "engenharia-projetos-e-gestao", imagem: "casa-noite" },
] as const;

export const metodo = [
  { n: "01", titulo: "Visita técnica e diagnóstico", texto: "Em até 48 horas. Um engenheiro vai ao local, entende o escopo e levanta riscos.", prazo: "48 h" },
  { n: "02", titulo: "Projeto e compatibilização BIM", texto: "Todas as disciplinas no mesmo modelo. As interferências são resolvidas antes da obra, não durante." },
  { n: "03", titulo: "Proposta com preço fechado", texto: "Escopo, cronograma, marcos de pagamento e cláusulas claras. Sem letra miúda." },
  { n: "04", titulo: "Execução com gestor dedicado", texto: "Um responsável, relatório semanal e fotos diárias no portal do cliente." },
  { n: "05", titulo: "Entrega com checklist", texto: "Vistoria de 200 itens com o cliente, manual do proprietário e documentação completa." },
  { n: "06", titulo: "Garantia e manutenção", texto: "Canal direto de pós-obra e plano de manutenção para preservar o que foi construído." },
] as const;

export const garantias = [
  { titulo: "Preço fechado em contrato", texto: "Escopo detalhado e preço fechado por etapa. Sem aditivos surpresa.", icon: "preco" },
  { titulo: "Prazo com multa por atraso", texto: "O prazo de entrega é cláusula contratual, com multa se não for cumprido.", icon: "prazo" },
  { titulo: "Garantia por escrito", texto: "Solidez e segurança conforme o Código Civil, mais garantia estendida de 5 anos em acabamentos e instalações.", icon: "garantia" },
  { titulo: "Seguro de obra", texto: "Seguro de risco de engenharia e responsabilidade civil durante toda a execução.", icon: "seguro" },
] as const;
