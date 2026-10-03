import { useTranslations } from "next-intl";
import { toolGroups, tools } from "@/content/stack";
import StackMarquee from "./StackMarquee";
import styles from "./Stack.module.css";

export default function Stack() {
  const t = useTranslations("stack");

  // Duas faixas: a primeira metade das ferramentas e o restante.
  const half = Math.ceil(tools.length / 2);
  const rows = [tools.slice(0, half), tools.slice(half)];

  // Lista em texto, por área, para o painel expandido.
  const groups = toolGroups.map((g) => ({
    id: g,
    label: t(`groups.${g}`),
    names: tools.filter((tool) => tool.group === g).map((tool) => tool.name),
  }));

  return (
    <section
      id="stack"
      className={`wrap screen ${styles.stack}`}
      aria-labelledby="stack-title"
    >
      <h2 id="stack-title" className={styles.title} data-reveal="title">
        {t("title")}
      </h2>
      <StackMarquee
        rows={rows}
        groups={groups}
        pauseLabel={t("pause")}
        playLabel={t("play")}
        expandLabel={t("expand")}
        collapseLabel={t("collapse")}
        listLabel={t("title")}
      />
    </section>
  );
}
