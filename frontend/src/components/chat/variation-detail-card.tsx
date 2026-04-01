'use client';

import type { Variation } from "@/lib/types";

export default function VariationDetailCard({ variation }: { variation: Variation | undefined }) {
  if (!variation) return null;
  return (
    <div className="rounded-[24px] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-medium">{variation.name}</p>
          <p className="text-sm text-black/55">{variation.tag}</p>
        </div>
        <span className="text-sm text-[var(--accent)]">{variation.price}</span>
      </div>
      <p className="mt-3 text-sm text-black/65">{variation.desc}</p>
    </div>
  );
}
