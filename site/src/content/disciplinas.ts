import type { ImageKey } from "./images";

export type Servico = {
  slug: string;
  nome: string;
  resumo: string;
  escopo: string[];
  normas?: string[];
};

export type Etapa = { titulo: string; texto: string };
export type Faq = { q: string; a: string };

export type Disciplina = {
  slug: string;
  numero: string;
  nome: string;
  curto: string;
  descricao: string;
  promessa: string;
  oficios: string[];
  normas: string[];
  imagem: ImageKey;
  antes: ImageKey;
  depois: ImageKey;
  galeria: ImageKey[];
  processo: Etapa[];
  faq: Faq[];
  complementares: string[];
  schemaType: string;
  servicos: Servico[];
};

export const disciplinas: Disciplina[] = [
  {
    slug: "estrutura-e-alvenaria",
    numero: "01",
    nome: "Estrutura e Alvenaria",
    curto: "Estrutura",
    descricao:
      "Fundações, estrutura e vedações executadas com controle tecnológico. Prumo, nível e esquadro conferidos e registrados a cada etapa.",
    promessa: "Tudo começa no que ninguém vê.",
    oficios: ["Pedreiro", "Armador", "Carpinteiro de fôrma", "Servente"],
    normas: ["NBR 6118", "NBR 6122", "NBR 14931", "NBR 16868", "NBR 15575", "NR-18"],
    imagem: "concreto-concretagem",
    antes: "obra-sala",
    depois: "interior-living",
    galeria: ["concreto-predio", "concreto-dupla", "obra-estrutura", "concreto-obra"],
    processo: [
      { titulo: "Sondagem e leitura de projeto", texto: "Conferimos sondagem, projeto estrutural e interferências antes de mobilizar a equipe." },
      { titulo: "Locação e gabarito", texto: "Marcação topográfica da obra com tolerâncias registradas." },
      { titulo: "Execução com controle tecnológico", texto: "Concreto com rastreabilidade por caminhão e rompimento de corpos de prova." },
      { titulo: "Conferência de prumo, nível e esquadro", texto: "Medição a laser em cada pavimento, com relatório fotográfico." },
      { titulo: "Liberação para a próxima disciplina", texto: "Nenhuma etapa segue sem liberação assinada pelo engenheiro responsável." },
    ],
    faq: [
      { q: "Vocês executam fundação em terreno com declive ou solo difícil?", a: "Sim. Depois da sondagem SPT, definimos com o projetista a solução adequada (estaca hélice, radier, sapatas ou contenções) e executamos com acompanhamento do engenheiro responsável." },
      { q: "Drywall ou alvenaria: o que é melhor para uma reforma?", a: "Depende do uso. O drywall reduz prazo e sujeira e aceita isolamento acústico; a alvenaria é indicada para áreas molhadas sem tratamento específico e para cargas pesadas. A recomendação sai da visita técnica." },
      { q: "Como é feito o controle de qualidade do concreto?", a: "Cada caminhão é registrado, o slump é medido na chegada e corpos de prova são moldados e rompidos em laboratório. Os laudos ficam disponíveis no portal do cliente." },
      { q: "Quem é o responsável técnico pela estrutura?", a: "Um engenheiro civil da LASTRO, com ART emitida para a execução. O nome e o registro dele constam no contrato." },
    ],
    complementares: ["metal-e-solda", "impermeabilizacao-e-coberturas", "engenharia-projetos-e-gestao"],
    schemaType: "GeneralContractor",
    servicos: [
      { slug: "fundacoes", nome: "Fundações", resumo: "Estacas, sapatas, radier e blocos executados conforme sondagem e projeto.", escopo: ["Leitura da sondagem SPT e do projeto de fundações", "Locação e escavação", "Armação, fôrma e concretagem", "Relatório de execução com registro fotográfico"], normas: ["NBR 6122"] },
      { slug: "concreto-armado", nome: "Concreto armado", resumo: "Pilares, vigas e lajes com rastreabilidade do concreto e controle tecnológico.", escopo: ["Fôrmas e escoramento", "Armação conforme projeto", "Concretagem com controle de slump", "Cura e desforma no prazo técnico"], normas: ["NBR 6118", "NBR 14931"] },
      { slug: "alvenaria", nome: "Alvenaria estrutural e de vedação", resumo: "Paredes em bloco cerâmico ou de concreto, com prumo e modulação conferidos.", escopo: ["Marcação da primeira fiada", "Elevação com controle de prumo e nível", "Vergas, contravergas e amarrações", "Encunhamento no prazo correto"], normas: ["NBR 16868"] },
      { slug: "contrapiso", nome: "Contrapiso", resumo: "Base nivelada para receber qualquer acabamento, inclusive grandes formatos.", escopo: ["Mapeamento de níveis a laser", "Contrapiso convencional ou autonivelante", "Caimentos para áreas molhadas", "Conferência de planicidade"] },
      { slug: "chapisco-e-reboco", nome: "Chapisco e reboco", resumo: "Revestimento argamassado com espessura controlada e prumo de parede.", escopo: ["Chapisco de aderência", "Mestras e taliscas", "Reboco sarrafeado ou desempenado", "Tratamento de cantos e quinas"] },
      { slug: "drywall", nome: "Drywall", resumo: "Paredes e forros em chapas de gesso com desempenho acústico e prazo reduzido.", escopo: ["Estrutura em perfis de aço galvanizado", "Chapas ST, RU ou RF conforme o ambiente", "Isolamento em lã mineral", "Tratamento de juntas pronto para pintura"], normas: ["NBR 15758"] },
      { slug: "steel-frame", nome: "Steel frame", resumo: "Sistema construtivo industrializado em aço leve para obras rápidas e limpas.", escopo: ["Projeto e modulação dos painéis", "Montagem da estrutura em perfis formados a frio", "Fechamentos em placa cimentícia ou OSB", "Isolamento termoacústico"] },
      { slug: "demolicao-controlada", nome: "Demolição controlada", resumo: "Retirada seletiva com proteção do que fica e destinação correta do entulho.", escopo: ["Plano de demolição e proteção", "Escoramentos provisórios quando necessário", "Separação de resíduos por classe", "Destinação conforme CONAMA 307"] },
    ],
  },
  {
    slug: "metal-e-solda",
    numero: "02",
    nome: "Metal e Solda",
    curto: "Metal",
    descricao:
      "Estruturas metálicas, serralheria fina e solda qualificada, da fabricação à montagem, com inspeção documentada.",
    promessa: "Aço qualificado, solda inspecionada.",
    oficios: ["Soldador qualificado", "Serralheiro", "Montador de estruturas", "Caldeireiro"],
    normas: ["NBR 8800", "NBR 14762", "NBR 14718", "AWS D1.1", "NR-18", "NR-35"],
    imagem: "solda-2",
    antes: "obra-grua",
    depois: "solda-1",
    galeria: ["solda-1", "solda-3", "solda-4", "obra-grua"],
    processo: [
      { titulo: "Levantamento e projeto de fabricação", texto: "Medição em campo e detalhamento peça a peça antes de cortar o aço." },
      { titulo: "Fabricação em oficina", texto: "Corte, furação e solda em ambiente controlado, com procedimento qualificado." },
      { titulo: "Inspeção de solda", texto: "Inspeção visual e ensaios não destrutivos conforme a criticidade da peça." },
      { titulo: "Tratamento e pintura", texto: "Preparação de superfície e sistema de pintura especificado para o ambiente." },
      { titulo: "Montagem com segurança", texto: "Plano de içamento, linha de vida e equipe com NR-35 em dia." },
    ],
    faq: [
      { q: "Os soldadores são qualificados?", a: "Sim. Cada soldador tem qualificação registrada para o processo (MIG/MAG, TIG ou eletrodo revestido) e a posição em que vai trabalhar." },
      { q: "Vocês fabricam ou só montam?", a: "Fazemos as duas coisas. A fabricação em oficina garante qualidade e reduz o tempo de montagem na obra." },
      { q: "Fazem guarda-corpo de vidro com estrutura metálica?", a: "Sim, com cálculo de resistência e fixação conforme a NBR 14718, integrado ao trabalho de vidraçaria." },
      { q: "Atendem paradas programadas em indústrias?", a: "Sim. Planejamos a parada com antecedência, pré-fabricamos o máximo possível e trabalhamos em turnos para cumprir a janela." },
    ],
    complementares: ["estrutura-e-alvenaria", "climatizacao-esquadrias-e-fachadas", "pintura"],
    schemaType: "GeneralContractor",
    servicos: [
      { slug: "estruturas-metalicas", nome: "Estruturas metálicas", resumo: "Galpões, coberturas e estruturas especiais em aço, do cálculo à montagem.", escopo: ["Detalhamento e lista de materiais", "Fabricação em oficina", "Montagem com plano de içamento", "Pintura de proteção"], normas: ["NBR 8800"] },
      { slug: "mezaninos", nome: "Mezaninos", resumo: "Novos pavimentos em aço para escritórios, lojas e centros logísticos.", escopo: ["Cálculo de carga e vibração", "Estrutura e piso (steel deck ou chapa)", "Escadas e guarda-corpos", "Integração com elétrica e combate a incêndio"] },
      { slug: "escadas-metalicas", nome: "Escadas metálicas", resumo: "Escadas helicoidais, retas e flutuantes com acabamento arquitetônico.", escopo: ["Desenho e cálculo", "Fabricação com solda polida", "Degraus em aço, madeira ou pedra", "Montagem e pintura final"] },
      { slug: "guarda-corpos", nome: "Guarda-corpos", resumo: "Guarda-corpos em aço, inox e vidro, calculados para a carga normativa.", escopo: ["Medição e projeto", "Fabricação e acabamento", "Fixação química ou mecânica", "Ensaio de carga quando exigido"], normas: ["NBR 14718"] },
      { slug: "portoes", nome: "Portões", resumo: "Portões de correr, basculantes e pivotantes, com automação.", escopo: ["Projeto e estrutura", "Revestimento em aço, alumínio ou madeira", "Motorização e controle de acesso", "Pintura eletrostática"] },
      { slug: "serralheria-fina", nome: "Serralheria fina", resumo: "Peças de aço sob medida para arquitetura de interiores: estantes, divisórias, painéis.", escopo: ["Detalhamento com o arquiteto", "Corte a laser e dobra", "Solda TIG com acabamento invisível", "Pintura ou banho especial"] },
      { slug: "caldeiraria", nome: "Caldeiraria", resumo: "Fabricação de tanques, dutos, chaminés e peças em chapa grossa.", escopo: ["Traçagem e calandragem", "Solda estrutural", "Teste de estanqueidade", "Montagem em campo"] },
      { slug: "solda-mig-mag", nome: "Solda MIG/MAG", resumo: "Solda de alta produtividade para estruturas e fabricação seriada.", escopo: ["Procedimento de soldagem definido", "Soldador qualificado para a posição", "Controle de parâmetros", "Inspeção visual documentada"], normas: ["AWS D1.1"] },
      { slug: "solda-tig", nome: "Solda TIG", resumo: "Solda de precisão em inox, alumínio e peças aparentes de arquitetura.", escopo: ["Preparação e limpeza das juntas", "Solda com gás de proteção", "Acabamento escovado ou polido", "Inspeção visual e de penetração"] },
      { slug: "solda-eletrodo-revestido", nome: "Solda com eletrodo revestido", resumo: "Solda em campo para montagem e manutenção, inclusive em condições adversas.", escopo: ["Escolha do eletrodo por material", "Controle de umidade dos consumíveis", "Solda em todas as posições", "Remoção de escória e inspeção"] },
      { slug: "inspecao-de-solda", nome: "Inspeção de solda", resumo: "Inspeção visual, líquido penetrante e ultrassom por inspetor qualificado.", escopo: ["Plano de inspeção por criticidade", "Ensaios não destrutivos", "Relatório técnico com laudo", "Acompanhamento de reparos"] },
    ],
  },
  {
    slug: "instalacoes-eletricas",
    numero: "03",
    nome: "Instalações Elétricas",
    curto: "Elétrica",
    descricao:
      "Da entrada de energia à automação: projeto, execução e comissionamento por eletricistas com NR-10 em dia.",
    promessa: "A infraestrutura que a casa vai usar por 50 anos.",
    oficios: ["Eletricista NR-10", "Técnico em automação", "Instalador fotovoltaico"],
    normas: ["NBR 5410", "NBR 5419", "NBR 14039", "NBR 16690", "NBR 14565", "NR-10"],
    imagem: "eletrica-painel",
    antes: "hidraulica-tubos",
    depois: "eletrica-quadro",
    galeria: ["eletrica-instalacao", "eletrica-fios", "eletrica-quadro", "eletrica-painel"],
    processo: [
      { titulo: "Levantamento de carga", texto: "Inventário de equipamentos e previsão de expansão antes de dimensionar." },
      { titulo: "Projeto e compatibilização", texto: "Projeto elétrico compatibilizado com hidráulica, ar-condicionado e marcenaria." },
      { titulo: "Infraestrutura", texto: "Eletrodutos, caixas e leitos executados antes do fechamento de paredes e forros." },
      { titulo: "Cabeamento e montagem de quadros", texto: "Circuitos identificados, quadros montados e etiquetados." },
      { titulo: "Testes e comissionamento", texto: "Ensaios de isolamento, continuidade e DR, com relatório e diagrama as built." },
    ],
    faq: [
      { q: "Os eletricistas têm NR-10?", a: "Todos. Exigimos curso NR-10 básico de 40 horas, reciclagem a cada dois anos, ASO válido e autorização formal da empresa. Os documentos ficam disponíveis para o cliente." },
      { q: "Vocês instalam carregador de carro elétrico em condomínio?", a: "Sim. Avaliamos a carga disponível, fazemos o projeto conforme as regras do condomínio e da concessionária e executamos a instalação com medição individual quando necessário." },
      { q: "Entregam o diagrama da instalação?", a: "Sim. Toda obra elétrica é entregue com diagramas unifilares e o as built, que ficam no portal do cliente." },
      { q: "Fazem automação residencial?", a: "Sim. Iluminação, cortinas, climatização, áudio e segurança integrados, com infraestrutura prevista desde o início da obra." },
    ],
    complementares: ["hidraulica-e-gas", "climatizacao-esquadrias-e-fachadas", "engenharia-projetos-e-gestao"],
    schemaType: "Electrician",
    servicos: [
      { slug: "instalacoes-baixa-tensao", nome: "Instalações de baixa tensão", resumo: "Projeto e execução da instalação elétrica residencial e comercial completa.", escopo: ["Dimensionamento de circuitos", "Infraestrutura embutida ou aparente", "Cabeamento e acabamentos elétricos", "Testes e relatório"], normas: ["NBR 5410"] },
      { slug: "quadros-e-paineis", nome: "Quadros e painéis", resumo: "Montagem e adequação de quadros de distribuição com proteção correta.", escopo: ["Dimensionamento de disjuntores e DR", "Montagem com barramentos e identificação", "DPS e proteções", "Termografia na entrega"] },
      { slug: "spda", nome: "SPDA (para-raios)", resumo: "Sistema de proteção contra descargas atmosféricas com laudo.", escopo: ["Análise de risco", "Captação, descidas e aterramento", "Medição de resistência de aterramento", "Laudo técnico com ART"], normas: ["NBR 5419"] },
      { slug: "subestacao", nome: "Subestação", resumo: "Subestações abrigadas e de poste para média tensão.", escopo: ["Projeto junto à concessionária", "Montagem eletromecânica", "Ensaios e comissionamento", "Plano de manutenção"], normas: ["NBR 14039"] },
      { slug: "energia-solar", nome: "Energia solar fotovoltaica", resumo: "Usinas residenciais e comerciais com homologação na concessionária.", escopo: ["Estudo de consumo e retorno", "Projeto e homologação", "Montagem estrutural e elétrica", "Monitoramento de geração"], normas: ["NBR 16690"] },
      { slug: "carregador-veiculo-eletrico", nome: "Carregador de veículo elétrico", resumo: "Wallbox residencial e infraestrutura de recarga para condomínios e empresas.", escopo: ["Análise da carga disponível", "Circuito dedicado com proteção", "Instalação do carregador", "Gestão de energia em condomínios"] },
      { slug: "cabeamento-estruturado", nome: "Cabeamento estruturado", resumo: "Rede de dados e telefonia certificada para escritórios e residências.", escopo: ["Projeto de pontos e rack", "Cabeamento categoria 6/6A", "Certificação dos pontos", "Organização e identificação do rack"], normas: ["NBR 14565"] },
      { slug: "automacao", nome: "Automação residencial e predial", resumo: "Iluminação, climatização, cortinas, áudio e segurança integrados.", escopo: ["Projeto de cenas e integração", "Infraestrutura dedicada", "Programação e testes", "Treinamento do usuário"] },
      { slug: "iluminacao-cenica", nome: "Iluminação cênica", resumo: "Execução de projetos luminotécnicos com controle de cena e dimerização.", escopo: ["Leitura do projeto luminotécnico", "Perfis, embutidos e fitas de LED", "Drivers e dimerização", "Ajuste fino de cenas"] },
    ],
  },
  {
    slug: "hidraulica-e-gas",
    numero: "04",
    nome: "Hidráulica e Gás",
    curto: "Hidráulica",
    descricao:
      "Água fria e quente, esgoto, gás, reúso e piscinas. Tudo testado sob pressão antes de fechar qualquer parede.",
    promessa: "Nenhuma parede fecha sem teste de pressão.",
    oficios: ["Encanador", "Bombeiro hidráulico", "Instalador de gás"],
    normas: ["NBR 5626", "NBR 8160", "NBR 10844", "NBR 15526", "NBR 15527", "NBR 10339"],
    imagem: "hidraulica-parede",
    antes: "hidraulica-tubos",
    depois: "banheiro-marmore",
    galeria: ["hidraulica-banheiro", "hidraulica-tubos", "banheiro-duplo", "casa-piscina"],
    processo: [
      { titulo: "Levantamento de pontos", texto: "Pontos de consumo, vazões e pressões definidos com o projeto de interiores." },
      { titulo: "Projeto e compatibilização", texto: "Traçado compatibilizado com estrutura, elétrica e marcenaria." },
      { titulo: "Execução da rede", texto: "Tubulações fixadas, identificadas e protegidas." },
      { titulo: "Teste de estanqueidade", texto: "Teste de pressão registrado antes do fechamento de paredes e forros." },
      { titulo: "Instalação de louças e metais", texto: "Montagem final, regulagem e verificação de cada ponto." },
    ],
    faq: [
      { q: "Vocês fazem a troca completa da prumada em apartamento?", a: "Sim, com plano de reforma conforme a NBR 16280 aprovado pelo condomínio e janelas de corte de água combinadas com a administração." },
      { q: "Instalam aquecimento a gás e solar?", a: "Sim. Dimensionamos o sistema pelo número de pontos e banhos simultâneos e integramos aquecedor a gás, bomba de calor ou solar." },
      { q: "Executam piscinas?", a: "Sim. Estrutura, impermeabilização, casa de máquinas, revestimento e aquecimento, conforme a NBR 10339." },
      { q: "Como evitam vazamentos depois da obra?", a: "Cada trecho é testado sob pressão antes do fechamento, o teste é registrado com foto e a rede é entregue com o as built." },
    ],
    complementares: ["impermeabilizacao-e-coberturas", "acabamentos", "instalacoes-eletricas"],
    schemaType: "Plumber",
    servicos: [
      { slug: "instalacoes-hidrossanitarias", nome: "Instalações hidrossanitárias", resumo: "Água fria, água quente e esgoto projetados e executados em conjunto.", escopo: ["Rede de água fria e quente", "Esgoto e ventilação", "Teste de estanqueidade", "As built da rede"], normas: ["NBR 5626", "NBR 8160"] },
      { slug: "agua-quente", nome: "Aquecimento de água", resumo: "Aquecedores a gás, bomba de calor e solar, com recirculação.", escopo: ["Dimensionamento por demanda simultânea", "Instalação do sistema", "Isolamento térmico da rede", "Recirculação para água quente imediata"] },
      { slug: "pressurizacao", nome: "Pressurização", resumo: "Pressão constante em todos os pontos, inclusive em coberturas.", escopo: ["Medição de pressão existente", "Pressurizador ou conjunto motobomba", "Válvulas e proteções", "Regulagem final"] },
      { slug: "gas", nome: "Gás GLP e GN", resumo: "Redes de gás para cozinhas, aquecimento e churrasqueiras.", escopo: ["Projeto da rede", "Execução com materiais certificados", "Teste de estanqueidade", "Laudo de entrega"], normas: ["NBR 15526"] },
      { slug: "reuso-e-captacao", nome: "Reúso e captação de chuva", resumo: "Sistemas de aproveitamento de água para irrigação e descargas.", escopo: ["Estudo de viabilidade", "Calhas, filtros e reservatórios", "Rede independente identificada", "Bombeamento e controle"], normas: ["NBR 15527"] },
      { slug: "piscinas-e-spas", nome: "Piscinas e spas", resumo: "Piscinas de concreto, raia, borda infinita e spas, do projeto à entrega.", escopo: ["Estrutura e impermeabilização", "Casa de máquinas e filtragem", "Revestimento e iluminação", "Aquecimento e automação"], normas: ["NBR 10339"] },
    ],
  },
  {
    slug: "impermeabilizacao-e-coberturas",
    numero: "05",
    nome: "Impermeabilização e Coberturas",
    curto: "Coberturas",
    descricao:
      "Lajes, terraços, banheiros e telhados protegidos com sistemas especificados por área e testados com lâmina d'água.",
    promessa: "A garantia começa na laje.",
    oficios: ["Impermeabilizador", "Telhadista", "Montador de calhas"],
    normas: ["NBR 9575", "NBR 9574", "NBR 15575", "NR-35"],
    imagem: "telhado-telhas",
    antes: "telhado-furadeira",
    depois: "casa-noite",
    galeria: ["telhado-furadeira", "telhado-telhas", "casa-branca", "casa-varandas"],
    processo: [
      { titulo: "Diagnóstico", texto: "Identificação da origem das infiltrações e do estado da base." },
      { titulo: "Especificação do sistema", texto: "Manta, membrana ou sistema cimentício escolhido conforme a área e o uso." },
      { titulo: "Preparação da base", texto: "Regularização, caimentos e cantos arredondados." },
      { titulo: "Aplicação", texto: "Execução com sobreposições, arremates e ralos tratados." },
      { titulo: "Teste de estanqueidade", texto: "Lâmina d'água por 72 horas antes da proteção mecânica." },
    ],
    faq: [
      { q: "Resolvem infiltração sem quebrar tudo?", a: "Em muitos casos, sim. O diagnóstico define se é possível tratar localmente ou se o sistema precisa ser refeito." },
      { q: "Qual é a garantia da impermeabilização?", a: "A garantia consta em contrato e varia conforme o sistema e a área. Todos passam por teste de estanqueidade de 72 horas antes da entrega." },
      { q: "Trabalham em altura com segurança?", a: "Sim. Equipe com NR-35, linha de vida, cinto tipo paraquedista e análise de risco antes de cada atividade." },
      { q: "Fazem telhado verde?", a: "Sim, com impermeabilização antirraiz, drenagem, substrato e vegetação especificada com o paisagista." },
    ],
    complementares: ["estrutura-e-alvenaria", "hidraulica-e-gas", "pintura"],
    schemaType: "RoofingContractor",
    servicos: [
      { slug: "mantas-e-membranas", nome: "Mantas e membranas", resumo: "Sistemas asfálticos, poliméricos e de poliuretano para cada tipo de área.", escopo: ["Especificação por área", "Preparação da base", "Aplicação com arremates", "Teste de estanqueidade"], normas: ["NBR 9575", "NBR 9574"] },
      { slug: "impermeabilizacao-de-lajes", nome: "Impermeabilização de lajes e terraços", resumo: "Terraços, coberturas e jardineiras sem infiltração.", escopo: ["Remoção do sistema antigo", "Regularização e caimentos", "Sistema impermeável", "Proteção mecânica e piso"] },
      { slug: "telhados", nome: "Telhados", resumo: "Estrutura, telhas e isolamento para coberturas novas e reformas.", escopo: ["Estrutura em madeira ou aço", "Telhas cerâmicas, metálicas ou shingle", "Manta de subcobertura", "Isolamento térmico"] },
      { slug: "calhas-e-rufos", nome: "Calhas e rufos", resumo: "Drenagem da cobertura dimensionada para chuvas intensas.", escopo: ["Cálculo de vazão", "Calhas em aço galvanizado, inox ou alumínio", "Rufos e contrarrufos", "Condutores e caixas"], normas: ["NBR 10844"] },
      { slug: "telhado-verde", nome: "Telhado verde", resumo: "Cobertura vegetada com conforto térmico e retenção de água.", escopo: ["Impermeabilização antirraiz", "Camada drenante e filtrante", "Substrato e vegetação", "Irrigação automatizada"] },
    ],
  },
  {
    slug: "acabamentos",
    numero: "06",
    nome: "Acabamentos",
    curto: "Acabamentos",
    descricao:
      "Porcelanato de grande formato, pedras naturais, madeira, microcimento e gesso assentados com precisão de milímetro.",
    promessa: "O milímetro que separa o bom do impecável.",
    oficios: ["Azulejista", "Marmorista", "Gesseiro", "Aplicador de microcimento"],
    normas: ["NBR 13753", "NBR 13754", "NBR 13755", "NBR 15575"],
    imagem: "interior-marmore",
    antes: "revestimento-assentamento",
    depois: "banheiro-marmore",
    galeria: ["revestimento-placa", "banheiro-duplo", "interior-corredor", "revestimento-cozinha"],
    processo: [
      { titulo: "Paginação", texto: "Paginação de pisos e paredes aprovada antes do primeiro corte." },
      { titulo: "Conferência da base", texto: "Planicidade e esquadro medidos; nada é assentado sobre base fora de tolerância." },
      { titulo: "Assentamento", texto: "Argamassa especificada por formato, dupla colagem e niveladores." },
      { titulo: "Rejunte e proteção", texto: "Rejunte, tratamento de pedras e proteção até a entrega." },
      { titulo: "Vistoria de acabamento", texto: "Checklist com luz rasante para detectar desníveis e falhas." },
    ],
    faq: [
      { q: "Assentam porcelanato de grande formato?", a: "Sim, inclusive placas de 120 × 240 cm e lâminas, com equipe treinada, ventosas e argamassa específica." },
      { q: "Trabalham com mármores e granitos?", a: "Sim. Selecionamos as chapas com o cliente, fazemos a paginação dos veios e a instalação com marmorista." },
      { q: "Microcimento racha?", a: "Quando aplicado sobre base adequada, com juntas respeitadas e sistema correto, não. A base é avaliada antes da aplicação." },
      { q: "Quanto tempo leva para revestir um banheiro?", a: "Depende do formato e do material. O cronograma detalhado faz parte da proposta, e o prazo entra em contrato." },
    ],
    complementares: ["pintura", "marcenaria-e-carpintaria", "hidraulica-e-gas"],
    schemaType: "GeneralContractor",
    servicos: [
      { slug: "porcelanato-grande-formato", nome: "Porcelanato de grande formato", resumo: "Placas e lâminas de grande formato com juntas mínimas.", escopo: ["Paginação técnica", "Dupla colagem com argamassa específica", "Sistema de nivelamento", "Proteção até a entrega"], normas: ["NBR 13753", "NBR 13754"] },
      { slug: "marmore-e-granito", nome: "Mármore e granito", resumo: "Pisos, bancadas e paredes em pedra natural com continuidade de veios.", escopo: ["Seleção de chapas", "Paginação dos veios", "Corte e acabamento de bordas", "Impermeabilização da pedra"] },
      { slug: "pisos-de-madeira", nome: "Pisos de madeira", resumo: "Assoalho maciço e engenheirado, inclusive em espinha de peixe.", escopo: ["Verificação de umidade da base", "Instalação colada ou flutuante", "Lixamento e acabamento", "Rodapés e soleiras"] },
      { slug: "pisos-vinilicos", nome: "Pisos vinílicos", resumo: "Pisos vinílicos colados ou clicados para reformas rápidas.", escopo: ["Regularização da base", "Instalação com juntas mínimas", "Rodapés", "Limpeza técnica"] },
      { slug: "microcimento", nome: "Microcimento", resumo: "Superfícies contínuas, sem juntas, em pisos, paredes e bancadas.", escopo: ["Avaliação e preparação da base", "Aplicação em camadas", "Seladores e vernizes", "Proteção e cura"] },
      { slug: "piso-epoxi", nome: "Piso epóxi", resumo: "Pisos industriais e decorativos de alta resistência.", escopo: ["Preparação mecânica da base", "Primer e camada autonivelante", "Acabamento antiderrapante quando necessário", "Demarcação de áreas"] },
      { slug: "gesso-e-sancas", nome: "Gesso e sancas", resumo: "Sancas, tabicas e molduras com iluminação embutida.", escopo: ["Projeto de forro e iluminação", "Estrutura e fechamento", "Tratamento de juntas", "Pronto para pintura"] },
      { slug: "forros", nome: "Forros", resumo: "Forros em gesso, drywall, madeira ou metálicos.", escopo: ["Compatibilização com ar-condicionado e elétrica", "Estrutura e fechamento", "Alçapões de manutenção", "Acabamento final"] },
    ],
  },
  {
    slug: "pintura",
    numero: "07",
    nome: "Pintura",
    curto: "Pintura",
    descricao:
      "Preparação de superfície correta, produto especificado e acabamento conferido com luz rasante. Do apartamento à fachada.",
    promessa: "Pintura boa começa na preparação.",
    oficios: ["Pintor", "Pintor de fachada NR-35", "Aplicador de efeitos decorativos"],
    normas: ["NBR 13245", "NBR 15079", "NR-35"],
    imagem: "pintura-parede",
    antes: "obra-sala",
    depois: "interior-sala",
    galeria: ["pintura-rolo", "pintura-rolo-2", "interior-sofa", "interior-chaise"],
    processo: [
      { titulo: "Proteção do ambiente", texto: "Pisos, marcenaria e esquadrias protegidos antes de começar." },
      { titulo: "Preparação de superfície", texto: "Tratamento de fissuras, massa, lixamento e limpeza." },
      { titulo: "Fundo e selador", texto: "Produto adequado ao substrato, aplicado conforme o fabricante." },
      { titulo: "Acabamento", texto: "Demãos com intervalos respeitados e conferência com luz rasante." },
      { titulo: "Limpeza e entrega", texto: "Retirada das proteções, limpeza fina e retoques." },
    ],
    faq: [
      { q: "Pintam apartamento com móveis?", a: "Sim. Protegemos e movimentamos os móveis por ambiente, com cronograma combinado com o morador." },
      { q: "Fazem pintura de fachada de prédio?", a: "Sim, com balancim ou cadeirinha, equipe com NR-35, plano de rigging e comunicação com os moradores." },
      { q: "Quanto tempo leva para pintar um apartamento?", a: "Depende da metragem e do estado das paredes. O prazo é definido após a visita técnica e entra em contrato." },
      { q: "Quais tintas vocês usam?", a: "Especificamos tintas que atendem às normas de desempenho, na marca e na linha escolhidas pelo cliente ou pelo arquiteto." },
    ],
    complementares: ["acabamentos", "impermeabilizacao-e-coberturas", "marcenaria-e-carpintaria"],
    schemaType: "HousePainter",
    servicos: [
      { slug: "pintura-residencial", nome: "Pintura residencial", resumo: "Apartamentos e casas pintados com proteção total e obra limpa.", escopo: ["Proteção de pisos e móveis", "Tratamento de paredes e tetos", "Acabamento fosco, acetinado ou semibrilho", "Limpeza final"], normas: ["NBR 13245"] },
      { slug: "pintura-comercial", nome: "Pintura comercial", resumo: "Escritórios e lojas pintados fora do horário de operação.", escopo: ["Cronograma noturno ou em fins de semana", "Produtos de baixo odor", "Sinalização e segurança", "Entrega pronta para uso"] },
      { slug: "pintura-industrial", nome: "Pintura industrial", resumo: "Proteção anticorrosiva de estruturas e equipamentos.", escopo: ["Jateamento ou preparação mecânica", "Sistema de pintura especificado", "Medição de espessura", "Relatório de inspeção"] },
      { slug: "pintura-epoxi", nome: "Pintura epóxi", resumo: "Revestimento resistente para áreas técnicas, garagens e cozinhas industriais.", escopo: ["Preparação da superfície", "Primer epóxi", "Acabamento de alta resistência", "Demarcações"] },
      { slug: "texturas", nome: "Texturas", resumo: "Texturas e grafiatos para fachadas e paredes internas.", escopo: ["Escolha do padrão em amostra", "Preparação da base", "Aplicação uniforme", "Proteção final"] },
      { slug: "efeitos-decorativos", nome: "Efeitos decorativos", resumo: "Cimento queimado, marmorato, laca e acabamentos de autor.", escopo: ["Amostras aprovadas pelo cliente", "Aplicação por especialista", "Selagem e proteção", "Manual de conservação"] },
      { slug: "pintura-de-fachada", nome: "Pintura de fachada", resumo: "Fachadas de casas e edifícios com equipe certificada para altura.", escopo: ["Plano de acesso e rigging", "Lavagem e tratamento de fissuras", "Pintura com sistema elastomérico", "Equipe com NR-35"], normas: ["NR-35"] },
      { slug: "tratamento-de-fissuras", nome: "Tratamento de fissuras", resumo: "Diagnóstico da causa e tratamento definitivo de trincas e fissuras.", escopo: ["Diagnóstico da origem", "Abertura e tratamento", "Telas e selantes", "Repintura do pano"] },
    ],
  },
  {
    slug: "marcenaria-e-carpintaria",
    numero: "08",
    nome: "Marcenaria e Carpintaria",
    curto: "Marcenaria",
    descricao:
      "Marcenaria de alto padrão desenhada para o espaço, fabricada com precisão industrial e montada por marceneiros.",
    promessa: "Feita para o espaço, não adaptada a ele.",
    oficios: ["Marceneiro", "Carpinteiro", "Montador", "Restaurador"],
    normas: ["NBR 15930", "NBR 7190", "DOF / IBAMA"],
    imagem: "marcenaria-bancada",
    antes: "marcenaria-mesa",
    depois: "interior-corredor",
    galeria: ["marcenaria-marcacao", "marcenaria-pregador", "revestimento-cozinha", "casa-deck"],
    processo: [
      { titulo: "Medição fina", texto: "Medição a laser depois dos acabamentos de parede e piso." },
      { titulo: "Projeto executivo", texto: "Detalhamento de ferragens, fitas, puxadores e iluminação embutida." },
      { titulo: "Amostras", texto: "Lâminas, lacas e ferragens aprovadas em amostra física." },
      { titulo: "Fabricação", texto: "Corte CNC e acabamento manual nas peças aparentes." },
      { titulo: "Montagem e regulagem", texto: "Montagem limpa, regulagem de portas e gavetas, checklist final." },
    ],
    faq: [
      { q: "A madeira tem origem legal?", a: "Sim. Trabalhamos apenas com madeira de origem legal comprovada por DOF e, quando especificado, com certificação de manejo." },
      { q: "Vocês executam o projeto do meu arquiteto?", a: "Sim. Fazemos o detalhamento executivo a partir do projeto do arquiteto e submetemos para aprovação antes de fabricar." },
      { q: "Qual é o prazo de uma cozinha sob medida?", a: "Depende da complexidade. O prazo de fabricação e montagem é detalhado na proposta e entra em contrato." },
      { q: "Fazem restauro de portas e esquadrias antigas?", a: "Sim. Recuperamos peças originais, substituímos partes comprometidas e refazemos o acabamento." },
    ],
    complementares: ["acabamentos", "pintura", "instalacoes-eletricas"],
    schemaType: "GeneralContractor",
    servicos: [
      { slug: "marcenaria-sob-medida", nome: "Marcenaria sob medida", resumo: "Móveis fixos de alto padrão em lâmina natural, laca e MDF especial.", escopo: ["Medição e projeto executivo", "Amostras de acabamento", "Fabricação com CNC", "Montagem e regulagem"] },
      { slug: "cozinhas", nome: "Cozinhas", resumo: "Cozinhas planejadas integradas a eletros, bancadas e iluminação.", escopo: ["Compatibilização com eletros e pontos", "Ferragens de alto desempenho", "Integração com bancadas em pedra", "Iluminação embutida"] },
      { slug: "closets", nome: "Closets", resumo: "Closets com organização interna sob medida e iluminação.", escopo: ["Estudo de uso e organização", "Portas de vidro, laca ou lâmina", "Acessórios internos", "Iluminação com sensor"] },
      { slug: "paineis-e-ripados", nome: "Painéis e ripados", resumo: "Painéis de madeira, ripados e portas camufladas.", escopo: ["Paginação dos painéis", "Estrutura oculta", "Portas e alçapões integrados", "Acabamento em verniz ou óleo"] },
      { slug: "portas", nome: "Portas", resumo: "Portas de madeira maciça, pivotantes e camufladas.", escopo: ["Batentes e guarnições", "Folhas maciças ou semissólidas", "Ferragens e fechaduras", "Regulagem"], normas: ["NBR 15930"] },
      { slug: "esquadrias-de-madeira", nome: "Esquadrias de madeira", resumo: "Janelas e portas externas de madeira com vedação e vidro duplo.", escopo: ["Projeto e medição", "Fabricação com madeira tratada", "Vidros e vedações", "Instalação e acabamento"] },
      { slug: "decks", nome: "Decks", resumo: "Decks de madeira maciça ou composta para áreas externas e piscinas.", escopo: ["Estrutura de apoio", "Réguas com fixação oculta", "Tratamento e acabamento", "Plano de manutenção"] },
      { slug: "pergolados", nome: "Pergolados", resumo: "Pergolados em madeira laminada, com ou sem cobertura.", escopo: ["Cálculo estrutural", "Madeira laminada colada", "Cobertura em vidro ou policarbonato", "Montagem e acabamento"], normas: ["NBR 7190"] },
      { slug: "restauro-de-madeira", nome: "Restauro de madeira", resumo: "Recuperação de portas, pisos, esquadrias e móveis antigos.", escopo: ["Diagnóstico de cada peça", "Substituição de partes comprometidas", "Lixamento e tratamento", "Acabamento original"] },
    ],
  },
  {
    slug: "climatizacao-esquadrias-e-fachadas",
    numero: "09",
    nome: "Climatização, Esquadrias e Fachadas",
    curto: "Fachadas",
    descricao:
      "Conforto térmico e envoltória: ar-condicionado, esquadrias de alto desempenho, vidros e fachadas.",
    promessa: "Conforto que não aparece. Fachada que não passa despercebida.",
    oficios: ["Técnico de refrigeração", "Vidraceiro", "Montador de fachada", "Serralheiro de alumínio"],
    normas: ["NBR 16401", "NBR 10821", "NBR 7199", "NBR 15575", "NR-35"],
    imagem: "fachada-ondulada",
    antes: "concreto-predio",
    depois: "fachada-vidro",
    galeria: ["fachada-reflexo", "fachada-vidro", "casa-varandas", "casa-noite"],
    processo: [
      { titulo: "Carga térmica e desempenho", texto: "Cálculo de carga térmica e especificação de vidros por orientação solar." },
      { titulo: "Projeto e compatibilização", texto: "Drenos, infraestrutura e vãos definidos antes da alvenaria." },
      { titulo: "Infraestrutura", texto: "Tubulação frigorígena, drenos e contramarcos executados na fase bruta." },
      { titulo: "Instalação", texto: "Equipamentos, esquadrias e vidros instalados na fase de acabamento." },
      { titulo: "Testes e comissionamento", texto: "Teste de estanqueidade, vácuo, carga de gás e medição de desempenho." },
    ],
    faq: [
      { q: "Split ou VRF: qual escolher?", a: "Para poucos ambientes, split costuma ser suficiente. Para casas grandes e escritórios, o VRF reduz o número de condensadoras e o consumo. A escolha sai do cálculo de carga térmica." },
      { q: "Instalam esquadrias com isolamento acústico?", a: "Sim. Especificamos perfis e vidros laminados ou insulados conforme o nível de ruído do entorno." },
      { q: "Fazem fachada em pele de vidro?", a: "Sim, com projeto de fixação, ensaios de estanqueidade e equipe certificada para altura." },
      { q: "Fazem manutenção de ar-condicionado?", a: "Sim, com plano de manutenção preventiva e PMOC para empresas." },
    ],
    complementares: ["instalacoes-eletricas", "metal-e-solda", "engenharia-projetos-e-gestao"],
    schemaType: "HVACBusiness",
    servicos: [
      { slug: "ar-condicionado-split", nome: "Ar-condicionado split", resumo: "Instalação de splits com infraestrutura embutida e dreno correto.", escopo: ["Cálculo de carga térmica", "Infraestrutura frigorígena", "Instalação e vácuo", "Teste e entrega"] },
      { slug: "vrf", nome: "Sistemas VRF", resumo: "Climatização central para casas grandes, escritórios e lojas.", escopo: ["Projeto e seleção de equipamentos", "Rede frigorígena e drenos", "Comissionamento", "Integração com automação"], normas: ["NBR 16401"] },
      { slug: "exaustao", nome: "Exaustão", resumo: "Exaustão de cozinhas, banheiros e áreas técnicas.", escopo: ["Dimensionamento de vazão", "Dutos e coifas", "Exaustores e controle", "Medição de desempenho"] },
      { slug: "esquadrias-de-aluminio", nome: "Esquadrias de alumínio", resumo: "Janelas e portas de alto desempenho com vedação e acústica.", escopo: ["Especificação de linha e vidro", "Contramarcos na fase bruta", "Instalação e vedação", "Teste de estanqueidade"], normas: ["NBR 10821"] },
      { slug: "vidros", nome: "Vidros", resumo: "Vidros temperados, laminados e insulados para fechamentos e divisórias.", escopo: ["Especificação por segurança e desempenho", "Medição e fabricação", "Instalação com ferragens", "Vedação e limpeza"], normas: ["NBR 7199"] },
      { slug: "pele-de-vidro", nome: "Pele de vidro", resumo: "Fachadas cortina em vidro para edifícios corporativos.", escopo: ["Projeto de fixação", "Estrutura de ancoragem", "Montagem dos módulos", "Ensaio de estanqueidade"] },
      { slug: "acm", nome: "Fachadas em ACM", resumo: "Revestimento de fachada em alumínio composto.", escopo: ["Paginação e detalhamento", "Estrutura auxiliar", "Instalação dos painéis", "Vedação das juntas"] },
      { slug: "fachada-ventilada", nome: "Fachada ventilada", resumo: "Revestimento externo com câmara de ar para desempenho térmico.", escopo: ["Projeto de ancoragem", "Estrutura em alumínio", "Placas cerâmicas, pedra ou compósito", "Arremates e juntas"] },
    ],
  },
  {
    slug: "engenharia-projetos-e-gestao",
    numero: "10",
    nome: "Engenharia, Projetos e Gestão",
    curto: "Engenharia",
    descricao:
      "O cérebro da obra: projetos compatibilizados em BIM, orçamento, gerenciamento, laudos e regularização.",
    promessa: "Obra bem feita começa no papel.",
    oficios: ["Engenheiro civil", "Engenheiro eletricista", "Arquiteto", "Orçamentista", "Gestor de obra"],
    normas: ["NBR 16636", "NBR 16280", "NBR 5674", "NBR 13752", "ISO 19650"],
    imagem: "obra-planta",
    antes: "projeto-pranchas",
    depois: "casa-concreto",
    galeria: ["projeto-desenho", "projeto-planta", "projeto-pranchas", "obra-equipe"],
    processo: [
      { titulo: "Diagnóstico", texto: "Visita técnica, levantamento e leitura de todos os projetos existentes." },
      { titulo: "Projetos e compatibilização", texto: "Modelo BIM federado com detecção de interferências." },
      { titulo: "Orçamento executivo", texto: "Quantitativos extraídos do modelo e preço fechado por etapa." },
      { titulo: "Planejamento", texto: "Cronograma físico-financeiro com caminho crítico e marcos contratuais." },
      { titulo: "Gestão e controle", texto: "Relatórios semanais, medições e indicadores no portal do cliente." },
    ],
    faq: [
      { q: "Vocês fazem o projeto de arquitetura?", a: "Trabalhamos com escritórios de arquitetura parceiros ou com o arquiteto do cliente. Nossa equipe faz os projetos complementares e a compatibilização." },
      { q: "O que é a NBR 16280 e por que importa na reforma de apartamento?", a: "É a norma de gestão de reformas em edificações. Exige um plano de reforma com responsável técnico, aprovado pelo condomínio antes do início. Cuidamos de todo o processo." },
      { q: "Fazem só o gerenciamento, com outra construtora executando?", a: "Sim. Oferecemos gerenciamento independente, com controle de prazo, custo e qualidade em nome do cliente." },
      { q: "Emitem laudos técnicos?", a: "Sim: laudos de vistoria, inspeção predial, patologias e perícias, com ART." },
    ],
    complementares: ["estrutura-e-alvenaria", "instalacoes-eletricas", "hidraulica-e-gas"],
    schemaType: "GeneralContractor",
    servicos: [
      { slug: "projetos-complementares", nome: "Projetos complementares", resumo: "Estrutural, elétrico, hidráulico, ar-condicionado e luminotécnico.", escopo: ["Projetos por disciplina", "Memoriais e especificações", "Compatibilização entre disciplinas", "ART de projeto"], normas: ["NBR 16636"] },
      { slug: "compatibilizacao-bim", nome: "Compatibilização BIM", resumo: "Modelo federado que elimina interferências antes da obra.", escopo: ["Modelagem por disciplina", "Detecção de conflitos", "Relatórios de interferência", "Modelo final para execução"], normas: ["ISO 19650"] },
      { slug: "orcamento-de-obra", nome: "Orçamento de obra", resumo: "Orçamento executivo com quantitativos e composição de custos.", escopo: ["Levantamento de quantitativos", "Cotação de materiais", "Composição de custos", "Curva ABC e cronograma de desembolso"] },
      { slug: "gerenciamento-de-obra", nome: "Gerenciamento de obra", resumo: "Gestão de prazo, custo e qualidade com relatórios semanais.", escopo: ["Planejamento e cronograma", "Gestão de fornecedores", "Medições e controle de custo", "Relatórios e indicadores"] },
      { slug: "laudos-tecnicos", nome: "Laudos técnicos", resumo: "Vistorias, inspeção predial, patologias e perícias.", escopo: ["Vistoria técnica", "Ensaios quando necessário", "Laudo com diagnóstico e recomendações", "ART"], normas: ["NBR 13752"] },
      { slug: "regularizacao-e-alvaras", nome: "Regularização e alvarás", resumo: "Alvarás de obra, habite-se e regularização de imóveis.", escopo: ["Levantamento documental", "Projetos legais", "Protocolo e acompanhamento", "Habite-se e averbação"] },
      { slug: "retrofit", nome: "Retrofit", resumo: "Modernização completa de edifícios e casas existentes.", escopo: ["Diagnóstico do existente", "Projeto de requalificação", "Execução por etapas", "Atualização de instalações e fachada"] },
      { slug: "manutencao-predial", nome: "Manutenção predial programada", resumo: "Contratos recorrentes com SLA para condomínios e empresas.", escopo: ["Plano de manutenção", "Equipe dedicada ou volante", "Atendimento com SLA", "Relatórios mensais"], normas: ["NBR 5674"] },
    ],
  },
];

export const getDisciplina = (slug: string) => disciplinas.find((d) => d.slug === slug);

export const getServico = (dSlug: string, sSlug: string) => {
  const d = getDisciplina(dSlug);
  const s = d?.servicos.find((x) => x.slug === sSlug);
  return d && s ? { disciplina: d, servico: s } : undefined;
};

export const allServicos = disciplinas.flatMap((d) =>
  d.servicos.map((s) => ({ ...s, disciplina: d.slug, disciplinaNome: d.nome, numero: d.numero })),
);

export const totalServicos = allServicos.length;

export const modalidades = [
  {
    nome: "Serviço avulso",
    ideal: "Quem precisa de uma especialidade com escopo fechado.",
    exemplo: "Pintura completa de uma cobertura.",
    como: ["Visita técnica e escopo", "Preço fechado", "Execução com especialista", "Garantia do serviço"],
    cta: "Orçar serviço",
    tipo: "avulso",
  },
  {
    nome: "Obra completa",
    ideal: "Reformas completas e obras novas, chave na mão.",
    exemplo: "Reforma integral de um apartamento de 300 m².",
    como: ["Projeto e compatibilização", "Todas as disciplinas sob um contrato", "Gestor de obra dedicado", "Entrega com checklist e garantia"],
    cta: "Planejar obra completa",
    tipo: "completa",
    destaque: true,
  },
  {
    nome: "Contrato recorrente",
    ideal: "Condomínios, redes e empresas com manutenção contínua.",
    exemplo: "Manutenção predial de um edifício corporativo.",
    como: ["Plano de manutenção", "SLA mensal em contrato", "Equipe dedicada ou volante", "Relatórios e indicadores"],
    cta: "Contratar manutenção",
    tipo: "manutencao",
  },
] as const;
