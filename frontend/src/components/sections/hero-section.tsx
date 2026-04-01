'use client';

import { motion } from "framer-motion";
import HeroActionGrid from "@/components/sections/hero-action-grid";
import HeroSearchCard from "@/components/sections/hero-search-card";

interface HeroSectionProps {
  search: string;
  onSearch: (value: string) => void;
  stats: { label: string; value: string }[];
}

export default function HeroSection({ search, onSearch, stats }: HeroSectionProps) {
  return (
    <section className="mx-auto max-w-5xl px-3 py-5 text-center sm:px-4 lg:py-8">
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
        <p className="mx-auto inline-flex rounded-full border border-[var(--border)] bg-white/80 px-4 py-1 text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">
          347 models live updated daily
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-syne text-4xl leading-[0.95] sm:text-5xl lg:text-[4.2rem]">
          Find your perfect <span className="text-[var(--accent)]">AI model</span> with guided discovery
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-xs text-black/55 sm:text-sm">
          You do not need to know AI jargon to get started. Browse models, compare labs, and use guided prompts to find what fits.
        </p>
        <div className="mt-5">
          <HeroSearchCard value={search} onChange={onSearch} />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mt-4 max-w-xl rounded-[22px] border border-[var(--border)] bg-[#f8f4ee] p-3 shadow-[0_14px_32px_rgba(28,26,22,0.06)]"
      >
        <HeroActionGrid />
        <div className="mt-4 grid grid-cols-4 gap-2 border-t border-[var(--border)] pt-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-syne text-base sm:text-xl">{stat.value}</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-black/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
