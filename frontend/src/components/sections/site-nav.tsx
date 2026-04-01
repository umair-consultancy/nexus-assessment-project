'use client';

import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Marketplace" },
  { href: "/marketplace", label: "Compare" },
  { href: "/research", label: "Discover New" },
  { href: "/agents", label: "Agents" },
];

export function SiteNav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 border-b border-black/5 bg-[var(--bg)]/82 backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-3 py-2 sm:px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">
            N
          </span>
          <p className="font-syne text-xs">NexusAI</p>
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-black/5 bg-white/70 px-2 py-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full px-2.5 py-1 text-[10px] text-black/65 transition hover:bg-black hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden text-[10px] text-black/50 sm:inline">EN</span>
          <Link
            href="/chat"
            className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-[10px] font-medium text-white transition hover:bg-[var(--accent-dark)]"
          >
            Get started
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
