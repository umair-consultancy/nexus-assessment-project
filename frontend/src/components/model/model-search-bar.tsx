'use client';

interface ModelSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ModelSearchBar({ value, onChange }: ModelSearchBarProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40">🔎</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search models, labs, tags..."
        className="w-full rounded-full border border-black/10 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[var(--accent)]"
      />
    </div>
  );
}
