import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Ringkasan Kondisi Turbin',
  '/monitoring': 'Monitoring Real-Time',
  '/prediksi': 'Prediksi Kondisi Turbin',
  '/digital-twin': 'Digital Twin Turbin',
  '/alarm': 'Alarm & Inspeksi',
  '/riwayat': 'Riwayat Data',
  '/evaluasi': 'Evaluasi Model',
  '/perangkat': 'Perangkat & Sensor',
  '/laporan': 'Laporan',
  '/pengaturan': 'Pengaturan',
};

export function AppLayout() {
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const location = useLocation();

  const title = PAGE_TITLES[location.pathname] ?? 'Hydro-Twin';

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname, setSidebarOpen]);

  // Handle responsive sidebar on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  return (
    <div className="app-layout">
      <Sidebar />
      {/* Mobile overlay */}
      {sidebarOpen && window.innerWidth <= 1024 && (
        <div
          className={cn('sidebar-overlay', sidebarOpen && 'sidebar-overlay--visible')}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <main className={cn('app-main', !sidebarOpen && 'app-main--collapsed')}>
        <Topbar title={title} />
        <div className="app-content">
          <Outlet />
        </div>
        <div className="simulation-caption">
          Catatan: seluruh angka pada mockup ini adalah data simulasi dan tidak boleh dicantumkan sebagai hasil penelitian.
        </div>
      </main>
    </div>
  );
}
