"use client";

import { startTransition, useActionState, useEffect, type FormEvent } from "react";
import { submitDataRoom, submitEtica, submitLead, submitRede, type FormState } from "@/app/actions";
import { Consent, Field, Honeypot, Select, Success, TextArea } from "./Field";
import { Arrow } from "@/components/ui/Arrow";
import { track } from "@/lib/track";
import { waLink } from "@/lib/wa";
import { disciplinas } from "@/content/disciplinas";

const initial: FormState = { ok: false };

/**
 * Envia sem o reset automático do React 19 (que apagaria o que a pessoa digitou
 * quando a validação falha). O atributo action continua para funcionar sem JS.
 */
function keepValues(dispatch: (fd: FormData) => void) {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => dispatch(fd));
  };
}

function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button type="submit" disabled={pending} className="btn btn-primary w-full justify-between disabled:opacity-60 sm:w-auto">
      {pending ? "Enviando…" : children} <Arrow />
    </button>
  );
}

/* ----------------------------- Lead curto ----------------------------- */
export function LeadFormInner({ origem, servico, compact = false }: { origem: string; servico?: string; compact?: boolean }) {
  const [state, action, pending] = useActionState(submitLead, initial);
  useEffect(() => {
    if (state.ok) track("lead_submit", { origem });
  }, [state.ok, origem]);

  if (state.ok)
    return (
      <div className="mt-6">
        <Success protocolo={state.protocolo}>
          Obrigado. Um especialista vai falar com você em até 1 dia útil.
          <a
            href={waLink(`Olá! Acabei de enviar um pedido pelo site (protocolo ${state.protocolo}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label mt-4 flex items-center gap-2 text-signal"
          >
            Adiantar pelo WhatsApp <Arrow />
          </a>
        </Success>
      </div>
    );

  return (
    <form action={action} onSubmit={keepValues(action)} className="relative mt-6 grid gap-5" noValidate onFocus={() => track("form_start", { origem })}>
      <Honeypot />
      <input type="hidden" name="origem" value={origem} />
      {servico && <input type="hidden" name="servico" value={servico} />}
      <Field label="Nome" name="nome" autoComplete="name" required error={state.errors?.nome} />
      <div className={compact ? "grid gap-5" : "grid gap-5 sm:grid-cols-2"}>
        <Field label="E-mail" name="email" type="email" autoComplete="email" required error={state.errors?.email} />
        <Field label="WhatsApp" name="telefone" type="tel" autoComplete="tel" inputMode="tel" required placeholder="(11) 90000-0000" error={state.errors?.telefone} />
      </div>
      <TextArea label="Conte rapidamente o que precisa" name="mensagem" rows={compact ? 3 : 5} error={state.errors?.mensagem} />
      <Consent error={state.errors?.consent} />
      <SubmitButton pending={pending}>Enviar pedido</SubmitButton>
    </form>
  );
}

/* ----------------------------- Data room ----------------------------- */
const copyDataRoom = {
  pt: {
    nome: "Nome",
    empresa: "Empresa ou fundo",
    cargo: "Cargo",
    tipo: "Tipo de investidor",
    ticket: "Faixa de ticket",
    email: "E-mail corporativo",
    choose: "Selecione",
    nda: "Li e aceito o termo de confidencialidade (NDA) para acesso aos documentos.",
    submit: "Solicitar acesso",
    ok: "Pedido recebido. A equipe de Relações com Investidores vai validar o cadastro e enviar o acesso ao data room.",
    tipos: ["Venture capital", "Private equity", "Family office", "Investidor estratégico", "Investidor anjo"],
    tickets: ["Até R$ 5 mi", "R$ 5 a 20 mi", "R$ 20 a 50 mi", "Acima de R$ 50 mi"],
  },
  en: {
    nome: "Name",
    empresa: "Company or fund",
    cargo: "Title",
    tipo: "Investor type",
    ticket: "Ticket size",
    email: "Corporate e-mail",
    choose: "Select",
    nda: "I have read and accept the non-disclosure agreement (NDA) to access the documents.",
    submit: "Request access",
    ok: "Request received. Our Investor Relations team will validate your details and send data room access.",
    tipos: ["Venture capital", "Private equity", "Family office", "Strategic investor", "Angel investor"],
    tickets: ["Up to BRL 5M", "BRL 5–20M", "BRL 20–50M", "Above BRL 50M"],
  },
};

export function DataRoomForm({ lang = "pt" }: { lang?: "pt" | "en" }) {
  const t = copyDataRoom[lang];
  const [state, action, pending] = useActionState(submitDataRoom, initial);
  useEffect(() => {
    if (state.ok) track("data_room_request", { lang });
  }, [state.ok, lang]);
  if (state.ok) return <Success protocolo={state.protocolo}>{t.ok}</Success>;
  return (
    <form action={action} onSubmit={keepValues(action)} className="relative grid gap-5" noValidate>
      <Honeypot />
      <input type="hidden" name="lang" value={lang} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.nome} name="nome" autoComplete="name" required error={state.errors?.nome} />
        <Field label={t.cargo} name="cargo" autoComplete="organization-title" required error={state.errors?.cargo} />
      </div>
      <Field label={t.empresa} name="empresa" autoComplete="organization" required error={state.errors?.empresa} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Select label={t.tipo} name="tipo" required defaultValue="" error={state.errors?.tipo}>
          <option value="" disabled>
            {t.choose}
          </option>
          {t.tipos.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </Select>
        <Select label={t.ticket} name="ticket" required defaultValue="" error={state.errors?.ticket}>
          <option value="" disabled>
            {t.choose}
          </option>
          {t.tickets.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </Select>
      </div>
      <Field label={t.email} name="email" type="email" autoComplete="email" required error={state.errors?.email} />
      <Consent name="nda" error={state.errors?.nda}>
        {t.nda}
      </Consent>
      <SubmitButton pending={pending}>{t.submit}</SubmitButton>
    </form>
  );
}

/* ----------------------------- Rede de Mestres ----------------------------- */
const oficios = [
  "Pedreiro",
  "Armador",
  "Carpinteiro",
  "Soldador",
  "Serralheiro",
  "Eletricista",
  "Encanador",
  "Impermeabilizador",
  "Azulejista",
  "Marmorista",
  "Gesseiro",
  "Pintor",
  "Marceneiro",
  "Vidraceiro",
  "Técnico de refrigeração",
  "Mestre de obras",
  "Engenheiro(a)",
  "Outro",
];

export function RedeForm() {
  const [state, action, pending] = useActionState(submitRede, initial);
  useEffect(() => {
    if (state.ok) track("rede_application");
  }, [state.ok]);
  if (state.ok)
    return (
      <Success protocolo={state.protocolo}>
        Cadastro recebido. Vamos entrar em contato pelo WhatsApp para marcar a avaliação técnica.
      </Success>
    );
  return (
    <form action={action} onSubmit={keepValues(action)} className="relative grid gap-5" noValidate>
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome completo" name="nome" autoComplete="name" required error={state.errors?.nome} />
        <Field label="WhatsApp" name="telefone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="(11) 90000-0000" error={state.errors?.telefone} />
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Select label="Ofício" name="oficio" required defaultValue="" error={state.errors?.oficio}>
          <option value="" disabled>
            Selecione
          </option>
          {oficios.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </Select>
        <Field label="Anos de experiência" name="anos" type="number" min={0} max={70} inputMode="numeric" required error={state.errors?.anos} />
        <Field label="Cidade" name="cidade" autoComplete="address-level2" required error={state.errors?.cidade} />
      </div>
      <fieldset>
        <legend className="mono-label">Certificações</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {["NR-10", "NR-10 SEP", "NR-35", "NR-33", "NR-18", "Solda qualificada", "Outra"].map((c) => (
            <label key={c} className="chip cursor-pointer has-[:checked]:bg-paper has-[:checked]:text-ink">
              <input type="checkbox" name="cert" value={c} className="sr-only" />
              {c}
            </label>
          ))}
        </div>
      </fieldset>
      <Select label="Como prefere trabalhar" name="vinculo" required defaultValue="" error={state.errors?.vinculo}>
        <option value="" disabled>
          Selecione
        </option>
        <option>CLT</option>
        <option>MEI / PJ</option>
        <option>Tanto faz</option>
      </Select>
      <Consent error={state.errors?.consent} />
      <SubmitButton pending={pending}>Quero fazer parte</SubmitButton>
    </form>
  );
}

/* ----------------------------- Canal de Ética ----------------------------- */
export function EticaForm() {
  const [state, action, pending] = useActionState(submitEtica, initial);
  if (state.ok)
    return (
      <Success protocolo={state.protocolo}>
        Relato registrado. Guarde o protocolo: ele é a única forma de acompanhar o caso se você optou pelo anonimato.
      </Success>
    );
  return (
    <form action={action} onSubmit={keepValues(action)} className="relative grid gap-5" noValidate>
      <Honeypot />
      <Select label="Categoria" name="categoria" required defaultValue="" error={state.errors?.categoria}>
        <option value="" disabled>
          Selecione
        </option>
        <option>Corrupção ou suborno</option>
        <option>Fraude</option>
        <option>Assédio moral ou sexual</option>
        <option>Discriminação</option>
        <option>Segurança do trabalho</option>
        <option>Meio ambiente</option>
        <option>Conflito de interesses</option>
        <option>Outro</option>
      </Select>
      <TextArea label="O que aconteceu?" name="relato" rows={7} required error={state.errors?.relato} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Quando (aproximadamente)" name="quando" />
        <Field label="Onde (obra, escritório, cidade)" name="onde" />
      </div>
      <Field label="Contato (opcional — deixe em branco para anonimato)" name="contato" hint="Para manter o anonimato, não informe nome, e-mail ou telefone no relato." />
      <SubmitButton pending={pending}>Registrar relato</SubmitButton>
    </form>
  );
}

export const listaDisciplinas = disciplinas.map((d) => ({ slug: d.slug, nome: d.nome }));
