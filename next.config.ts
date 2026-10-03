import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Raiz do projeto explícita: evita o Next procurar lockfiles em pastas acima.
  turbopack: { root: path.dirname(fileURLToPath(import.meta.url)) },
  images: {
    // AVIF primeiro (bem menor que WebP/PNG nos prints); WebP como alternativa.
    formats: ["image/avif", "image/webp"],
    // Os arquivos mudam de nome quando mudam de conteúdo, então as imagens
    // otimizadas podem ficar um ano em cache.
    minimumCacheTTL: 31536000,
  },
};

export default withNextIntl(nextConfig);
