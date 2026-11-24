export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const num = (n: number) => n.toLocaleString("pt-BR");

/** Separa "1.200+" em { prefix: "", value: 1200, suffix: "+" } para os contadores. */
export function parseStat(raw: string) {
  const m = raw.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m) return { prefix: "", value: 0, suffix: raw, decimals: 0 };
  const numeric = m[2];
  const hasComma = numeric.includes(",");
  const decimals = hasComma ? numeric.split(",")[1].length : 0;
  const value = Number(numeric.replace(/\./g, "").replace(",", "."));
  return { prefix: m[1], value, suffix: m[3], decimals };
}

export function formatStat(value: number, decimals: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
