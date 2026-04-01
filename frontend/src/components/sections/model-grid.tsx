'use client';

import type { Model } from "@/lib/types";
import ModelCard from "@/components/model/model-card";

interface ModelGridProps {
  models: Model[];
  onSelect?: (model: Model) => void;
}

export default function ModelGrid({ models, onSelect }: ModelGridProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
      {models.map((model) => (
        <ModelCard key={model.id} model={model} onSelect={onSelect} />
      ))}
    </div>
  );
}
