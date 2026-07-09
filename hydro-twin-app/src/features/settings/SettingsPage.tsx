import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { api } from '@/lib/api';
import { Button, Input, Select, DataTable, Toast } from '@/components';
import type { ColumnDef } from '@tanstack/react-table';
import type { AuditLogEntry } from '@/types';

export function SettingsPage() {
  const { thresholds, updateThreshold, activeModel, setActiveModel, auditLog } = useAppStore();
  const [toastMessage, setToastMessage] = useState('');
  
  // Local state for forms
  const [pressureMin, setPressureMin] = useState(thresholds.pin?.min?.toString() || '2.0');
  const [pressureMax, setPressureMax] = useState(thresholds.pin?.max?.toString() || '3.0');
  const [selectedModel, setSelectedModel] = useState(activeModel);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveThreshold = async () => {
    setIsSaving(true);
    const success = await api.updateThreshold('pin', parseFloat(pressureMin), parseFloat(pressureMax));
    setIsSaving(false);
    
    if (success) {
      updateThreshold('pin', parseFloat(pressureMin), parseFloat(pressureMax), 'op-admin-1');
      setToastMessage('Threshold Tekanan Masuk berhasil diperbarui.');
    } else {
      setToastMessage('Gagal memperbarui threshold. Coba lagi.');
    }
  };

  const handleSaveModel = () => {
    if (selectedModel !== activeModel) {
      setActiveModel(selectedModel, 'op-admin-1');
      setToastMessage(`Model aktif diubah ke ${selectedModel}`);
    }
  };

  const auditColumns: ColumnDef<AuditLogEntry, any>[] = [
    {
      accessorKey: 'timestamp',
      header: 'Waktu',
      cell: (info) => new Date(info.getValue()).toLocaleString('id-ID'),
    },
    { accessorKey: 'userId', header: 'Operator' },
    { accessorKey: 'action', header: 'Aksi' },
    { accessorKey: 'details', header: 'Detail' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="h1">Pengaturan & Audit</h1>
        <p className="text-secondary">Kelola konfigurasi sistem, model, dan tinjau log audit.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Threshold Settings */}
        <div className="card">
          <h2 className="h2" style={{ marginBottom: '16px' }}>Threshold Sensor</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Input
                label="Batas Minimum Tekanan Masuk (bar)"
                type="number"
                step="0.1"
                value={pressureMin}
                onChange={(e) => setPressureMin(e.target.value)}
                fullWidth
              />
              <Input
                label="Batas Maksimum Tekanan Masuk (bar)"
                type="number"
                step="0.1"
                value={pressureMax}
                onChange={(e) => setPressureMax(e.target.value)}
                fullWidth
              />
            </div>
            <Button variant="primary" onClick={handleSaveThreshold} disabled={isSaving}>
              {isSaving ? 'Menyimpan...' : 'Simpan Threshold'}
            </Button>
          </div>
        </div>

        {/* Model Settings */}
        <div className="card">
          <h2 className="h2" style={{ marginBottom: '16px' }}>Pemilihan Model Aktif</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Select
              label="Model Prediksi Utama"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              options={[
                { label: 'Hydro-Twin PINN', value: 'Hydro-Twin PINN' },
                { label: 'XGBoost Baseline', value: 'XGBoost Baseline' },
                { label: 'LSTM', value: 'LSTM' },
              ]}
              fullWidth
            />
            <Button variant="outline" onClick={handleSaveModel} disabled={selectedModel === activeModel}>
              Terapkan Model
            </Button>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px 16px' }}>
          <h2 className="h2" style={{ fontSize: '18px' }}>Log Audit Keamanan</h2>
          <p className="text-secondary" style={{ fontSize: '13px' }}>Pencatatan aktivitas perubahan konfigurasi sistem yang tidak dapat dihapus.</p>
        </div>
        <DataTable columns={auditColumns} data={auditLog} pageSize={5} />
      </div>

      {toastMessage && (
        <Toast
          id="settings-toast"
          message={toastMessage}
          type={toastMessage.includes('Gagal') ? 'error' : 'success'}
          onClose={() => setToastMessage('')}
        />
      )}
    </div>
  );
}
