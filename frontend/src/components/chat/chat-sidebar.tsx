'use client';

import type { Model } from "@/lib/types";
import ModelSidebarItem from "@/components/model/model-sidebar-item";

interface ChatSidebarProps {
  models: Model[];
  selectedModel: Model;
  onSelect: (model: Model) => void;
}

export default function ChatSidebar({ models, selectedModel, onSelect }: ChatSidebarProps) {
  return (
    <aside className="space-y-4">
      <div className="rounded-[28px] bg-white p-5">
        <p className="text-sm uppercase tracking-[0.3em] text-black/40">Models</p>
        <div className="mt-4 space-y-2">
          {models.slice(0, 6).map((model) => (
            <ModelSidebarItem key={model.id} model={model} active={model.id === selectedModel.id} onClick={onSelect} />
          ))}
        </div>
      </div>
      <button className="w-full rounded-[24px] bg-black px-4 py-4 text-sm text-white">+ Create Agent</button>
    </aside>
  );
}
