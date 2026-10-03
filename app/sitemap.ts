import type { MetadataRoute } from "next";

import { SITE_URL as SITE } from "@/lib/site";

// As duas versões do site, cada uma apontando para a outra (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const pt = `${SITE}/`;
  const en = `${SITE}/en`;
  const languages = { "pt-BR": pt, en, "x-default": pt };
  return [
    { url: pt, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: en, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
