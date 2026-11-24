import type { Metadata } from "next";
import { PortalDemo } from "@/components/portal/PortalDemo";

export const metadata: Metadata = {
  title: "Portal do cliente (demonstração)",
  description: "Acompanhe a obra de qualquer lugar: avanço físico, cronograma, diário de obra com fotos, medições, documentos, garantia e mensagens.",
  alternates: { canonical: "/portal" },
  robots: { index: false, follow: true },
};

export default function PortalPage() {
  return (
    <section className="min-h-screen bg-graphite-950 pt-[calc(var(--header-h)+1.5rem)] pb-24 text-paper">
      <div className="border-b border-signal/40 bg-signal/10">
        <p className="container-x mono-label py-2 text-center">Demonstração — dados fictícios</p>
      </div>
      <div className="container-x mt-10">
        <PortalDemo />
      </div>
    </section>
  );
}
