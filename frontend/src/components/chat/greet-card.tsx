'use client';

export default function GreetCard({ modelName }: { modelName: string }) {
  return (
    <div className="rounded-[28px] bg-[linear-gradient(135deg,#fff,#efe7de)] p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-black/40">Chat hub</p>
      <h2 className="mt-2 font-syne text-3xl">Welcome back. {modelName} is ready.</h2>
      <p className="mt-3 text-sm text-black/65">Start with a question, reuse a prompt pack, or turn the workflow into an agent.</p>
    </div>
  );
}
