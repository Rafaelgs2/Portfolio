import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main
      id="main"
      tabIndex={-1}
      className="wrap screen"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-4)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "var(--accent)",
          fontSize: "0.8rem",
          fontWeight: 600,
          letterSpacing: "0.16em",
        }}
      >
        404
      </p>
      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-script)",
          fontSize: "clamp(2.6rem, 8vw, 4.6rem)",
          fontWeight: 400,
          lineHeight: 1.1,
        }}
      >
        {t("title")}
      </h1>
      <p style={{ margin: 0, maxWidth: "44ch", color: "var(--muted)" }}>{t("text")}</p>
      <Link href="/" className="btn btn--primary">
        {t("back")}
      </Link>
    </main>
  );
}
