"use client";

import { useEffect } from "react";

// Revela ao rolar os elementos marcados com `data-reveal`: cada um uma única vez,
// com 15% visível. Com movimento reduzido (ou sem IntersectionObserver) não faz
// nada, e o conteúdo fica visível desde o início.
export default function ScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const items = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];

    // O que já está na tela ao ligar o efeito aparece direto, sem piscar. Primeiro
    // se lê tudo e só depois se escreve, para não forçar um recálculo de layout a
    // cada elemento (reflow forçado).
    const onScreen = items.filter((el) => {
      const r = el.getBoundingClientRect();
      return r.top < innerHeight * 0.85 && r.bottom > 0;
    });
    for (const el of onScreen) el.dataset.revealed = "true";

    const onIntersect = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.revealed = "true";
        observer.unobserve(entry.target);
      }
    };

    // Conteúdo: 15% visível. Títulos: entram quando passam da margem inferior
    // (que equivale a ~15% da janela), porque ficam recortados antes de aparecer.
    const contentIo = new IntersectionObserver(onIntersect, { threshold: 0.15 });
    const titleIo = new IntersectionObserver(onIntersect, {
      rootMargin: "0px 0px -15% 0px",
      threshold: 0,
    });

    for (const el of items) {
      if (el.dataset.revealed) continue;
      (el.dataset.reveal === "title" ? titleIo : contentIo).observe(el);
    }
    root.dataset.motion = "on";

    return () => {
      contentIo.disconnect();
      titleIo.disconnect();
      delete root.dataset.motion;
    };
  }, []);

  return null;
}
