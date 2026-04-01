'use client';

const cards = [
  { icon: "○", title: "Guided Discovery Chat", body: "Get simple recommendations without drowning in AI jargon or endless filters." },
  { icon: "△", title: "Prompt Engineering Guide", body: "See starter prompts, practical examples, and model-specific usage advice." },
  { icon: "◇", title: "Agent Builder", body: "Turn a strong model into a reusable workflow with clearer setup paths." },
  { icon: "✦", title: "Flexible Pricing", body: "Compare free, budget, and premium options before you commit." },
  { icon: "★", title: "Ratings & Reviews", body: "Use benchmark signals, reviews, and highlights to choose faster." },
  { icon: "↗", title: "Research Feed", body: "Keep up with releases, benchmarks, and lab announcements in one place." },
];

export default function BuilderCards() {
  return (
    <section className="mx-auto max-w-5xl px-3 py-3 sm:px-4">
      <div className="mb-3">
        <p className="text-xs uppercase tracking-[0.3em] text-black/40">Built for every builder</p>
      </div>
      <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-6">
        {cards.map((card) => (
          <article key={card.title} className="min-h-[120px] rounded-[16px] border border-[var(--border)] bg-white p-3 shadow-[0_4px_16px_rgba(28,26,22,0.04)]">
            <p className="text-xs text-[var(--accent)]">{card.icon}</p>
            <h3 className="mt-2 font-syne text-[13px] leading-tight">{card.title}</h3>
            <p className="mt-2 text-[11px] leading-4 text-black/62">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
