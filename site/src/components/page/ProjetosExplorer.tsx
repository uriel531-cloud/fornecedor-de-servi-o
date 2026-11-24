"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { projetos } from "@/content/projetos";
import { disciplinas } from "@/content/disciplinas";
import { ProjetoGridCard } from "./cards";
import { TLink } from "@/components/ui/TLink";
import { Ph } from "@/components/ui/Ph";
import { CoordPlot } from "./CoordPlot";
import { num } from "@/lib/format";
import { cn } from "@/lib/cn";

type View = "grade" | "lista" | "mapa";
const uniq = <T,>(a: T[]) => Array.from(new Set(a));

export function ProjetosExplorer() {
  const params = useSearchParams();
  const [setor, setSetor] = useState<string>("");
  const [disc, setDisc] = useState<string>(params.get("disciplina") ?? "");
  const [cidade, setCidade] = useState<string>("");
  const [porte, setPorte] = useState<string>("");
  const [ano, setAno] = useState<string>("");
  const [view, setView] = useState<View>("grade");

  const opts = {
    setor: uniq(projetos.map((p) => p.setor)),
    cidade: uniq(projetos.map((p) => p.cidade)),
    porte: uniq(projetos.map((p) => p.porte)),
    ano: uniq(projetos.map((p) => String(p.ano))).sort().reverse(),
  };

  const list = useMemo(
    () =>
      projetos.filter(
        (p) =>
          (!setor || p.setor === setor) &&
          (!disc || p.disciplinas.includes(disc)) &&
          (!cidade || p.cidade === cidade) &&
          (!porte || p.porte === porte) &&
          (!ano || String(p.ano) === ano),
      ),
    [setor, disc, cidade, porte, ano],
  );

  const clear = () => {
    setSetor("");
    setDisc("");
    setCidade("");
    setPorte("");
    setAno("");
  };
  const active = [setor, disc, cidade, porte, ano].filter(Boolean).length;

  const sel = "input min-h-11 py-2 text-sm";

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-paper/10 py-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:flex-wrap">
          <label className="field">
            <span className="field-label">Setor</span>
            <select className={sel} value={setor} onChange={(e) => setSetor(e.target.value)}>
              <option value="">Todos</option>
              {opts.setor.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Disciplina</span>
            <select className={sel} value={disc} onChange={(e) => setDisc(e.target.value)}>
              <option value="">Todas</option>
              {disciplinas.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.nome}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Cidade</span>
            <select className={sel} value={cidade} onChange={(e) => setCidade(e.target.value)}>
              <option value="">Todas</option>
              {opts.cidade.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Porte</span>
            <select className={sel} value={porte} onChange={(e) => setPorte(e.target.value)}>
              <option value="">Todos</option>
              {opts.porte.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Ano</span>
            <select className={sel} value={ano} onChange={(e) => setAno(e.target.value)}>
              <option value="">Todos</option>
              {opts.ano.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="mono-label text-muted" aria-live="polite">
            {list.length} {list.length === 1 ? "projeto" : "projetos"}
            {active > 0 && (
              <button type="button" onClick={clear} className="ml-3 text-paper underline underline-offset-4">
                Limpar filtros
              </button>
            )}
          </p>
          <div role="group" aria-label="Visualização" className="flex">
            {(["grade", "lista", "mapa"] as View[]).map((v) => (
              <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)} className={cn("mono-label min-h-11 border border-paper/20 px-4 capitalize", view === v && "bg-paper text-ink")}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {list.length === 0 && (
        <p className="text-muted py-20 text-center text-lg">
          Nenhum projeto com esses filtros.{" "}
          <button type="button" onClick={clear} className="text-paper underline underline-offset-4">
            Limpar filtros
          </button>
        </p>
      )}

      {view === "grade" && list.length > 0 && (
        <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <li key={p.slug} className="step-in">
              <ProjetoGridCard p={p} />
            </li>
          ))}
        </ul>
      )}

      {view === "lista" && list.length > 0 && (
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="mono-label text-muted border-b border-paper/15">
                <th className="py-3 pr-4 font-normal">Projeto</th>
                <th className="py-3 pr-4 font-normal">Setor</th>
                <th className="py-3 pr-4 font-normal">Cidade</th>
                <th className="py-3 pr-4 text-right font-normal">Área</th>
                <th className="py-3 pr-4 text-right font-normal">Prazo previsto × real</th>
                <th className="py-3 text-right font-normal">Orçamento</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.slug} className="border-b border-paper/10 hover:bg-graphite-900">
                  <td className="py-4 pr-4">
                    <TLink href={`/projetos/${p.slug}`} className="font-medium hover:text-signal">
                      <Ph>{p.nome}</Ph>
                    </TLink>
                  </td>
                  <td className="text-muted py-4 pr-4">{p.setor}</td>
                  <td className="text-muted py-4 pr-4">{p.cidade}</td>
                  <td className="py-4 pr-4 text-right tabular-nums">
                    <Ph>{num(p.area)} m²</Ph>
                  </td>
                  <td className="py-4 pr-4 text-right tabular-nums">
                    <Ph>
                      {String(p.prazoPrevisto).replace(".", ",")} × {String(p.prazoReal).replace(".", ",")} meses
                    </Ph>
                  </td>
                  <td className="py-4 text-right tabular-nums">
                    <Ph>{p.orcamentoVar}</Ph>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === "mapa" && list.length > 0 && (
        <div className="mt-10">
          <CoordPlot
            points={list.map((p) => ({ id: p.slug, label: p.nome, sub: `${p.cidade} · ${num(p.area)} m²`, lat: p.coords[0], lng: p.coords[1], href: `/projetos/${p.slug}` }))}
            bounds={{ minLat: -26.5, maxLat: -18.5, minLng: -50.5, maxLng: -42 }}
          />
        </div>
      )}
    </div>
  );
}
