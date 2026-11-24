import { TLink } from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Arrow";

export default function NotFound() {
  return (
    <section className="grain blueprint-grid flex min-h-[90svh] items-center bg-graphite-950 pt-[var(--header-h)] text-paper">
      <div className="container-x">
        <p className="mono-label text-muted">Erro 404 — folha não encontrada</p>
        <h1 className="font-display-x mt-6 text-[clamp(3rem,10vw,10rem)]">
          Fora da <span className="serif-accent text-signal">planta.</span>
        </h1>
        <p className="text-muted mt-6 max-w-lg text-lg">Esta página não existe ou mudou de endereço. Vamos voltar para um lugar conhecido.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <TLink href="/" className="btn btn-primary">
            Página inicial <Arrow />
          </TLink>
          <TLink href="/servicos" className="btn btn-secondary">
            Ver serviços
          </TLink>
        </div>
      </div>
    </section>
  );
}
