'use client';

import { AnimatePresence, motion } from "framer-motion";
import type { Model } from "@/lib/types";

interface ModelModalProps {
  model: Model | null;
  onClose: () => void;
}

export default function ModelModal({ model, onClose }: ModelModalProps) {
  return (
    <AnimatePresence>
      {model && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{model.icon}</span>
                <div>
                  <h3 className="font-syne text-2xl">{model.name}</h3>
                  <p className="text-sm text-black/55">{model.org}</p>
                </div>
              </div>
              <button onClick={onClose} className="rounded-full bg-black/5 px-3 py-2 text-sm">
                Close
              </button>
            </div>
            <p className="mb-6 text-black/75">{model.desc}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#f6f1ea] p-4">
                <p className="text-xs uppercase text-black/45">Price</p>
                <p className="mt-2 font-syne text-xl">{model.price}</p>
              </div>
              <div className="rounded-2xl bg-[#f6f1ea] p-4">
                <p className="text-xs uppercase text-black/45">Best for</p>
                <p className="mt-2 text-sm">{model.comparison?.bestFor ?? model.tags.join(", ")}</p>
              </div>
            </div>
            {model.variations?.length ? (
              <div className="mt-6 space-y-3">
                {model.variations.map((variation) => (
                  <div key={variation.id} className="rounded-2xl border border-black/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{variation.name}</p>
                        <p className="text-sm text-black/55">{variation.tag}</p>
                      </div>
                      <span className="text-sm text-[var(--accent)]">{variation.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
