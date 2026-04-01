'use client';

import type { Model } from "@/lib/types";
import Sparkline from "@/components/chat/sparkline";

export default function RightPanel({ model }: { model: Model }) {
  return (
    <aside className="space-y-4">
      <div className="rounded-[28px] bg-white p-5">
        <p className="text-sm uppercase tracking-[0.3em] text-black/40">Active model</p>
        <h3 className="mt-2 font-syne text-2xl">{model.icon} {model.name}</h3>
        <p className="mt-2 text-sm text-black/65">{model.desc}</p>
      </div>
      <div className="rounded-[28px] bg-white p-5">
        <p className="text-sm uppercase tracking-[0.3em] text-black/40">Usage overview</p>
        <div className="mt-3">
          <Sparkline />
        </div>
        <p className="mt-3 text-sm text-black/60">Session activity is trending up across research and coding prompts.</p>
      </div>
      <div className="rounded-[28px] bg-white p-5">
        <p className="text-sm uppercase tracking-[0.3em] text-black/40">Quick actions</p>
        <div className="mt-4 grid gap-2">
          {["🧪 Run eval", "📌 Save prompt", "🛠️ Make agent"].map((action) => (
            <button key={action} className="rounded-full bg-[#efe7de] px-4 py-3 text-left text-sm text-black/75">
              {action}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
