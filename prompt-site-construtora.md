# PROMPT MESTRE — Site de alto padrão | LASTRO Engenharia Integrada

> **Como usar:** cole este documento inteiro na ferramenta de construção (Lovable, v0, Bolt, Cursor ou Claude Code).
> Se a ferramenta tiver limite de caracteres, cole a **Parte 0 + Parte 8 (design system)** primeiro e depois **uma fase por vez** conforme a Parte 12.
> **LASTRO** é um nome provisório. Troque pelo nome real em todo o documento antes de usar.

---

## PARTE 0 — Seu papel e a missão

Você é um time sênior completo: **diretor de criação** de estúdio premiado no Awwwards, **engenheiro front-end** especialista em Next.js e animação de alta performance, **estrategista de marca** para B2B de alto ticket e **copywriter de conversão**.

Você vai construir o site da **LASTRO Engenharia Integrada**: uma construtora de alto padrão que entrega **todas as especialidades de obra sob um único contrato**, da fundação ao último detalhe de marcenaria. Pedreiro, soldador, eletricista, encanador, marceneiro, pintor, gesseiro, vidraceiro, serralheiro e engenharia: tudo com uma gestão, uma responsabilidade técnica e uma garantia.

**O site tem três missões, nesta ordem de prioridade:**
1. **Converter compradores de alto ticket** (residencial alto padrão, corporativo, incorporadoras, indústria) em pedidos de proposta qualificados.
2. **Convencer investidores e parceiros** de que esta é uma empresa sólida, bem governada e escalável.
3. **Atrair os melhores profissionais de ofício** para a rede LASTRO.

**Régua de qualidade.** A empresa deve parecer do porte das grandes construtoras globais (Bechtel, Turner, Mortenson, Suffolk, Mace), com a estética dos sites de arquitetura e real estate premiados no Awwwards em 2026 (SANTAL, Belgrade Arbor, Sobha Privy Collection, ERA Residence, Kononenko Architectural Bureau). **Não copie nenhum deles.** Use-os só como régua de acabamento.

**Regra de honestidade (obrigatória).** Todo número, certificação, cliente, depoimento ou data entre colchetes `[ ]` é **placeholder**. Mostre-os normalmente no layout, mas:
- marque o elemento no código com `data-placeholder="true"`;
- liste todos em um arquivo `/PLACEHOLDERS.md` (página, texto, o que precisa ser confirmado);
- nunca use logos, nomes ou marcas de empresas reais como clientes. Use marcas fictícias genéricas;
- nunca escreva lorem ipsum. Use a copy desta especificação.

---

## PARTE 1 — Posicionamento e mensagem

**O problema que resolvemos.**
Quem constrói ou reforma em alto padrão coordena hoje de 10 a 15 fornecedores: pedreiro, eletricista, encanador, serralheiro, marceneiro, pintor, gesseiro, vidraceiro... Cada um tem o seu prazo, a sua desculpa e a sua nota. Quando algo dá errado, a culpa é sempre do outro.

**A nossa promessa.**
Um contrato. Um responsável técnico. Todas as disciplinas. Preço fechado, prazo em contrato e garantia por escrito.

**Proposta de valor (uma linha):** *Do alicerce ao acabamento. Um só contrato.*

**Os cinco pilares** (aparecem em todo o site):
1. **Responsabilidade única:** um gestor de obra dedicado, ART emitida, um só ponto de contato.
2. **Mestres de ofício:** profissionais certificados e avaliados a cada obra.
3. **Previsibilidade:** cronograma físico-financeiro, preço fechado e multa por atraso em contrato `[confirmar política comercial]`.
4. **Transparência total:** portal do cliente com diário de obra, fotos diárias, medições e documentos.
5. **Governança:** programa de integridade, normas ABNT, segurança NR-18 e ESG.

**Tom de voz.**
- Confiante, preciso e sóbrio. Frases curtas e verbos fortes.
- Números concretos no lugar de adjetivos.
- Fala como um engenheiro que entende de negócio.
- Sem pontos de exclamação.
- Clichês proibidos: "qualidade e excelência", "realizando sonhos", "soluções completas", "o melhor do mercado", "compromisso com o cliente".

**Gatilhos de persuasão (sempre com ética):**
| Gatilho | Como aplicar |
|---|---|
| Autoridade | Normas citadas pelo número, certificações, ART/CREA, responsável técnico com nome e foto |
| Prova | Estudos de caso com métricas: prazo previsto × real, m², orçamento × executado |
| Redução de risco | Preço fechado, garantia estendida, multa por atraso, seguro de obra |
| Ancoragem | "Um contrato substitui até 15 fornecedores" |
| Exclusividade real | Executivo sênior dedicado para projetos acima de `[R$ 1 milhão]` |
| **Proibido** | Escassez falsa, contador regressivo, pop-up de saída, "últimas vagas" |

---

## PARTE 2 — Públicos e jornadas

| Público | O que precisa ver | CTA principal |
|---|---|---|
| **Residencial alto padrão** (casas, coberturas, reformas completas) | Portfólio fotográfico, acabamento, discrição, obra limpa | "Agendar visita técnica" |
| **Corporativo e varejo** (escritórios, lojas, expansão de redes) | Prazo, obra noturna, escala nacional, SLA | "Solicitar proposta corporativa" |
| **Incorporadoras e fundos imobiliários** | Capacidade de execução, BIM, custo/m², governança | "Falar com a diretoria comercial" |
| **Indústria e logística** | Estrutura metálica, solda qualificada, NRs, paradas programadas | "Solicitar visita de engenharia" |
| **Condomínios e facilities** | Manutenção recorrente, SLA, contrato anual | "Contratar manutenção" |
| **Investidores** | Tese, mercado, modelo de negócio, KPIs, governança | "Solicitar acesso ao data room" |
| **Profissionais de ofício** | Pagamento em dia, segurança, crescimento, obras organizadas | "Quero fazer parte da rede" |

Cada público precisa achar seu caminho em **um clique**: pelo seletor "Sou..." no hero ou pelo mega-menu "Soluções".

---

## PARTE 3 — Catálogo completo de serviços

Organize tudo em **10 disciplinas**. Cada serviço tem página própria (`/servicos/[disciplina]/[servico]`) gerada a partir do CMS.

| # | Disciplina | Serviços | Ofícios |
|---|---|---|---|
| 01 | **Estrutura e Alvenaria** | Fundações, concreto armado, alvenaria estrutural e de vedação, contrapiso, chapisco e reboco, drywall, steel frame, demolição controlada | Pedreiro, armador, carpinteiro de fôrma |
| 02 | **Metal e Solda** | Estruturas metálicas, mezaninos, escadas, guarda-corpos, portões, serralheria fina, caldeiraria, solda MIG/MAG, TIG e eletrodo revestido, inspeção de solda | Soldador qualificado, serralheiro, montador |
| 03 | **Instalações Elétricas** | Baixa tensão (NBR 5410), quadros e painéis, SPDA (NBR 5419), subestação, energia solar fotovoltaica, carregador de veículo elétrico, cabeamento estruturado, automação residencial e predial, iluminação cênica | Eletricista NR-10 |
| 04 | **Hidráulica e Gás** | Hidrossanitária, água quente, pressurização, gás GLP/GN, reúso e captação de chuva, piscinas e spas | Encanador, bombeiro hidráulico |
| 05 | **Impermeabilização e Coberturas** | Mantas e membranas, lajes, telhados, calhas e rufos, telhado verde | Impermeabilizador, telhadista |
| 06 | **Acabamentos** | Porcelanato de grande formato, mármore e granito, pisos de madeira, vinílicos, microcimento, epóxi, gesso, sancas e forros | Azulejista, marmorista, gesseiro |
| 07 | **Pintura** | Residencial, comercial e industrial, epóxi, texturas, efeitos decorativos, fachada com balancim (NR-35), tratamento de fissuras | Pintor |
| 08 | **Marcenaria e Carpintaria** | Marcenaria sob medida de alto padrão, cozinhas, closets, painéis, portas, esquadrias de madeira, decks, pergolados, restauro | Marceneiro, carpinteiro |
| 09 | **Climatização, Esquadrias e Fachadas** | Ar-condicionado split e VRF, exaustão, esquadrias de alumínio, vidros, pele de vidro, ACM, fachada ventilada | Técnico de refrigeração, vidraceiro |
| 10 | **Engenharia, Projetos e Gestão** | Projetos complementares, compatibilização BIM, orçamento, gerenciamento de obra, laudos técnicos, regularização e alvarás, retrofit, manutenção predial programada | Engenheiros, arquitetos parceiros |

**Modalidades de contratação** (3 cards lado a lado):
1. **Serviço avulso:** uma especialidade, escopo fechado. *Ex.: pintura completa de uma cobertura.*
2. **Obra completa (turnkey):** todas as disciplinas, chave na mão.
3. **Contrato recorrente:** manutenção e facilities com SLA mensal.

**Template da página de serviço:**
1. Hero com foto ou vídeo do ofício em close (mãos, ferramenta, textura), título, uma frase de promessa e CTA.
2. **O que está incluído:** escopo em lista técnica.
3. **Normas e certificações aplicáveis:** NBR e NR pelo número.
4. **Processo** em etapas, específico do serviço.
5. **Antes e depois** com slider de comparação arrastável.
6. **Projetos relacionados.**
7. **Serviços complementares** ("quem contrata pintura também contrata gesso e marcenaria"). É o caminho de venda cruzada para a obra completa.
8. **FAQ** com schema `FAQPage`.
9. **CTA final:** orçamento já preenchido com esse serviço.

---

## PARTE 4 — Mapa do site

```
/                                  Home
/servicos                          Catálogo (10 disciplinas + busca)
/servicos/[disciplina]             Página da disciplina
/servicos/[disciplina]/[servico]   Página do serviço
/solucoes/residencial-alto-padrao
/solucoes/corporativo-e-varejo
/solucoes/incorporadoras
/solucoes/industria-e-logistica
/solucoes/condominios-e-facilities
/projetos                          Portfólio com filtros e mapa
/projetos/[slug]                   Estudo de caso
/metodo                            Método LASTRO + garantias
/investidores                      Relações com investidores
/sobre                             História, liderança, governança
/sobre/integridade                 Programa de compliance
/esg-e-seguranca
/rede-de-mestres                   Carreiras e profissionais parceiros
/insights                          Artigos e guias
/insights/[slug]
/orcamento                         Configurador de orçamento
/portal                            Portal do cliente (demonstração)
/contato
/canal-de-etica                    Denúncia anônima
/privacidade  /termos  /cookies
/[cidade]/[servico]                SEO local (só cidades atendidas)
```

**Header:** logo à esquerda. No centro: Serviços (mega-menu), Soluções, Projetos, Método, Investidores, Sobre. À direita: ícone de busca (⌘K), botão "Solicitar proposta". O header fica transparente sobre o hero, ganha fundo sólido com blur ao rolar, esconde ao rolar para baixo e reaparece ao rolar para cima.

**Mega-menu de Serviços:** 10 colunas compactas (número + disciplina + 4 serviços principais). Do lado direito, um painel com a foto da disciplina sob o hover e o link "Ver todas as especialidades".

**Mobile:** menu em tela cheia com links grandes em tipografia display e entrada escalonada. Barra fixa inferior na zona do polegar com "Orçamento" e "WhatsApp".

---

## PARTE 5 — Home, seção por seção (com copy final)

### S01 — Preloader (só na primeira visita, no máximo 1,2 s)
Contador de 0 a 100 em fonte mono, com uma linha de cota (seta ↔ e medida) sendo desenhada. Depois, uma cortina grafite sobe e revela o hero. Use `sessionStorage` para não repetir na mesma sessão.

### S02 — Hero
- **Fundo:** vídeo full-bleed com cortes de 2 a 3 s: faísca de solda, mão alisando reboco, marceneiro passando a plaina, fachada pronta ao entardecer, drone de obra. Escureça com um gradiente de baixo para cima. **O poster é o elemento LCP**, e o vídeo só carrega depois do primeiro paint.
- **Rótulo mono:** `[ ENGENHARIA INTEGRADA — 40+ ESPECIALIDADES ]`
- **H1:** **Do alicerce ao acabamento.** *Um só contrato.* (a segunda frase vai em serif itálico)
- **Subtítulo:** Pedreiros, soldadores, eletricistas, marceneiros, pintores e engenheiros. Mais de `[40]` especialidades sob uma única gestão, com preço fechado, prazo em contrato e garantia por escrito.
- **CTAs:** `Solicitar proposta` (primário) · `Ver obras entregues` (secundário) · link `Área do investidor →`
- **Seletor de público** no rodapé do hero (chips): *Proprietário · Empresa · Incorporadora · Indústria · Investidor*. A escolha troca o subtítulo e o CTA principal sem recarregar a página (personalize só esses 2 slots, com dimensões reservadas para não gerar CLS) e fica salva em `localStorage`.
- **Canto inferior direito, em mono:** coordenadas da obra mostrada no vídeo, atualizadas a cada corte (`-23.5874° S / -46.6576° W`).
- Indicador de scroll com uma linha vertical animada.

### S03 — Faixa de prova (contadores animados ao entrar na tela)
`[1.200+]` obras entregues · `[380 mil m²]` construídos e reformados · `[40+]` especialidades · `[97%]` das obras entregues no prazo · `[0]` acidentes com afastamento em `[2026]`
Números enormes em display condensada, rótulos em mono e separadores verticais de 1px.

### S04 — "A obra em camadas" (a assinatura do site)
- **Título:** Uma obra são 40 ofícios. *Nós orquestramos todos.*
- **Mecânica:** seção fixada (pinned) com cerca de 400vh de rolagem. À esquerda, um modelo axonométrico de uma casa de alto padrão se monta camada por camada conforme o usuário rola. À direita, o painel mostra o número da etapa, a disciplina, uma frase, os ofícios envolvidos e as normas.
- **Etapas:**
  1. **Fundação e estrutura:** pedreiro, armador. *"Tudo começa no que ninguém vê."*
  2. **Estrutura metálica:** soldador, montador. *"Aço qualificado, solda inspecionada."*
  3. **Elétrica e hidráulica:** eletricista NR-10, encanador. *"A infraestrutura que a casa vai usar por 50 anos."*
  4. **Impermeabilização e cobertura.** *"Garantia começa na laje."*
  5. **Esquadrias e fachada:** vidraceiro, serralheiro.
  6. **Acabamentos e pintura:** azulejista, marmorista, gesseiro, pintor. *"O milímetro que separa o bom do impecável."*
  7. **Marcenaria:** marceneiro. *"Feita para o espaço, não adaptada a ele."*
  8. **Entrega:** checklist de `[200]` itens, manual do proprietário, garantia.
- Uma régua horizontal com cotas mostra o progresso (01 a 08).
- **Implementação:** React Three Fiber com um GLB cujas camadas são nomeadas (cada camada desce do alto até o lugar com easing). Carregue sob demanda, só no desktop e com GPU adequada. **Fallback:** camadas em PNG/SVG em perspectiva explodida que se encaixam com `translateY`.
- **Mobile:** stepper vertical com imagem por etapa.
- **`prefers-reduced-motion`:** grade estática com 8 cards.

### S05 — Bento das disciplinas
- **Título:** Todas as especialidades. *Um só padrão.*
- Grade bento assimétrica com 10 tiles de tamanhos variados (Estrutura e Acabamentos em destaque).
- **Cada tile:** foto, número em mono (`DISC. 03`), nome da disciplina e 3 serviços.
- **Hover:** zoom de 1.04 na imagem, revela a lista completa e a seta desliza.
- **Tile extra:** "Procurando algo específico?" abre a busca ⌘K com todos os serviços.
- Use `aspect-ratio` em todos os tiles para evitar CLS. O DOM segue a ordem de prioridade e a reorganização por breakpoint é feita com `grid-template-areas`, nunca com `order`.

### S06 — Modalidades
- **Título:** Do reparo pontual à obra completa.
- 3 cards (Serviço avulso / Obra completa / Contrato recorrente), cada um com "Ideal para", "Como funciona" e CTA.
- **Card do meio em destaque** (fundo concreto claro sobre a seção escura), com o selo "Mais escolhido por clientes alto padrão" `[confirmar]`.

### S07 — Projetos em destaque
- **Título:** Obras que falam *por nós.*
- Galeria horizontal fixada (scroll vertical vira movimento horizontal), com 6 cards grandes.
- **Cada card:** imagem, nome do projeto, cidade, área em m², prazo e chips com as disciplinas envolvidas.
- **Cursor customizado:** círculo "VER OBRA" sobre os cards.
- Fecha com o link `Explorar portfólio completo →`.

### S08 — Método LASTRO
- **Título:** Seis etapas. *Nenhuma surpresa.*
- **Linha do tempo** horizontal em SVG desenhada conforme o scroll:
  1. **Visita técnica e diagnóstico:** em até `[48 h]`.
  2. **Projeto e compatibilização BIM.**
  3. **Proposta com preço fechado:** escopo, cronograma e cláusulas claras.
  4. **Execução com gestor dedicado:** relatórios semanais e fotos diárias no portal.
  5. **Entrega com checklist** de `[200]` itens.
  6. **Garantia e manutenção:** canal direto de pós-obra.

### S09 — Garantias
- **Título:** O risco é *nosso.*
- **4 colunas com ícones de traço fino:**
  - **Preço fechado em contrato:** sem aditivos surpresa.
  - **Prazo com multa por atraso** `[confirmar política]`.
  - **Garantia por escrito:** solidez e segurança conforme o Código Civil, mais garantia estendida de `[X anos]` em acabamentos e instalações.
  - **Seguro de obra e responsabilidade civil.**
- **Nota de rodapé:** "Condições detalhadas em contrato." **Valide todos os textos de garantia com o jurídico antes de publicar.**

### S10 — Mestres de ofício
- **Título:** Por trás de cada detalhe, *um mestre.*
- Carrossel com retratos em preto e branco (o retrato fica colorido no hover).
- **Cada card:** nome, ofício, anos de experiência, certificações e uma frase curta.
  *Ex.: "Jorge `[sobrenome]` — Soldador TIG — 22 anos — 'Solda boa é a que ninguém precisa refazer.'"*
- **CTAs:** `Conheça a rede` · `Seja um profissional LASTRO`.

### S11 — Para quem construímos
- Lista em tipografia display gigante, uma linha por público (Residencial alto padrão / Corporativo e varejo / Incorporadoras / Indústria e logística / Condomínios).
- **Hover:** uma imagem flutuante segue o cursor e a linha desliza levemente. É o padrão clássico dos sites premiados.
- **Mobile:** acordeão com imagem.

### S12 — Prova social
- 2 ou 3 depoimentos em vídeo curto (com legenda e controle de pausa) e citações em serif grande.
- **Esteira de logos** (marquee lento, com pausa no hover e botão de pausa) de clientes fictícios `[substituir por clientes reais com autorização]`.

### S13 — Segurança e ESG
- **Título:** Segurança não é departamento. *É método.*
- **Contadores:** `[1.430]` dias sem acidente com afastamento · `[12 mil]` horas de treinamento por ano · `[92%]` dos resíduos destinados conforme a CONAMA 307.
- **Selos:** ISO 9001 · ISO 14001 · ISO 45001 · PBQP-H `[marcar "em certificação" se ainda não houver]`.
- **Regra visual:** toda foto de obra mostra profissionais com EPI completo e correto.

### S14 — Chamada para investidores (seção escura com detalhes em latão)
- **Rótulo mono:** `[ RELAÇÕES COM INVESTIDORES ]`
- **Título:** Um dos maiores mercados do país. *Um dos mais fragmentados.*
- **Texto:** A construção movimenta `[R$ X bilhões]` por ano no Brasil `[fonte: CBIC / IBGE-PAIC]`, e a maior parte ainda é executada por prestadores informais e sem padrão. A LASTRO é a camada que organiza esse mercado: engenharia, garantia e tecnologia sobre uma rede certificada de mestres de ofício.
- **3 KPIs:** crescimento `[X%]` ao ano · `[X%]` de receita recorrente · backlog de `[R$ X mi]`.
- **CTA:** `Conheça a tese de investimento →`

### S15 — Insights
- 3 artigos em destaque (guias práticos e técnicos que atraem compradores qualificados por SEO).
- **Ex.:** "Quanto custa reformar uma cobertura de alto padrão em 2026", "Steel frame ou alvenaria: guia para incorporadores", "NR-10 na prática: o que exigir do seu eletricista".

### S16 — CTA final e rodapé
- Tipografia gigante: **Vamos construir?**, com botão magnético `Solicitar proposta`.
- **Ao lado, 3 caminhos:** WhatsApp · Telefone · Agendar visita técnica.
- **Rodapé completo (mega-footer):**
  - todos os links de serviços (ajuda o SEO), soluções, empresa e investidores;
  - escritórios com endereços `[placeholder]`;
  - razão social, CNPJ e registro CREA `[placeholder]`;
  - Canal de Ética, Privacidade, Termos e Cookies;
  - redes sociais.
- O wordmark **LASTRO** gigante encerra a página, cortado na base da tela.

---

## PARTE 6 — Página de Investidores (`/investidores`)

Disponível em **pt-BR e EN**.

1. **Hero:** *"Construção é um dos maiores mercados do Brasil. E um dos menos organizados. Nós somos a camada que o organiza."*
2. **A tese em 5 pontos** (cards numerados):
   1. Mercado gigante, informal e fragmentado `[dados com fonte]`.
   2. Demanda reprimida por um responsável único com garantia.
   3. **Modelo híbrido e leve em ativos:** núcleo próprio de engenharia e gestão mais uma rede certificada de profissionais.
   4. **Receita recorrente** com contratos de manutenção e facilities.
   5. **Tecnologia proprietária:** orçamento, gestão da rede, portal do cliente e dados de produtividade.
3. **Diagrama do modelo de negócio** (SVG animado): Cliente → LASTRO (engenharia, gestão, garantia, tecnologia) → Rede de mestres certificados → Entrega e pós-obra, com as fontes de receita destacadas.
4. **Painel de KPIs** (gráficos animados, dados do CMS, todos `[placeholder]`): receita, crescimento anual, margem bruta, backlog, % recorrente, ticket médio, NPS, número de profissionais na rede.
5. **Mapa de expansão** (Mapbox monocromático): cidades atendidas hoje e praças planejadas.
6. **Governança e integridade:**
   - conselho de administração `[estrutura]`;
   - auditoria independente;
   - programa de integridade alinhado à Lei Anticorrupção (Lei 12.846/2013);
   - canal de ética independente;
   - due diligence de fornecedores;
   - política de partes relacionadas.

   *Essa seção pesa muito para investidores. Dê destaque visual a ela.*
7. **Liderança:** retratos, cargo e trajetória resumida.
8. **Documentos:** apresentação institucional, one-pager e relatórios, todos com download protegido por formulário.
9. **CTA "Solicitar acesso ao data room"**, com formulário: nome, empresa/fundo, cargo, tipo de investidor (VC, private equity, family office, estratégico, anjo), faixa de ticket, e-mail corporativo e aceite de NDA. O lead vai direto para o RI.
10. **Disclaimer no rodapé da página:** "As informações desta página têm caráter institucional e não constituem oferta ou solicitação de investimento em valores mobiliários."

---

## PARTE 7 — Motores de conversão

### 7.1 Configurador de orçamento (`/orcamento`)
Uma pergunta por tela, barra de progresso, botões grandes na zona do polegar, progresso salvo localmente e botão "voltar" sempre visível.

1. **Tipo de projeto:** Serviço avulso / Reforma completa / Obra nova / Manutenção recorrente.
2. **Imóvel:** Apartamento, Casa, Cobertura, Escritório, Loja, Galpão/Indústria, Condomínio.
3. **Serviços:** seleção múltipla por disciplina, com ícones. Vem pré-marcado quando o visitante chega de uma página de serviço.
4. **Dimensões:** área em m² (slider + campo) e número de ambientes.
5. **Padrão de acabamento:** Alto padrão / Premium / Assinatura, com fotos de referência.
6. **Prazo:** data desejada de início e de conclusão.
7. **Local:** CEP com autocompletar via API ViaCEP e verificação da área de atendimento.
8. **Arquivos:** fotos, planta ou projeto (arrastar e soltar; PDF, DWG, JPG, PNG).
9. **Investimento previsto:** até R$ 50 mil / R$ 50–250 mil / R$ 250 mil–1 mi / R$ 1–5 mi / acima de R$ 5 mi.
10. **Contato:** nome, e-mail, WhatsApp, melhor horário e consentimento LGPD.

**Tela final:**
- resumo do pedido;
- **faixa de investimento indicativa**, calculada com uma tabela de custo/m² editável no CMS e sempre com o aviso "estimativa indicativa; valor final após visita técnica";
- agenda de horários para a visita técnica;
- botão de WhatsApp com mensagem pré-preenchida com o resumo.

**Lead scoring:** faixa ≥ R$ 1 mi ou perfil Incorporadora/Indústria recebe a tag **Prioridade A** e vai para o diretor comercial com notificação imediata. O lead também é enviado para o CRM (RD Station, HubSpot ou Pipedrive, via webhook).

### 7.2 Portal do cliente (`/portal`, versão de demonstração com dados fictícios)
Mostra ao comprador o nível de controle que ele terá. Só a interface, sem backend real nesta fase.
- Login por link mágico.
- Painel da obra: % concluído, cronograma Gantt, próximas etapas.
- Diário de obra com fotos datadas e geolocalizadas.
- Medições e pagamentos.
- Documentos: contrato, ART, notas fiscais, projetos.
- Chamados de garantia.
- Chat com o gestor da obra.

Exiba o selo "Demonstração" no topo.

### 7.3 Outros pontos de conversão
- **WhatsApp:** botão flutuante discreto, sem animação chamativa, com mensagem pré-preenchida conforme a página (`wa.me`).
- **Agendamento de visita técnica** integrado (estilo Cal.com).
- **Formulário curto de contato** em todas as páginas de serviço e de solução.
- **Assistente com IA (opcional):** chat "Fale com um especialista" que responde dúvidas sobre os serviços e pré-preenche o orçamento. Só carrega na primeira interação (para não pesar no INP), fica restrito ao escopo da empresa e repassa para um humano quando necessário.

### 7.4 Rede de Mestres (`/rede-de-mestres`)
Linguagem simples e direta, pensada para celular.
- **Título:** Seu ofício merece obra de primeira.
- **Benefícios:** pagamento em dia `[em até X dias]`, obras organizadas e seguras, EPI fornecido, treinamento e certificação, avaliação justa com progressão (**Profissional → Especialista → Mestre**).
- **Formulário:** ofício, anos de experiência, cidade, certificações (NR-10, NR-35, solda qualificada), fotos de trabalhos, MEI/CNPJ ou CLT. Também dá para se candidatar pelo WhatsApp.
- **Vagas** com schema `JobPosting`.

### 7.5 Portfólio (`/projetos`) e estudo de caso
- **Listagem:** filtros por setor, disciplina, cidade, porte e ano. Alterna entre grade, lista e mapa. A transição dos filtros é animada.
- **Estudo de caso:**
  - hero full-bleed;
  - ficha técnica em mono (cliente `[confidencial]`, local, área, prazo previsto × real, disciplinas, tamanho da equipe);
  - narrativa Desafio → Solução → Resultado com números;
  - galeria, slider de antes e depois, vídeo de drone e depoimento;
  - projetos semelhantes;
  - CTA "Quero um projeto como este".

---

## PARTE 8 — Direção de arte e design system

**Conceito:** *Precisão de projeto, presença de monumento.*
A linguagem visual vem do **desenho técnico** (grid de prancha, cotas, carimbos, códigos de norma) combinada com **fotografia editorial** e **tipografia monumental**.

### Motivos visuais
- **Grid de prancha:** linhas de 1px com opacidade de 6 a 8%, visíveis em algumas seções.
- **Cotas** (linha com setas e medida) como divisores de seção, desenhadas no scroll.
- **Rótulos técnicos em mono:** `§ 03 — INSTALAÇÕES ELÉTRICAS — NBR 5410`, `FOLHA 04/16`.
- **Textura de grão** sutil (SVG `feTurbulence`, opacidade de 3 a 4%) sobre as áreas escuras.
- Cantos retos (border-radius 0) em botões e cards. Formato pill só nos chips. Bordas de 1px, sem sombras.

### Paleta (tokens)
```css
--graphite-950: #0D0D0C;   /* fundo escuro principal */
--graphite-800: #1C1C1A;   /* superfícies escuras */
--concrete-100: #EEEBE5;   /* fundo claro (concreto polido) */
--concrete-300: #D6D1C7;   /* linhas e superfícies claras */
--stone-500:    #8B857A;   /* texto secundário (só sobre fundo escuro ou em tamanho grande) */
--ink:          #141413;   /* texto sobre fundo claro */
--paper:        #F3F1EC;   /* texto sobre fundo escuro */
--signal:       #FF4D00;   /* laranja sinal: o ÚNICO acento */
--brass:        #B8925A;   /* latão: só na área de investidores */
```

**Regras de uso:**
- O acento `--signal` ocupa no máximo 5% da tela: CTA principal, indicadores ativos, cursor e marcadores.
- Laranja como **texto** só sobre fundo escuro (contraste ≈ 5,8:1). Sobre fundo claro, o laranja é só preenchimento, com texto `--ink` em cima.
- Alterne seções escuras e claras para dar ritmo (escuro-dominante, cerca de 60/40).
- Todos os pares de texto atendem WCAG 2.2 AA (4,5:1 para corpo, 3:1 para texto grande).

### Tipografia
| Papel | Fonte (Google Fonts, via `next/font`) | Uso |
|---|---|---|
| Display | **Archivo** variável (eixo de largura 62–125) | Títulos em caixa alta: expandida para títulos monumentais, condensada para números |
| Contraste | **Instrument Serif** itálico | Só 1 ou 2 palavras por título ("Um só *contrato*.") |
| Texto | **Inter** 400/500 | Corpo de 17–18px, entrelinha 1,6, largura máxima de 68 caracteres |
| Técnica | **JetBrains Mono** | Rótulos, números, normas e coordenadas: 12–13px, caixa alta, espaçamento +0,08em |

*Alternativas pagas mais exclusivas: Neue Haas Grotesk Display, PP Neue Montreal, Söhne.*

**Escala fluida:**
```css
--text-display-xl: clamp(3.5rem, 11vw, 12rem);
--text-display-l:  clamp(2.75rem, 7vw, 7.5rem);
--text-h2:         clamp(2rem, 4.5vw, 4.5rem);
--text-h3:         clamp(1.5rem, 2.5vw, 2.25rem);
--text-body:       clamp(1.0625rem, 1.1vw, 1.125rem);
--text-mono:       0.8125rem;
```

### Layout
- Grid de 12 colunas com container máximo de 1600px, mas com muitas seções full-bleed.
- Respiro generoso: padding de seção em `clamp(6rem, 12vw, 12rem)`.
- Margem lateral de 16px no mobile, sem nenhuma rolagem horizontal da página.

### Componentes
- **Botão primário:** fundo `--signal` com texto `--ink`. No hover, um preenchimento grafite desliza da esquerda e a seta avança 4px.
- **Botão secundário:** contorno de 1px.
- **Botões grandes** com efeito magnético (só desktop).
- **Cursor customizado:** ponto pequeno que vira o círculo "VER" sobre projetos e "ARRASTE" sobre carrosséis. Desativado em telas de toque.
- **Demais componentes:** cards, chips, acordeão de FAQ, slider de antes e depois, contador animado, marquee com pausa, busca ⌘K (cmdk), mega-menu, campos de formulário (label sempre visível, foco em laranja de 2px, erro com texto e não só cor), tabela técnica, ficha técnica.

### Fotografia (briefing para a produção real)
- Fotos reais, editoriais, com luz quente e lateral.
- **Close de ofício:** mãos, ferramentas, faíscas de solda, serragem, textura de concreto, fio de prumo, nível a laser.
- **Obra limpa e organizada, EPI sempre completo e correto.**
- Espaços prontos fotografados como arquitetura: lente reta, verticais corrigidas, horário dourado. Drone para escala.
- **Proibido:** banco de imagem genérico com gente sorrindo de capacete, mãos apertadas, prédios em 3D genérico.
- **No protótipo:** imagens do Unsplash com o mesmo tom, todas com a mesma correção de cor (leve dessaturação e calor).

---

## PARTE 9 — Motion e interação

**Princípio:** cada animação explica algo ou dá peso. Nenhuma é só decoração.

- **Smooth scroll:** Lenis (lerp ≈ 0,1) integrado ao GSAP ScrollTrigger.
- **Revelação de títulos (só H1/H2):** GSAP SplitText por linha, com máscara subindo (y 100% → 0), escalonamento de 0,08s, 1,1s, ease `expo.out`.
- **Imagens:** `clip-path: inset(100% 0 0 0)` → `inset(0)` com escala de 1.15 → 1 ao entrar na tela.
- **Revelações simples:** CSS scroll-driven animations (`animation-timeline: view()`) onde houver suporte, com fallback em IntersectionObserver.
- **Seções fixadas (pinned):** só duas, S04 (obra em camadas) e S07 (projetos horizontais). Nenhum outro scroll-jacking.
- **Linhas SVG:** cotas e timeline desenhadas com `stroke-dashoffset` amarrado ao scroll.
- **Parallax** sutil no vídeo do hero (0 → 15%).
- **Transição entre páginas:** View Transitions API, com uma cortina grafite e o símbolo da marca em 600ms. Fallback para navegação normal.
- **Hover:** zoom de imagem 1.04 em 0,8s. Sublinhado cresce da esquerda.
- **Tokens de easing:** `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`. Durações de 200 / 400 / 800 / 1200ms.
- **Performance:** anime só `transform`, `opacity` e `clip-path`.
- **Sem JavaScript, o conteúdo continua legível.**
- **`prefers-reduced-motion`:** desliga Lenis, pin, parallax, SplitText e o 3D, e troca o vídeo pelo poster.

---

## PARTE 10 — Stack técnica

- **Framework:** Next.js (versão estável mais recente, App Router, React Server Components, TypeScript strict).
- **Estilo:** Tailwind CSS v4 (tokens via `@theme`) + shadcn/ui (Radix) restilizado com o design system acima.
- **Animação:** GSAP 3 (ScrollTrigger, SplitText; todos os plugins são gratuitos), Lenis, e Motion para micro-interações de UI.
- **3D:** React Three Fiber + drei, só na S04, com import dinâmico, `ssr: false` e fallback em imagem.
- **CMS headless:** Sanity (ou Payload). Coleções: `disciplinas`, `servicos`, `projetos`, `depoimentos`, `profissionais`, `artigos`, `vagas`, `cidades`, `kpis_investidores`, `tabela_custo_m2`, `faq`. **Popule com dados de exemplo para todas as 10 disciplinas e todos os serviços da Parte 3.**
- **Formulários:** React Hook Form + Zod, Server Actions, e-mail transacional (Resend) e webhook para CRM.
- **Mapas:** Mapbox GL com estilo monocromático customizado.
- **Busca:** cmdk sobre o índice de serviços.
- **Internacionalização:** next-intl (pt-BR padrão; EN em Investidores, Sobre e Projetos).
- **Mídia:** `next/image` em AVIF/WebP. Vídeo em HLS (Mux ou Cloudflare Stream) com poster.
- **Analytics** (só após consentimento): eventos `form_start`, `form_step_n`, `lead_submit`, `lead_priority_a`, `whatsapp_click`, `data_room_request`, `rede_application`.
- **Hospedagem:** Vercel.

---

## PARTE 11 — SEO, performance, acessibilidade e LGPD

### SEO
- Metadata única por página. Imagens Open Graph geradas dinamicamente (`next/og`) com o template da marca.
- **JSON-LD:**
  - `Organization` + `GeneralContractor` no site;
  - `Service` em cada serviço, com os tipos específicos quando couber (`Electrician`, `Plumber`, `HousePainter`, `RoofingContractor`, `HVACBusiness`);
  - `FAQPage`, `BreadcrumbList`, `Article` e `JobPosting`.
- **SEO local programático:** `/[cidade]/[servico]` (ex.: `/sao-paulo/eletricista`), **só para cidades realmente atendidas** e com conteúdo único (obras na cidade, equipe local, FAQ local). Nada de páginas rasas duplicadas.
- Sitemap, robots, canonical e hreflang.
- Todo o conteúdo é renderizado no servidor. Nenhum texto fica dentro de canvas/WebGL. Um único H1 por página e hierarquia de títulos sem saltos, para que buscadores e IAs consigam ler e citar o site.

### Performance (metas no mobile, 4G)
- LCP < 2,0 s · INP < 200 ms · CLS < 0,1.
- Lighthouse ≥ 95 em Performance, Acessibilidade, Boas Práticas e SEO.
- JS inicial < 200 KB gzip (sem contar o 3D, que carrega sob demanda).
- Fontes auto-hospedadas via `next/font` com `size-adjust`. Pré-carregue a fonte display se o H1 for o elemento LCP.

### Acessibilidade (WCAG 2.2 AA)
- Contraste conforme a Parte 8, foco sempre visível e skip link.
- Mega-menu, carrosséis, slider de antes e depois e busca funcionam 100% pelo teclado.
- Botão de pausa em todo vídeo, marquee ou movimento automático com mais de 5 s.
- Alvos de toque ≥ 44px. Alt text descritivo em toda imagem.
- Formulários com label, mensagens de erro associadas e sem dependência só de cor.

### LGPD e compliance
- Banner de cookies com consentimento granular (necessários / análise / marketing). Nenhum script de rastreamento antes do aceite.
- Política de privacidade, contato do encarregado (DPO) e checkbox de consentimento nos formulários.
- **Canal de Ética** com formulário anônimo e protocolo de acompanhamento.

---

## PARTE 12 — Ordem de construção e critérios de aceite

**Construa por fases.** Ao fim de cada fase, mostre o resultado e liste o que falta.

| Fase | Entrega |
|---|---|
| **1. Fundação** | Tokens, tipografia, componentes base, header com mega-menu, footer, Lenis + GSAP, transição de páginas, `/PLACEHOLDERS.md` |
| **2. Home** | Seções S01 a S16 completas, com a copy desta especificação |
| **3. Serviços** | Catálogo, páginas de disciplina e serviço, busca ⌘K, schemas do CMS populados com toda a Parte 3 |
| **4. Projetos** | Listagem com filtros e mapa, template de estudo de caso, 6 casos de exemplo |
| **5. Conversão** | Configurador de orçamento, agendamento, WhatsApp, integrações de e-mail e CRM, lead scoring |
| **6. Institucional** | Investidores (pt-BR/EN), Sobre, Integridade, ESG e Segurança, Soluções por público |
| **7. Ecossistema** | Rede de Mestres, Insights, Portal do cliente (demonstração) |
| **8. Qualidade** | SEO, JSON-LD, performance, acessibilidade, LGPD, testes em mobile, tablet e desktop |

### Critérios de aceite
- [ ] Um visitante de cada público da Parte 2 encontra seu caminho em 1 clique a partir da home.
- [ ] Todos os serviços da Parte 3 têm página própria com o template completo.
- [ ] O configurador funciona de ponta a ponta, salva o progresso e classifica os leads de Prioridade A.
- [ ] A seção "A obra em camadas" funciona no desktop, tem fallback no mobile e versão estática com movimento reduzido.
- [ ] Nenhuma rolagem horizontal da página em 360px de largura.
- [ ] Metas de Core Web Vitals e Lighthouse da Parte 11 atingidas.
- [ ] Todos os placeholders estão marcados e listados em `/PLACEHOLDERS.md`.
- [ ] Nenhum lorem ipsum, nenhum logo real, nenhuma escassez falsa.
- [ ] Contraste AA verificado em todos os pares de cor.

### O que NÃO fazer
- Carrossel automático no hero, pop-up de newsletter ou de saída.
- Banco de imagem genérico, ícones clichê de capacete ou chave inglesa.
- Mais de uma cor de acento. Sombras pesadas. Gradientes coloridos.
- Scroll-jacking fora das duas seções fixadas.
- Pontos de exclamação, clichês ou promessas sem número.
- Texto importante dentro de imagem, canvas ou vídeo.
