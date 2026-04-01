'use client';

import type { Model } from "@/lib/types";
import ModelGrid from "@/components/sections/model-grid";

interface FeaturedModelsProps {
  models: Model[];
  onSelect?: (model: Model) => void;
}

export default function FeaturedModels({ models, onSelect }: FeaturedModelsProps) {
  return (
    <section className="mx-auto max-w-5xl px-3 py-3 sm:px-4">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/40">Featured Models</p>
          <h2 className="font-syne text-xl">Flagship models this week</h2>
        </div>
        <p className="max-w-md text-xs uppercase tracking-[0.25em] text-[var(--accent)]">Browse all</p>
      </div>
      <ModelGrid models={models} onSelect={onSelect} />
    </section>
  );
}
