"use client";

import { useLayoutEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import styles from "./LanguageToggle.module.css";

const LABELS: Record<Locale, string> = { pt: "PT", en: "EN" };

// A tela fica congelada enquanto a transição espera a página nova, então a
// espera tem limite curto (sem ele, o navegador só desiste depois de 4s).
const MAX_SWITCH_WAIT = 1000;

// Avisa que o novo idioma entrou na página. Fica fora do componente porque trocar
// de idioma recria o layout inteiro, inclusive este botão.
let onSwitched: (() => void) | null = null;

function expectSwitch(done: () => void) {
  onSwitched = done;
}

function finishSwitch() {
  if (!onSwitched) return;
  // O layout recriado repetiria a abertura do hero; aqui ela não faz sentido.
  document.documentElement.dataset.intro = "skip";
  onSwitched();
  onSwitched = null;
}

export default function LanguageToggle() {
  const t = useTranslations("a11y");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => finishSwitch(), [locale]);

  // Baixa a outra versão ao mostrar intenção (ponteiro em cima ou foco), para a
  // tela não ficar congelada esperando a rede na hora do clique.
  function prefetch() {
    for (const l of routing.locales) {
      if (l !== locale) router.prefetch(pathname, { locale: l });
    }
  }

  function change(next: Locale) {
    if (next === locale) return;
    // Mantém a seção atual (o hash) ao trocar de idioma.
    const go = () =>
      router.replace(pathname + window.location.hash, {
        locale: next,
        scroll: false,
      });

    const doc = document as Document & {
      startViewTransition?: (update: () => Promise<void>) => unknown;
    };
    if (
      !doc.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      expectSwitch(() => {});
      go();
      return;
    }

    // Fade cruzado de 250ms a partir do momento em que a página já está no novo
    // idioma. O aviso vem do React, não de requestAnimationFrame: o navegador não
    // roda quadros enquanto espera esta promise, então um laço de quadros travaria.
    doc.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          const limit = setTimeout(resolve, MAX_SWITCH_WAIT);
          expectSwitch(() => {
            clearTimeout(limit);
            resolve();
          });
          go();
        }),
    );
  }

  return (
    <div
      className={styles.group}
      role="group"
      aria-label={t("changeLanguage")}
      onPointerEnter={prefetch}
      onFocus={prefetch}
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l === "pt" ? "pt-BR" : "en"}
          className={styles.option}
          aria-pressed={l === locale}
          onClick={() => change(l)}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
