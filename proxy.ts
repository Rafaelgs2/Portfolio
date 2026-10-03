import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// No Next 16 o antigo `middleware` se chama `proxy`. Ele escolhe o idioma
// pelo navegador na primeira visita e depois respeita o cookie salvo.
export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
