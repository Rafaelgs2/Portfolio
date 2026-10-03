"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.css";

const SECTIONS = ["about", "projects", "stack", "experience", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

export default function Header() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Partial<Record<SectionId, HTMLAnchorElement | null>>>({});

  // Filete inferior aparece depois que a página rola, e o filete coral de
  // progresso cresce de 0 a 100% ligado direto à rolagem.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      headerRef.current?.style.setProperty("--progress", String(progress));
    };
    // A primeira leitura espera o quadro seguinte, para não forçar layout na montagem.
    const first = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Seção visível na tela: a que cruza a faixa próxima ao topo da janela.
  useEffect(() => {
    const visible = new Set<SectionId>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        setActive(SECTIONS.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Sublinhado coral que desliza de um link para o outro (só no menu do desktop).
  useLayoutEffect(() => {
    const place = () => {
      const indicator = indicatorRef.current;
      if (!indicator) return;
      const link = active ? linkRefs.current[active] : null;
      if (!link) {
        indicator.style.opacity = "0";
        return;
      }
      indicator.style.opacity = "1";
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    };
    place();
    window.addEventListener("resize", place);
    // As fontes mudam a largura dos links quando terminam de carregar.
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  // Menu do celular: Esc fecha e devolve o foco; toque fora também fecha.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const makeLinks = (desktop: boolean) =>
    SECTIONS.map((id) => (
      <li key={id}>
        <a
          ref={
            desktop
              ? (el) => {
                  linkRefs.current[id] = el;
                }
              : undefined
          }
          href={`#${id}`}
          className={styles.link}
          aria-current={active === id ? "location" : undefined}
          onClick={() => setOpen(false)}
        >
          {t(`nav.${id}`)}
        </a>
      </li>
    ));

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={`wrap ${styles.bar}`}>
        {/* Logo: selo coral com "RS" e, no desktop, o nome ao lado. */}
        <Link href="/" className={styles.logo} aria-label="RS Rafael Silva">
          <span className={styles.seal} aria-hidden="true">
            RS
          </span>
          <span className={styles.wordmark} aria-hidden="true">
            Rafael Silva
          </span>
        </Link>

        <nav className={styles.nav} aria-label={t("a11y.mainNav")}>
          <ul className={styles.list}>
            {makeLinks(true)}
          </ul>
          <span ref={indicatorRef} className={styles.indicator} aria-hidden="true" />
        </nav>

        <div className={styles.actions}>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {t("a11y.menu")}
          </button>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>

      <nav
        id="mobile-menu"
        className={styles.panel}
        aria-label={t("a11y.mainNav")}
        hidden={!open}
      >
        <ul className={`wrap ${styles.panelList}`}>{makeLinks(false)}</ul>
      </nav>

      <span className={styles.progress} aria-hidden="true" />
    </header>
  );
}
