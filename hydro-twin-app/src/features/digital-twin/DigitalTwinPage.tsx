import { Button, StatusBadge } from '@/components';

export function DigitalTwinPage() {
  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="h1">Digital Twin Turbin</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="primary" size="sm" style={{ borderRadius: '20px' }}>Tampilan Sistem</Button>
          <Button variant="ghost" size="sm" style={{ borderRadius: '20px', background: '#F8FAFC' }}>Tampilan Sensor</Button>
          <Button variant="ghost" size="sm" style={{ borderRadius: '20px', background: '#F8FAFC' }}>Tampilan Status</Button>
          <Button variant="ghost" size="sm" style={{ borderRadius: '20px', background: '#F8FAFC' }}>Aliran Data</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginTop: '24px' }}>
        {/* Schema Diagram */}
        <div className="card" style={{ background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
            <div>
              <h3 className="h3">Skema Sistem Prototype Hydro-Twin</h3>
              <p className="text-secondary" style={{ fontSize: '13px' }}>Diagram 2D sesuai proposal; bukan klaim model 3D.</p>
            </div>
            <StatusBadge status="normal" label="Semua Komponen Normal" />
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: '400px' }}>
            {/* Simple CSS-based flow diagram */}
            <div style={{ position: 'relative', width: '400px', height: '400px' }}>
              {/* Pipes (Background) */}
              <div style={{ position: 'absolute', top: 50, left: 195, width: 10, height: 300, background: '#7DD3FC' }} />
              <div style={{ position: 'absolute', top: 180, left: 95, width: 100, height: 10, background: '#7DD3FC' }} />
              <div style={{ position: 'absolute', top: 180, left: 205, width: 100, height: 10, background: '#7DD3FC' }} />
              
              {/* Reservoir */}
              <div style={{ position: 'absolute', top: 0, left: 100, width: 200, height: 80, background: '#fff', border: '1px solid #CBD5E1', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>Reservoir / Tangki</span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Kapasitas 1.500 L</span>
              </div>

              {/* Tekanan Masuk */}
              <div style={{ position: 'absolute', top: 140, left: 0, width: 120, height: 60, background: '#fff', border: '1px solid #2E7D32', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Tekanan Masuk</span>
                <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>2,45 bar</span>
              </div>

              {/* Tekanan Keluar */}
              <div style={{ position: 'absolute', top: 140, left: 280, width: 120, height: 60, background: '#fff', border: '1px solid #2E7D32', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Tekanan Keluar</span>
                <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>1,87 bar</span>
              </div>

              {/* Turbin */}
              <div style={{ position: 'absolute', top: 250, left: 130, width: 140, height: 80, background: '#fff', border: '2px solid #2A9D8F', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <span style={{ fontWeight: 700, fontSize: '16px', color: 'var(--color-navy)' }}>TURBIN</span>
                <span style={{ fontWeight: 700, color: '#2A9D8F' }}>1.245 rpm</span>
                <span style={{ fontSize: '11px', color: '#2A9D8F' }}>Terpilih</span>
              </div>

              {/* Debit Air */}
              <div style={{ position: 'absolute', top: 260, left: 0, width: 110, height: 60, background: '#fff', border: '1px solid #CBD5E1', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Pengukur Debit</span>
                <span style={{ fontWeight: 700, color: '#2E7D32' }}>5,2 L/s</span>
              </div>

              {/* Generator */}
              <div style={{ position: 'absolute', top: 260, left: 290, width: 110, height: 60, background: '#fff', border: '1px solid #CBD5E1', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>Generator</span>
                <span style={{ fontWeight: 700, color: '#2E7D32' }}>108 W</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Detail */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '16px' }}>
            <h2 className="h2" style={{ fontSize: '24px' }}>Turbin</h2>
            <StatusBadge status="normal" />
          </div>
          <p className="text-secondary" style={{ fontSize: '13px', marginBottom: '24px' }}>Komponen utama · Terpilih</p>

          <div style={{ marginBottom: '24px' }}>
            <span className="text-secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Sensor Terkait</span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ padding: '4px 10px', background: '#E0F2FE', color: '#0369A1', borderRadius: '12px', fontSize: '12px' }}>Sensor Putaran</span>
              <span style={{ padding: '4px 10px', background: '#E0F2FE', color: '#0369A1', borderRadius: '12px', fontSize: '12px' }}>Tekanan Masuk</span>
              <span style={{ padding: '4px 10px', background: '#E0F2FE', color: '#0369A1', borderRadius: '12px', fontSize: '12px' }}>Tekanan Keluar</span>
              <span style={{ padding: '4px 10px', background: '#E0F2FE', color: '#0369A1', borderRadius: '12px', fontSize: '12px' }}>Sensor Daya</span>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <span className="text-secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Nilai Saat Ini</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#F8FAFC', borderRadius: '6px' }}>
                <span className="text-secondary" style={{ fontSize: '13px' }}>Putaran Turbin</span>
                <span style={{ fontWeight: 600, fontSize: '13px' }}>1.245 rpm</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#F8FAFC', borderRadius: '6px' }}>
                <span className="text-secondary" style={{ fontSize: '13px' }}>Daya Keluaran</span>
                <span style={{ fontWeight: 600, fontSize: '13px' }}>108 W</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#F8FAFC', borderRadius: '6px' }}>
                <span className="text-secondary" style={{ fontSize: '13px' }}>Efisiensi Relatif</span>
                <span style={{ fontWeight: 600, fontSize: '13px' }}>72,4%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#F8FAFC', borderRadius: '6px' }}>
                <span className="text-secondary" style={{ fontSize: '13px' }}>Beda Tekanan</span>
                <span style={{ fontWeight: 600, fontSize: '13px' }}>42,6 kPa</span>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--color-normal-bg)', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-normal)', fontWeight: 600, marginBottom: '4px' }}>
              <span>✓</span> Tidak ada alarm aktif
            </div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Data simulasi untuk validasi tampilan.</span>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <span className="text-secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Catatan Inspeksi</span>
            <div style={{ padding: '16px', background: '#F1F5F9', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '8px' }}>Inspeksi terakhir: 5 Juli 2026</div>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                Kondisi bearing normal. Catatan ini merupakan contoh konten prototipe.
              </p>
            </div>
          </div>

          <Button variant="primary" fullWidth>Buka Detail Sensor</Button>
        </div>
      </div>
    </div>
  );
}
