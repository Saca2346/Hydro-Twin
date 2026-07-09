import { StatusBadge } from './StatusBadge';

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  status?: 'normal' | 'warning' | 'critical' | 'info' | 'demo' | 'not_tested';
  subtitle?: string;
  children?: React.ReactNode;
}

export function MetricCard({ title, value, unit, status, subtitle, children }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="metric-card-header">
        <span className="metric-card-title">{title}</span>
        {status && <StatusBadge status={status} />}
      </div>
      <div className="metric-card-value">
        <span className="metric-card-number">{value}</span>
        <span className="metric-card-unit">{unit}</span>
      </div>
      {subtitle && <span className="metric-card-subtitle">{subtitle}</span>}
      {children}
    </div>
  );
}
