import type { ElementType, ReactNode } from "react";

/** Marca um dado PLACEHOLDER (Shift + Alt + P destaca todos na tela). */
export function Ph({ children, as: Tag = "span", className }: { children: ReactNode; as?: ElementType; className?: string }) {
  return (
    <Tag data-placeholder="true" className={className}>
      {children}
    </Tag>
  );
}
