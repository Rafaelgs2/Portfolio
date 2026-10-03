"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ProjectModal.module.css";

export type ProjectDetails = {
  overview: string;
  features: string[];
  gallery: { src: string; caption: string }[];
};

export type ModalLabels = {
  close: string;
  about: string;
  features: string;
  techLabel: string;
  gallery: string;
  prev: string;
  next: string;
  view: string; // "Ver projeto →"
  github: string; // "GitHub ↗"
  newTab: string;
  pick: (n: number) => string;
  counter: (n: number, total: number) => string;
};

type Props = {
  type: string;
  title: string;
  details: ProjectDetails;
  tech: string[];
  live: string | null;
  github: string | null;
  labels: ModalLabels;
  // Centro do card que foi clicado, para o painel "crescer" a partir dele.
  origin: { x: number; y: number };
  onClose: () => void;
};

const CLOSE_MS = 220;

export default function ProjectModal({
  type,
  title,
  details,
  tech,
  live,
  github,
  labels,
  origin,
  onClose,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [closing, setClosing] = useState(false);
  const [index, setIndex] = useState(0);
  const images = details.gallery;
  const current = images[index];

  // Abre como diálogo modal nativo: o navegador prende o foco dentro dele, deixa
  // o resto da página inerte e fecha com Esc. O painel cresce a partir do card.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const rect = dialog.getBoundingClientRect();
    dialog.style.setProperty("--ox", `${origin.x - rect.left}px`);
    dialog.style.setProperty("--oy", `${origin.y - rect.top}px`);
    return () => clearTimeout(closeTimer.current);
  }, [origin.x, origin.y]);

  function requestClose() {
    if (closing) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      dialogRef.current?.close();
      onClose();
    }, CLOSE_MS);
  }

  function go(delta: number) {
    setIndex((i) => (i + delta + images.length) % images.length);
  }

  function onGalleryKey(e: React.KeyboardEvent) {
    if (images.length < 2) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      data-closing={closing}
      aria-labelledby="project-modal-title"
      onCancel={(e) => {
        // Esc: fecha com a animação de saída em vez de sumir de uma vez.
        e.preventDefault();
        requestClose();
      }}
      onClick={(e) => {
        // Clique no fundo escurecido (o alvo é o próprio <dialog>).
        if (e.target === dialogRef.current) requestClose();
      }}
    >
      <header className={styles.head}>
        <div>
          <p className={styles.type}>{type}</p>
          <h3 id="project-modal-title" className={styles.title}>
            {title}
          </h3>
        </div>
        <button
          type="button"
          className={styles.close}
          onClick={requestClose}
          aria-label={labels.close}
          autoFocus
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>

      <div className={styles.scroll}>
        <div className={styles.layout}>
          {current && (
            <section
              className={styles.gallery}
              aria-roledescription="carousel"
              aria-label={labels.gallery}
              onKeyDown={onGalleryKey}
            >
              <div className={styles.mat}>
                <div className={styles.frame}>
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={current.caption}
                    fill
                    sizes="(min-width: 900px) 640px, 92vw"
                    className={styles.shot}
                    priority
                  />
                </div>
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className={`${styles.nav} ${styles.prev}`}
                      onClick={() => go(-1)}
                      aria-label={labels.prev}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M15 5l-7 7 7 7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className={`${styles.nav} ${styles.next}`}
                      onClick={() => go(1)}
                      aria-label={labels.next}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              <p className={styles.caption} aria-live="polite">
                {current.caption}
                {images.length > 1 && (
                  <span className={styles.counter}>
                    {labels.counter(index + 1, images.length)}
                  </span>
                )}
              </p>

              {images.length > 1 && (
                <ul className={styles.thumbs}>
                  {images.map((img, i) => (
                    <li key={img.src}>
                      <button
                        type="button"
                        className={styles.thumb}
                        aria-label={labels.pick(i + 1)}
                        aria-current={i === index ? "true" : undefined}
                        onClick={() => setIndex(i)}
                      >
                        <Image
                          src={img.src}
                          alt=""
                          fill
                          sizes="120px"
                          className={styles.thumbImg}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <div className={styles.text}>
            <h4 className={styles.label}>{labels.about}</h4>
            <p className={styles.overview}>{details.overview}</p>

            <h4 className={styles.label}>{labels.features}</h4>
            <ul className={styles.features}>
              {details.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <h4 className={styles.label}>{labels.techLabel}</h4>
            <ul className={styles.tech}>
              {tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            {(live || github) && (
              <div className={styles.links}>
                {live && (
                  <a
                    href={live}
                    className="btn btn--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {labels.view}
                    <span className="sr-only"> ({labels.newTab})</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    className="btn btn--secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {labels.github}
                    <span className="sr-only"> ({labels.newTab})</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
