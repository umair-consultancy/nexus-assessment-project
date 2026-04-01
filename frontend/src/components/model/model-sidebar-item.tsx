'use client';

import type { Model } from "@/lib/types";

interface ModelSidebarItemProps {
  model: Model;
  active?: boolean;
  onClick: (model: Model) => void;
}

export default function ModelSidebarItem({ model, active, onClick }: ModelSidebarItemProps) {
  return (
    <button
      onClick={() => onClick(model)}
      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
        active ? "bg-black text-white" : "bg-white hover:bg-[#f6f1ea]"
      }`}
    >
      <span className="text-2xl">{model.icon}</span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{model.name}</p>
        <p className={`truncate text-xs ${active ? "text-white/70" : "text-black/50"}`}>{model.org}</p>
      </div>
    </button>
  );
}
