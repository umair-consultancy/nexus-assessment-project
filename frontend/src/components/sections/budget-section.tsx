'use client';

import type { BudgetTier } from "@/lib/types";

export default function BudgetSection({ tiers }: { tiers: BudgetTier[] }) {
  return (
    <section className="mx-auto max-w-5xl px-3 py-3 sm:px-4">
      <div className="mb-3">
        <p className="text-xs uppercase tracking-[0.3em] text-black/40">First Models by Budget</p>
        <h2 className="font-syne text-xl">Spend with intent</h2>
      </div>
      <div className="grid gap-2 lg:grid-cols-4">
        {tiers.map((tier) => (
          <article key={tier.title} className="rounded-[16px] p-3" style={{ backgroundColor: tier.bg, border: `1px solid ${tier.border}` }}>
            <p className="text-base">{tier.icon}</p>
            <h3 className="mt-2 font-syne text-[14px]" style={{ color: tier.color }}>{tier.title}</h3>
            <p className="mt-2 text-[11px] leading-4 text-black/70">{tier.desc}</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-black/45">{tier.count}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
