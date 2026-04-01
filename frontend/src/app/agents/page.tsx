'use client';

import { useEffect, useState } from "react";
import EmptyState from "@/components/ui/empty-state";
import { SkeletonText } from "@/components/ui/skeleton";
import { SiteNav } from "@/components/sections/site-nav";
import FooterStrip from "@/components/sections/footer-strip";

const templates = [
  ["🤖", "Support triage", "Route tickets, summarize customer issues, and suggest replies.", ["support", "ops"]],
  ["🧪", "Research scout", "Scan model releases, distill changes, and tee up follow-up questions.", ["research", "weekly"]],
  ["💻", "Code reviewer", "Check diffs for regressions, risky assumptions, and testing gaps.", ["engineering", "qa"]],
  ["📦", "RAG architect", "Design retrieval pipelines with chunking, evals, and fallback plans.", ["infra", "rag"]],
  ["📣", "Launch writer", "Draft product announcements, onboarding copy, and email campaigns.", ["marketing", "copy"]],
  ["📊", "Ops analyst", "Summarize usage shifts, costs, and anomalies for daily review.", ["analytics", "finance"]],
] as const;

export default function AgentsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div>
      <SiteNav />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-black/40">Agents</p>
            <h1 className="mt-2 font-syne text-4xl">Reusable agent templates for common team workflows</h1>
            <p className="mt-3 max-w-2xl text-sm text-black/65">Start from a template, then adjust instructions, tools, and handoff rules.</p>
          </div>
          <button className="rounded-full bg-black px-5 py-3 text-sm text-white">+ New Agent</button>
        </div>
        {loading ? (
          <SkeletonText lines={8} />
        ) : templates.length === 0 ? (
          <EmptyState title="No templates available" />
        ) : (
          <>
            <div className="mb-6 rounded-[28px] bg-[#ece4db] p-5 text-sm text-black/70">
              ℹ️ Templates are starter kits. Keep the task narrow, define success criteria, and add guardrails before production use.
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {templates.map(([icon, title, desc, tags]) => (
                <article key={title} className="rounded-[28px] bg-white p-5">
                  <p className="text-2xl">{icon}</p>
                  <h2 className="mt-3 font-syne text-2xl">{title}</h2>
                  <p className="mt-3 text-sm text-black/65">{desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => <span key={tag} className="rounded-full bg-[#f6f1ea] px-3 py-1 text-xs text-black/60">{tag}</span>)}
                  </div>
                  <button className="mt-5 text-sm text-[var(--accent)]">Use template →</button>
                </article>
              ))}
            </div>
          </>
        )}
      </main>
      <FooterStrip />
    </div>
  );
}
