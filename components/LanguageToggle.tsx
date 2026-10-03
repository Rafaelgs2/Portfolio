"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import styles from "./LanguageToggle.module.css";

const LABELS: Record<Locale, string> = { pt: "PT", en: "EN" };

export default function LanguageToggle() {
  const t = useTranslations("a11y");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

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
      go();
      return;
    }

    // Fade cruzado de 250ms: a transição só termina quando a página já está
    // no novo idioma (o atributo `lang` do <html> muda), com limite de 2s.
    const targetLang = next === "pt" ? "pt-BR" : "en";
    doc.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          go();
          const started = performance.now();
          const check = () => {
            if (
              document.documentElement.lang === targetLang ||
              performance.now() - started > 2000
            ) {
              resolve();
            } else {
              requestAnimationFrame(check);
            }
          };
          check();
        }),
    );
  }

  return (
    <div className={styles.group} role="group" aria-label={t("changeLanguage")}>
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
