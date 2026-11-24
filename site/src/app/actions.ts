"use server";

import { z } from "zod";
import { site } from "@/content/site";

/**
 * Server Actions dos formulários.
 * - Validação com Zod no servidor (o cliente nunca é a fonte da verdade).
 * - Entrega: webhook de CRM (CRM_WEBHOOK_URL) + e-mail via Resend (RESEND_API_KEY).
 *   Sem essas variáveis, o lead é registrado no log do servidor.
 * - Campo "website" é um honeypot anti-spam (invisível para pessoas).
 */

export type FormState = {
  ok: boolean;
  protocolo?: string;
  prioridade?: "A" | "B";
  errors?: Record<string, string>;
  message?: string;
};

const protocolo = (prefix: string) => `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

async function deliver(kind: string, data: Record<string, unknown>, opts: { to?: string; subject: string }) {
  const payload = { kind, ...data, recebidoEm: new Date().toISOString(), origemSite: site.url };
  const tasks: Promise<unknown>[] = [];
  if (process.env.CRM_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.CRM_WEBHOOK_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) }).catch((e) =>
        console.error("[crm] falha ao enviar", e),
      ),
    );
  }
  if (process.env.RESEND_API_KEY && opts.to) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" },
        body: JSON.stringify({
          from: `LASTRO Site <site@${new URL(site.url).hostname}>`,
          to: [opts.to],
          subject: opts.subject,
          text: Object.entries(payload)
            .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`)
            .join("\n"),
        }),
      }).catch((e) => console.error("[email] falha ao enviar", e)),
    );
  }
  await Promise.all(tasks);
  console.info(`[lead:${kind}]`, JSON.stringify(payload));
}

const isSpam = (fd: FormData) => String(fd.get("website") ?? "").trim() !== "";
const consent = z.literal("on", { error: "É preciso aceitar a política de privacidade." });
const telefone = z
  .string()
  .trim()
  .refine((v) => v.replace(/\D/g, "").length >= 10, "Informe um telefone com DDD.");

/* ------------------------------------------------------------------------- */
/* Lead curto (páginas de serviço, soluções, contato)                        */
/* ------------------------------------------------------------------------- */
const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome."),
  email: z.email("Informe um e-mail válido."),
  telefone,
  mensagem: z.string().trim().max(2000).optional(),
  origem: z.string().max(200).optional(),
  servico: z.string().max(200).optional(),
  consent,
});

export async function submitLead(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isSpam(fd)) return { ok: true, protocolo: protocolo("LST") };
  const parsed = leadSchema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  const p = protocolo("LST");
  await deliver("lead", { protocolo: p, ...parsed.data }, { to: process.env.LEAD_NOTIFY_EMAIL, subject: `Novo lead ${p} — ${parsed.data.servico ?? parsed.data.origem ?? "site"}` });
  return { ok: true, protocolo: p };
}

/* ------------------------------------------------------------------------- */
/* Configurador de orçamento (com lead scoring)                              */
/* ------------------------------------------------------------------------- */
const quoteSchema = z.object({
  tipo: z.enum(["avulso", "completa", "nova", "manutencao"], { error: "Escolha o tipo de projeto." }),
  imovel: z.string().min(1, "Escolha o tipo de imóvel."),
  disciplinas: z.array(z.string()).min(1, "Escolha ao menos um serviço."),
  servicos: z.array(z.string()).optional(),
  area: z.number().min(5).max(200000),
  ambientes: z.number().min(0).max(500).optional(),
  padrao: z.enum(["alto", "premium", "assinatura"]),
  inicio: z.string().optional(),
  conclusao: z.string().optional(),
  cep: z.string().optional(),
  cidade: z.string().optional(),
  uf: z.string().optional(),
  arquivos: z.array(z.string()).optional(),
  investimento: z.string().min(1, "Escolha a faixa de investimento."),
  perfil: z.string().optional(),
  nome: z.string().trim().min(2, "Informe seu nome."),
  email: z.email("Informe um e-mail válido."),
  telefone,
  horario: z.string().optional(),
  estimativa: z.string().optional(),
  consent: z.literal(true, { error: "É preciso aceitar a política de privacidade." }),
});

export type QuoteInput = z.input<typeof quoteSchema>;

const faixasAltas = ["1-5mi", "5mi+"];
const perfisAltos = ["incorporadoras", "industria-e-logistica", "incorporadora", "industria"];

export async function submitQuote(input: QuoteInput): Promise<FormState> {
  const parsed = quoteSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  const d = parsed.data;
  const prioridade: "A" | "B" = faixasAltas.includes(d.investimento) || perfisAltos.includes(d.perfil ?? "") || d.tipo === "nova" ? "A" : "B";
  const p = protocolo("ORC");
  await deliver(
    "orcamento",
    { protocolo: p, prioridade, ...d },
    {
      to: prioridade === "A" ? process.env.LEAD_PRIORITY_EMAIL : process.env.LEAD_NOTIFY_EMAIL,
      subject: `${prioridade === "A" ? "[PRIORIDADE A] " : ""}Orçamento ${p} — ${d.tipo} · ${d.area} m² · ${d.investimento}`,
    },
  );
  return { ok: true, protocolo: p, prioridade };
}

/* ------------------------------------------------------------------------- */
/* Data room (investidores)                                                  */
/* ------------------------------------------------------------------------- */
const freeMail = /@(gmail|hotmail|outlook|live|yahoo|icloud|bol|uol|terra|ig)\./i;
const dataRoomSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome."),
  empresa: z.string().trim().min(2, "Informe a empresa ou o fundo."),
  cargo: z.string().trim().min(2, "Informe seu cargo."),
  tipo: z.string().min(1, "Escolha o tipo de investidor."),
  ticket: z.string().min(1, "Escolha a faixa de ticket."),
  email: z.email("Informe um e-mail válido.").refine((v) => !freeMail.test(v), "Use o seu e-mail corporativo."),
  nda: z.literal("on", { error: "É preciso aceitar o termo de confidencialidade." }),
  lang: z.string().optional(),
});

export async function submitDataRoom(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isSpam(fd)) return { ok: true, protocolo: protocolo("RI") };
  const parsed = dataRoomSchema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  const p = protocolo("RI");
  await deliver("data_room", { protocolo: p, ...parsed.data }, { to: process.env.RI_NOTIFY_EMAIL, subject: `Pedido de data room ${p} — ${parsed.data.empresa}` });
  return { ok: true, protocolo: p };
}

/* ------------------------------------------------------------------------- */
/* Rede de Mestres (candidatura de profissionais)                            */
/* ------------------------------------------------------------------------- */
const redeSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome."),
  telefone,
  cidade: z.string().trim().min(2, "Informe sua cidade."),
  oficio: z.string().min(1, "Escolha o seu ofício."),
  anos: z.coerce.number({ error: "Informe os anos de experiência." }).min(0).max(70),
  vinculo: z.string().min(1, "Escolha a forma de trabalho."),
  certificacoes: z.string().optional(),
  consent,
});

export async function submitRede(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isSpam(fd)) return { ok: true, protocolo: protocolo("RDM") };
  const raw = Object.fromEntries(fd);
  const certificacoes = fd.getAll("cert").map(String).join(", ");
  const parsed = redeSchema.safeParse({ ...raw, certificacoes });
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  const p = protocolo("RDM");
  await deliver("rede", { protocolo: p, ...parsed.data }, { to: process.env.LEAD_NOTIFY_EMAIL, subject: `Candidatura ${p} — ${parsed.data.oficio}` });
  return { ok: true, protocolo: p };
}

/* ------------------------------------------------------------------------- */
/* Canal de Ética (pode ser anônimo)                                         */
/* ------------------------------------------------------------------------- */
const eticaSchema = z.object({
  categoria: z.string().min(1, "Escolha a categoria."),
  relato: z.string().trim().min(30, "Descreva o ocorrido com pelo menos 30 caracteres."),
  quando: z.string().optional(),
  onde: z.string().optional(),
  contato: z.string().optional(),
});

export async function submitEtica(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isSpam(fd)) return { ok: true, protocolo: protocolo("ETC") };
  const parsed = eticaSchema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  const p = protocolo("ETC");
  // Em produção, direcionar para o canal independente contratado (não para a caixa comercial).
  await deliver("etica", { protocolo: p, ...parsed.data }, { to: process.env.ETICA_NOTIFY_EMAIL, subject: `Relato ${p} — ${parsed.data.categoria}` });
  return { ok: true, protocolo: p };
}

/* ------------------------------------------------------------------------- */
/* Pedido de horário da visita técnica (após o orçamento)                    */
/* ------------------------------------------------------------------------- */
export async function submitVisita(protocoloOrcamento: string, horario: string): Promise<FormState> {
  const p = z.string().min(3).max(80).safeParse(protocoloOrcamento);
  const h = z.string().min(3).max(80).safeParse(horario);
  if (!p.success || !h.success) return { ok: false, message: "Dados inválidos." };
  await deliver("visita", { protocolo: p.data, horario: h.data }, { to: process.env.LEAD_NOTIFY_EMAIL, subject: `Visita técnica solicitada — ${p.data} — ${h.data}` });
  return { ok: true, protocolo: p.data };
}
