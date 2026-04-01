'use client';

import PrepopPromptCard from "@/components/chat/prepop-prompt-card";

export default function CategoryPromptPanel({ onPick }: { onPick: (prompt: string) => void }) {
  const prompts = [
    "Build a launch checklist for a coding agent.",
    "Design a pricing comparison table from the current catalog.",
    "Write onboarding copy for a research assistant.",
  ];

  return (
    <div className="rounded-[28px] bg-white p-5">
      <p className="text-sm uppercase tracking-[0.3em] text-black/40">Category prompts</p>
      <div className="mt-4 grid gap-3">
        {prompts.map((prompt) => (
          <PrepopPromptCard key={prompt} prompt={prompt} onClick={() => onPick(prompt)} />
        ))}
      </div>
    </div>
  );
}
