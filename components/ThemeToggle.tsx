"use client";

import { useLayoutEffect } from "react";
import { useTranslations } from "next-intl";
import styles from "./ThemeToggle.module.css";

const STORAGE_KEY = "theme";

type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

function effectiveTheme(): "light" | "dark" {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(next: "light" | "dark") {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {}
}

export default function ThemeToggle() {
  const t = useTranslations("a11y");

  // Trocar de idioma recria o <html> e perde o data-theme que o script inicial
  // aplicou, então o tema salvo é reaplicado antes da pintura.
  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (
        (saved === "light" || saved === "dark") &&
        document.documentElement.dataset.theme !== saved
      ) {
        document.documentElement.dataset.theme = saved;
      }
    } catch {}
  }, []);

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next = effectiveTheme() === "dark" ? "light" : "dark";
    const doc = document as ViewTransitionDoc;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduced) {
      applyTheme(next);
      return;
    }

    // Revelação circular a partir do botão, até cobrir o canto mais distante.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${radius}px`);
    root.dataset.vt = "theme";

    doc
      .startViewTransition(() => applyTheme(next))
      .finished.finally(() => delete root.dataset.vt);
  }

  // Os dois ícones ficam no HTML e o CSS mostra o do tema que será ativado,
  // assim o servidor e o cliente renderizam o mesmo markup.
  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggle}
      aria-label={t("toggleTheme")}
    >
      <svg className={styles.sun} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg className={styles.moon} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
