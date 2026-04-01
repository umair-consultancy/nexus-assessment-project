'use client';

const actions = [
  "Reasoning",
  "Coding",
  "Image",
  "Video",
  "Voice",
  "Docs",
  "Analysis",
  "Translate",
  "Agents",
  "RAG",
  "Mobile",
  "Fast",
];

export default function HeroActionGrid() {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {actions.map((action) => (
        <button
          key={action}
          className="rounded-xl border border-[var(--border)] bg-white px-1.5 py-2 text-[10px] text-black/70 transition hover:border-[var(--accent)] hover:text-black"
        >
          {action}
        </button>
      ))}
    </div>
  );
}
