import { useAppStore } from '@/lib/store';
import { MetricCard, SensorInvalidState, OfflineState } from '@/components';
import { formatNumber } from '@/lib/utils';

// Simple SVG sparkline
function Sparkline({ data, color }: { data: number[], color: string }) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;
  const w = 100;
  const h = 30;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((val - min) / range) * (h - padding * 2) - padding;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ marginTop: '12px', height: '30px' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function MonitoringPage() {
  const { isConnected } = useAppStore();
  
  // We'll use mock data directly for the sensors to keep it simple, since seedData is in simulation.ts
  const sensors = [
    { id: 'pin', name: 'Tekanan Masuk', value: 2.45, unit: 'bar', qualityFlag: 'valid', trend: [2.3, 2.35, 2.4, 2.45, 2.45] },
    { id: 'pout', name: 'Tekanan Keluar', value: 1.87, unit: 'bar', qualityFlag: 'valid', trend: [1.8, 1.82, 1.85, 1.86, 1.87] },
    { id: 'flow', name: 'Debit Air', value: 5.2, unit: 'L/s', qualityFlag: 'valid', trend: [5.1, 5.15, 5.18, 5.2, 5.2] },
    { id: 'rpm', name: 'Putaran Turbin', value: 1245, unit: 'rpm', qualityFlag: 'valid', trend: [1230, 1235, 1240, 1245, 1245] },
    { id: 'power', name: 'Daya Keluaran', value: 108, unit: 'W', qualityFlag: 'valid', trend: [105, 106, 107, 108, 108] },
    { id: 'turbidity', name: 'Kekeruhan', value: 4.7, unit: 'NTU', qualityFlag: 'drift_suspected', trend: [4.2, 4.4, 4.5, 4.6, 4.7] },
  ];

  if (!isConnected) {
    return <OfflineState />;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="h1">Monitoring Real-Time</h1>
        <p className="text-secondary">Pemantauan kondisi sensor saat ini.</p>
      </div>

      <div className="grid-3" style={{ marginTop: '24px' }}>
        {sensors.map((s) => {
          if (s.qualityFlag !== 'valid') {
            return (
              <SensorInvalidState
                key={s.id}
                sensorName={s.name}
                reason={s.qualityFlag === 'drift_suspected' ? 'Dicurigai drift pada sensor.' : 'Data tidak valid atau di luar rentang.'}
              />
            );
          }

          return (
            <MetricCard
              key={s.id}
              title={s.name}
              value={formatNumber(s.value, s.value > 100 ? 0 : 2)}
              unit={s.unit}
              status="normal"
              subtitle="Baik"
            >
              <Sparkline data={s.trend} color="#2A9D8F" />
            </MetricCard>
          );
        })}
      </div>
    </div>
  );
}
