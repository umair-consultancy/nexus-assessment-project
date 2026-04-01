'use client';

interface AppNavProps {
  activeTab: string;
  onChange: (tab: "chat" | "agents" | "prompts" | "activity") => void;
}

const tabs = [
  { id: "chat", label: "Chat" },
  { id: "agents", label: "Agents" },
  { id: "prompts", label: "Prompts" },
  { id: "activity", label: "Activity" },
] as const;

export default function AppNav({ activeTab, onChange }: AppNavProps) {
  return (
    <div className="inline-flex rounded-full bg-white p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`rounded-full px-4 py-2 text-sm transition ${
            activeTab === tab.id ? "bg-black text-white" : "text-black/60"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
