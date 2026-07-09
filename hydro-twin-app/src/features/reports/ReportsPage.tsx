import { Button } from '@/components';

export function ReportsPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-container">
      <style>
        {`
          @media print {
            .sidebar, .topbar, .page-header button { display: none !important; }
            .page-container { margin: 0; padding: 0; }
            body { background: white; }
            .card { box-shadow: none; border: 1px solid #ccc; page-break-inside: avoid; }
            * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        `}
      </style>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="h1">Laporan Operasional</h1>
          <p className="text-secondary">Pratinjau laporan kinerja turbin.</p>
        </div>
        <Button variant="primary" onClick={handlePrint}>Cetak PDF / Print</Button>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 className="h2" style={{ fontSize: '24px' }}>Laporan Kinerja Prototype Turbin Mikro-Hidro</h2>
          <p className="text-secondary">Periode: 1 Juli 2026 - 7 Juli 2026</p>
          <div style={{ marginTop: '8px', display: 'inline-block', padding: '4px 12px', background: '#FEF3C7', color: '#D97706', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
            DATA SIMULASI
          </div>
        </div>

        <h3 className="h3" style={{ marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>1. Ringkasan Eksekutif</h3>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
          Laporan ini merangkum data operasional dari sensor yang terpasang pada prototype turbin mikro-hidro. Secara umum, kondisi operasional stabil dengan efisiensi rata-rata mencapai 74,2%. Terdapat dua insiden peringatan terkait fluktuasi tekanan masuk yang disebabkan oleh variasi debit air dari pompa simulasi, namun berhasil ditangani tanpa menyebabkan kerusakan komponen.
        </p>

        <h3 className="h3" style={{ marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>2. Indikator Kinerja Utama (KPI)</h3>
        <div className="grid-3" style={{ marginBottom: '32px' }}>
          <div style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Rata-rata Debit Air</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-navy)', margin: '8px 0' }}>5,14 L/s</div>
            <div style={{ fontSize: '12px', color: 'var(--color-normal)' }}>Normal</div>
          </div>
          <div style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Rata-rata Putaran Turbin</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-navy)', margin: '8px 0' }}>1.238 rpm</div>
            <div style={{ fontSize: '12px', color: 'var(--color-normal)' }}>Normal</div>
          </div>
          <div style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Efisiensi Sistem (Estimasi)</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-navy)', margin: '8px 0' }}>74,2 %</div>
            <div style={{ fontSize: '12px', color: 'var(--color-normal)' }}>Normal</div>
          </div>
        </div>

        <h3 className="h3" style={{ marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>3. Rekapitulasi Alarm</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Kategori</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Jumlah Terjadi</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Dikonfirmasi</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Alarm Palsu</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <td style={{ padding: '12px' }}>Kritis (Critical)</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>0</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>0</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>0</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <td style={{ padding: '12px' }}>Peringatan (Warning)</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>3</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>2</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <td style={{ padding: '12px' }}>Anomali Sensor (Invalid)</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>0</td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '48px' }}>
          <div style={{ textAlign: 'center', width: '200px' }}>
            <p style={{ fontSize: '12px', marginBottom: '64px' }}>Dibuat oleh Sistem Hydro-Twin</p>
            <div style={{ borderBottom: '1px solid var(--color-navy)', marginBottom: '8px' }}></div>
            <p style={{ fontSize: '12px', fontWeight: 600 }}>Operator / Supervisor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
