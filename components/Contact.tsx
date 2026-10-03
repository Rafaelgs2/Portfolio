import { useTranslations } from "next-intl";
import { CONTACT } from "@/content/site";
import CopyButton from "./CopyButton";
import styles from "./Contact.module.css";

export default function Contact() {
  const t = useTranslations("contact");
  const newTab = useTranslations("a11y")("newTab");

  const links = [
    { key: "linkedin", ...CONTACT.linkedin },
    { key: "github", ...CONTACT.github },
  ] as const;

  return (
    <section
      id="contact"
      className={`wrap ${styles.section}`}
      aria-labelledby="contact-title"
    >
      <div className={styles.grid}>
        <div>
          <h2 id="contact-title" className={styles.title} data-reveal="title">
            {t("title")}
          </h2>
          <p
            className={styles.text}
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {t("text")}
          </p>
        </div>

        <ul className={styles.channels} aria-label={t("channels")}>
          <li
            className={styles.row}
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <span className={styles.label}>{t("email")}</span>
            <a
              href={`mailto:${CONTACT.email}`}
              className={styles.value}
              data-copy-target
            >
              {CONTACT.email}
            </a>
            <CopyButton
              value={CONTACT.email}
              copyLabel={t("copy")}
              copiedLabel={t("copied")}
              selectLabel={t("selectToCopy")}
            />
          </li>

          {links.map((l, i) => (
            <li
              key={l.key}
              className={styles.row}
              data-reveal
              style={{ "--i": i + 2 } as React.CSSProperties}
            >
              <span className={styles.label}>{t(l.key)}</span>
              <span className={styles.value}>{l.display}</span>
              <a
                href={l.href}
                className={styles.action}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("open")}
                <span className="sr-only">
                  {" "}
                  {t(l.key)} ({newTab})
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
