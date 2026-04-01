'use client';

export default function InspirationChips({ onPick }: { onPick: (prompt: string) => void }) {
  const prompts = [
    "Plan a customer support agent",
    "Compare GPT-5.4 vs Claude Opus 4.6",
    "Draft a RAG architecture",
    "Turn this into a weekly research ritual",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <button key={prompt} onClick={() => onPick(prompt)} className="rounded-full bg-[#efe7de] px-4 py-2 text-sm text-black/75">
          {prompt}
        </button>
      ))}
    </div>
  );
}
