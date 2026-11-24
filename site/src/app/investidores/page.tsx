import type { Metadata } from "next";
import { InvestorsPage } from "@/components/investors/InvestorsPage";

export const metadata: Metadata = {
  title: "Investidores — tese, indicadores e governança",
  description: "Relações com investidores da LASTRO: tese de investimento, modelo de negócio, indicadores, governança, documentos e acesso ao data room.",
  alternates: { canonical: "/investidores", languages: { "pt-BR": "/investidores", en: "/en/investors" } },
};

export default function Page() {
  return <InvestorsPage lang="pt" />;
}
