"use client";

import { useState } from "react";
import type { Tool } from "@/content/stack";
import styles from "./StackMarquee.module.css";

type Group = { id: string; label: string; names: string[] };

type Props = {
  rows: Tool[][];
  groups: Group[];
  pauseLabel: string;
  playLabel: string;
  expandLabel: string;
  collapseLabel: string;
  listLabel: string;
};

function Chip({ tool }: { tool: Tool }) {
  return (
    <li
      className={styles.chip}
      data-dark-brand={tool.darkBrand ? "true" : undefined}
      style={
        {
          "--brand": tool.brand,
          "--ink": tool.ink === "dark" ? "#1C1B1A" : "#FFFFFF",
        } as React.CSSProperties
      }
    >
      <span className={styles.logo} aria-hidden="true">
        {tool.icon ? (
          <svg viewBox="0 0 24 24" focusable="false">
            <path d={tool.icon} fill="currentColor" />
          </svg>
        ) : (
          <span className={styles.abbr}>{tool.abbr}</span>
        )}
      </span>
      <span className={styles.name}>{tool.name}</span>
    </li>
  );
}

export default function StackMarquee({
  rows,
  groups,
  pauseLabel,
  playLabel,
  expandLabel,
  collapseLabel,
  listLabel,
}: Props) {
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={styles.root}
      data-paused={paused}
      data-reveal
      style={{ "--i": 1 } as React.CSSProperties}
    >
      {rows.map((row, i) => (
        <div
          key={i}
          className={`${styles.row} ${i % 2 === 1 ? styles.reverse : ""}`}
        >
          <div className={styles.track}>
            {/* A lista real é lida uma vez; a cópia só serve ao laço contínuo. */}
            <ul className={styles.list} aria-label={`${listLabel} ${i + 1}`}>
              {row.map((tool) => (
                <Chip key={tool.name} tool={tool} />
              ))}
            </ul>
            <ul className={`${styles.list} ${styles.copy}`} aria-hidden="true">
              {row.map((tool) => (
                <Chip key={tool.name} tool={tool} />
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.expand}
          aria-expanded={expanded}
          aria-controls="stack-all"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? collapseLabel : expandLabel}
          <span className={styles.chevron} aria-hidden="true" />
        </button>

        {/* WCAG 2.2.2: movimento contínuo por mais de 5s precisa de pausa. */}
        <button
          type="button"
          className={styles.pause}
          aria-pressed={paused}
          onClick={() => setPaused((v) => !v)}
        >
          {paused ? playLabel : pauseLabel}
        </button>
      </div>

      <div id="stack-all" className={styles.panel} data-open={expanded}>
        <dl className={styles.groups}>
          {groups.map((g) => (
            <div key={g.id} className={styles.group}>
              <dt>{g.label}</dt>
              <dd>{g.names.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
