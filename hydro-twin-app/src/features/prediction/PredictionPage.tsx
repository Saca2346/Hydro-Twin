import { MetricCard, ChartCard } from '@/components';
import { generatePressureDropChartData } from '@/mocks/simulation';
import { useMemo } from 'react';

export function PredictionPage() {
  const chartData = useMemo(() => generatePressureDropChartData(), []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="h1">Prediksi Kondisi Turbin</h1>
      </div>

      {/* KPI Grid */}
      <div className="grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <MetricCard title="Prediksi 10 Detik" value="43,1" unit="kPa" status="normal" />
        <MetricCard title="Prediksi 60 Detik" value="43,8" unit="kPa" status="normal" />
        <MetricCard title="Penyimpangan" value="Rendah" unit="" status="demo" />
        <MetricCard title="Tingkat Keyakinan" value="94" unit="%" status="demo" />
        <MetricCard title="Risiko Alarm" value="8" unit="%" status="normal" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Main Chart */}
        <div>
          <ChartCard
            title="Aktual vs Prediksi"
            data={chartData}
            xKey="minuteOffset"
            xTickFormatter={(v: number) => {
              if (v === -60) return '-60 menit';
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
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Interpretasi Model */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-info-bg)', color: 'var(--color-info)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>i</div>
              <h3 className="h3">Interpretasi Model</h3>
            </div>
            <p className="text-secondary" style={{ marginBottom: '16px', fontSize: '14px', lineHeight: 1.5 }}>
              Beda tekanan diperkirakan meningkat perlahan, tetapi masih berada dalam rentang sehat. Interpretasi ini berasal dari data simulasi.
            </p>
            <button className="btn btn--outline btn--sm" style={{ width: '100%' }}>Detail Teknis</button>
          </div>

          {/* Faktor yang Mempengaruhi */}
          <div className="card">
            <h3 className="h3" style={{ marginBottom: '16px' }}>Faktor yang Mempengaruhi Prediksi</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span>Perubahan debit</span>
                  <span style={{ fontWeight: 600 }}>68%</span>
                </div>
                <div style={{ height: 6, background: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '68%', background: '#2A9D8F' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span>Putaran turbin</span>
                  <span style={{ fontWeight: 600 }}>45%</span>
                </div>
                <div style={{ height: 6, background: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '45%', background: '#17365D' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span>Daya keluaran</span>
                  <span style={{ fontWeight: 600 }}>28%</span>
                </div>
                <div style={{ height: 6, background: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '28%', background: '#7C3AED' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ringkasan Operasional */}
      <div className="card" style={{ marginTop: '24px' }}>
        <h3 className="h3" style={{ marginBottom: '16px' }}>Ringkasan Operasional</h3>
        <div className="grid-3">
          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px' }}>
            <span className="text-secondary" style={{ fontSize: '12px' }}>Stabilitas 24 Jam</span>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-navy)', margin: '4px 0' }}>Belum diuji</div>
            <span className="text-secondary" style={{ fontSize: '11px' }}>Akan tersedia setelah data eksperimen</span>
          </div>
          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px' }}>
            <span className="text-secondary" style={{ fontSize: '12px' }}>Risiko Eskalasi</span>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-navy)', margin: '4px 0' }}>Belum diuji</div>
            <span className="text-secondary" style={{ fontSize: '11px' }}>Memerlukan validasi lapangan</span>
          </div>
          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px' }}>
            <span className="text-secondary" style={{ fontSize: '12px' }}>Rekomendasi</span>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-navy)', margin: '4px 0' }}>Pemantauan rutin</div>
            <span className="text-secondary" style={{ fontSize: '11px' }}>Bukan diagnosis otomatis</span>
          </div>
        </div>
      </div>
      <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
        Gunakan badge 'Data Simulasi' sampai model benar-benar dilatih dan diuji.
      </p>
    </div>
  );
}
