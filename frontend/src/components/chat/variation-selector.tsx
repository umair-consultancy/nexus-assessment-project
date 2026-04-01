'use client';

import type { Variation } from "@/lib/types";

interface VariationSelectorProps {
  variations: Variation[];
  activeId: string;
  onChange: (id: string) => void;
}

export default function VariationSelector({ variations, activeId, onChange }: VariationSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {variations.map((variation) => (
        <button
          key={variation.id}
          onClick={() => onChange(variation.id)}
          className={`rounded-full px-4 py-2 text-sm ${variation.id === activeId ? "bg-black text-white" : "bg-white text-black/65"}`}
        >
          {variation.name}
        </button>
      ))}
    </div>
  );
}
