'use client';

export default function NewsletterBanner() {
  return (
    <section className="mx-auto max-w-5xl px-3 py-4 sm:px-4">
      <div className="rounded-[18px] bg-[#211d1a] px-5 py-5 text-white">
        <p className="text-center text-xs text-white/70">Don't miss a release.</p>
        <div className="mt-2 flex flex-col items-center gap-3">
          <div className="max-w-2xl text-center">
            <h2 className="font-syne text-2xl sm:text-3xl">Don't miss a release.</h2>
            <p className="mt-2 text-[11px] text-white/60">Get a curated weekly digest with launches, pricing updates, and prompt engineering tips.</p>
          </div>
          <div className="flex w-full max-w-sm gap-2">
            <input className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs outline-none" placeholder="Email address" />
            <button className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
}
