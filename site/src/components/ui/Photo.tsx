import Image from "next/image";
import { img, type ImageKey } from "@/content/images";
import { cn } from "@/lib/cn";

type Props = {
  k: ImageKey;
  sizes?: string;
  priority?: boolean;
  className?: string;
  alt?: string;
};

/** Foto do acervo com correção de cor uniforme. Sempre usada com um container posicionado. */
export function Photo({ k, sizes = "100vw", priority, className, alt }: Props) {
  const i = img(k);
  return (
    <Image
      src={i.src}
      alt={alt ?? i.alt}
      fill
      sizes={sizes}
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      className={cn("photo-grade object-cover", className)}
    />
  );
}
