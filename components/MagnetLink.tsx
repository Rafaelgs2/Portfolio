"use client";

import { useRef } from "react";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

const MAX_PULL = 6; // px

// Botão que acompanha o ponteiro por até 6px. Só com mouse (ponteiro fino) e
// sem movimento reduzido; ao sair, volta em 0.4s (definido em .magnet).
export default function MagnetLink({ href, className = "", children }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  function move(e: React.PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    const clamp = (n: number) => Math.max(-1, Math.min(1, n));
    el.style.setProperty("--mx", `${clamp(dx) * MAX_PULL}px`);
    el.style.setProperty("--my", `${clamp(dy) * MAX_PULL}px`);
  }

  function leave() {
    ref.current?.style.removeProperty("--mx");
    ref.current?.style.removeProperty("--my");
  }

  return (
    <a
      ref={ref}
      href={href}
      className={`${className} magnet`}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
    </a>
  );
}
