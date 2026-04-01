'use client';

export default function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-black/60">
      <span className="flex gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--accent)] [animation-delay:-0.2s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--accent)] [animation-delay:-0.1s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--accent)]" />
      </span>
      Thinking through a reply
    </div>
  );
}
