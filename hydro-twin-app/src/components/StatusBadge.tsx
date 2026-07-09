import { cn } from '@/lib/utils';

type StatusType = 'normal' | 'warning' | 'critical' | 'info' | 'demo' | 'not_tested';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const STATUS_CONFIG: Record<StatusType, { label: string; className: string }> = {
  normal: { label: 'Normal', className: 'badge--normal' },
  warning: { label: 'Peringatan', className: 'badge--warning' },
  critical: { label: 'Kritis', className: 'badge--critical' },
  info: { label: 'Informasi', className: 'badge--info' },
  demo: { label: 'Demo', className: 'badge--demo' },
  not_tested: { label: 'Belum diuji', className: 'badge--not-tested' },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={cn('badge', config.className)}>
      {label ?? config.label}
    </span>
  );
}
