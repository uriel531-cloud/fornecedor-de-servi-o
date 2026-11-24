"use client";

import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { Arrow } from "@/components/ui/Arrow";
import { LogoMark } from "@/components/layout/Logo";
import { TLink } from "@/components/ui/TLink";
import type { ImageKey } from "@/content/images";
import { cn } from "@/lib/cn";

/* Dados FICTÍCIOS de demonstração */
const obra = { nome: "Cobertura Jardins", endereco: "São Paulo, SP", progresso: 62, etapa: "Acabamentos e marcenaria", inicio: "mar/2026", entrega: "dez/2026" };
const gestor = { nome: "Ana Ribeiro", cargo: "Gestora de obra", crea: "CREA-SP 0000000000" };

const cronograma = [
  { t: "Demolição e preparação", s: 0, e: 1, done: 100 },
  { t: "Instalações elétricas e hidráulicas", s: 1, e: 3, done: 100 },
  { t: "Impermeabilização", s: 2, e: 3, done: 100 },
  { t: "Gesso e forros", s: 3, e: 5, done: 100 },
  { t: "Revestimentos e pedras", s: 4, e: 7, done: 70 },
  { t: "Marcenaria", s: 5, e: 8, done: 40 },
  { t: "Pintura", s: 6, e: 8.5, done: 10 },
  { t: "Limpeza e entrega", s: 8.5, e: 9, done: 0 },
];
const meses = ["mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const hoje = 8.7;

const diario: { d: string; img: ImageKey; txt: string; equipe: number; clima: string }[] = [
  { d: "22/11/2026", img: "revestimento-placa", txt: "Assentamento do porcelanato da suíte master concluído. Conferência de planicidade aprovada.", equipe: 9, clima: "Sol, 27 °C" },
  { d: "21/11/2026", img: "marcenaria-bancada", txt: "Marcenaria do closet chegou da fábrica. Montagem programada para segunda-feira.", equipe: 11, clima: "Nublado, 24 °C" },
  { d: "19/11/2026", img: "banheiro-marmore", txt: "Bancada em mármore do lavabo instalada. Aguardando instalação dos metais.", equipe: 8, clima: "Chuva, 21 °C" },
  { d: "18/11/2026", img: "pintura-rolo", txt: "Início da primeira demão nos dormitórios. Proteções de piso conferidas.", equipe: 10, clima: "Sol, 29 °C" },
];

const medicoes = [
  { etapa: "Mobilização e demolição", valor: "R$ 84.000", status: "Pago" },
  { etapa: "Instalações", valor: "R$ 312.000", status: "Pago" },
  { etapa: "Gesso, forros e impermeabilização", valor: "R$ 186.000", status: "Pago" },
  { etapa: "Revestimentos — 1ª medição", valor: "R$ 228.000", status: "Pago" },
  { etapa: "Revestimentos — 2ª medição", valor: "R$ 152.000", status: "A vencer 05/12" },
  { etapa: "Marcenaria", valor: "R$ 396.000", status: "Previsto" },
];

const docs = ["Contrato de empreitada global", "ART de execução", "Plano de reforma (NBR 16280) aprovado", "Projeto executivo — revisão 04", "Cronograma físico-financeiro", "Notas fiscais — novembro"];

const tabs = ["Visão geral", "Cronograma", "Diário de obra", "Financeiro", "Documentos", "Garantia", "Mensagens"] as const;
type Tab = (typeof tabs)[number];

export function PortalDemo() {
  const [logged, setLogged] = useState(false);
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState<Tab>("Visão geral");
  const [msgs, setMsgs] = useState([
    { from: "gestor", t: "Bom dia! As fotos do porcelanato da suíte já estão no diário. Pode conferir?", h: "09:12" },
    { from: "cliente", t: "Vi agora, ficou perfeito. A marcenaria do closet chega quando?", h: "09:40" },
    { from: "gestor", t: "Chegou ontem. Montagem na segunda, com conclusão prevista para quarta.", h: "09:44" },
  ]);
  const [draft, setDraft] = useState("");
  const [chamados, setChamados] = useState<{ t: string; s: string }[]>([]);
  const [novoChamado, setNovoChamado] = useState("");

  if (!logged)
    return (
      <div className="mx-auto max-w-md border border-paper/15 bg-graphite-900 p-8">
        <LogoMark />
        <h1 className="font-display-x mt-6 text-3xl">Portal do cliente</h1>
        <p className="text-muted mt-2">Acesse com o link enviado para o seu e-mail. Sem senha.</p>
        {sent ? (
          <p role="status" className="mt-6 border border-signal/60 p-4 text-sm">
            Link de acesso enviado (demonstração: nenhum e-mail é enviado de verdade).
          </p>
        ) : (
          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label className="field">
              <span className="field-label">E-mail</span>
              <input type="email" required className="input" autoComplete="email" placeholder="voce@empresa.com.br" />
            </label>
            <button type="submit" className="btn btn-secondary justify-between">
              Enviar link de acesso <Arrow />
            </button>
          </form>
        )}
        <button type="button" onClick={() => setLogged(true)} className="btn btn-primary mt-4 w-full justify-between">
          Entrar na demonstração <Arrow />
        </button>
      </div>
    );

  return (
    <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
      <aside>
        <p className="mono-label text-muted">Obra</p>
        <p className="mt-1 text-lg font-medium">{obra.nome}</p>
        <p className="text-muted text-sm">{obra.endereco}</p>
        <nav aria-label="Seções do portal" className="no-scrollbar mt-6 flex gap-1 overflow-x-auto lg:flex-col">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              aria-current={tab === t ? "page" : undefined}
              onClick={() => setTab(t)}
              className={cn("min-h-11 shrink-0 px-3 text-left text-[0.9375rem] transition-colors", tab === t ? "bg-paper text-ink" : "hover:bg-graphite-800")}
            >
              {t}
            </button>
          ))}
        </nav>
        <button type="button" onClick={() => setLogged(false)} className="mono-label text-muted mt-8 hidden min-h-11 hover:text-paper lg:block">
          Sair
        </button>
      </aside>

      <div key={tab} className="step-in min-w-0">
        {tab === "Visão geral" && (
          <div className="grid gap-6">
            <div className="grid gap-px bg-paper/10 sm:grid-cols-4">
              {[
                ["Avanço físico", `${obra.progresso}%`],
                ["Etapa atual", obra.etapa],
                ["Início", obra.inicio],
                ["Entrega prevista", obra.entrega],
              ].map(([k, v]) => (
                <div key={k} className="bg-graphite-950 p-5">
                  <p className="mono-label text-muted">{k}</p>
                  <p className="mt-2 text-xl">{v}</p>
                </div>
              ))}
            </div>
            <div className="border border-paper/15 p-5">
              <div className="flex justify-between text-sm">
                <span>Avanço físico</span>
                <span className="tabular-nums">{obra.progresso}%</span>
              </div>
              <div className="mt-3 h-2 bg-paper/10" role="progressbar" aria-valuenow={obra.progresso} aria-valuemin={0} aria-valuemax={100} aria-label="Avanço físico da obra">
                <div className="h-2 bg-signal" style={{ width: `${obra.progresso}%` }} />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border border-paper/15 p-5">
                <p className="mono-label text-muted">Próximos marcos</p>
                <ul className="mt-4 space-y-3 text-[0.9375rem]">
                  <li className="flex justify-between gap-4">
                    <span>Montagem do closet</span>
                    <span className="text-muted">24–26/11</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Vistoria de revestimentos</span>
                    <span className="text-muted">28/11</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>2ª medição de revestimentos</span>
                    <span className="text-muted">05/12</span>
                  </li>
                </ul>
              </div>
              <div className="border border-paper/15 p-5">
                <p className="mono-label text-muted">Responsável</p>
                <p className="mt-3 text-lg">{gestor.nome}</p>
                <p className="text-muted text-sm">
                  {gestor.cargo} · {gestor.crea}
                </p>
                <button type="button" onClick={() => setTab("Mensagens")} className="mono-label mt-4 inline-flex min-h-11 items-center gap-2 text-signal">
                  Enviar mensagem <Arrow />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {diario.map((d) => (
                <button key={d.d} type="button" onClick={() => setTab("Diário de obra")} className="img-zoom relative aspect-square overflow-hidden bg-graphite-800 text-left">
                  <Photo k={d.img} sizes="20vw" />
                  <span className="mono-label absolute bottom-2 left-2 bg-graphite-950/80 px-1.5 py-0.5">{d.d}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "Cronograma" && (
          <div className="overflow-x-auto border border-paper/15 p-5">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[14rem_1fr] gap-4">
                <span />
                <div className="mono-label text-muted grid" style={{ gridTemplateColumns: `repeat(${meses.length}, 1fr)` }}>
                  {meses.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
              <ul className="mt-3 space-y-2">
                {cronograma.map((c) => (
                  <li key={c.t} className="grid grid-cols-[14rem_1fr] items-center gap-4 text-sm">
                    <span className="truncate">{c.t}</span>
                    <div className="relative h-7 bg-paper/5">
                      <div className="absolute inset-y-1 bg-paper/20" style={{ left: `${(c.s / meses.length) * 100}%`, width: `${((c.e - c.s) / meses.length) * 100}%` }}>
                        <div className="h-full bg-signal" style={{ width: `${c.done}%` }} />
                      </div>
                      <div className="absolute inset-y-0 w-px bg-paper" style={{ left: `${(hoje / meses.length) * 100}%` }} aria-hidden />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mono-label text-muted mt-4">Linha vertical: hoje · Laranja: executado</p>
            </div>
          </div>
        )}

        {tab === "Diário de obra" && (
          <ul className="space-y-6">
            {diario.map((d) => (
              <li key={d.d} className="grid gap-5 border border-paper/15 p-5 sm:grid-cols-[12rem_1fr]">
                <div className="relative aspect-[4/3] overflow-hidden bg-graphite-800">
                  <Photo k={d.img} sizes="12rem" />
                </div>
                <div>
                  <p className="mono-label text-muted">
                    {d.d} · {d.clima} · {d.equipe} profissionais
                  </p>
                  <p className="mt-2 text-lg">{d.txt}</p>
                  <p className="mono-label text-muted mt-3">Registrado por {gestor.nome} · foto geolocalizada</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {tab === "Financeiro" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left">
              <caption className="mono-label text-muted mb-4 text-left">Medições — valores fictícios de demonstração</caption>
              <thead>
                <tr className="mono-label text-muted border-b border-paper/15">
                  <th className="py-3 font-normal">Etapa</th>
                  <th className="py-3 text-right font-normal">Valor</th>
                  <th className="py-3 text-right font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {medicoes.map((m) => (
                  <tr key={m.etapa} className="border-b border-paper/10">
                    <td className="py-4">{m.etapa}</td>
                    <td className="py-4 text-right tabular-nums">{m.valor}</td>
                    <td className={cn("py-4 text-right", m.status === "Pago" ? "text-muted" : "text-paper")}>
                      {m.status === "Pago" ? "✓ Pago" : m.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "Documentos" && (
          <ul className="divide-y divide-paper/10 border-y border-paper/10">
            {docs.map((d) => (
              <li key={d} className="flex items-center justify-between gap-4 py-4">
                <span>{d}</span>
                <button type="button" className="mono-label text-muted inline-flex min-h-11 items-center gap-2 hover:text-paper" title="Demonstração">
                  PDF <Arrow dir="down" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {tab === "Garantia" && (
          <div className="grid gap-6">
            <p className="text-muted">Depois da entrega, os chamados de garantia são abertos aqui e atendidos conforme o prazo do contrato.</p>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (!novoChamado.trim()) return;
                setChamados((c) => [{ t: novoChamado.trim(), s: "Aberto — resposta em até 48 h" }, ...c]);
                setNovoChamado("");
              }}
            >
              <label className="sr-only" htmlFor="chamado">
                Descreva o problema
              </label>
              <input id="chamado" className="input flex-1" value={novoChamado} onChange={(e) => setNovoChamado(e.target.value)} placeholder="Ex.: porta do closet desregulada" />
              <button type="submit" className="btn btn-primary">
                Abrir chamado
              </button>
            </form>
            {chamados.length === 0 ? (
              <p className="text-muted border border-dashed border-paper/20 p-6 text-center">Nenhum chamado aberto.</p>
            ) : (
              <ul className="space-y-2">
                {chamados.map((c, i) => (
                  <li key={i} className="flex justify-between gap-4 border border-paper/15 p-4">
                    <span>{c.t}</span>
                    <span className="mono-label text-signal">{c.s}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === "Mensagens" && (
          <div className="flex h-[28rem] flex-col border border-paper/15">
            <ul className="flex-1 space-y-3 overflow-y-auto p-5" data-lenis-prevent>
              {msgs.map((m, i) => (
                <li key={i} className={cn("max-w-[80%] p-3 text-[0.9375rem]", m.from === "cliente" ? "ml-auto bg-paper text-ink" : "bg-graphite-800")}>
                  {m.t}
                  <span className={cn("mt-1 block font-mono text-[0.6875rem]", m.from === "cliente" ? "text-pedra-escura" : "text-muted")}>
                    {m.from === "cliente" ? "Você" : gestor.nome} · {m.h}
                  </span>
                </li>
              ))}
            </ul>
            <form
              className="flex gap-2 border-t border-paper/15 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (!draft.trim()) return;
                setMsgs((m) => [...m, { from: "cliente", t: draft.trim(), h: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) }]);
                setDraft("");
              }}
            >
              <label htmlFor="msg" className="sr-only">
                Mensagem
              </label>
              <input id="msg" className="input flex-1" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Escreva para a gestora da obra" />
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </form>
          </div>
        )}
      </div>
      <p className="text-muted text-sm lg:col-span-2">
        Esta é uma demonstração com dados fictícios. Quer ter esse controle na sua obra?{" "}
        <TLink href="/orcamento" className="text-paper underline underline-offset-4">
          Solicite uma proposta
        </TLink>
        .
      </p>
    </div>
  );
}
