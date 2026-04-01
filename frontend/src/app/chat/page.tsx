'use client';

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import EmptyState from "@/components/ui/empty-state";
import { SkeletonText } from "@/components/ui/skeleton";
import { SiteNav } from "@/components/sections/site-nav";
import AppNav from "@/components/chat/app-nav";
import ChatSidebar from "@/components/chat/chat-sidebar";
import GreetCard from "@/components/chat/greet-card";
import OnboardingQuestionCard from "@/components/chat/onboarding-question-card";
import CongratsBanner from "@/components/chat/congrats-banner";
import InspirationChips from "@/components/chat/inspiration-chips";
import ModelIntroCard from "@/components/chat/model-intro-card";
import VariationSelector from "@/components/chat/variation-selector";
import VariationDetailCard from "@/components/chat/variation-detail-card";
import AgentWizardCard from "@/components/chat/agent-wizard-card";
import ChatBubble from "@/components/chat/chat-bubble";
import ChatInput from "@/components/chat/chat-input";
import TypingIndicator from "@/components/chat/typing-indicator";
import CategoryPromptPanel from "@/components/chat/category-prompt-panel";
import RightPanel from "@/components/chat/right-panel";
import { getFeaturedModels } from "@/lib/api";
import { useChatStore } from "@/lib/store";

export default function ChatPage() {
  const [loading, setLoading] = useState(true);
  const [activeVariation, setActiveVariation] = useState("");
  const params = useSearchParams();
  const models = useMemo(() => getFeaturedModels(), []);
  const firstModel = models[0] ?? null;
  const { activeTab, setActiveTab, selectedModel, hydrateIntro, setSelectedModel, draft, setDraft, sendDraft, seedQuestion, messages, isTyping } =
    useChatStore();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (firstModel && !selectedModel) {
      hydrateIntro(firstModel);
      setActiveVariation(firstModel.variations?.[0]?.id ?? "");
    }
  }, [firstModel, hydrateIntro, selectedModel]);

  useEffect(() => {
    const prompt = params.get("prompt");
    if (prompt) seedQuestion(prompt);
  }, [params, seedQuestion]);

  const currentModel = selectedModel ?? firstModel;
  const variations = currentModel?.variations ?? [];

  if (loading) return <div><SiteNav /><main className="mx-auto max-w-7xl px-4 py-16"><SkeletonText lines={9} /></main></div>;
  if (!currentModel) return <div><SiteNav /><EmptyState title="No models available for chat" /></div>;

  return (
    <div>
      <SiteNav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-black/40">Chat hub</p>
            <h1 className="mt-2 font-syne text-4xl">Prompt, compare, and build agents in one workspace</h1>
          </div>
          <AppNav activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
          <ChatSidebar
            models={models}
            selectedModel={currentModel}
            onSelect={(model) => {
              setSelectedModel(model);
              hydrateIntro(model);
              setActiveVariation(model.variations?.[0]?.id ?? "");
            }}
          />
          <section className="space-y-4">
            <GreetCard modelName={currentModel.name} />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Compare two models", "See cost, speed, and context in one answer."],
                ["Draft an agent plan", "Turn a prompt into steps, tools, and guardrails."],
              ].map(([title, body]) => (
                <OnboardingQuestionCard key={title} title={title} body={body} onClick={() => seedQuestion(title)} />
              ))}
            </div>
            <CongratsBanner />
            <InspirationChips onPick={seedQuestion} />
            <div className="grid gap-3 sm:grid-cols-2">
              {models.slice(0, 2).map((model) => <ModelIntroCard key={model.id} model={model} />)}
            </div>
            <VariationSelector variations={variations} activeId={activeVariation} onChange={setActiveVariation} />
            <VariationDetailCard variation={variations.find((variation) => variation.id === activeVariation)} />
            <AgentWizardCard />
            <CategoryPromptPanel onPick={seedQuestion} />
            <div className="space-y-3 rounded-[28px] bg-[#ece4db] p-5">
              {messages.map((message) => <ChatBubble key={message.id} message={message} />)}
              {isTyping ? <TypingIndicator /> : null}
            </div>
            <ChatInput value={draft} onChange={setDraft} onSubmit={sendDraft} />
          </section>
          <RightPanel model={currentModel} />
        </div>
      </main>
    </div>
  );
}
