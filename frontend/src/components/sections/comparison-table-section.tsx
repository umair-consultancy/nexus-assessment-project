'use client';

import type { ComparisonRow } from "@/lib/types";

export default function ComparisonTableSection({ rows }: { rows: ComparisonRow[] }) {
  return (
    <section className="mx-auto max-w-5xl px-3 py-3 sm:px-4">
      <div className="mb-3">
        <p className="text-xs uppercase tracking-[0.3em] text-black/40">Flagship Model Comparison</p>
        <h2 className="font-syne text-xl">Snapshot of flagship tradeoffs</h2>
      </div>
      <div className="overflow-hidden rounded-[16px] border border-[var(--border)] bg-white shadow-[0_4px_16px_rgba(28,26,22,0.04)]">
        <div className="hidden grid-cols-[1.5fr_repeat(4,1fr)] gap-4 border-b border-[var(--border)] bg-[#faf7f2] px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-black/40 md:grid">
          <span>Model</span>
          <span>Context</span>
          <span>Input</span>
          <span>Output</span>
          <span>Best for</span>
        </div>
        {rows.slice(0, 7).map((row) => (
          <div key={row.name} className="grid gap-2 border-b border-[var(--border)] px-4 py-2.5 md:grid-cols-[1.5fr_repeat(4,1fr)] md:gap-4">
            <div>
              <p className="text-[11px] font-medium">{row.icon} {row.name}</p>
              <p className="text-[10px] text-black/50">{row.org}</p>
            </div>
            <p className="text-[10px] text-black/70">{row.context}</p>
            <p className="text-[10px] text-black/70">{row.input}</p>
            <p className="text-[10px] text-black/70">{row.output}</p>
            <p className="text-[10px] text-black/70">{row.bestFor}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
