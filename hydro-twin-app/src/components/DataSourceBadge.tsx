import type { DataSource } from '@/types';
import { PROVENANCE_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface DataSourceBadgeProps {
  source: DataSource;
  size?: 'sm' | 'md';
}

export function DataSourceBadge({ source, size = 'sm' }: DataSourceBadgeProps) {
  return (
    <span className={cn('badge badge--provenance', `badge--provenance-${source}`, size === 'md' && 'badge--md')}>
      {PROVENANCE_LABELS[source] ?? source}
    </span>
  );
}
