'use client';

export default function PrepopPromptCard({ prompt, onClick }: { prompt: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded-[22px] bg-white p-4 text-left text-sm text-black/70 transition hover:bg-[#fff7f0]">
      {prompt}
    </button>
  );
}
