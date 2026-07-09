import { MetricCard } from '@/components/MetricCard';
import { useAppStore } from '@/lib/store';
import { seedData, generatePressureDropChartData } from '@/mocks/simulation';
import { useMemo } from 'react';
import { ChartCard } from '@/components';

export function DashboardPage() {
  const { alarms } = useAppStore();
  const chartData = useMemo(() => generatePressureDropChartData(), []);

  const activeAlarms = alarms.filter((a) => a.status === 'unconfirmed' || a.status === 'confirmed');
  const validSensors = seedData.sensors.filter((s) => s.qualityFlag === 'valid');

  return (
    <div>
      {/* Status Banner */}
      <div className="status-banner">
        <div className="status-banner-left">
          <span className="status-pill status-pill--normal">KONDISI NORMAL</span>
          <div>
            <p className="status-banner-msg">
              Seluruh parameter demo berada dalam rentang kondisi sehat.
            </p>
            <p className="status-banner-provenance">
              Data simulasi untuk validasi UI · Belum menjadi hasil eksperimen
            </p>
          </div>
        </div>
        <div className="status-banner-actions">
          <button className="btn btn--outline">Lihat Detail</button>
          <button className="btn btn--outline">Tambah Catatan</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="dashboard-grid">
        <MetricCard title="Beda Tekanan" value="42,6" unit="kPa" status="normal" subtitle="Perubahan +0,8%" />
        <MetricCard title="Debit Air" value="5,2" unit="L/s" status="normal" subtitle="Stabil" />
        <MetricCard title="Putaran Turbin" value="1.245" unit="rpm" status="normal" subtitle="Dalam rentang sehat" />
        <MetricCard title="Daya Keluaran" value="108" unit="W" status="normal" subtitle="Efisiensi relatif stabil" />
      </div>

      {/* Charts + Status */}
      <div className="dashboard-content">
        {/* Chart */}
        <ChartCard
          title="Beda Tekanan Aktual dan Prediksi"
          data={chartData}
          xKey="minuteOffset"
          xTickFormatter={(v: number) => {
            if (v === -60) return '60 menit lalu';
            if (v === 0) return 'Sekarang';
            if (v === 60) return '+60 detik';
            return '';
          }}
          yDomain={[30, 50]}
          yLabel="kPa"
          area={{ key: 'healthyUpper', color: '#2A9D8F' }}
          lines={[
            { key: 'aktual', name: 'Aktual', color: '#2A9D8F', isDot: true },
            { key: 'prediksi', name: 'Prediksi', color: '#17365D', strokeDasharray: '6 4' },
          ]}
        />

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* System Status */}
          <div className="card">
            <div className="system-status">
              <h3 className="system-status-title">Status Sistem</h3>
              <div className="system-status-row">
                <span className="system-status-label">
                  <span className="system-status-dot system-status-dot--green" />
                  Sensor aktif
                </span>
                <span className="system-status-value">{validSensors.length}/{seedData.sensors.length}</span>
              </div>
              <div className="system-status-row">
                <span className="system-status-label">
                  <span className="system-status-dot system-status-dot--green" />
                  Alarm aktif
                </span>
                <span className="system-status-value">{activeAlarms.length}</span>
              </div>
              <div className="system-status-row">
                <span className="system-status-label">
                  <span className="system-status-dot system-status-dot--green" />
                  Data valid
                </span>
                <span className="system-status-value">97,8%</span>
              </div>
              <div className="system-status-row">
                <span className="system-status-label">
                  <span className="system-status-dot system-status-dot--blue" />
                  Sinkronisasi
                </span>
                <span className="system-status-value">12 detik lalu</span>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="recommendation-card">
            <div className="recommendation-header">
              <span className="recommendation-icon">✓</span>
              <h3 className="recommendation-title">Tindakan yang Disarankan</h3>
            </div>
            <p className="recommendation-text">
              Tidak ada tindakan mendesak. Lanjutkan pemantauan rutin dan periksa sensor
              kekeruhan sesuai jadwal kalibrasi.
            </p>
            <button className="btn btn--primary" style={{ width: '100%' }}>
              Lihat Detail Rekomendasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
