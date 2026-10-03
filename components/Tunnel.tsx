// Anéis concêntricos (elipses) fixos ao fundo: cada um nasce pequeno no ponto
// de fuga e se expande até sair da tela conforme a página rola, como um funil.
// É puramente decorativo e só aparece com suporte a animation-timeline e sem
// movimento reduzido (ver `.tunnel` em globals.css).
const RINGS = Array.from({ length: 9 }, (_, i) => i);

export default function Tunnel() {
  return (
    <div className="tunnel" aria-hidden="true">
      {RINGS.map((i) => (
        <span
          key={i}
          className={i % 4 === 3 ? "ring ring--accent" : "ring"}
          // --s: onde o anel começa na rolagem (%); --r: quanto ele gira (graus),
          // em sentidos alternados, o que transforma o funil em redemoinho.
          style={{ "--s": i * 9, "--r": (i % 2 ? 1 : -1) * (28 + i * 7) } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
