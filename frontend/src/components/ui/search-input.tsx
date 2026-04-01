'use client';

import { InputHTMLAttributes, useState } from 'react';
import { motion } from 'framer-motion';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  onSearch,
  placeholder = 'Search...',
  className = '',
  ...props
}: SearchInputProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch?.(newValue);
  };

  const handleClear = () => {
    setValue('');
    onSearch?.('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative ${className}`}
    >
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all`}
          {...props}
        />
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            ✕
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}