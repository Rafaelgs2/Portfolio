import { useLocale, useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.css";

export default function Projects() {
  const t = useTranslations();
  const locale = useLocale() as "pt" | "en";

  return (
    <section
      id="projects"
      className={`wrap screen ${styles.section}`}
      aria-labelledby="projects-title"
    >
      <h2 id="projects-title" className={styles.title} data-reveal="title">
        {t("projects.title")}
      </h2>

      <div className={styles.grid} data-count={projects.length}>
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            index={i}
            type={p.type[locale]}
            title={p.title}
            summary={p.summary[locale]}
            tech={p.tech}
            image={p.image}
            imageAlt={t("projects.screenshotAlt", { name: p.title })}
            live={p.live}
            github={p.github}
            viewLabel={t("projects.view")}
            githubLabel={t("projects.github")}
            newTabLabel={t("a11y.newTab")}
            details={{
              overview: p.details.overview[locale],
              features: p.details.features[locale],
              gallery: p.details.gallery.map((g) => ({
                src: g.src,
                caption: g.caption[locale],
              })),
            }}
            labels={{
              details: t("projects.details"),
              detailsOf: t("projects.detailsOf", { name: p.title }),
              close: t("projects.close"),
              about: t("projects.about"),
              features: t("projects.features"),
              techLabel: t("projects.techLabel"),
              gallery: t("projects.gallery"),
              prev: t("projects.prev"),
              next: t("projects.next"),
              // Modelos crus (com {n} e {total}) para o cliente preencher.
              pick: t.raw("projects.pick") as string,
              counter: t.raw("projects.counter") as string,
            }}
          />
        ))}
      </div>
    </section>
  );
}
