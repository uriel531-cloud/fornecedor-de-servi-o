"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Gráficos de série única (sem legenda: o título nomeia a série).
 * Cor da marca: #b9852f — validada para superfície escura #11100d
 * (luminosidade OKLCH 0,48–0,67, croma ≥ 0,10, contraste ≥ 3:1).
 * Texto sempre em tokens de texto, nunca na cor da série.
 */
const MARK = "#b9852f";
const SURFACE = "#11100d";
const GRID = "rgb(243 241 236 / 0.1)";

type Datum = { ano: string; valor: number };

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(560);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

function niceMax(v: number, step: number) {
  return Math.ceil(v / step) * step;
}

function DataTable({ data, unit, caption, en }: { data: Datum[]; unit: string; caption: string; en?: boolean }) {
  return (
    <details className="mt-4">
      <summary className="mono-label text-muted cursor-pointer hover:text-paper">{en ? "View data table" : "Ver dados em tabela"}</summary>
      <table className="mt-3 w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="text-muted border-b border-paper/15">
            <th className="py-2 font-normal">{en ? "Year" : "Ano"}</th>
            <th className="py-2 text-right font-normal">{unit}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.ano} className="border-b border-paper/10">
              <td className="py-2">{d.ano}</td>
              <td className="py-2 text-right tabular-nums">{d.valor.toLocaleString("pt-BR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

/* ------------------------------- Colunas ------------------------------- */
export function ColumnChart({ data, title, sub, unit, step = 50, en }: { data: Datum[]; title: string; sub: string; unit: string; step?: number; en?: boolean }) {
  const [ref, W] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const H = 280;
  const pad = { t: 28, r: 8, b: 32, l: 40 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const max = niceMax(Math.max(...data.map((d) => d.valor)), step);
  const band = iw / data.length;
  const bw = Math.min(24, band * 0.5);
  const y = (v: number) => pad.t + ih - (v / max) * ih;
  const ticks = Array.from({ length: max / step + 1 }, (_, i) => i * step);
  const last = data.length - 1;

  return (
    <figure>
      <figcaption>
        <p className="text-lg font-medium">{title}</p>
        <p className="text-muted text-sm">{sub}</p>
      </figcaption>
      <div ref={ref} className="relative mt-6" onPointerLeave={() => setHover(null)}>
        <svg width={W} height={H} role="img" aria-label={`${title}: ${data.map((d) => `${d.ano} ${d.valor}`).join(", ")}`}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth={1} />
              <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize={11} fill="rgb(243 241 236 / 0.55)" fontFamily="var(--font-mono)">
                {t}
              </text>
            </g>
          ))}
          {data.map((d, i) => {
            const cx = pad.l + band * i + band / 2;
            const top = y(d.valor);
            const h = pad.t + ih - top;
            const r = Math.min(4, h);
            const x0 = cx - bw / 2;
            const path = `M${x0},${pad.t + ih} L${x0},${top + r} Q${x0},${top} ${x0 + r},${top} L${x0 + bw - r},${top} Q${x0 + bw},${top} ${x0 + bw},${top + r} L${x0 + bw},${pad.t + ih} Z`;
            return (
              <g key={d.ano}>
                <path d={path} fill={MARK} opacity={hover === null || hover === i ? 1 : 0.45} style={{ transition: "opacity .2s" }} />
                <text x={cx} y={H - 10} textAnchor="middle" fontSize={11} fill="rgb(243 241 236 / 0.55)" fontFamily="var(--font-mono)">
                  {d.ano}
                </text>
                {i === last && (
                  <text x={cx} y={top - 8} textAnchor="middle" fontSize={12} fill="#f3f1ec" fontFamily="var(--font-mono)">
                    {d.valor}
                  </text>
                )}
                {/* alvo de hover maior que a marca */}
                <rect x={pad.l + band * i} y={pad.t} width={band} height={ih} fill="transparent" onPointerEnter={() => setHover(i)} />
              </g>
            );
          })}
        </svg>
        {hover !== null && (
          <div
            role="tooltip"
            className="pointer-events-none absolute z-10 border border-paper/15 bg-graphite-900 px-3 py-2 text-sm whitespace-nowrap"
            style={{ left: Math.min(W - 120, Math.max(0, pad.l + band * hover + band / 2 - 60)), top: Math.max(0, y(data[hover].valor) - 64) }}
          >
            <span className="text-muted block font-mono text-xs">{data[hover].ano}</span>
            <span className="tabular-nums">
              {data[hover].valor.toLocaleString("pt-BR")} {unit}
            </span>
          </div>
        )}
      </div>
      <DataTable data={data} unit={unit} caption={title} en={en} />
    </figure>
  );
}

/* -------------------------------- Linha -------------------------------- */
export function LineChart({ data, title, sub, unit, step = 5, en }: { data: Datum[]; title: string; sub: string; unit: string; step?: number; en?: boolean }) {
  const [ref, W] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const H = 280;
  const pad = { t: 28, r: 44, b: 32, l: 40 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const max = niceMax(Math.max(...data.map((d) => d.valor)), step);
  const x = (i: number) => pad.l + (iw * i) / (data.length - 1);
  const y = (v: number) => pad.t + ih - (v / max) * ih;
  const ticks = Array.from({ length: max / step + 1 }, (_, i) => i * step);
  const line = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.valor)}`).join(" ");
  const area = `${line} L${x(data.length - 1)},${pad.t + ih} L${x(0)},${pad.t + ih} Z`;
  const last = data.length - 1;

  return (
    <figure>
      <figcaption>
        <p className="text-lg font-medium">{title}</p>
        <p className="text-muted text-sm">{sub}</p>
      </figcaption>
      <div
        ref={ref}
        className="relative mt-6"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const px = e.clientX - r.left;
          const i = Math.round(((px - pad.l) / iw) * (data.length - 1));
          setHover(Math.max(0, Math.min(data.length - 1, i)));
        }}
        onPointerLeave={() => setHover(null)}
      >
        <svg width={W} height={H} role="img" aria-label={`${title}: ${data.map((d) => `${d.ano} ${d.valor}${unit}`).join(", ")}`}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth={1} />
              <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize={11} fill="rgb(243 241 236 / 0.55)" fontFamily="var(--font-mono)">
                {t}
                {unit}
              </text>
            </g>
          ))}
          {data.map((d, i) => (
            <text key={d.ano} x={x(i)} y={H - 10} textAnchor="middle" fontSize={11} fill="rgb(243 241 236 / 0.55)" fontFamily="var(--font-mono)">
              {d.ano}
            </text>
          ))}
          <path d={area} fill={MARK} fillOpacity={0.1} />
          <path d={line} fill="none" stroke={MARK} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={pad.t + ih} stroke="rgb(243 241 236 / 0.3)" strokeWidth={1} />}
          {(hover !== null ? [hover] : [last]).map((i) => (
            <circle key={i} cx={x(i)} cy={y(data[i].valor)} r={5} fill={MARK} stroke={SURFACE} strokeWidth={2} />
          ))}
          <text x={x(last) + 10} y={y(data[last].valor) + 4} fontSize={12} fill="#f3f1ec" fontFamily="var(--font-mono)">
            {data[last].valor}
            {unit}
          </text>
        </svg>
        {hover !== null && (
          <div
            role="tooltip"
            className="pointer-events-none absolute z-10 border border-paper/15 bg-graphite-900 px-3 py-2 text-sm whitespace-nowrap"
            style={{ left: Math.min(W - 120, Math.max(0, x(hover) - 60)), top: Math.max(0, y(data[hover].valor) - 68) }}
          >
            <span className="text-muted block font-mono text-xs">{data[hover].ano}</span>
            <span className="tabular-nums">
              {data[hover].valor}
              {unit}
            </span>
          </div>
        )}
      </div>
      <DataTable data={data} unit={unit} caption={title} en={en} />
    </figure>
  );
}
