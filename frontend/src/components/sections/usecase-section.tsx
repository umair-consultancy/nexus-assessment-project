'use client';

import type { UseCase } from "@/lib/types";

export default function UseCaseSection({ useCases }: { useCases: UseCase[] }) {
  return (
    <section className="mx-auto max-w-5xl px-3 py-3 sm:px-4">
      <div className="mb-3">
        <p className="text-xs uppercase tracking-[0.3em] text-black/40">Quick-Start by Use Case</p>
        <h2 className="font-syne text-xl">Prompt-ready paths into the catalog</h2>
      </div>
      <div className="grid gap-2 lg:grid-cols-3">
        {useCases.slice(0, 6).map((useCase) => (
          <article key={useCase.title} className="rounded-[16px] border border-[var(--border)] bg-white p-3 shadow-[0_4px_16px_rgba(28,26,22,0.04)]">
            <p className="text-base">{useCase.icon}</p>
            <h3 className="mt-2 font-syne text-[15px]">{useCase.title}</h3>
            <p className="mt-2 text-[11px] leading-4 text-black/65">{useCase.desc}</p>
            <p className="mt-3 rounded-xl bg-[#f6f1ea] p-2.5 text-[11px] leading-4 text-black/75">{useCase.prompt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
