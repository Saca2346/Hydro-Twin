import type { NavItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'ringkasan', label: 'Ringkasan', path: '/', icon: 'LayoutDashboard' },
  { id: 'monitoring', label: 'Monitoring Real-Time', path: '/monitoring', icon: 'Activity' },
  { id: 'prediksi', label: 'Prediksi Kondisi', path: '/prediksi', icon: 'TrendingUp' },
  { id: 'digital-twin', label: 'Digital Twin', path: '/digital-twin', icon: 'Cpu' },
  { id: 'alarm', label: 'Alarm & Inspeksi', path: '/alarm', icon: 'Bell' },
  { id: 'riwayat', label: 'Riwayat Data', path: '/riwayat', icon: 'History' },
  { id: 'evaluasi', label: 'Evaluasi Model', path: '/evaluasi', icon: 'FlaskConical' },
  { id: 'perangkat', label: 'Perangkat & Sensor', path: '/perangkat', icon: 'Gauge' },
  { id: 'laporan', label: 'Laporan', path: '/laporan', icon: 'FileText' },
  { id: 'pengaturan', label: 'Pengaturan', path: '/pengaturan', icon: 'Settings' },
];

export const PROVENANCE_LABELS: Record<string, string> = {
  simulation: 'DATA SIMULASI',
  experiment: 'DATA EKSPERIMEN',
  live: 'DATA LIVE',
};

export const QUALITY_FLAG_LABELS: Record<string, string> = {
  valid: 'Valid',
  missing: 'Data Hilang',
  range_error: 'Di Luar Rentang',
  drift_suspected: 'Dicurigai Drift',
  offline: 'Offline',
};

export const STATUS_LABELS: Record<string, string> = {
  normal: 'Normal',
  warning: 'Peringatan',
  critical: 'Kritis',
};
