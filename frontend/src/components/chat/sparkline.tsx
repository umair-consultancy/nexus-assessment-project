'use client';

const bars = [36, 52, 44, 70, 58, 76, 61, 82];

export default function Sparkline() {
  return (
    <div className="flex h-16 items-end gap-2">
      {bars.map((height, index) => (
        <span key={index} className="w-3 rounded-full bg-[var(--accent)]/80" style={{ height }} />
      ))}
    </div>
  );
}
