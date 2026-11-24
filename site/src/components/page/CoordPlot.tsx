"use client";

import { useState } from "react";
import { TLink } from "@/components/ui/TLink";
import { cn } from "@/lib/cn";

/**
 * Prancha de coordenadas: projeção equiretangular com grade de latitude/longitude.
 * Substitui um mapa de tiles (sem token externo) e mantém a linguagem de desenho técnico.
 * Em produção, pode ser trocada por Mapbox GL com estilo monocromático.
 */
export type CoordPoint = { id: string; label: string; sub?: string; lat: number; lng: number; href?: string; status?: "atual" | "planejada"; left?: boolean; down?: boolean };

export function CoordPlot({
  points,
  bounds,
  accent = "var(--color-signal)",
  className,
  textScale = 1,
}: {
  points: CoordPoint[];
  bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number };
  accent?: string;
  className?: string;
  textScale?: number;
}) {
  const fs = (n: number) => Math.round(n * textScale);
  const [hover, setHover] = useState<string | null>(null);
  const W = 1000;
  const H = Math.round((W * (bounds.maxLat - bounds.minLat)) / (bounds.maxLng - bounds.minLng));
  const x = (lng: number) => ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * W;
  const y = (lat: number) => ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * H;
  const stepLat = bounds.maxLat - bounds.minLat > 15 ? 5 : 1;
  const stepLng = bounds.maxLng - bounds.minLng > 15 ? 5 : 1;
  const lats: number[] = [];
  for (let l = Math.ceil(bounds.minLat / stepLat) * stepLat; l <= bounds.maxLat; l += stepLat) lats.push(l);
  const lngs: number[] = [];
  for (let l = Math.ceil(bounds.minLng / stepLng) * stepLng; l <= bounds.maxLng; l += stepLng) lngs.push(l);

  return (
    <figure className={cn("relative border border-paper/15", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto max-h-[80vh] w-full" role="img" aria-label="Localização dos pontos em prancha de coordenadas">
        {lats.map((l) => (
          <g key={`lat${l}`}>
            <line x1={0} x2={W} y1={y(l)} y2={y(l)} stroke="currentColor" strokeOpacity={0.1} />
            <text x={8} y={y(l) - 6} fill="currentColor" fillOpacity={0.45} fontSize={fs(14)} fontFamily="var(--font-mono)">
              {Math.abs(l)}° S
            </text>
          </g>
        ))}
        {lngs.map((l) => (
          <g key={`lng${l}`}>
            <line y1={0} y2={H} x1={x(l)} x2={x(l)} stroke="currentColor" strokeOpacity={0.1} />
            <text x={x(l) + 6} y={H - 10} fill="currentColor" fillOpacity={0.45} fontSize={fs(14)} fontFamily="var(--font-mono)">
              {Math.abs(l)}° W
            </text>
          </g>
        ))}
        {points.map((p) => {
          const cx = x(p.lng);
          const cy = y(p.lat);
          const dy = p.down ? 1 : -1;
          const ty = p.down ? cy + 26 + fs(17) : cy - 30;
          const on = hover === p.id;
          const planned = p.status === "planejada";
          const dot = (
            <g onPointerEnter={() => setHover(p.id)} onPointerLeave={() => setHover(null)} onFocus={() => setHover(p.id)} onBlur={() => setHover(null)} className="cursor-pointer">
              <circle cx={cx} cy={cy} r={on ? 22 : 14} fill={accent} fillOpacity={planned ? 0 : 0.15} stroke={accent} strokeOpacity={0.6} strokeDasharray={planned ? "4 4" : undefined} style={{ transition: "r .4s" }} />
              <circle cx={cx} cy={cy} r={5} fill={planned ? "transparent" : accent} stroke={accent} strokeWidth={2} />
              <line x1={cx} x2={cx + (p.left ? -26 : 26)} y1={cy} y2={cy + dy * 26} stroke="currentColor" strokeOpacity={0.4} />
              <text x={cx + (p.left ? -30 : 30)} y={ty} textAnchor={p.left ? "end" : "start"} fill="currentColor" fontSize={fs(17)} fontFamily="var(--font-sans)">
                {p.label}
              </text>
              {p.sub && (
                <text x={cx + (p.left ? -30 : 30)} y={ty + fs(17)} textAnchor={p.left ? "end" : "start"} fill="currentColor" fillOpacity={0.55} fontSize={fs(13)} fontFamily="var(--font-mono)">
                  {p.sub}
                </text>
              )}
            </g>
          );
          return p.href ? (
            <TLink key={p.id} href={p.href} aria-label={`${p.label}${p.sub ? ` — ${p.sub}` : ""}`}>
              {dot}
            </TLink>
          ) : (
            <g key={p.id}>{dot}</g>
          );
        })}
      </svg>
      <figcaption className="mono-label text-muted flex justify-between border-t border-paper/15 px-4 py-3">
        <span>Projeção equiretangular — WGS84</span>
        <span>{points.length} pontos</span>
      </figcaption>
    </figure>
  );
}
