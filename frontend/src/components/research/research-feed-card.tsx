'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import type { ResearchItem } from "@/lib/types";

export default function ResearchFeedCard({ item }: { item: ResearchItem }) {
  const prompt = encodeURIComponent(`Summarize and explain the implications of: ${item.title}`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] bg-white p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-black/45">{item.org}</p>
        <span className="rounded-full bg-[#efe7de] px-3 py-1 text-xs">{item.date}</span>
      </div>
      <h3 className="mt-3 font-syne text-2xl">{item.title}</h3>
      <p className="mt-3 text-sm text-black/65">{item.summary}</p>
      <Link href={`/chat?prompt=${prompt}`} className="mt-4 inline-flex text-sm text-[var(--accent)]">
        Open in chat →
      </Link>
    </motion.article>
  );
}
