'use client';

import { create } from "zustand";
import type { ChatMessage, Model } from "./types";

type ChatTab = "chat" | "agents" | "prompts" | "activity";

interface ChatStore {
  activeTab: ChatTab;
  selectedModel: Model | null;
  draft: string;
  messages: ChatMessage[];
  isTyping: boolean;
  setActiveTab: (tab: ChatTab) => void;
  setSelectedModel: (model: Model | null) => void;
  setDraft: (draft: string) => void;
  hydrateIntro: (model: Model | null) => void;
  sendDraft: () => void;
  seedQuestion: (prompt: string) => void;
  setTyping: (isTyping: boolean) => void;
}

const initialAssistant = (name: string): ChatMessage => ({
  id: "welcome",
  role: "assistant",
  content: `Let's build with ${name}. Pick a prompt, describe a task, or create an agent to get started.`,
  timestamp: new Date(2026, 3, 1).toISOString(),
});

export const useChatStore = create<ChatStore>((set, get) => ({
  activeTab: "chat",
  selectedModel: null,
  draft: "",
  messages: [],
  isTyping: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedModel: (model) => set({ selectedModel: model }),
  setDraft: (draft) => set({ draft }),
  hydrateIntro: (model) =>
    set({
      selectedModel: model,
      messages: model ? [initialAssistant(model.name)] : [],
    }),
  sendDraft: () => {
    const { draft, messages, selectedModel } = get();
    const trimmed = draft.trim();
    if (!trimmed) return;

    set({
      draft: "",
      isTyping: true,
      messages: [
        ...messages,
        {
          id: `${messages.length + 1}`,
          role: "user",
          content: trimmed,
          timestamp: new Date().toISOString(),
        },
      ],
    });

    window.setTimeout(() => {
      const current = get().messages;
      set({
        isTyping: false,
        messages: [
          ...current,
          {
            id: `${current.length + 1}`,
            role: "assistant",
            content: `${selectedModel?.name ?? "This model"} would approach that with a fast plan, key tradeoffs, and a suggested first draft.`,
            timestamp: new Date().toISOString(),
          },
        ],
      });
    }, 900);
  },
  seedQuestion: (prompt) => set({ draft: prompt }),
  setTyping: (isTyping) => set({ isTyping }),
}));
