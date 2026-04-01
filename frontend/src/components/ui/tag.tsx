'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TagProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

export default function Tag({
  children,
  variant = 'default',
  size = 'md',
  removable = false,
  onRemove,
  className = '',
}: TagProps) {
  const variantStyles = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
    primary: 'bg-accent/10 text-accent border-accent/30',
    secondary: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center gap-1.5 ${variantStyles[variant]} ${sizeStyles[size]} rounded-full border ${className}`}
    >
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1 hover:opacity-70 transition-opacity"
        >
          ✕
        </button>
      )}
    </motion.span>
  );
}