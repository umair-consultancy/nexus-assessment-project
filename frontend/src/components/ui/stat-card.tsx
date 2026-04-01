'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  icon: string;
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  children?: ReactNode;
}

export default function StatCard({
  icon,
  title,
  value,
  change,
  trend = 'neutral',
  className = '',
  children,
}: StatCardProps) {
  const trendStyles = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500',
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        {change && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trendStyles[trend]}`}>
            <span>{trendIcons[trend]}</span>
            <span>{change}</span>
          </div>
        )}
      </div>
      <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</h3>
      <p className="text-3xl font-bold font-syne text-gray-900 dark:text-white mb-2">
        {value}
      </p>
      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
}