# PLACEHOLDERS — o que substituir antes de publicar

Tudo abaixo está no site com aparência final, mas **não é dado real**.
No navegador, pressione **Shift + Alt + P** (ou abra qualquer página com `?placeholders=1`) para destacar em laranja todos os elementos marcados com `data-placeholder="true"`.

> Regra: nada desta lista vai ao ar sem confirmação. Números, clientes e depoimentos inventados expõem a empresa a risco legal (Código de Defesa do Consumidor e CVM, no caso de investidores) e de reputação.

## 1. Marca e dados institucionais — `src/content/site.ts`

| Item | Onde aparece | Ação |
|---|---|---|
| Nome **LASTRO** | Site inteiro, logo, metadados | Confirmar o nome definitivo e a disponibilidade no INPI e do domínio |
| Razão social, CNPJ, registro CREA | Rodapé, JSON-LD | Inserir os dados reais |
| Telefone, WhatsApp, e-mails (comercial, RI, DPO) | Rodapé, Contato, botões de WhatsApp | Inserir os dados reais (o domínio `lastro.example` é fictício) |
| Endereços dos 4 escritórios | Rodapé, Sobre, Contato | Inserir endereços reais ou remover cidades |
| UFs atendidas (`servedUfs`) | Configurador de orçamento (checagem de CEP) | Ajustar à área real de atendimento |
| Redes sociais | Rodapé | Inserir URLs reais |

## 2. Números e selos

| Item | Arquivo | Onde aparece |
|---|---|---|
| 1.200+ obras, 380 mil m², 40+ especialidades, 97% no prazo, 0 acidentes | `site.ts` → `stats` | Home (faixa de prova), Sobre |
| 1.430 dias sem acidente, 12 mil h de treinamento, 92% dos resíduos | `site.ts` → `esgStats` | Home (ESG), ESG e Segurança |
| ISO 9001 / 14001 / 45001 / PBQP-H — status "em certificação" | `site.ts` → `seals` | Home, Sobre, ESG |
| Logos de clientes (Velatto, Ardósia…) — **marcas fictícias** | `site.ts` → `clientLogos` | Home (marquee) — trocar por clientes reais **com autorização** |
| Selo "Mais escolhido por clientes alto padrão" | `components/home/sections.tsx` | Home (Modalidades) |
| Coordenadas dos cortes do hero | `components/home/Hero.tsx` | Home (hero) |

## 3. Projetos — `src/content/projetos.ts`

**Os 6 projetos são ilustrativos** (nomes, áreas, prazos, variação de orçamento, equipe, desafios, depoimentos e coordenadas).
Substituir por obras reais, com fotos próprias e autorização dos clientes para o uso de nome e depoimento.

## 4. Pessoas — `src/content/pessoas.ts`

| Item | Onde aparece |
|---|---|
| Mestres de ofício (nomes, anos, frases) — fictícios; retratos são fotos de banco | Home, Rede de Mestres |
| Depoimentos (R. Albuquerque, D. Carvalho, M. Tavares) — fictícios | Home, projetos |
| Liderança (`[Nome do CEO]`…) e biografias | Sobre, Investidores |
| Vagas abertas e data de publicação | Rede de Mestres (também no JSON-LD `JobPosting`) |
| "Pagamento em até X dias" | Rede de Mestres |

## 5. Investidores — `src/content/investidores.ts`

| Item | Ação |
|---|---|
| Todos os KPIs (receita, CAGR, recorrência, backlog, margem, ticket, NPS, rede) | Substituir por dados auditados |
| Série de receita anual e % recorrente (gráficos) | Substituir por dados auditados |
| Tamanho de mercado `R$ X bilhões` e fonte | Inserir dado com fonte (CBIC, IBGE-PAIC) |
| Estrutura do conselho | Descrever a estrutura real |
| Praças atuais e planejadas | Confirmar |
| Documentos (apresentação, one-pager, relatórios) | Produzir os PDFs e configurar o data room real |

## 6. Comercial e jurídico

| Item | Arquivo | Ação |
|---|---|---|
| Tabela de custo por m² (estimativa do configurador) | `src/content/custo.ts` | Preencher com a tabela real da área comercial |
| "Prazo com multa por atraso" e "garantia estendida de 5 anos" | `src/content/metodo.ts`, Garantias | **Validar com o jurídico** antes de publicar |
| Faixas de custo do artigo "Quanto custa reformar uma cobertura…" | `src/content/artigos.ts` | Confirmar com dados reais |
| Equipe local, obras por cidade, bairros, prazo de visita | `src/content/cidades.ts` | Confirmar por praça |
| Privacidade, Termos e Cookies | `src/app/privacidade`, `termos`, `cookies` | Revisão do jurídico e do DPO; nome do encarregado; foro |
| Políticas do programa de integridade (PDFs) | `src/app/sobre/integridade` | Publicar os documentos |
| Canal de Ética | `src/app/canal-de-etica` | Em produção, operar por empresa externa independente (variável `ETICA_NOTIFY_EMAIL`) |
| História da fundação | `src/app/sobre/page.tsx` | Escrever a história real |

## 7. Mídia

| Item | Ação |
|---|---|
| Todas as fotos em `public/images` (Unsplash, licença gratuita) | Substituir por fotografia própria, seguindo o briefing da Parte 8 do prompt (ofício em close, EPI sempre correto, obra limpa) |
| Hero em sequência de imagens | Produzir vídeo de 2–3 s por corte e servir em HLS (Mux ou Cloudflare Stream), mantendo o primeiro frame como poster |
| Antes e depois | Fotos reais do mesmo ângulo, antes e depois |
| Vídeo de drone nos estudos de caso | Produzir |
| Depoimentos em vídeo | Produzir (com legenda) |

## 8. Funcionalidades em modo demonstração

| Item | Situação atual | Para produção |
|---|---|---|
| Portal do cliente (`/portal`) | Interface completa com dados fictícios, sem backend | Autenticação por link mágico, banco de dados e integração com o diário de obra |
| Upload de arquivos no orçamento | Registra só os nomes dos arquivos | Upload para armazenamento (S3, R2 ou Vercel Blob) com link no lead |
| Envio de leads | Log do servidor; CRM e e-mail se as variáveis estiverem configuradas | Configurar `CRM_WEBHOOK_URL` e `RESEND_API_KEY` (ver `.env.example`) |
| Agendamento da visita | Horários gerados (próximos 5 dias úteis) e enviados como lead | Integrar com a agenda real (Cal.com ou Google Calendar) |
| Analytics | Eventos enviados a `window.dataLayer` só após consentimento | Conectar GA4, Plausible ou outro |
