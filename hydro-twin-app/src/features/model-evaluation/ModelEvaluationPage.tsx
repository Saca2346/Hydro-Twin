import { MetricCard, DataTable, StatusBadge } from '@/components';
import type { ColumnDef } from '@tanstack/react-table';

export function ModelEvaluationPage() {
  const columns: ColumnDef<any, any>[] = [
    { accessorKey: 'model', header: 'Model' },
    { accessorKey: 'mae', header: 'MAE' },
    { accessorKey: 'rmse', header: 'RMSE' },
    { accessorKey: 'r2', header: 'R²' },
    { accessorKey: 'fisika', header: 'Konsistensi Fisika' },
    { accessorKey: 'latensi', header: 'Latensi' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => (
        <span style={{
          padding: '4px 10px',
          background: info.getValue() === 'Model usulan' ? '#D1FAE5' : '#F1F5F9',
          color: info.getValue() === 'Model usulan' ? '#065F46' : '#64748B',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: 500
        }}>
          {info.getValue()}
        </span>
      ),
    },
  ];

  const models = [
    { model: 'Persistence', mae: 'Belum diuji', rmse: 'Belum diuji', r2: 'Belum diuji', fisika: 'Belum diuji', latensi: 'Belum diuji', status: 'Baseline' },
    { model: 'Regresi Linear', mae: 'Belum diuji', rmse: 'Belum diuji', r2: 'Belum diuji', fisika: 'Belum diuji', latensi: 'Belum diuji', status: 'Baseline' },
    { model: 'XGBoost', mae: 'Belum diuji', rmse: 'Belum diuji', r2: 'Belum diuji', fisika: 'Belum diuji', latensi: 'Belum diuji', status: 'Baseline' },
    { model: 'LSTM', mae: 'Belum diuji', rmse: 'Belum diuji', r2: 'Belum diuji', fisika: 'Belum diuji', latensi: 'Belum diuji', status: 'Baseline' },
    { model: 'Jaringan Saraf Tanpa Fisika', mae: 'Belum diuji', rmse: 'Belum diuji', r2: 'Belum diuji', fisika: 'Belum diuji', latensi: 'Belum diuji', status: 'Baseline' },
    { model: 'Hydro-Twin PINN', mae: 'Belum diuji', rmse: 'Belum diuji', r2: 'Belum diuji', fisika: 'Belum diuji', latensi: 'Belum diuji', status: 'Model usulan' },
  ];

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="h1">Evaluasi Model</h1>
        <StatusBadge status="warning" label="PRA-EKSPERIMEN · BELUM ADA HASIL" />
      </div>

      <div className="grid-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <MetricCard title="MAE" value="Belum diuji" unit="" subtitle="Menunggu eksperimen" />
        <MetricCard title="RMSE" value="Belum diuji" unit="" subtitle="Menunggu eksperimen" />
        <MetricCard title="R²" value="Belum diuji" unit="" subtitle="Menunggu eksperimen" />
        <MetricCard title="Residual Fisika" value="Belum diuji" unit="" subtitle="Menunggu eksperimen" />
        <MetricCard title="Ketahanan Noise" value="Belum diuji" unit="" subtitle="Menunggu eksperimen" />
        <MetricCard title="Latensi Inferensi" value="Belum diuji" unit="" subtitle="Menunggu eksperimen" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card">
          <h2 className="h2" style={{ marginBottom: '8px' }}>Aktual vs Prediksi</h2>
          <p className="text-secondary" style={{ fontSize: '13px', marginBottom: '24px' }}>Grafik akan muncul setelah model diuji pada data test.</p>
          <div style={{ background: '#F8FAFC', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--color-text-secondary)' }}>
            <div style={{ width: 48, height: 48, border: '2px dashed #CBD5E1', borderRadius: '4px', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Belum ada data evaluasi</h3>
            <p style={{ fontSize: '13px', marginTop: '8px' }}>Jalankan eksperimen dan unggah hasil test set.</p>
          </div>
        </div>

        <div className="card">
          <h2 className="h2" style={{ marginBottom: '8px' }}>Distribusi Kesalahan</h2>
          <p className="text-secondary" style={{ fontSize: '13px', marginBottom: '24px' }}>Belum tersedia.</p>
          <div style={{ background: '#F8FAFC', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--color-text-secondary)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Belum ada data residual (sisaan) model</h3>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px 16px' }}>
          <h2 className="h2">Rencana Perbandingan Model</h2>
        </div>
        <DataTable columns={columns} data={models} pageSize={10} />
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-border)' }}>
          <p className="text-secondary" style={{ fontSize: '12px', margin: 0 }}>
            Catatan: angka hanya ditampilkan setelah evaluasi test set, bootstrap per sesi, dan ablation study selesai.
          </p>
        </div>
      </div>
    </div>
  );
}
