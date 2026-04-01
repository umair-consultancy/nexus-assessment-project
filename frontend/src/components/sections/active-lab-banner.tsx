'use client';

import type { Lab } from "@/lib/types";

interface ActiveLabBannerProps {
  lab: Lab | undefined;
}

export default function ActiveLabBanner({ lab }: ActiveLabBannerProps) {
  return (
    <div className="rounded-[28px] bg-white p-5">
      <p className="text-xs uppercase tracking-[0.3em] text-black/40">Active lab</p>
      <h3 className="mt-2 font-syne text-2xl">{lab ? `${lab.icon} ${lab.name}` : "🌐 All Labs"}</h3>
      <p className="mt-2 text-sm text-black/60">
        {lab ? "Filter the marketplace and landing cards around this lab's ecosystem." : "Browse the full model universe with no lab filter applied."}
      </p>
    </div>
  );
}
