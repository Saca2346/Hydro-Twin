import { useAppStore } from '@/lib/store';
import { PROVENANCE_LABELS } from '@/lib/constants';

export function Topbar({ title }: { title: string }) {
  const { currentSource, isConnected, sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <header className="topbar">
      <div className="topbar-left">
        {!sidebarOpen && (
          <button className="topbar-menu-btn" onClick={toggleSidebar} aria-label="Buka menu">
            ☰
          </button>
        )}
        <h1 className="topbar-title">{title}</h1>
      </div>
      <div className="topbar-right">
        <span className="topbar-provenance-badge">
          MODE DEMO · {PROVENANCE_LABELS[currentSource] ?? currentSource.toUpperCase()}
        </span>
        <span className={`topbar-connection ${isConnected ? 'topbar-connection--online' : 'topbar-connection--offline'}`}>
          <span className="topbar-connection-dot" />
          {isConnected ? 'Tersambung' : 'Terputus'}
        </span>
        <button className="topbar-profile-btn" aria-label="Profil">
          <div className="topbar-avatar" />
        </button>
      </div>
    </header>
  );
}
