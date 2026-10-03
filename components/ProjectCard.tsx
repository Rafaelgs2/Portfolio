"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import ProjectModal, { type ProjectDetails } from "./ProjectModal";
import styles from "./ProjectCard.module.css";

type Labels = {
  details: string;
  detailsOf: string;
  close: string;
  about: string;
  features: string;
  techLabel: string;
  gallery: string;
  prev: string;
  next: string;
  // Modelos com {n} e {total}, preenchidos aqui no cliente.
  pick: string;
  counter: string;
};

type Props = {
  index: number;
  type: string;
  title: string;
  summary: string;
  tech: string[];
  image: string | null;
  imageAlt: string;
  live: string | null;
  github: string | null;
  viewLabel: string;
  githubLabel: string;
  newTabLabel: string;
  details: ProjectDetails;
  labels: Labels;
};

const MAX_TILT_Y = 5; // graus no eixo vertical
const MAX_TILT_X = 4; // graus no eixo horizontal

export default function ProjectCard({
  index,
  type,
  title,
  summary,
  tech,
  image,
  imageAlt,
  live,
  github,
  viewLabel,
  githubLabel,
  newTabLabel,
  details,
  labels,
}: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const moreRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  // Atualiza variáveis CSS direto no elemento, sem re-renderizar a cada movimento.
  function follow(e: React.PointerEvent<HTMLElement>) {
    const card = cardRef.current;
    if (!card || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--ry", `${(x / rect.width - 0.5) * 2 * MAX_TILT_Y}deg`);
    card.style.setProperty("--rx", `${-(y / rect.height - 0.5) * 2 * MAX_TILT_X}deg`);
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.dataset.active = "true";
  }

  function reset() {
    const card = cardRef.current;
    if (!card) return;
    card.dataset.active = "false";
    card.style.removeProperty("--rx");
    card.style.removeProperty("--ry");
  }

  function openDetails() {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setOpen(true);
  }

  return (
    <div
      className={styles.scene}
      data-reveal
      style={{ "--i": index } as React.CSSProperties}
    >
      <article
        ref={cardRef}
        className={styles.card}
        data-active="false"
        onPointerEnter={follow}
        onPointerMove={follow}
        onPointerLeave={reset}
        onPointerCancel={reset}
        onPointerUp={(e) => e.pointerType !== "mouse" && reset()}
        onClick={(e) => {
          // O card inteiro abre os detalhes, menos os links e botões, que têm ação própria.
          if ((e.target as HTMLElement).closest("a, button")) return;
          openDetails();
        }}
      >
        <div className={styles.top}>
          <p className={styles.type}>{type}</p>
          <button
            ref={moreRef}
            type="button"
            className={styles.more}
            aria-haspopup="dialog"
            aria-label={labels.detailsOf}
            onClick={openDetails}
          >
            {labels.details}
            <span aria-hidden="true"> +</span>
          </button>
        </div>

        <div className={styles.mat}>
          <div className={styles.print}>
            {image ? (
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width: 1100px) 600px, (min-width: 760px) 46vw, 92vw"
                className={styles.img}
              />
            ) : (
              <span className={styles.placeholder} aria-hidden="true" />
            )}
          </div>
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>{summary}</p>
        <p className={styles.tech}>{tech.join(" · ")}</p>

        {(live || github) && (
          <div className={styles.links}>
            {live && (
              <a
                href={live}
                className={styles.primary}
                target="_blank"
                rel="noopener noreferrer"
              >
                {viewLabel}
                <span className="sr-only"> ({newTabLabel})</span>
              </a>
            )}
            {github && (
              <a
                href={github}
                className={styles.secondary}
                target="_blank"
                rel="noopener noreferrer"
              >
                {githubLabel}
                <span className="sr-only"> ({newTabLabel})</span>
              </a>
            )}
          </div>
        )}

        <span className={styles.sheen} aria-hidden="true" />
      </article>

      {/* Portal: o painel fica fora do card, então cliques e ponteiro dentro dele
          não disparam a inclinação nem reabrem o card. */}
      {open &&
        createPortal(
          <ProjectModal
            type={type}
            title={title}
            details={details}
            tech={tech}
            live={live}
            github={github}
            origin={origin}
            labels={{
              close: labels.close,
              about: labels.about,
              features: labels.features,
              techLabel: labels.techLabel,
              gallery: labels.gallery,
              prev: labels.prev,
              next: labels.next,
              view: viewLabel,
              github: githubLabel,
              newTab: newTabLabel,
              pick: (n) => labels.pick.replace("{n}", String(n)),
              counter: (n, total) =>
                labels.counter.replace("{n}", String(n)).replace("{total}", String(total)),
            }}
            onClose={() => {
              setOpen(false);
              moreRef.current?.focus();
            }}
          />,
          document.body,
        )}
    </div>
  );
}
