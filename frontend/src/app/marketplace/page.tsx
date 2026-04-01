'use client';

import { useEffect, useMemo, useState } from "react";
import EmptyState from "@/components/ui/empty-state";
import { SkeletonText } from "@/components/ui/skeleton";
import { SiteNav } from "@/components/sections/site-nav";
import FooterStrip from "@/components/sections/footer-strip";
import LabPills from "@/components/sections/lab-pills";
import ModelGrid from "@/components/sections/model-grid";
import ModelSearchBar from "@/components/model/model-search-bar";
import ModelModal from "@/components/model/model-modal";
import { getLabs, getMarketplaceModels } from "@/lib/api";
import type { Model } from "@/lib/types";

const typeFilters = ["language", "vision", "code"];

export default function MarketplacePage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeLab, setActiveLab] = useState("all");
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  const labs = getLabs();
  const models = useMemo(
    () =>
      getMarketplaceModels({ search }).filter((model) => {
        const labMatch = activeLab === "all" || model.lab === activeLab;
        const typeMatch = activeTypes.length === 0 || activeTypes.some((type) => model.types.includes(type));
        return labMatch && typeMatch;
      }),
    [activeLab, activeTypes, search],
  );

  const toggleType = (value: string) =>
    setActiveTypes((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));

  return (
    <div>
      <SiteNav />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-black/40">Marketplace</p>
          <h1 className="mt-2 font-syne text-4xl">Search, filter, and compare the full catalog</h1>
        </div>
        {loading ? (
          <SkeletonText lines={8} />
        ) : models.length === 0 ? (
          <EmptyState title="No marketplace results" description="Try removing a filter or searching for another capability." />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="space-y-4">
              <div className="rounded-[28px] bg-white p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-black/40">Filters</p>
                <div className="mt-4 space-y-2">
                  {typeFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => toggleType(filter)}
                      className={`w-full rounded-full px-4 py-3 text-left text-sm ${
                        activeTypes.includes(filter) ? "bg-black text-white" : "bg-[#f6f1ea] text-black/70"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
            <section className="space-y-5">
              <div className="rounded-[32px] bg-[#ece4db] p-5">
                <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                  <ModelSearchBar value={search} onChange={setSearch} />
                  <div className="flex flex-wrap gap-2">
                    {["Top rated", "Fastest", "Budget"].map((pill) => (
                      <span key={pill} className="rounded-full bg-white px-4 py-2 text-sm text-black/60">{pill}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <LabPills labs={labs} activeLab={activeLab} onChange={setActiveLab} />
                </div>
              </div>
              <ModelGrid models={models} onSelect={setSelectedModel} />
            </section>
          </div>
        )}
      </main>
      <FooterStrip />
      <ModelModal model={selectedModel} onClose={() => setSelectedModel(null)} />
    </div>
  );
}
