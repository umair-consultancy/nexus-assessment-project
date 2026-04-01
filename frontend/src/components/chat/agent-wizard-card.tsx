'use client';

export default function AgentWizardCard() {
  return (
    <div className="rounded-[28px] bg-white p-5">
      <p className="text-sm uppercase tracking-[0.3em] text-black/40">Agent wizard</p>
      <h3 className="mt-2 font-syne text-2xl">Turn this conversation into a reusable agent.</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {["Define task", "Set guardrails", "Choose handoff"].map((step, index) => (
          <div key={step} className="rounded-[20px] bg-[#f6f1ea] p-4 text-sm">
            <p className="text-xs uppercase text-black/40">Step 0{index + 1}</p>
            <p className="mt-2 font-medium">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
