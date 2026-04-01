'use client';

import { motion } from "framer-motion";
import type { Model } from "@/lib/types";

interface ModelCardProps {
  model: Model;
  onSelect?: (model: Model) => void;
}

export default function ModelCard({ model, onSelect }: ModelCardProps) {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      onClick={() => onSelect?.(model)}
      className="group flex h-full flex-col rounded-[16px] border border-[var(--border)] bg-white p-3 text-left shadow-[0_4px_16px_rgba(28,26,22,0.04)] transition hover:border-[#d8cabb] hover:shadow-[0_10px_22px_rgba(28,26,22,0.07)]"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-base"
            style={{ backgroundColor: model.bg }}
          >
            {model.icon}
          </span>
          <div>
            <h3 className="font-syne text-[13px] leading-tight">{model.name}</h3>
            <p className="text-[10px] text-black/55">{model.org}</p>
          </div>
        </div>
        {model.badge && <span className="rounded-full bg-[#f4ede6] px-2 py-1 text-[10px] uppercase text-black/60">{model.badge}</span>}
      </div>
      <p className="mb-3 line-clamp-2 text-[11px] leading-4 text-black/62">{model.desc}</p>
      <div className="mb-3 flex flex-wrap gap-1">
        {model.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-[#f7f2eb] px-2 py-1 text-[10px] text-black/62">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-[var(--border)] pt-2 text-[10px]">
        <span className="font-medium text-[var(--accent)]">{model.price}</span>
        <span className="text-black/45">{model.rating?.toFixed(1) ?? "New"} star</span>
      </div>
    </motion.button>
  );
}
