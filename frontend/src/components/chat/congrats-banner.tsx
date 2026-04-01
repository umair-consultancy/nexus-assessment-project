'use client';

export default function CongratsBanner() {
  return (
    <div className="rounded-[28px] bg-[#1c1a16] p-5 text-white">
      <p className="text-sm uppercase tracking-[0.3em] text-white/50">Milestone</p>
      <h3 className="mt-2 font-syne text-2xl">Congrats, your chat stack is agent-ready.</h3>
      <p className="mt-2 text-sm text-white/70">Prompts, model selection, and reusable context are all in place.</p>
    </div>
  );
}
