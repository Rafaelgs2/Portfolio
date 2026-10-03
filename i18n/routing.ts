import { defineRouting } from "next-intl/routing";

// Português na raiz (`/`) e inglês em `/en`.
export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
