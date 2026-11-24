import type { Metadata } from "next";
import { InvestorsPage } from "@/components/investors/InvestorsPage";

export const metadata: Metadata = {
  title: "Investors — thesis, metrics and governance",
  description: "LASTRO investor relations: investment thesis, business model, key metrics, governance, documents and data room access.",
  alternates: { canonical: "/en/investors", languages: { "pt-BR": "/investidores", en: "/en/investors" } },
  openGraph: { locale: "en_US" },
};

export default function Page() {
  return (
    <div lang="en">
      <InvestorsPage lang="en" />
    </div>
  );
}
