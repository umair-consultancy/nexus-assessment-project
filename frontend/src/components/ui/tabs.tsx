'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
}

export default function Tabs({ tabs, defaultTab, onChange, variant = 'default' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const variantStyles = {
    default: {
      tab: 'px-4 py-2 border-b-2 border-transparent',
      active: 'border-accent text-accent',
      inactive: 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
      container: 'border-b border-gray-200 dark:border-gray-700',
    },
    pills: {
      tab: 'px-6 py-2 rounded-full',
      active: 'bg-accent text-white',
      inactive: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
      container: 'flex gap-2',
    },
    underline: {
      tab: 'px-4 py-2',
      active: 'text-accent border-b-2 border-accent',
      inactive: 'text-gray-600 dark:text-gray-400 border-b-2 border-transparent',
      container: 'flex gap-1',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="w-full">
      <div className={styles.container}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : styles.inactive} transition-all`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.find((t) => t.id === activeTab)?.content && (
        <div className="mt-4">
          {tabs.find((t) => t.id === activeTab)?.content}
        </div>
      )}
    </div>
  );
}