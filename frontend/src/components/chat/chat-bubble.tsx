'use client';

import { motion } from "framer-motion";
import type { ChatMessage } from "@/lib/types";

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[85%] rounded-[24px] px-4 py-3 text-sm ${isUser ? "bg-black text-white" : "bg-white text-black"}`}>
        {message.content}
      </div>
    </motion.div>
  );
}
