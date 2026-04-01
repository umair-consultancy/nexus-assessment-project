'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import ModelModal from "@/components/model/model-modal";
import {
  getBudgetTiers,
  getComparisonRows,
  getFeaturedModels,
  getLabs,
  getTrendingItems,
  getUseCases,
} from "@/lib/api";
import type { BudgetTier, ComparisonRow, Lab, Model, TrendingItem, UseCase } from "@/lib/types";

const heroActions = [
  ["IMG", "Create image", "Create an image for me"],
  ["AUD", "Generate audio", "Generate audio for me"],
  ["VID", "Create video", "Create a video for me"],
  ["SLD", "Create slides", "Create a presentation or slides for me"],
  ["INFO", "Create infographic", "Create an infographic for me"],
  ["QUIZ", "Create quiz", "Create a quiz for me"],
  ["CARD", "Create flashcards", "Create flashcards for me"],
  ["MAP", "Create mind map", "Create a mind map for me"],
  ["DATA", "Analyze data", "Help me analyze data"],
  ["TEXT", "Write content", "Help me write content"],
  ["CODE", "Code generation", "Help me with code generation and debugging"],
  ["DOC", "Document analysis", "Help me analyse documents and extract key information"],
  ["LANG", "Translate", "Help me translate text to another language"],
  ["LAB", "Just exploring", "I am just exploring what AI can do"],
] as const;

const builderCards = [
  ["CHAT", "Guided Discovery Chat", "We ask a few simple questions, then point you toward the right model without overwhelming you.", "/chat"],
  ["GUIDE", "Prompt Engineering Guide", "Every model includes practical prompts, examples, and setup guidance so the first result feels useful.", "/marketplace"],
  ["AGENT", "Agent Builder", "Step-by-step flows for system prompts, tools, memory, and deployment so agents feel approachable.", "/agents"],
  ["COST", "Flexible Pricing", "Free tiers, pay-as-you-go, subscriptions, and enterprise plans with clearer tradeoffs.", "/marketplace"],
  ["RATE", "User Reviews & Ratings", "Read real builder feedback before you commit to a model, workflow, or budget tier.", "/marketplace"],
  ["NEWS", "Research Feed", "Stay ahead with curated releases, capabilities, and useful summaries from across the AI landscape.", "/research"],
] as const;

const statItems = [
  ["525+", "AI Models"],
  ["82K", "Builders"],
  ["28", "AI Labs"],
  ["4.8*", "Avg Rating"],
] as const;

const guideQuestions = [
  {
    title: "What do you want to do?",
    hint: "Pick whichever feels closest. There are no wrong answers.",
    options: ["Write something", "Make visuals", "Build something", "Analyze information"],
  },
  {
    title: "Who is this for?",
    hint: "This helps narrow down the right recommendations.",
    options: ["Just me", "My team", "My customers", "Anyone"],
  },
] as const;

function SectionHeader({ title, href, label }: { title: string; href?: string; label?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <h2 className="font-syne text-3xl font-bold tracking-[-0.04em] text-[var(--text)] sm:text-[1.9rem]">{title}</h2>
      {href && label ? (
        <Link href={href} className="text-sm font-medium text-[var(--accent)] transition hover:text-[var(--accent2)]">
          {label}
        </Link>
      ) : null}
    </div>
  );
}

function badgeTone(model: Model) {
  switch (model.badgeClass) {
    case "badge-new":
      return "bg-[var(--teal-lt)] text-[var(--teal)]";
    case "badge-hot":
      return "bg-[var(--accent-lt)] text-[var(--accent)]";
    case "badge-open":
    case "badge-featured":
      return "bg-[var(--blue-lt)] text-[var(--blue)]";
    case "badge-beta":
      return "bg-[var(--amber-lt)] text-[var(--amber)]";
    default:
      return "bg-[var(--bg2)] text-[var(--text2)]";
  }
}

function tagTone(tag: string) {
  const lower = tag.toLowerCase();
  if (lower.includes("vision") || lower.includes("image")) return "bg-[var(--blue-lt)] text-[var(--blue)]";
  if (lower.includes("code") || lower.includes("agent")) return "bg-[var(--teal-lt)] text-[var(--teal)]";
  if (lower.includes("audio") || lower.includes("video")) return "bg-[var(--rose-lt)] text-[var(--rose)]";
  if (lower.includes("open") || lower.includes("free")) return "bg-[var(--amber-lt)] text-[var(--amber)]";
  return "bg-[var(--accent-lt)] text-[var(--accent)]";
}

function speedTone(speed: string) {
  const lower = speed.toLowerCase();
  if (lower.includes("fast")) return "text-[var(--teal)]";
  if (lower.includes("moderate")) return "text-[var(--amber)]";
  return "text-[var(--text2)]";
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const [questionStep, setQuestionStep] = useState(0);
  const [activeLab, setActiveLab] = useState("all");

  const featured = getFeaturedModels();
  const labs = getLabs().filter((lab) => lab.id !== "all");
  const comparisonRows = getComparisonRows();
  const trending = getTrendingItems();
  const budgetTiers = getBudgetTiers();
  const useCases = getUseCases();

  const visibleLabs = useMemo(() => {
    const ids = new Set(featured.map((model) => model.lab));
    return labs.filter((lab) => ids.has(lab.id));
  }, [featured, labs]);

  const filteredFeatured = useMemo(
    () =>
      featured.filter((model) => {
        const haystack = `${model.name} ${model.org} ${model.desc} ${model.tags.join(" ")}`.toLowerCase();
        const matchesSearch = !search || haystack.includes(search.toLowerCase());
        const matchesLab = activeLab === "all" || model.lab === activeLab;
        return matchesSearch && matchesLab;
      }),
    [activeLab, featured, search],
  );

  const question = guideQuestions[questionStep];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <nav className="sticky top-0 z-50 border-b border-black/8 bg-[rgba(244,242,238,0.92)] px-4 py-4 backdrop-blur-[14px] sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 font-syne text-[1.4rem] font-bold tracking-[-0.03em]">
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] bg-[var(--accent)] text-[10px] text-white">NX</span>
            NexusAI
          </Link>

          <div className="hidden items-center gap-7 text-[0.85rem] text-[var(--text2)] lg:flex">
            <Link href="/chat" className="transition hover:text-[var(--text)]">Chat Hub</Link>
            <Link href="/marketplace" className="transition hover:text-[var(--text)]">Marketplace</Link>
            <Link href="/research" className="transition hover:text-[var(--text)]">Discover New</Link>
            <Link href="/agents" className="transition hover:text-[var(--text)]">Agents</Link>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-full border border-black/14 px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
              Sign in
            </button>
            <Link href="/chat" className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white shadow-[0_6px_18px_rgba(200,98,42,0.22)] transition hover:bg-[var(--accent2)]">
              Get Started -&gt;
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden px-4 pb-12 pt-20 text-center sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(200,98,42,0.07)_0%,transparent_70%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle,rgba(0,0,0,0.14)_1px,transparent_1px)] [background-size:28px_28px]" />

          <div className="relative mx-auto flex max-w-[980px] flex-col items-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-[0.78rem] text-[var(--text2)] shadow-[var(--shadow)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
              347 models live - Updated daily
            </div>

            <h1 className="max-w-[860px] font-syne text-[clamp(3rem,6.5vw,5.5rem)] font-bold leading-[1.03] tracking-[-0.05em]">
              Find your perfect <span className="text-[var(--accent)]">AI model</span>
              <br />
              with guided discovery
            </h1>

            <p className="mb-10 mt-5 max-w-[560px] text-[1.05rem] text-[var(--text2)]">
              You do not need to know anything about AI to get started. Just click the box below and we will do the rest together.
            </p>

            <div className="relative z-10 w-full max-w-[690px]">
              <div className="overflow-hidden rounded-[28px] border border-black/12 bg-white shadow-[var(--shadow-md)]">
                <div className="flex min-h-[58px] items-center">
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onFocus={() => setGuideOpen(true)}
                    placeholder="Click here and type anything - or just say hi!"
                    className="flex-1 bg-transparent px-6 py-4 text-[0.98rem] text-[var(--text)] outline-none placeholder:text-[var(--text3)]"
                  />

                  <div className="hidden items-center gap-1 px-2 text-[0.68rem] text-[var(--text3)] sm:flex">
                    <span className="rounded-full px-2 py-1 transition hover:bg-[var(--bg2)] hover:text-[var(--text)]">MIC</span>
                    <span className="rounded-full px-2 py-1 transition hover:bg-[var(--bg2)] hover:text-[var(--text)]">FILE</span>
                    <span className="rounded-full px-2 py-1 transition hover:bg-[var(--bg2)] hover:text-[var(--text)]">IMG</span>
                    <div className="mx-1 h-5 w-px bg-black/14" />
                  </div>

                  <Link
                    href={`/chat${search ? `?q=${encodeURIComponent(search)}` : ""}`}
                    className="mr-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-[0.875rem] font-medium text-white transition hover:bg-[var(--accent2)]"
                  >
                    Let&apos;s go
                  </Link>
                </div>

                {guideOpen ? (
                  <div className="border-t border-black/8 bg-white">
                    <div className="bg-[linear-gradient(160deg,#fffaf6_0%,#ffffff_50%,#f6f9ff_100%)] px-7 py-6 text-center">
                      <div className="mb-3 text-[0.85rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Guided Start</div>
                      <h3 className="font-syne text-[1.22rem] font-bold tracking-[-0.03em] text-[var(--text)]">Welcome! You are in the right place.</h3>
                      <p className="mx-auto mb-5 mt-3 max-w-[520px] text-[0.87rem] leading-7 text-[var(--text2)]">
                        This marketplace helps you explore ideas, solve problems, and create faster even if you have never used AI before.
                      </p>

                      <div className="mx-auto mb-5 flex max-w-[520px] flex-col gap-2 text-left">
                        {[
                          "No tech knowledge needed. Everything is explained in plain language.",
                          "Answer a few simple questions about what you want to do.",
                          "We will help you build your first AI request step by step.",
                        ].map((line) => (
                          <div key={line} className="rounded-[10px] border border-black/5 bg-white/80 px-3 py-2 text-[0.8rem] text-[var(--text2)]">
                            {line}
                          </div>
                        ))}
                      </div>

                      <div className="mx-auto mb-5 w-full max-w-[460px]">
                        <div className="mb-2 text-[0.72rem] font-medium text-[var(--text3)]">{question.title}</div>
                        <div className="mb-3 text-[0.75rem] text-[var(--text3)]">{question.hint}</div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {question.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => setQuestionStep((current) => (current + 1) % guideQuestions.length)}
                              className="rounded-[14px] border border-black/12 bg-[var(--bg)] px-4 py-3 text-left text-[0.82rem] font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-lt)] hover:text-[var(--accent)]"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <button
                          onClick={() => setGuideOpen(false)}
                          className="rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent2))] px-7 py-3 text-[0.92rem] font-semibold text-white shadow-[0_4px_18px_rgba(200,98,42,0.32)] transition hover:-translate-y-0.5"
                        >
                          Let&apos;s get started
                        </button>
                        <button
                          onClick={() => setGuideOpen(false)}
                          className="text-[0.74rem] text-[var(--text3)] underline-offset-4 transition hover:text-[var(--accent)] hover:underline"
                        >
                          Skip - search directly
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-10 flex w-full max-w-[760px] flex-wrap justify-center gap-2 px-4">
              {["Compare GPT and Claude", "Best image models", "Free open-source picks", "Help me build an agent"].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setSearch(chip)}
                  className="rounded-full border border-black/14 bg-white px-4 py-2 text-[0.8rem] text-[var(--text2)] shadow-[var(--shadow)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-lt)] hover:text-[var(--accent)]"
                >
                  {chip}
                </button>
              ))}
            </div>

            <div className="mt-8 flex w-full max-w-[760px] flex-wrap justify-center gap-3">
              {heroActions.map(([icon, label, query], index) => (
                <Link
                  key={label}
                  href={`/chat?q=${encodeURIComponent(query)}`}
                  className={`flex min-w-[100px] max-w-[130px] flex-1 flex-col items-center gap-1 rounded-[20px] border px-4 py-4 text-center shadow-[var(--shadow)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent-lt)] hover:shadow-[0_6px_18px_rgba(200,98,42,0.14)] ${
                    index === heroActions.length - 1 ? "border-dashed border-black/14 bg-[var(--bg)]" : "border-black/14 bg-white"
                  }`}
                >
                  <span className="text-[0.74rem] font-bold tracking-[0.08em] text-[var(--text)]">{icon}</span>
                  <span className="text-[0.76rem] font-semibold leading-5 text-[var(--text)]">{label}</span>
                </Link>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-10">
              {statItems.map(([value, label]) => (
                <div key={label} className="text-center">
                  <strong className="block font-syne text-[2rem] font-bold text-[var(--text)]">{value}</strong>
                  <span className="text-[0.78rem] text-[var(--text3)]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader title="Featured Models" href="/marketplace" label="Browse all 525 ->" />

            <div className="mb-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveLab("all")}
                className={`rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition ${
                  activeLab === "all"
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-black/12 bg-[var(--bg)] text-[var(--text2)] hover:border-[var(--accent)] hover:bg-[var(--accent-lt)] hover:text-[var(--accent)]"
                }`}
              >
                All Labs
              </button>

              {visibleLabs.map((lab: Lab) => (
                <button
                  key={lab.id}
                  onClick={() => setActiveLab(lab.id)}
                  className={`rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition ${
                    activeLab === lab.id
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-black/12 bg-[var(--bg)] text-[var(--text2)] hover:border-[var(--accent)] hover:bg-[var(--accent-lt)] hover:text-[var(--accent)]"
                  }`}
                >
                  {lab.icon} {lab.name}
                </button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredFeatured.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className="rounded-[20px] border border-black/8 bg-white p-6 text-left shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-black/14 hover:shadow-[var(--shadow-md)]"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[11px] text-[1.1rem] font-semibold" style={{ background: model.bg }}>
                        {model.icon}
                      </div>
                      <div>
                        <div className="font-syne text-base font-semibold tracking-[-0.02em] text-[var(--text)]">{model.name}</div>
                        <div className="text-[0.75rem] text-[var(--text3)]">{model.org}</div>
                      </div>
                    </div>
                    {model.badge ? <span className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold ${badgeTone(model)}`}>{model.badge}</span> : null}
                  </div>

                  <p className="mb-4 text-[0.83rem] leading-6 text-[var(--text2)]">{model.desc}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {model.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className={`rounded-full px-3 py-1 text-[0.7rem] font-medium ${tagTone(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-black/8 pt-4">
                    <div className="text-[0.78rem] text-[var(--text2)]">
                      <span className="mr-1 text-[#E8A020]">*****</span>
                      {model.rating ?? 4.8} ({(model.reviews ?? 12000).toLocaleString()})
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[0.78rem] font-medium text-[var(--teal)]">{model.price}</span>
                      <span className="text-[0.78rem] font-medium text-[var(--accent)]">Try -&gt;</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader title="Built for every builder" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {builderCards.map(([icon, title, desc, href]) => (
                <Link key={title} href={href} className="rounded-[16px] border border-black/8 bg-white p-6 transition hover:border-[var(--accent-border)] hover:shadow-[var(--shadow)]">
                  <div className="mb-3 text-[0.76rem] font-bold tracking-[0.1em] text-[var(--accent)]">{icon}</div>
                  <h3 className="mb-2 text-[0.95rem] font-semibold text-[var(--text)]">{title}</h3>
                  <p className="text-[0.82rem] leading-6 text-[var(--text2)]">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader title="Browse by AI Lab" href="/marketplace" label="See all labs ->" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {visibleLabs.map((lab: Lab) => {
                const count = featured.filter((model) => model.lab === lab.id).length;
                const sample = featured.find((model) => model.lab === lab.id);
                return (
                  <Link key={lab.id} href="/marketplace" className="rounded-[16px] border border-black/8 bg-[var(--bg)] px-4 py-5 text-center transition hover:border-[var(--accent-border)] hover:bg-white hover:shadow-[var(--shadow)]">
                    <div className="mb-2 text-[1rem] font-bold tracking-[0.08em] text-[var(--accent)]">{lab.icon}</div>
                    <div className="font-syne text-[0.95rem] font-bold">{lab.name}</div>
                    <div className="mt-1 text-[0.72rem] text-[var(--text3)]">
                      {count} models{sample ? ` - ${sample.name}` : ""}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader title="Flagship Model Comparison" href="/marketplace" label="Compare all ->" />
            <p className="mb-7 max-w-[620px] text-[0.88rem] text-[var(--text2)]">
              Side-by-side view of leading models across major labs. Input and output prices are shown per 1M tokens.
            </p>

            <div className="overflow-x-auto rounded-[20px] border border-black/8 bg-white shadow-[var(--shadow)]">
              <table className="w-full min-w-[880px] border-collapse text-[0.82rem]">
                <thead className="bg-[var(--bg)]">
                  <tr className="border-b-2 border-black/8">
                    {["Model", "Lab", "Context", "Input $/1M", "Output $/1M", "Multimodal", "Speed", "Best For"].map((heading) => (
                      <th key={heading} className="px-4 py-3 text-left font-syne text-[0.78rem] font-bold uppercase tracking-[0.05em] text-[var(--text3)]">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row: ComparisonRow) => (
                    <tr key={row.name} className="border-b border-black/8 transition hover:bg-[var(--bg)]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[var(--accent)]">{row.icon}</span>
                          <span className="font-semibold text-[var(--text)]">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[var(--text3)]">{row.org}</td>
                      <td className="px-4 py-3 text-center font-medium text-[var(--blue)]">{row.context}</td>
                      <td className="px-4 py-3 text-center font-semibold text-[var(--teal)]">{row.input}</td>
                      <td className="px-4 py-3 text-center font-semibold text-[var(--teal)]">{row.output}</td>
                      <td className="px-4 py-3 text-center text-base">{row.multimodal ? "YES" : "NO"}</td>
                      <td className={`px-4 py-3 text-center font-medium ${speedTone(row.speed)}`}>{row.speed}</td>
                      <td className="px-4 py-3 text-[0.78rem] text-[var(--text2)]">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-[0.75rem] text-[var(--text3)]">
              * Prices shown are approximate. Free self-hosted models exclude infrastructure cost.
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader title="Trending This Week" href="/research" label="View research feed ->" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {trending.map((item: TrendingItem) => (
                <article key={item.title} className="rounded-[20px] border border-black/8 bg-white p-5 transition hover:border-[var(--accent-border)] hover:shadow-[var(--shadow-md)]">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full px-3 py-1 text-[0.68rem] font-bold" style={{ background: item.badgeBg, color: item.badgeColor }}>
                      {item.badge}
                    </span>
                    <span className="text-[0.72rem] text-[var(--text3)]">{item.org}</span>
                  </div>
                  <h3 className="mb-2 font-syne text-[0.98rem] font-bold tracking-[-0.02em] text-[var(--text)]">{item.title}</h3>
                  <p className="text-[0.82rem] leading-6 text-[var(--text2)]">{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader title="Find Models by Budget" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {budgetTiers.map((tier: BudgetTier) => (
                <Link
                  key={tier.title}
                  href="/marketplace"
                  className="rounded-[20px] border p-6 transition hover:shadow-[var(--shadow-md)]"
                  style={{ background: tier.bg, borderColor: tier.border }}
                >
                  <div className="mb-3 text-[0.76rem] font-bold tracking-[0.1em]" style={{ color: tier.color }}>{tier.icon}</div>
                  <h3 className="mb-2 font-syne text-[0.95rem] font-bold" style={{ color: tier.color }}>{tier.title}</h3>
                  <p className="mb-3 text-[0.82rem] leading-6 text-[var(--text2)]">{tier.desc}</p>
                  <div className="text-[0.78rem] font-semibold" style={{ color: tier.color }}>{tier.count} available -&gt;</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader title="Quick-Start by Use Case" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {useCases.map((useCase: UseCase) => (
                <Link
                  key={useCase.title}
                  href={`/chat?q=${encodeURIComponent(useCase.prompt)}`}
                  className="flex items-start gap-4 rounded-[20px] border border-black/8 bg-white p-5 transition hover:border-[var(--accent-border)] hover:shadow-[var(--shadow)]"
                >
                  <div className="text-[0.76rem] font-bold tracking-[0.1em] text-[var(--accent)]">{useCase.icon}</div>
                  <div>
                    <h3 className="mb-1 text-[0.9rem] font-semibold text-[var(--text)]">{useCase.title}</h3>
                    <p className="mb-2 text-[0.78rem] leading-6 text-[var(--text2)]">{useCase.desc}</p>
                    <div className="text-[0.75rem] font-medium text-[var(--accent)]">{useCase.models.join(", ")} -&gt;</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--text)] px-4 py-4 text-[0.8rem] text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>NexusAI Marketplace - Discover, compare, and deploy with confidence.</div>
          <div className="flex flex-wrap gap-5 text-white/70">
            <Link href="/marketplace" className="transition hover:text-white">Marketplace</Link>
            <Link href="/research" className="transition hover:text-white">Research</Link>
            <Link href="/agents" className="transition hover:text-white">Agents</Link>
          </div>
        </div>
      </footer>

      <ModelModal model={selectedModel} onClose={() => setSelectedModel(null)} />
    </div>
  );
}
