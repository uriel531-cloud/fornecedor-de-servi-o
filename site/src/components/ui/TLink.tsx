"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, type AnchorHTMLAttributes, type ReactNode } from "react";

let pendingResolve: (() => void) | null = null;

function finishTransition() {
  if (pendingResolve) {
    pendingResolve();
    pendingResolve = null;
  }
}

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
  prefetch?: boolean;
};

/**
 * Link com transição de página via View Transitions API.
 * Sem suporte do navegador ou com movimento reduzido, vira um link comum.
 */
export function TLink({ href, onClick, children, ...rest }: Props) {
  const router = useRouter();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (rest.target === "_blank") return;
        if (!href.startsWith("/") || href.startsWith("//")) return;
        const doc = document as Document & { startViewTransition?: (cb: () => Promise<void>) => unknown };
        if (!doc.startViewTransition) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const target = new URL(href, location.href);
        if (target.pathname === location.pathname && target.search === location.search) return;
        e.preventDefault();
        doc.startViewTransition(
          () =>
            new Promise<void>((resolve) => {
              pendingResolve = resolve;
              router.push(href);
              setTimeout(finishTransition, 1500);
            }),
        );
      }}
    >
      {children}
    </Link>
  );
}

function Resolver() {
  const pathname = usePathname();
  const search = useSearchParams();
  useEffect(() => {
    finishTransition();
  }, [pathname, search]);
  return null;
}

/** Montado uma vez no layout: conclui a transição quando a nova rota renderiza. */
export function ViewTransitionResolver() {
  return (
    <Suspense fallback={null}>
      <Resolver />
    </Suspense>
  );
}
