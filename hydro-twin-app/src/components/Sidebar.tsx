import { NavLink, useLocation } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const iconMap: Record<string, string> = {
  LayoutDashboard: '📊',
  Activity: '📈',
  TrendingUp: '📉',
  Cpu: '🔧',
  Bell: '🔔',
  History: '📜',
  FlaskConical: '🧪',
  Gauge: '⚙️',
  FileText: '📄',
  Settings: '⚙️',
};

export function Sidebar() {
  const { sidebarOpen, assetName } = useAppStore();
  const location = useLocation();

  if (!sidebarOpen) return null;

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 2C7.373 2 2 7.373 2 14s5.373 12 12 12 12-5.373 12-12S20.627 2 14 2z" fill="#2A9D8F" opacity="0.2"/>
            <path d="M8 18c2-4 4-6 6-6s4 2 6 6" stroke="#2A9D8F" strokeWidth="2" strokeLinecap="round"/>
            <path d="M10 14c1.5-3 3-4.5 4-4.5s2.5 1.5 4 4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="sidebar-title">Hydro-Twin</span>
        </div>
      </div>

      {/* Asset Selector */}
      <div className="sidebar-asset">
        <span className="sidebar-asset-label">ASET AKTIF</span>
        <div className="sidebar-asset-name">
          <span>{assetName}</span>
          <span className="sidebar-asset-chevron">▾</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={cn('sidebar-nav-item', isActive && 'sidebar-nav-item--active')}
            >
              <span className="sidebar-nav-icon">{iconMap[item.icon] ?? '•'}</span>
              <span className="sidebar-nav-label">{item.label}</span>
              {isActive && <span className="sidebar-active-indicator" />}
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar" />
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">Ahmad Fauzi</span>
            <span className="sidebar-user-role">Operator</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
