// Ordem: da mais recente para a mais antiga. Os textos (cargo, período e
// entregas) ficam em content/pt.json e content/en.json, em `experience.items.<id>`.
// A empresa não é traduzida. O texto completo fica só no currículo.
export const experience = [
  { id: "sura", company: "Seguros Sura", bullets: 2, current: true },
  { id: "birla", company: "Birla Carbon Brasil", bullets: 2, current: false },
  { id: "apprentice", company: "Birla Carbon Brasil", bullets: 1, current: false },
] as const;
