"use client";

import { useRef, useState } from "react";
import styles from "./Contact.module.css";

type Props = {
  value: string;
  copyLabel: string;
  copiedLabel: string;
  selectLabel: string;
};

type State = "idle" | "copied" | "failed";

export default function CopyButton({
  value,
  copyLabel,
  copiedLabel,
  selectLabel,
}: Props) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function copy(e: React.MouseEvent<HTMLButtonElement>) {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      // Navegador recusou: seleciona o endereço na tela para copiar à mão.
      const target = e.currentTarget
        .closest("li")
        ?.querySelector("[data-copy-target]");
      if (target) {
        const range = document.createRange();
        range.selectNodeContents(target);
        const selection = getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setState("failed");
    }
    timer.current = setTimeout(() => setState("idle"), 1800);
  }

  const label =
    state === "copied" ? copiedLabel : state === "failed" ? selectLabel : copyLabel;

  return (
    <>
      <button type="button" className={styles.action} onClick={copy}>
        {label}
      </button>
      {/* Anuncia o resultado sem prometer envio: só diz que o texto foi copiado. */}
      <span className="sr-only" role="status" aria-live="polite">
        {state === "idle" ? "" : label}
      </span>
    </>
  );
}
