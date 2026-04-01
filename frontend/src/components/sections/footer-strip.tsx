'use client';

import Link from "next/link";

export default function FooterStrip() {
  return (
    <footer className="px-3 py-4 text-black/60 sm:px-4">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 border-t border-black/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-syne text-sm">NexusAI</p>
          <p className="text-[10px] text-black/55">A responsive home for model discovery, chat, agents, and research.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-[10px] text-black/60">
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/chat">Chat</Link>
          <Link href="/agents">Agents</Link>
          <Link href="/research">Research</Link>
        </div>
      </div>
    </footer>
  );
}
