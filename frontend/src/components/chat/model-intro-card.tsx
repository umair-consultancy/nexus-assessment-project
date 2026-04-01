'use client';

import type { Model } from "@/lib/types";

export default function ModelIntroCard({ model }: { model: Model }) {
  return (
    <article className="rounded-[24px] bg-white p-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{model.icon}</span>
        <div>
          <p className="font-medium">{model.name}</p>
          <p className="text-sm text-black/55">{model.org}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-black/65">{model.desc}</p>
    </article>
  );
}
