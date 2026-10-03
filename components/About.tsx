import { useTranslations } from "next-intl";
import { PHOTO_SRC } from "@/content/site";
import PhotoCard from "./PhotoCard";
import styles from "./About.module.css";

export default function About() {
  const t = useTranslations();

  return (
    <section
      id="about"
      className={`wrap screen ${styles.about}`}
      aria-labelledby="about-title"
    >
      <div className={styles.photoWrap} data-reveal style={{ "--i": 0 } as React.CSSProperties}>
        <PhotoCard src={PHOTO_SRC} alt={t("a11y.photoAlt")} />
      </div>

      <div className={styles.text}>
        <h2 id="about-title" className={styles.title} data-reveal="title">
          {t("about.title")}
        </h2>
        <p className={styles.education} data-reveal style={{ "--i": 1 } as React.CSSProperties}>{t("about.education")}</p>
        <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
          {t("about.p1")}
        </p>
        <p data-reveal style={{ "--i": 3 } as React.CSSProperties}>
          {t("about.p2")}
        </p>
      </div>
    </section>
  );
}
