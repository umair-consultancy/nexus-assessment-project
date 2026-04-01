'use client';

interface OnboardingQuestionCardProps {
  title: string;
  body: string;
  onClick: () => void;
}

export default function OnboardingQuestionCard({ title, body, onClick }: OnboardingQuestionCardProps) {
  return (
    <button onClick={onClick} className="rounded-[24px] bg-white p-4 text-left transition hover:-translate-y-0.5">
      <p className="font-medium">{title}</p>
      <p className="mt-2 text-sm text-black/60">{body}</p>
    </button>
  );
}
