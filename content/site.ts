// Foto da seção "Sobre mim", em `public/` (mínimo 750x900, proporção 5:6; o excesso é cortado).
// Use `null` para voltar ao espaço reservado com o monograma.
export const PHOTO_SRC: string | null = "/rafael-silva.webp";

// Canais de contato (seção Contato). `display` é o texto mostrado; `href` é o link.
export const CONTACT = {
  email: "rafagsilva1312@gmail.com",
  linkedin: {
    display: "linkedin.com/in/rafaelgsilva2",
    href: "https://www.linkedin.com/in/rafaelgsilva2",
  },
  github: {
    display: "github.com/Rafaelgs2",
    href: "https://github.com/Rafaelgs2",
  },
} as const;

// Currículo completo em PDF. Coloque o arquivo em `public/` (ex.: public/cv-rafael-silva.pdf)
// e troque `null` por "/cv-rafael-silva.pdf": o link aparece sozinho na Experiência.
export const CV_URL: string | null = null;
