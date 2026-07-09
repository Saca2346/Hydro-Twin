import { useState, useEffect } from 'react';
import { Button, DataTable, StatusBadge, Toast } from '@/components';
import { api } from '@/lib/api';
import type { SensorReading } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

export function HistoryPage() {
  const [data, setData] = useState<SensorReading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Generate some history mock data on mount
    api.fetchSensorData('simulation').then((mockData) => {
      // expand mock data for history view
      const expanded = [];
      const now = Date.now();
      for (let i = 0; i < 30; i++) {
        expanded.push(...mockData.map(d => ({
          ...d,
          id: `${d.id}-${i}`,
          timestamp: new Date(now - i * 60000).toISOString(),
          value: d.value ? d.value + (Math.random() - 0.5) * (d.value * 0.1) : null
        })));
      }
      setData(expanded.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      setIsLoading(false);
    });
  }, []);

  const handleExport = async () => {
    setIsExporting(true);
    const success = await api.exportHistoryCSV(data);
    setIsExporting(false);
    if (success) setToastMessage('Data berhasil diekspor ke CSV.');
  };

  const columns: ColumnDef<SensorReading, any>[] = [
    {
      accessorKey: 'timestamp',
      header: 'Waktu',
      cell: (info) => new Date(info.getValue()).toLocaleString('id-ID'),
    },
    { accessorKey: 'sensorName', header: 'Sensor' },
    {
      accessorKey: 'value',
      header: 'Nilai',
      cell: (info) => {
        const val = info.getValue();
        return val !== null ? val.toFixed(2) : 'N/A';
      },
    },
    { accessorKey: 'unit', header: 'Satuan' },
    {
      accessorKey: 'qualityFlag',
      header: 'Status Data',
      cell: (info) => {
        const flag = info.getValue();
        if (flag === 'valid') return <StatusBadge status="normal" label="Valid" />;
        if (flag === 'drift_suspected') return <StatusBadge status="warning" label="Drift" />;
        return <StatusBadge status="critical" label="Invalid" />;
      },
    },
    {
      accessorKey: 'source',
      header: 'Sumber',
      cell: () => <span style={{ fontSize: '11px', color: 'var(--color-simulation)' }}>MODE DEMO</span>,
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="h1">Riwayat Data</h1>
          <p className="text-secondary">Pencatatan data historis sensor.</p>
        </div>
        <Button variant="primary" onClick={handleExport} disabled={isExporting || isLoading}>
          {isExporting ? 'Mengekspor...' : 'Export CSV'}
        </Button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Memuat data...</div>
        ) : (
          <DataTable columns={columns} data={data} pageSize={15} />
        )}
      </div>

      {toastMessage && (
        <Toast
          id="export-toast"
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage('')}
        />
      )}
    </div>
  );
}
