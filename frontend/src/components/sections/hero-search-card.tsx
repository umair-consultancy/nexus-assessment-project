'use client';

import { motion } from "framer-motion";

interface HeroSearchCardProps {
  value: string;
  onChange: (value: string) => void;
}

export default function HeroSearchCard({ value, onChange }: HeroSearchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-lg rounded-full border border-[var(--border)] bg-white/95 p-1.5 shadow-[0_12px_28px_rgba(28,26,22,0.08)]"
    >
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-black/35">
          Search
        </span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="I want help finding the right AI model..."
          className="w-full rounded-full border border-transparent bg-transparent py-2.5 pl-20 pr-24 text-xs outline-none placeholder:text-black/35 focus:border-[var(--accent)]"
        />
        <button className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] px-3 py-1.5 text-[11px] font-medium text-white">
          Let's go
        </button>
      </div>
    </motion.div>
  );
}
