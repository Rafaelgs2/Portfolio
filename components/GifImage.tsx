import Image from "next/image";

// O quadro parado fica ao lado do GIF, com o mesmo nome: `workflow.gif`, `workflow.png`.
export const isGif = (src: string) => src.endsWith(".gif");
export const stillOf = (src: string) => src.replace(/\.gif$/, ".png");

type Props = {
  src: string;
  alt: string;
  paused: boolean;
  className?: string;
  priority?: boolean;
};

// `unoptimized`: o otimizador do Next devolveria o GIF intacto de qualquer forma.
export default function GifImage({ src, alt, paused, className, priority }: Props) {
  const still = stillOf(src);

  return (
    // `fill` exige um pai posicionado, e aqui o pai direto é o <picture>.
    <picture style={{ position: "absolute", inset: 0 }}>
      {/* Movimento reduzido: quadro parado, sem depender de JavaScript. */}
      <source media="(prefers-reduced-motion: reduce)" srcSet={still} />
      <Image
        src={paused ? still : src}
        alt={alt}
        fill
        unoptimized
        className={className}
        priority={priority}
      />
    </picture>
  );
}
