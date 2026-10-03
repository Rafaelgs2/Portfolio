import { useTranslations } from "next-intl";
import { experience } from "@/content/experience";
import { CV_URL } from "@/content/site";
import styles from "./Experience.module.css";

export default function Experience() {
  const t = useTranslations("experience");

  return (
    <section
      id="experience"
      className={`wrap screen ${styles.section}`}
      aria-labelledby="experience-title"
    >
      <h2 id="experience-title" className={styles.title} data-reveal="title">
        {t("title")}
      </h2>

      <ol className={styles.timeline}>
        {experience.map((job, i) => (
          <li
            key={job.id}
            className={styles.entry}
            data-current={job.current ? "true" : undefined}
            data-reveal
            style={{ "--i": i + 1 } as React.CSSProperties}
          >
            <p className={styles.period}>{t(`items.${job.id}.period`)}</p>
            <div className={styles.body}>
              <h3 className={styles.role}>{t(`items.${job.id}.role`)}</h3>
              <p className={styles.company}>{job.company}</p>
              <ul className={styles.bullets}>
                {Array.from({ length: job.bullets }, (_, i) => (
                  <li key={i}>{t(`items.${job.id}.b${i + 1}`)}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      {CV_URL && (
        <a
          href={CV_URL}
          className={styles.cv}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("fullCv")}
        </a>
      )}
    </section>
  );
}
