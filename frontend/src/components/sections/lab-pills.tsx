'use client';

import type { Lab } from "@/lib/types";

interface LabPillsProps {
  labs: Lab[];
  activeLab: string;
  onChange: (labId: string) => void;
}

export default function LabPills({ labs, activeLab, onChange }: LabPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {labs.slice(0, 8).map((lab) => (
        <button
          key={lab.id}
          onClick={() => onChange(lab.id)}
          className={`rounded-full px-4 py-2 text-sm transition ${
            activeLab === lab.id ? "bg-black text-white" : "bg-white text-black/70 hover:bg-[#ece4db]"
          }`}
        >
          {lab.icon} {lab.name}
        </button>
      ))}
    </div>
  );
}
