'use client';

import type { TrendingItem } from "@/lib/types";

export default function TrendingSection({ items }: { items: TrendingItem[] }) {
  return (
    <section className="mx-auto max-w-5xl px-3 py-3 sm:px-4">
      <div className="mb-3">
        <p className="text-xs uppercase tracking-[0.3em] text-black/40">Trending This Week</p>
        <h2 className="font-syne text-xl">What teams are watching right now</h2>
      </div>
      <div className="grid gap-2 lg:grid-cols-3">
        {items.slice(0, 6).map((item) => (
          <article key={item.title} className="rounded-[16px] border border-[var(--border)] bg-white p-3 shadow-[0_4px_16px_rgba(28,26,22,0.04)]">
            <span
              className="inline-flex rounded-full px-2 py-1 text-[10px] font-medium"
              style={{ backgroundColor: item.badgeBg, color: item.badgeColor }}
            >
              {item.badge}
            </span>
            <p className="mt-3 text-[10px] text-black/45">{item.org}</p>
            <h3 className="mt-1 font-syne text-[15px] leading-tight">{item.title}</h3>
            <p className="mt-2 text-[11px] leading-4 text-black/65">{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
