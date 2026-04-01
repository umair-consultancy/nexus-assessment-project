'use client';

import AttachChip from "@/components/chat/attach-chip";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function ChatInput({ value, onChange, onSubmit }: ChatInputProps) {
  return (
    <div className="rounded-[28px] bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <AttachChip />
        <button className="rounded-full bg-[#efe7de] px-3 py-2 text-xs text-black/70">🪄 Improve prompt</button>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ask for a plan, draft, or agent workflow..."
          className="min-h-24 flex-1 rounded-[22px] border border-black/10 bg-[#faf7f3] p-4 text-sm outline-none focus:border-[var(--accent)]"
        />
        <button onClick={onSubmit} className="rounded-[22px] bg-[var(--accent)] px-6 py-4 text-sm text-white">
          Send →
        </button>
      </div>
    </div>
  );
}
