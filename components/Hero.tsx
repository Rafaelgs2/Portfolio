import { useTranslations } from "next-intl";
import MagnetLink from "./MagnetLink";
import styles from "./Hero.module.css";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className={`wrap screen ${styles.hero}`} aria-labelledby="hero-title">
      {/* O traço fica no mesmo bloco do nome, então sempre acompanha a largura
          e o tamanho dele. */}
      <div className={styles.nameWrap}>
        {/* O nome é texto real; a animação só o revela visualmente. */}
        <h1 id="hero-title" className={styles.name}>
          {t("title")}
        </h1>

        {/* Rabisco de pincel: um traço afilado e um menor embaixo, sob o "Silva",
            longe da cauda do "f". São formas preenchidas (não linhas). */}
        <svg className={styles.stroke} viewBox="0 0 300 30" aria-hidden="true">
          <path d="M2 17 C60 9 130 7 195 9 C235 10 270 8 298 3 C272 13 238 18.5 196 18 C130 17 62 18.5 2 17Z" />
          <path d="M72 25 C122 22.5 172 22.5 222 24.5 C176 27.5 126 28.5 72 25Z" />
        </svg>
      </div>

      <p className={styles.subtitle}>{t("subtitle")}</p>

      <div className={styles.actions}>
        <MagnetLink href="#projects" className="btn btn--primary">
          {t("ctaProjects")}
        </MagnetLink>
        <a href="#contact" className="btn btn--secondary">
          {t("ctaContact")}
        </a>
      </div>

      <a href="#about" className={styles.cue} aria-label={t("scrollHint")}>
        <span className={styles.cueLabel}>{t("scroll")}</span>
        <span className={styles.cueTrack} aria-hidden="true">
          <span className={styles.cueDot} />
        </span>
      </a>
    </section>
  );
}
