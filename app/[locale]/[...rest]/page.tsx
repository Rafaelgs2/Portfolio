import { notFound } from "next/navigation";

// Qualquer endereço desconhecido dentro de um idioma cai aqui e vira 404, que é
// então desenhado por app/[locale]/not-found.tsx, no idioma certo e com o
// cabeçalho do site (um 404 global não saberia o idioma).
export default function CatchAll() {
  notFound();
}
