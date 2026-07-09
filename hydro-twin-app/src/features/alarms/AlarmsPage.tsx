import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { MetricCard, DataTable, StatusBadge, Button } from '@/components';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDuration } from '@/lib/utils';
import type { Alarm } from '@/types';

export function AlarmsPage() {
  const { alarms, confirmAlarm, markFalseAlarm } = useAppStore();
  const [selectedAlarm, setSelectedAlarm] = useState<Alarm | null>(null);

  const columns: ColumnDef<Alarm, any>[] = [
    {
      accessorKey: 'createdAt',
      header: 'Waktu',
      cell: (info) => {
        const date = new Date(info.getValue());
        return `${date.getDate().toString().padStart(2, '0')} Jul ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      },
    },
    {
      accessorKey: 'severity',
      header: 'Tingkat',
      cell: (info) => {
        const val = info.getValue();
        if (val === 'critical') return <StatusBadge status="critical" />;
        if (val === 'warning') return <StatusBadge status="warning" />;
        return <StatusBadge status="info" />;
      },
    },
    { accessorKey: 'parameter', header: 'Parameter' },
    { accessorKey: 'reason', header: 'Alasan' },
    {
      accessorKey: 'durationSeconds',
      header: 'Durasi',
      cell: (info) => formatDuration(info.getValue()),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const val = info.getValue();
        if (val === 'unconfirmed') return 'Belum dikonfirmasi';
        if (val === 'confirmed') return 'Dikonfirmasi';
        if (val === 'false_alarm') return 'Alarm palsu';
        return 'Ditutup';
      },
    },
    {
      id: 'actions',
      header: 'Aksi',
      cell: ({ row }) => (
        <Button variant="outline" size="sm" onClick={() => setSelectedAlarm(row.original)}>
          Detail
        </Button>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="h1">Alarm & Inspeksi</h1>
      </div>

      {/* KPI Grid */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <MetricCard title="Alarm Aktif" value="2" unit="" subtitle="Data simulasi" />
        <MetricCard title="Belum Dikonfirmasi" value="1" unit="" subtitle="Menunggu operator" />
        <MetricCard title="Inspeksi Terjadwal" value="3" unit="" subtitle="Mendatang" />
        <MetricCard title="Alarm Palsu" value="2" unit="" subtitle="Dari 47 alarm demo" />
      </div>

      {/* Filters (Mock) */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <select className="form-select" style={{ width: '150px' }} defaultValue="Semua Status">
          <option>Semua Status</option>
          <option>Belum Dikonfirmasi</option>
          <option>Dikonfirmasi</option>
        </select>
        <select className="form-select" style={{ width: '150px' }} defaultValue="Tingkat">
          <option>Tingkat</option>
          <option>Kritis</option>
          <option>Peringatan</option>
        </select>
        <select className="form-select" style={{ width: '150px' }} defaultValue="Parameter">
          <option>Parameter</option>
          <option>Beda Tekanan</option>
        </select>
        <input type="text" className="form-input" placeholder="Cari alarm..." style={{ flex: 1 }} />
        <Button variant="outline">Ekspor</Button>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ padding: '24px 24px 0' }}>
          <h2 className="h2" style={{ fontSize: '18px', marginBottom: '4px' }}>Daftar Alarm</h2>
          <p className="text-secondary" style={{ fontSize: '12px', marginBottom: '16px' }}>Kolom diperbaiki agar alasan dan durasi tidak bertumpuk.</p>
        </div>
        <DataTable columns={columns} data={alarms} />
      </div>

      {/* Detail Panel */}
      {selectedAlarm && (
        <div className="card" style={{ border: '2px solid var(--color-border)', scrollMarginTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <h2 className="h2">Detail Alarm #{selectedAlarm.id.split('-')[1] || selectedAlarm.id}</h2>
            <StatusBadge status={selectedAlarm.severity as any} />
            <span style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>{selectedAlarm.parameter}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div>
              <h3 className="h3" style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>Kronologi</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 5, top: 10, bottom: 10, width: 2, background: '#E2E8F0', zIndex: 0 }} />
                
                <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B', marginTop: 4 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>Alarm terdeteksi</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>14:28:03</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#94A3B8', marginTop: 4 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>Notifikasi dikirim</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>14:28:05</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#94A3B8', marginTop: 4 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>Penyimpangan berlangsung {'>'} 30 detik</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>14:28:48</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B', marginTop: 4 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>Menunggu konfirmasi operator</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Sekarang</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1, background: '#F1F5F9', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Kondisi Sensor</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-navy)' }}>42,6 → 48,2 kPa</div>
                </div>
                <div style={{ flex: 1, background: '#F1F5F9', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Kualitas Data</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-normal)' }}>Valid</div>
                </div>
              </div>

              <div style={{ background: '#E0F2FE', padding: '16px', borderRadius: '8px', color: '#0369A1', fontSize: '13px' }}>
                Rekomendasi: periksa aliran, katup, sensor tekanan, dan saluran masuk.
              </div>

              {selectedAlarm.status === 'unconfirmed' ? (
                <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                  <Button
                    variant="primary"
                    style={{ flex: 1 }}
                    onClick={() => {
                      confirmAlarm(selectedAlarm.id, 'op-current', 'Dikonfirmasi dari panel alarm');
                      setSelectedAlarm({ ...selectedAlarm, status: 'confirmed' });
                    }}
                  >
                    Konfirmasi Alarm
                  </Button>
                  <Button
                    variant="outline"
                    style={{ flex: 1, color: 'var(--color-critical)', borderColor: 'var(--color-critical)' }}
                    onClick={() => {
                      markFalseAlarm(selectedAlarm.id, 'op-current', 'Ditandai palsu');
                      setSelectedAlarm({ ...selectedAlarm, status: 'false_alarm' });
                    }}
                  >
                    Tandai Alarm Palsu
                  </Button>
                </div>
              ) : (
                <div style={{ marginTop: 'auto', padding: '16px', background: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>
                    Alarm ini telah diselesaikan (Status: {selectedAlarm.status}).
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
