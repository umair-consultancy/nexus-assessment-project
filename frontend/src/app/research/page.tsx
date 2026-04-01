'use client';

import { useEffect, useState } from "react";
import EmptyState from "@/components/ui/empty-state";
import { SkeletonText } from "@/components/ui/skeleton";
import { SiteNav } from "@/components/sections/site-nav";
import TrendingSection from "@/components/sections/trending-section";
import FooterStrip from "@/components/sections/footer-strip";
import ResearchFeedCard from "@/components/research/research-feed-card";
import { getResearchFeed, getTrendingItems } from "@/lib/api";

export default function ResearchPage() {
  const [loading, setLoading] = useState(true);
  const items = getResearchFeed();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div>
      <SiteNav />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-black/40">Research feed</p>
          <h1 className="mt-2 font-syne text-4xl">Track releases, benchmarks, and frontier model shifts</h1>
        </div>
        {loading ? (
          <SkeletonText lines={8} />
        ) : items.length === 0 ? (
          <EmptyState title="No research items yet" />
        ) : (
          <>
            <TrendingSection items={getTrendingItems()} />
            <div className="mt-6 max-h-[860px] space-y-4 overflow-y-auto pr-1">
              {items.map((item) => <ResearchFeedCard key={`${item.date}-${item.title}`} item={item} />)}
            </div>
          </>
        )}
      </main>
      <FooterStrip />
    </div>
  );
}
