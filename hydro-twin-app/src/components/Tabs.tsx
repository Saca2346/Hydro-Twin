import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function Tabs({ items, defaultTab, onChange, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? items[0]?.id);

  if (!items.length) return null;

  return (
    <div className={cn('tabs', className)}>
      <div className="tabs-list" role="tablist">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              className={cn('tabs-trigger', isActive && 'tabs-trigger--active')}
              onClick={() => {
                setActiveTab(item.id);
                onChange?.(item.id);
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="tabs-content" role="tabpanel">
        {items.find((item) => item.id === activeTab)?.content}
      </div>
    </div>
  );
}
