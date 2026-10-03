// Endereço público do site, usado no canonical, no hreflang, no sitemap e nas
// imagens de compartilhamento. A ordem de prioridade é:
//   1. NEXT_PUBLIC_SITE_URL, para quando houver domínio próprio;
//   2. o domínio de produção que a própria Vercel informa (VERCEL_PROJECT_PRODUCTION_URL);
//   3. localhost, no desenvolvimento.
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  fromVercel ??
  "http://localhost:3000"
).replace(/\/$/, "");
