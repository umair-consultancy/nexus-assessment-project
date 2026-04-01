import type { ReactNode } from "react";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "NexusAI",
  description: "Marketplace, chat, agents, and research pages for NexusAI.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-[var(--text)]">{children}</body>
    </html>
  );
}
