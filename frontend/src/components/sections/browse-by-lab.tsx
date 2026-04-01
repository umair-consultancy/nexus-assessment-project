'use client';

import type { Lab } from "@/lib/types";
import LabPills from "@/components/sections/lab-pills";

interface BrowseByLabProps {
  labs: Lab[];
  activeLab: string;
  onChange: (labId: string) => void;
}

export default function BrowseByLab({ labs, activeLab, onChange }: BrowseByLabProps) {
  return (
    <section className="mx-auto max-w-5xl px-3 py-3 sm:px-4">
      <div className="rounded-[16px] border border-[var(--border)] bg-white p-3 shadow-[0_4px_16px_rgba(28,26,22,0.04)]">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black/45">See each provider at a glance</p>
          </div>
          <p className="text-xs font-medium text-black/60">All Labs</p>
        </div>
        <LabPills labs={labs} activeLab={activeLab} onChange={onChange} />
      </div>
    </section>
  );
}
