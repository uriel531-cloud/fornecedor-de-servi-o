import type { ImageKey } from "./images";

/** Profissionais, depoimentos, liderança e vagas — todos FICTÍCIOS (placeholders). */

export const mestres: {
  nome: string;
  oficio: string;
  anos: number;
  certificacoes: string[];
  frase: string;
  imagem: ImageKey;
  nivel: "Profissional" | "Especialista" | "Mestre";
}[] = [
  { nome: "Jorge Almeida", oficio: "Soldador TIG", anos: 22, certificacoes: ["Soldador qualificado", "NR-35"], frase: "Solda boa é a que ninguém precisa refazer.", imagem: "retrato-1", nivel: "Mestre" },
  { nome: "Antônio Ribeiro", oficio: "Mestre de obras", anos: 31, certificacoes: ["NR-18", "NR-35"], frase: "Obra organizada é obra segura. E obra segura termina no prazo.", imagem: "retrato-4", nivel: "Mestre" },
  { nome: "Marcos Lima", oficio: "Eletricista", anos: 17, certificacoes: ["NR-10", "NR-10 SEP"], frase: "Quadro bem montado você reconhece de longe.", imagem: "retrato-2", nivel: "Especialista" },
  { nome: "Sebastião Nunes", oficio: "Marceneiro", anos: 26, certificacoes: ["Marcenaria fina"], frase: "A peça tem que encaixar sem força. Se precisou de força, está errada.", imagem: "retrato-5", nivel: "Mestre" },
  { nome: "Cláudio Prado", oficio: "Azulejista", anos: 14, certificacoes: ["Grandes formatos"], frase: "Junta de um milímetro não perdoa base torta.", imagem: "retrato-3", nivel: "Especialista" },
  { nome: "Raimundo Sousa", oficio: "Pintor de fachada", anos: 19, certificacoes: ["NR-35", "Balancim"], frase: "Pintura boa começa três dias antes da tinta.", imagem: "obra-ferramenta", nivel: "Especialista" },
];

export const depoimentos = [
  { texto: "Construí duas casas antes desta, com doze fornecedores cada. Desta vez eu tinha um nome e um telefone. A obra terminou antes do prazo.", autor: "R. Albuquerque", cargo: "Proprietária — Residência Mirante", projeto: "residencia-mirante" },
  { texto: "Entramos numa segunda-feira com tudo funcionando: rede, climatização, salas. A obra simplesmente não apareceu para os nossos vizinhos.", autor: "D. Carvalho", cargo: "Diretora de Operações — Sede corporativa Leblon", projeto: "sede-corporativa-leblon" },
  { texto: "Montaram 4.000 m² de mezanino sem parar a operação um único turno. Documentação de solda impecável.", autor: "M. Tavares", cargo: "Gerente de Engenharia — Centro logístico Cajamar", projeto: "centro-logistico-cajamar" },
];

export const lideranca = [
  { nome: "[Nome do CEO]", cargo: "CEO e fundador", bio: "Engenheiro civil, 20 anos em obras de alto padrão e infraestrutura." },
  { nome: "[Nome do CFO]", cargo: "Diretor financeiro (CFO)", bio: "Ex-sócio de banco de investimento, especialista em construção e real estate." },
  { nome: "[Nome do COO]", cargo: "Diretor de operações (COO)", bio: "Responsável pela rede de mestres de ofício e pelos padrões de execução." },
  { nome: "[Nome do CTO]", cargo: "Diretor de tecnologia (CTO)", bio: "Lidera o portal do cliente, o orçamento inteligente e a gestão da rede." },
];

export const vagas = [
  { slug: "soldador-tig", titulo: "Soldador TIG", local: "São Paulo, SP", tipo: "CLT ou PJ", requisitos: ["Experiência comprovada com inox e aço carbono", "Qualificação de soldador", "NR-35 desejável"] },
  { slug: "eletricista-predial", titulo: "Eletricista predial", local: "Rio de Janeiro, RJ", tipo: "CLT", requisitos: ["NR-10 em dia", "Experiência em quadros de distribuição", "Leitura de projeto elétrico"] },
  { slug: "marceneiro-alto-padrao", titulo: "Marceneiro de alto padrão", local: "São Paulo, SP", tipo: "CLT ou PJ", requisitos: ["Experiência com lâmina natural e laca", "Montagem de cozinhas e closets", "Portfólio de trabalhos"] },
  { slug: "engenheiro-de-obras", titulo: "Engenheiro(a) de obras", local: "Belo Horizonte, MG", tipo: "CLT", requisitos: ["Engenharia civil com CREA ativo", "Experiência em obras residenciais de alto padrão", "Domínio de planejamento e BIM"] },
];

export const niveis = [
  { nome: "Profissional", texto: "Entrada na rede, após avaliação técnica e de documentação." },
  { nome: "Especialista", texto: "Avaliação média alta em obras seguidas e certificações em dia." },
  { nome: "Mestre", texto: "Referência técnica. Treina novos profissionais e lidera frentes de obra." },
];
