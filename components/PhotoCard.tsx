"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./PhotoCard.module.css";

type Props = {
  src: string | null;
  alt: string;
};

// Polaroid: foto colorida em moldura de papel, levemente inclinada, com o nome
// em manuscrito. Endireita e sobe com hover (ponteiro fino), foco do teclado ou
// toque; o toque/Enter/Espaço alternam o estado.
export default function PhotoCard({ src, alt }: Props) {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      className={styles.photo}
      data-active={active}
      aria-pressed={active}
      aria-label={alt}
      onClick={() => setActive((v) => !v)}
    >
      <span className={styles.print}>
        {src ? (
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 640px) 360px, 70vw"
            className={styles.image}
          />
        ) : (
          // Espaço reservado até existir a foto real.
          <span className={`${styles.image} ${styles.placeholder}`} aria-hidden="true">
            RS
          </span>
        )}
      </span>
      <span className={styles.caption} aria-hidden="true">
        Rafael
      </span>
    </button>
  );
}
