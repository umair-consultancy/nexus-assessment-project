import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'hot' | 'new' | 'trending' | 'featured' | 'open-source' | 'default';
  children: ReactNode;
  className?: string;
}

export default function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const variantStyles = {
    hot: 'bg-[#FDF1EB] text-[#C8622A]',
    new: 'bg-[#E2F5EF] text-[#0A5E49]',
    trending: 'bg-[#FDEDF1] text-[#9B2042]',
    featured: 'bg-[#EBF0FC] text-[#1E4DA8]',
    'open-source': 'bg-[#F4F4F5] text-[#71717A]',
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}