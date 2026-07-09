import { useState } from 'react';
import {
  Button,
  Input,
  Select,
  Tabs,
  Dialog,
  Drawer,
  Toast,
  OfflineState,
  SensorInvalidState,
  StatusBadge,
  DataSourceBadge,
  MetricCard,
  DataTable,
} from '@/components';
import type { ColumnDef } from '@tanstack/react-table';

export function ComponentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastId, setToastId] = useState<string | null>(null);

  const showToast = () => {
    setToastId(Date.now().toString());
  };

  const columns: ColumnDef<any, any>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Nama' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const data = [
    { id: 1, name: 'Sensor 1', status: 'Aktif' },
    { id: 2, name: 'Sensor 2', status: 'Mati' },
    { id: 3, name: 'Sensor 3', status: 'Aktif' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingBottom: '80px' }}>
      <section>
        <h2 className="h2" style={{ marginBottom: 16 }}>Badges</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <StatusBadge status="normal" />
          <StatusBadge status="warning" />
          <StatusBadge status="critical" />
          <StatusBadge status="info" />
          <StatusBadge status="demo" />
          <StatusBadge status="not_tested" />
          <DataSourceBadge source="simulation" />
          <DataSourceBadge source="experiment" />
          <DataSourceBadge source="live" />
        </div>
      </section>

      <section>
        <h2 className="h2" style={{ marginBottom: 16 }}>Buttons</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section>
        <h2 className="h2" style={{ marginBottom: 16 }}>Forms</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Input label="Nama Sensor" placeholder="Masukkan nama sensor" />
          <Input label="Dengan Error" defaultValue="Invalid" error="Nilai tidak valid" />
          <Select
            label="Pilih Lokasi"
            options={[
              { label: 'Turbin Utama', value: 'turbin_1' },
              { label: 'Pipa Masuk', value: 'pipa_1' },
            ]}
          />
        </div>
      </section>

      <section>
        <h2 className="h2" style={{ marginBottom: 16 }}>Tabs</h2>
        <div className="card">
          <Tabs
            items={[
              { id: 'tab1', label: 'Ringkasan', content: <div style={{ padding: 16 }}>Konten Ringkasan</div> },
              { id: 'tab2', label: 'Detail', content: <div style={{ padding: 16 }}>Konten Detail</div> },
            ]}
          />
        </div>
      </section>

      <section>
        <h2 className="h2" style={{ marginBottom: 16 }}>Overlays</h2>
        <div style={{ display: 'flex', gap: 16 }}>
          <Button onClick={() => setIsDialogOpen(true)}>Buka Dialog</Button>
          <Button onClick={() => setIsDrawerOpen(true)}>Buka Drawer</Button>
          <Button onClick={showToast}>Tampilkan Toast</Button>
        </div>

        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title="Konfirmasi Tindakan"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
              <Button variant="primary" onClick={() => setIsDialogOpen(false)}>Konfirmasi</Button>
            </div>
          }
        >
          <p>Apakah Anda yakin ingin melakukan tindakan ini?</p>
        </Dialog>

        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title="Detail Tambahan"
        >
          <p>Informasi tambahan bisa diletakkan di sini.</p>
        </Drawer>

        {toastId && (
          <Toast
            id={toastId}
            message="Tindakan berhasil dilakukan!"
            type="success"
            onClose={() => setToastId(null)}
          />
        )}
      </section>

      <section>
        <h2 className="h2" style={{ marginBottom: 16 }}>States & Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          <OfflineState />
          <SensorInvalidState sensorName="Suhu Inlet" />
          <MetricCard title="Daya Output" value="1.2" unit="kW" status="normal" subtitle="Sesuai target" />
        </div>
      </section>

      <section>
        <h2 className="h2" style={{ marginBottom: 16 }}>Data Table</h2>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <DataTable columns={columns} data={data} />
        </div>
      </section>
    </div>
  );
}
