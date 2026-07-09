import type { SensorReading, Prediction, Alarm, ModelMetrics, DataSource, SimulationData } from '@/types';

export const CURRENT_SOURCE: DataSource = 'simulation';

export const seedData: SimulationData = {
  source: 'simulation',
  asset: {
    id: 'lab-01',
    name: 'Prototype Lab Hydro-Twin',
  },
  sensors: [
    { id: 'pin', name: 'Tekanan Masuk', value: 2.45, unit: 'bar', qualityFlag: 'valid' },
    { id: 'pout', name: 'Tekanan Keluar', value: 1.87, unit: 'bar', qualityFlag: 'valid' },
    { id: 'flow', name: 'Debit Air', value: 5.2, unit: 'L/s', qualityFlag: 'valid' },
    { id: 'rpm', name: 'Putaran Turbin', value: 1245, unit: 'rpm', qualityFlag: 'valid' },
    { id: 'power', name: 'Daya Keluaran', value: 108, unit: 'W', qualityFlag: 'valid' },
    { id: 'turbidity', name: 'Kekeruhan', value: 4.7, unit: 'NTU', qualityFlag: 'drift_suspected' },
  ],
  modelMetrics: {
    status: 'not_tested',
  },
};

export const mockSensorReadings: SensorReading[] = seedData.sensors.map((s) => ({
  id: `reading-${s.id}`,
  sensorId: s.id,
  sensorName: s.name,
  value: s.value,
  unit: s.unit,
  timestamp: new Date().toISOString(),
  qualityFlag: s.qualityFlag,
  source: 'simulation' as DataSource,
}));

export const mockPredictions: Prediction[] = [
  {
    timestamp: new Date().toISOString(),
    horizonSeconds: 10,
    predictedPressureDropKpa: 43.1,
    healthyLowerKpa: 38,
    healthyUpperKpa: 48,
    confidence: 0.94,
    modelVersion: null,
    source: 'simulation',
    status: 'available',
  },
  {
    timestamp: new Date().toISOString(),
    horizonSeconds: 60,
    predictedPressureDropKpa: 43.8,
    healthyLowerKpa: 38,
    healthyUpperKpa: 48,
    confidence: 0.91,
    modelVersion: null,
    source: 'simulation',
    status: 'available',
  },
];

export const mockAlarms: Alarm[] = [
  {
    id: 'alm-001',
    createdAt: '2026-07-07T14:28:03.000Z',
    severity: 'warning',
    parameter: 'Beda Tekanan',
    reason: 'Penyimpangan di atas rentang sehat.',
    durationSeconds: 45,
    qualityFlag: 'valid',
    status: 'unconfirmed',
  },
  {
    id: 'alm-002',
    createdAt: '2026-07-07T11:42:00.000Z',
    severity: 'critical',
    parameter: 'Sensor RPM',
    reason: 'Nilai melebihi batas operasi.',
    durationSeconds: 12,
    qualityFlag: 'valid',
    status: 'confirmed',
    operatorValidation: {
      operatorId: 'op-001',
      validatedAt: '2026-07-07T11:55:00.000Z',
      note: 'Dikonfirmasi oleh operator.',
    },
  },
  {
    id: 'alm-003',
    createdAt: '2026-07-06T16:05:00.000Z',
    severity: 'info',
    parameter: 'Koneksi Data',
    reason: 'Sinkronisasi pulih setelah terputus.',
    durationSeconds: 30,
    qualityFlag: 'valid',
    status: 'closed',
  },
];

export const mockModelMetrics: ModelMetrics = {
  status: 'not_tested',
};

// Generate chart data for pressure drop trend
export function generatePressureDropChartData() {
  const now = Date.now();
  const data = [];
  for (let i = -60; i <= 60; i += 5) {
    const time = new Date(now + i * 60 * 1000);
    const base = 42.6;
    const noise = (Math.random() - 0.5) * 1.5;
    const trend = i > 0 ? i * 0.02 : 0;
    data.push({
      time: time.toISOString(),
      timeLabel: i === 0 ? 'Sekarang' : i < 0 ? `${Math.abs(i)} menit lalu` : `+${i} detik`,
      minuteOffset: i,
      aktual: i <= 0 ? Number((base + noise).toFixed(1)) : null,
      prediksi: i >= -10 ? Number((base + noise + trend).toFixed(1)) : null,
      healthyLower: 38,
      healthyUpper: 48,
    });
  }
  return data;
}
