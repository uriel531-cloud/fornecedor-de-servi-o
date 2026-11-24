# LASTRO Engenharia Integrada — site

Site institucional e plataforma de conversão de uma construtora de alto padrão que entrega todas as especialidades de obra sob um único contrato.
Construído a partir do [prompt mestre](../prompt-site-construtora.md).

> **Antes de publicar:** leia o [PLACEHOLDERS.md](PLACEHOLDERS.md). Números, projetos, clientes, depoimentos e dados da empresa são ilustrativos.

## Rodar localmente

Requisitos: Node.js 20.9 ou superior.

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000
npm run build      # build de produção (gera ~160 páginas estáticas)
npm run start      # servidor de produção
npm run typecheck  # checagem de tipos
```

Variáveis opcionais em `.env.local` (modelo em `.env.example`): webhook de CRM, chave do Resend para e-mail e URL pública do site.
Sem elas, os formulários funcionam e os leads aparecem no log do servidor.

**Atalho de revisão:** `Shift + Alt + P` destaca todos os placeholders na tela.

## Stack

| Camada | Escolha |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components, Turbopack), React 19, TypeScript strict |
| Estilo | Tailwind CSS v4 (tokens em `@theme`, componentes em `@layer components`) |
| Animação | GSAP 3 (ScrollTrigger, SplitText), Lenis (smooth scroll), CSS scroll-driven animations, View Transitions API |
| 3D | React Three Fiber + Three.js (só na seção "A obra em camadas", carregado sob demanda) |
| Busca | cmdk (⌘K / Ctrl + K) sobre os 80 serviços |
| Formulários | Server Actions + `useActionState` + Zod (validação no servidor) |
| Fontes | Archivo (variável, eixo de largura), Instrument Serif, Inter, JetBrains Mono — via `next/font` |

## Estrutura

```
src/
  app/                      rotas (App Router)
    page.tsx                home — 16 seções
    servicos/               catálogo, 10 disciplinas, 80 serviços
    solucoes/               5 públicos
    projetos/               portfólio com filtros + estudos de caso
    investidores/, en/investors/   RI em PT e EN
    orcamento/              configurador de 10 passos
    portal/                 portal do cliente (demonstração)
    [cidade]/[servico]/     SEO local (4 cidades × 8 ofícios)
    actions.ts              Server Actions dos formulários
    sitemap.ts, robots.ts, opengraph-image.tsx
  content/                  "CMS" tipado: disciplinas, projetos, pessoas, públicos, cidades, artigos, investidores, custos
  components/
    home/                   seções da home (Hero, LayersScene 3D, etc.)
    layout/                 Header + mega-menu, Footer, busca, cookies, preloader, WhatsApp
    forms/                  configurador, formulários, campos
    investors/              página de RI + gráficos
    page/                   blocos compartilhados (hero de página, FAQ, cards, mapa de coordenadas)
    ui/                     primitivos (SplitReveal, Counter, Cota, Marquee, BeforeAfter, Cursor…)
public/images/              fotos do protótipo (Unsplash)
```

## Para trocar conteúdo

Todo o conteúdo vive em `src/content/*.ts`, com tipos. As coleções têm a mesma forma de um CMS headless; migrar para Sanity ou Payload é trocar a leitura desses arquivos por consultas, sem mexer nos componentes.

## Decisões em relação ao prompt

| Prompt | Implementado | Motivo |
|---|---|---|
| CMS headless (Sanity/Payload) | Coleções tipadas em `src/content` | Sanity e Payload exigem conta e projeto; a estrutura já está pronta para migrar |
| Mapbox GL | Prancha de coordenadas em SVG (`CoordPlot`) | Mapbox exige token; a prancha segue a linguagem de desenho técnico e não pesa no carregamento |
| Vídeo no hero | Sequência de cortes em imagem com Ken Burns e botão de pausa | Não há vídeo próprio ainda; o primeiro frame já é o poster (LCP) |
| React Hook Form | `useActionState` + Zod no servidor | Menos JavaScript no cliente e validação confiável no servidor |
| next-intl | Rota `/en/investors` com dicionário próprio | Só a área de investidores precisa de inglês nesta fase |
| Biblioteca Motion | CSS + GSAP | Evita uma terceira biblioteca de animação |

## O que foi verificado

- `next build` sem erros nem avisos; 161 páginas geradas.
- TypeScript strict sem erros.
- Nenhuma rolagem horizontal a 360 px em 26 rotas testadas.
- Configurador de orçamento testado de ponta a ponta: pré-preenchimento pela URL, validação por passo, consulta de CEP (ViaCEP), estimativa, consentimento LGPD, envio, classificação Prioridade A e agendamento da visita.
- Formulários de lead e data room testados, incluindo a rejeição de e-mail pessoal no data room e a preservação dos campos após erro de validação.
- Sem erros de JavaScript no console nas páginas testadas.

**Não verificado:** Lighthouse e Core Web Vitals reais (dependem do ambiente de hospedagem) e leitor de tela manual. Recomendado rodar antes do lançamento.

## Deploy

Pronto para a Vercel: importar o repositório, definir `NEXT_PUBLIC_SITE_URL` e as variáveis de integração, e publicar.
