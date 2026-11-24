"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { submitQuote, submitVisita, type FormState } from "@/app/actions";
import { disciplinas } from "@/content/disciplinas";
import { custoAvulsoPorDisciplina, custoM2, custoManutencaoMes, multiplicadorPadrao, padroes, type Padrao, type TipoProjeto } from "@/content/custo";
import { site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { Arrow } from "@/components/ui/Arrow";
import { Ph } from "@/components/ui/Ph";
import { Consent, Field, Select } from "./Field";
import { brl } from "@/lib/format";
import { track } from "@/lib/track";
import { waLink } from "@/lib/wa";
import { cn } from "@/lib/cn";

type Q = {
  tipo: TipoProjeto | "";
  imovel: string;
  disciplinas: string[];
  servicos: string[];
  area: number;
  ambientes: number;
  padrao: Padrao;
  inicio: string;
  conclusao: string;
  cep: string;
  cidade: string;
  uf: string;
  arquivos: string[];
  investimento: string;
  perfil: string;
  nome: string;
  email: string;
  telefone: string;
  horario: string;
  consent: boolean;
};

const empty: Q = {
  tipo: "",
  imovel: "",
  disciplinas: [],
  servicos: [],
  area: 150,
  ambientes: 4,
  padrao: "premium",
  inicio: "",
  conclusao: "",
  cep: "",
  cidade: "",
  uf: "",
  arquivos: [],
  investimento: "",
  perfil: "",
  nome: "",
  email: "",
  telefone: "",
  horario: "",
  consent: false,
};

const KEY = "lastro-orcamento";

const tipos: { id: TipoProjeto; nome: string; desc: string }[] = [
  { id: "avulso", nome: "Serviço avulso", desc: "Uma ou poucas especialidades, escopo fechado." },
  { id: "completa", nome: "Reforma completa", desc: "Todas as disciplinas, chave na mão." },
  { id: "nova", nome: "Obra nova", desc: "Construção do zero, do projeto à entrega." },
  { id: "manutencao", nome: "Manutenção recorrente", desc: "Contrato mensal com SLA." },
];

const imoveis = ["Apartamento", "Casa", "Cobertura", "Escritório", "Loja", "Galpão / Indústria", "Condomínio"];

const faixas = [
  { id: "ate-50mil", label: "Até R$ 50 mil" },
  { id: "50-250mil", label: "R$ 50 mil a R$ 250 mil" },
  { id: "250mil-1mi", label: "R$ 250 mil a R$ 1 milhão" },
  { id: "1-5mi", label: "R$ 1 a R$ 5 milhões" },
  { id: "5mi+", label: "Acima de R$ 5 milhões" },
];

const steps = ["Tipo de projeto", "Imóvel", "Serviços", "Dimensões", "Padrão", "Prazo", "Local", "Arquivos", "Investimento", "Contato"] as const;

function estimate(q: Q): { min: number; max: number; mensal?: boolean } | null {
  if (!q.tipo || q.area <= 0) return null;
  if (q.tipo === "manutencao") return { min: custoManutencaoMes[0] * q.area, max: custoManutencaoMes[1] * q.area, mensal: true };
  if (q.tipo === "completa" || q.tipo === "nova") {
    const [a, b] = custoM2[q.tipo][q.padrao];
    return { min: a * q.area, max: b * q.area };
  }
  if (!q.disciplinas.length) return null;
  const mult = multiplicadorPadrao[q.padrao];
  let min = 0;
  let max = 0;
  for (const d of q.disciplinas) {
    const r = custoAvulsoPorDisciplina[d];
    if (r) {
      min += r[0] * q.area * mult;
      max += r[1] * q.area * mult;
    }
  }
  return { min, max };
}

function round(n: number) {
  const mag = n >= 1_000_000 ? 50_000 : n >= 100_000 ? 5_000 : 500;
  return Math.round(n / mag) * mag;
}

function OptionCard({ selected, onClick, children, role = "radio" }: { selected: boolean; onClick: () => void; children: ReactNode; role?: "radio" | "checkbox" }) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "flex min-h-16 w-full items-start gap-4 border p-5 text-left transition-colors",
        selected ? "border-signal bg-signal/10" : "border-paper/20 hover:border-paper/60",
      )}
    >
      <span className={cn("mt-1 grid h-4 w-4 shrink-0 place-items-center border", role === "radio" && "rounded-full", selected ? "border-signal bg-signal" : "border-paper/50")} aria-hidden>
        {selected && <span className={cn("h-1.5 w-1.5 bg-ink", role === "radio" && "rounded-full")} />}
      </span>
      <span className="flex-1">{children}</span>
    </button>
  );
}

function nextBusinessSlots() {
  const days: { date: Date; label: string }[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (days.length < 5) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd !== 0 && wd !== 6) days.push({ date: new Date(d), label: d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" }) });
  }
  return days;
}

export function QuoteConfigurator() {
  const params = useSearchParams();
  const [q, setQ] = useState<Q>(empty);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<FormState | null>(null);
  const [sending, setSending] = useState(false);
  const [cepStatus, setCepStatus] = useState<"" | "loading" | "ok" | "fora" | "erro">("");
  const [visita, setVisita] = useState<string>("");
  const [visitaOk, setVisitaOk] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Restaura rascunho + aplica parâmetros da URL
  useEffect(() => {
    let draft: Partial<Q> & { step?: number } = {};
    try {
      draft = JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch {}
    const next: Q = { ...empty, ...draft };
    const tipo = params.get("tipo");
    const disc = params.get("disciplina");
    const serv = params.get("servico");
    const perfil = params.get("perfil");
    if (tipo && ["avulso", "completa", "nova", "manutencao"].includes(tipo)) next.tipo = tipo as TipoProjeto;
    if (disc && disciplinas.some((d) => d.slug === disc)) {
      next.disciplinas = Array.from(new Set([...next.disciplinas, disc]));
      if (!next.tipo) next.tipo = "avulso";
    }
    if (serv) next.servicos = Array.from(new Set([...next.servicos, serv]));
    if (perfil) {
      next.perfil = perfil;
      if (perfil === "condominio") next.imovel = "Condomínio";
      if (perfil === "industria") next.imovel = "Galpão / Indústria";
      if (perfil === "corporativo" && !next.imovel) next.imovel = "Escritório";
    }
    setQ(next);
    if (typeof draft.step === "number" && !tipo && !disc) setStep(Math.min(draft.step, steps.length - 1));
  }, [params]);

  // Salva rascunho
  useEffect(() => {
    if (result?.ok) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...q, step }));
    } catch {}
  }, [q, step, result]);

  // Foco no título a cada passo (leitores de tela e teclado)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    track(`form_step_${step + 1}`, { form: "orcamento" });
  }, [step]);

  const set = <K extends keyof Q>(k: K, v: Q[K]) => {
    if (!started) {
      setStarted(true);
      track("form_start", { form: "orcamento" });
    }
    setQ((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const toggle = (k: "disciplinas", v: string) => set(k, q[k].includes(v) ? q[k].filter((x) => x !== v) : [...q[k], v]);

  const est = useMemo(() => estimate(q), [q]);

  function validate(i: number): boolean {
    const e: Record<string, string> = {};
    if (i === 0 && !q.tipo) e.tipo = "Escolha o tipo de projeto.";
    if (i === 1 && !q.imovel) e.imovel = "Escolha o tipo de imóvel.";
    if (i === 2 && !q.disciplinas.length) e.disciplinas = "Escolha ao menos uma disciplina.";
    if (i === 3 && (!q.area || q.area < 5)) e.area = "Informe a área aproximada (mínimo 5 m²).";
    if (i === 8 && !q.investimento) e.investimento = "Escolha a faixa de investimento.";
    if (i === 9) {
      if (q.nome.trim().length < 2) e.nome = "Informe seu nome.";
      if (!/^\S+@\S+\.\S+$/.test(q.email)) e.email = "Informe um e-mail válido.";
      if (q.telefone.replace(/\D/g, "").length < 10) e.telefone = "Informe um telefone com DDD.";
      if (!q.consent) e.consent = "É preciso aceitar a política de privacidade.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function lookupCep(cep: string) {
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setCepStatus("loading");
    try {
      const r = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const j = (await r.json()) as { localidade?: string; uf?: string; erro?: boolean };
      if (j.erro || !j.uf) {
        setCepStatus("erro");
        return;
      }
      setQ((s) => ({ ...s, cidade: j.localidade ?? "", uf: j.uf ?? "" }));
      setCepStatus((site.servedUfs as readonly string[]).includes(j.uf) ? "ok" : "fora");
    } catch {
      setCepStatus("erro");
    }
  }

  async function submit() {
    if (!validate(9)) return;
    setSending(true);
    const res = await submitQuote({
      tipo: q.tipo as TipoProjeto,
      imovel: q.imovel,
      disciplinas: q.disciplinas,
      servicos: q.servicos,
      area: q.area,
      ambientes: q.ambientes,
      padrao: q.padrao,
      inicio: q.inicio,
      conclusao: q.conclusao,
      cep: q.cep,
      cidade: q.cidade,
      uf: q.uf,
      arquivos: q.arquivos,
      investimento: q.investimento,
      perfil: q.perfil,
      nome: q.nome,
      email: q.email,
      telefone: q.telefone,
      horario: q.horario,
      estimativa: est ? `${brl(round(est.min))} – ${brl(round(est.max))}${est.mensal ? "/mês" : ""}` : undefined,
      consent: true,
    });
    setSending(false);
    if (!res.ok) {
      setErrors(res.errors ?? {});
      return;
    }
    setResult(res);
    track("lead_submit", { form: "orcamento", prioridade: res.prioridade });
    if (res.prioridade === "A") track("lead_priority_a");
    try {
      localStorage.removeItem(KEY);
    } catch {}
    window.scrollTo({ top: 0 });
  }

  const next = () => {
    if (!validate(step)) return;
    if (step === steps.length - 1) submit();
    else setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  /* ------------------------------ Tela final ------------------------------ */
  if (result?.ok) {
    const dias = nextBusinessSlots();
    const resumo = `Olá! Enviei um pedido de orçamento pelo site (protocolo ${result.protocolo}): ${tipos.find((t) => t.id === q.tipo)?.nome}, ${q.imovel}, ${q.area} m².`;
    return (
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mono-label text-signal">Pedido recebido — protocolo {result.protocolo}</p>
          <h2 className="font-display-x mt-4 text-[clamp(2rem,4vw,3.75rem)]">Obrigado, {q.nome.split(" ")[0]}.</h2>
          <p className="mt-4 max-w-xl text-lg text-paper/85">
            {result.prioridade === "A"
              ? "Pelo porte do projeto, ele será conduzido diretamente pela diretoria comercial. Você recebe o contato de um executivo sênior em até 4 horas úteis."
              : "Um especialista vai analisar o pedido e falar com você em até 1 dia útil."}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px bg-paper/10">
            {[
              ["Tipo", tipos.find((t) => t.id === q.tipo)?.nome],
              ["Imóvel", q.imovel],
              ["Área", `${q.area} m²`],
              ["Padrão", padroes.find((p) => p.id === q.padrao)?.nome],
              ["Local", q.cidade ? `${q.cidade}/${q.uf}` : "—"],
              ["Disciplinas", `${q.disciplinas.length}`],
            ].map(([k, v]) => (
              <div key={k} className="bg-graphite-950 p-4">
                <dt className="mono-label text-muted">{k}</dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
          </dl>

          {est && (
            <div className="mt-8 border border-paper/15 p-6">
              <p className="mono-label text-muted">Faixa de investimento indicativa</p>
              <Ph as="p" className="font-display-c mt-2 text-[clamp(2rem,4vw,3.5rem)] tabular-nums">
                {brl(round(est.min))} – {brl(round(est.max))}
                {est.mensal && <span className="text-2xl">/mês</span>}
              </Ph>
              <p className="text-muted mt-2 text-sm">Estimativa indicativa; o valor final é definido após a visita técnica.</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="border border-paper/15 p-6">
            <h3 className="text-xl font-medium">Agende a visita técnica</h3>
            <p className="text-muted mt-1 text-sm">Escolha um horário. Confirmamos pelo WhatsApp.</p>
            {visitaOk ? (
              <p role="status" className="mt-6 border border-signal/60 p-4">
                Visita solicitada para <strong>{visita}</strong>. Você receberá a confirmação pelo WhatsApp.
              </p>
            ) : (
              <>
                <div className="mt-5 space-y-4">
                  {dias.map((d) => (
                    <div key={d.label}>
                      <p className="mono-label text-muted">{d.label}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {["09:00", "11:00", "14:00", "16:00"].map((h) => {
                          const v = `${d.label} às ${h}`;
                          return (
                            <button key={h} type="button" className="chip chip-sm min-h-10 px-3" aria-pressed={visita === v} onClick={() => setVisita(v)}>
                              {h}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!visita}
                  className="btn btn-primary mt-6 w-full justify-between disabled:opacity-50"
                  onClick={async () => {
                    await submitVisita(result.protocolo ?? "", visita);
                    setVisitaOk(true);
                  }}
                >
                  Confirmar horário <Arrow />
                </button>
              </>
            )}
          </div>
          <a href={waLink(resumo)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary w-full justify-between">
            Continuar pelo WhatsApp <Arrow />
          </a>
        </div>
      </div>
    );
  }

  /* ------------------------------ Passos ------------------------------ */
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
      <div>
        <div className="flex items-center justify-between">
          <p className="mono-label text-muted">
            Passo {String(step + 1).padStart(2, "0")} / {steps.length}
          </p>
          <p className="mono-label text-muted">{steps[step]}</p>
        </div>
        <div className="mt-3 h-px bg-paper/15" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1} aria-label="Progresso do orçamento">
          <div className="h-[2px] -translate-y-[0.5px] bg-signal transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>

        <div key={step} className="step-in mt-10 min-h-[26rem]">
          {step === 0 && (
            <Step title="Que tipo de projeto você tem em mente?" refEl={headingRef} error={errors.tipo}>
              <div role="radiogroup" aria-label="Tipo de projeto" className="grid gap-3 sm:grid-cols-2">
                {tipos.map((t) => (
                  <OptionCard key={t.id} selected={q.tipo === t.id} onClick={() => set("tipo", t.id)}>
                    <span className="block text-lg font-medium">{t.nome}</span>
                    <span className="text-muted mt-1 block text-sm">{t.desc}</span>
                  </OptionCard>
                ))}
              </div>
            </Step>
          )}

          {step === 1 && (
            <Step title="Qual é o imóvel?" refEl={headingRef} error={errors.imovel}>
              <div role="radiogroup" aria-label="Tipo de imóvel" className="grid gap-3 sm:grid-cols-2">
                {imoveis.map((i) => (
                  <OptionCard key={i} selected={q.imovel === i} onClick={() => set("imovel", i)}>
                    <span className="text-lg">{i}</span>
                  </OptionCard>
                ))}
              </div>
            </Step>
          )}

          {step === 2 && (
            <Step title="Quais serviços entram no projeto?" refEl={headingRef} error={errors.disciplinas}>
              <div className="mb-4 flex flex-wrap gap-2">
                <button type="button" className="chip" onClick={() => set("disciplinas", disciplinas.map((d) => d.slug))}>
                  Marcar todas
                </button>
                <button type="button" className="chip" onClick={() => set("disciplinas", [])}>
                  Limpar
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Disciplinas">
                {disciplinas.map((d) => (
                  <OptionCard key={d.slug} role="checkbox" selected={q.disciplinas.includes(d.slug)} onClick={() => toggle("disciplinas", d.slug)}>
                    <span className="mono-label text-muted block">Disc. {d.numero}</span>
                    <span className="mt-1 block font-medium">{d.nome}</span>
                    {q.servicos.length > 0 && q.disciplinas.includes(d.slug) && (
                      <span className="mt-1 block text-sm text-signal">
                        {d.servicos
                          .filter((s) => q.servicos.includes(s.slug))
                          .map((s) => s.nome)
                          .join(", ")}
                      </span>
                    )}
                  </OptionCard>
                ))}
              </div>
            </Step>
          )}

          {step === 3 && (
            <Step title="Qual é o tamanho?" refEl={headingRef} error={errors.area}>
              <div className="grid gap-8">
                <div>
                  <label htmlFor="area-range" className="mono-label">
                    Área aproximada
                  </label>
                  <p className="font-display-c mt-2 text-6xl tabular-nums">
                    {q.area.toLocaleString("pt-BR")} <span className="text-3xl">m²</span>
                  </p>
                  <input
                    id="area-range"
                    type="range"
                    min={10}
                    max={5000}
                    step={10}
                    value={Math.min(q.area, 5000)}
                    onChange={(e) => set("area", Number(e.target.value))}
                    className="mt-4 w-full accent-[var(--color-signal)]"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Área exata (m²)" type="number" inputMode="numeric" min={5} value={q.area || ""} onChange={(e) => set("area", Number(e.target.value))} />
                  <Field label="Número de ambientes" type="number" inputMode="numeric" min={0} value={q.ambientes || ""} onChange={(e) => set("ambientes", Number(e.target.value))} />
                </div>
              </div>
            </Step>
          )}

          {step === 4 && (
            <Step title="Qual padrão de acabamento?" refEl={headingRef}>
              <div role="radiogroup" aria-label="Padrão de acabamento" className="grid gap-4 md:grid-cols-3">
                {padroes.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={q.padrao === p.id}
                    onClick={() => set("padrao", p.id)}
                    className={cn("group border text-left transition-colors", q.padrao === p.id ? "border-signal" : "border-paper/20 hover:border-paper/60")}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-graphite-800">
                      <Photo k={p.imagem} sizes="(min-width: 768px) 20vw, 100vw" />
                    </div>
                    <div className="p-4">
                      <p className="text-lg font-medium">{p.nome}</p>
                      <p className="text-muted mt-1 text-sm">{p.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </Step>
          )}

          {step === 5 && (
            <Step title="Quando você quer começar?" refEl={headingRef}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Início desejado" type="month" value={q.inicio} onChange={(e) => set("inicio", e.target.value)} />
                <Field label="Conclusão desejada" type="month" value={q.conclusao} onChange={(e) => set("conclusao", e.target.value)} />
              </div>
              <p className="text-muted mt-6 text-sm">Não sabe ainda? Pode seguir em frente. O cronograma é definido na proposta.</p>
            </Step>
          )}

          {step === 6 && (
            <Step title="Onde fica a obra?" refEl={headingRef}>
              <div className="grid gap-5 sm:grid-cols-[14rem_1fr]">
                <Field
                  label="CEP"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="00000-000"
                  value={q.cep}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 8);
                    const masked = v.length > 5 ? `${v.slice(0, 5)}-${v.slice(5)}` : v;
                    set("cep", masked);
                    if (v.length === 8) lookupCep(v);
                    else setCepStatus("");
                  }}
                />
                <Field label="Cidade / UF" value={q.cidade ? `${q.cidade} / ${q.uf}` : ""} readOnly placeholder="Preenchido pelo CEP" />
              </div>
              <p className="mt-4 text-sm" role="status" aria-live="polite">
                {cepStatus === "loading" && <span className="text-muted">Consultando CEP…</span>}
                {cepStatus === "ok" && <span className="text-signal">Atendemos {q.cidade}. Visita técnica em até 48 horas.</span>}
                {cepStatus === "fora" && <span className="text-paper/85">Ainda não temos equipe fixa em {q.uf}. Para obras completas e projetos acima de R$ 1 milhão, avaliamos caso a caso.</span>}
                {cepStatus === "erro" && <span className="field-error">CEP não encontrado. Confira o número.</span>}
              </p>
            </Step>
          )}

          {step === 7 && (
            <Step title="Tem fotos, planta ou projeto?" refEl={headingRef}>
              <label
                className="flex min-h-56 cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-paper/30 p-8 text-center transition-colors hover:border-signal"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  set("arquivos", [...q.arquivos, ...Array.from(e.dataTransfer.files).map((f) => f.name)]);
                }}
              >
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                  <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
                </svg>
                <span className="text-lg">Arraste os arquivos aqui ou clique para escolher</span>
                <span className="text-muted text-sm">PDF, DWG, JPG ou PNG — até 25 MB por arquivo</span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.dwg,.jpg,.jpeg,.png"
                  className="sr-only"
                  onChange={(e) => set("arquivos", [...q.arquivos, ...Array.from(e.target.files ?? []).map((f) => f.name)])}
                />
              </label>
              {q.arquivos.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {q.arquivos.map((a, i) => (
                    <li key={`${a}-${i}`} className="flex items-center justify-between border border-paper/15 px-4 py-2 text-sm">
                      {a}
                      <button type="button" className="mono-label text-muted hover:text-paper" onClick={() => set("arquivos", q.arquivos.filter((_, j) => j !== i))}>
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-muted mt-4 text-sm">Opcional. Você também pode enviar depois, pelo WhatsApp.</p>
            </Step>
          )}

          {step === 8 && (
            <Step title="Qual é o investimento previsto?" refEl={headingRef} error={errors.investimento}>
              <div role="radiogroup" aria-label="Faixa de investimento" className="grid gap-3">
                {faixas.map((f) => (
                  <OptionCard key={f.id} selected={q.investimento === f.id} onClick={() => set("investimento", f.id)}>
                    <span className="text-lg">{f.label}</span>
                  </OptionCard>
                ))}
              </div>
              <p className="text-muted mt-4 text-sm">Projetos acima de R$ 1 milhão são conduzidos por um executivo sênior dedicado.</p>
            </Step>
          )}

          {step === 9 && (
            <Step title="Para quem enviamos a proposta?" refEl={headingRef}>
              <div className="grid gap-5">
                <Field label="Nome" autoComplete="name" required value={q.nome} onChange={(e) => set("nome", e.target.value)} error={errors.nome} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="E-mail" type="email" autoComplete="email" required value={q.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
                  <Field
                    label="WhatsApp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    placeholder="(11) 90000-0000"
                    value={q.telefone}
                    onChange={(e) => set("telefone", e.target.value)}
                    error={errors.telefone}
                  />
                </div>
                <Select label="Melhor horário para contato" value={q.horario} onChange={(e) => set("horario", e.target.value)}>
                  <option value="">Qualquer horário</option>
                  <option>Manhã</option>
                  <option>Tarde</option>
                  <option>Noite (até 20h)</option>
                </Select>
                <label className="flex items-start gap-3 text-sm leading-relaxed">
                  <input type="checkbox" checked={q.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-signal)]" />
                  <span className="text-muted">
                    Concordo com o tratamento dos meus dados para elaboração da proposta, conforme a{" "}
                    <a href="/privacidade" className="underline underline-offset-4">
                      Política de Privacidade
                    </a>{" "}
                    (LGPD).
                  </span>
                </label>
                {errors.consent && <p className="field-error">{errors.consent}</p>}
              </div>
            </Step>
          )}
        </div>

        {/* Navegação: fixa na zona do polegar no mobile */}
        <div className="sticky bottom-16 z-10 -mx-[var(--gutter)] mt-10 flex items-center justify-between gap-3 border-t border-paper/10 bg-graphite-950/95 px-[var(--gutter)] py-4 backdrop-blur lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0">
          <button type="button" onClick={back} disabled={step === 0} className="btn btn-secondary disabled:invisible">
            <Arrow dir="left" /> Voltar
          </button>
          <button type="button" onClick={next} disabled={sending} className="btn btn-primary min-w-44 justify-between disabled:opacity-60">
            {step === steps.length - 1 ? (sending ? "Enviando…" : "Enviar pedido") : "Continuar"} <Arrow />
          </button>
        </div>
      </div>

      {/* Resumo lateral */}
      <aside className="hidden h-fit border border-paper/15 p-6 lg:sticky lg:top-24 lg:block" aria-label="Resumo do pedido">
        <p className="mono-label text-muted">Resumo</p>
        <ul className="mt-4 space-y-3 text-sm">
          {steps.map((s, i) => (
            <li key={s}>
              <button type="button" onClick={() => i < step && setStep(i)} className={cn("flex w-full items-center gap-3 text-left", i < step ? "hover:text-signal" : "cursor-default", i === step ? "text-paper" : "text-muted")} disabled={i >= step}>
                <span className={cn("grid h-5 w-5 shrink-0 place-items-center border font-mono text-[0.625rem]", i < step ? "border-signal bg-signal text-ink" : i === step ? "border-paper" : "border-paper/30")}>
                  {i < step ? "✓" : i + 1}
                </span>
                {s}
              </button>
            </li>
          ))}
        </ul>
        {est && (
          <div className="mt-6 border-t border-paper/15 pt-5">
            <p className="mono-label text-muted">Estimativa indicativa</p>
            <Ph as="p" className="mt-2 text-lg tabular-nums">
              {brl(round(est.min))} – {brl(round(est.max))}
              {est.mensal && "/mês"}
            </Ph>
            <p className="text-muted mt-1 text-xs">Valor final após a visita técnica.</p>
          </div>
        )}
      </aside>
    </div>
  );
}

function Step({ title, children, refEl, error }: { title: string; children: ReactNode; refEl: React.RefObject<HTMLHeadingElement | null>; error?: string }) {
  return (
    <fieldset>
      <legend className="sr-only">{title}</legend>
      <h2 ref={refEl} tabIndex={-1} className="font-display-x text-[clamp(1.75rem,3.4vw,3rem)] outline-none">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
      {error && (
        <p className="field-error mt-4" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
