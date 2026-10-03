import { useTranslations } from "next-intl";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className={`wrap ${styles.footer}`}>
      <p>{t("copyright", { year: new Date().getFullYear() })}</p>
      <p>{t("role")}</p>
    </footer>
  );
}
