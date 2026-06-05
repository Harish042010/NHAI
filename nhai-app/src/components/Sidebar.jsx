import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, UserPlus, Camera, ScanFace,
  ClipboardList, RefreshCw, Settings, Shield,
  ChevronRight, Moon, Sun
} from 'lucide-react';

const navItems = [
  { section: 'Main' },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/enrollment', label: 'Employee Enrollment', icon: UserPlus },
  { path: '/authenticate', label: 'Face Authentication', icon: Camera },
  { path: '/liveness', label: 'Liveness Detection', icon: ScanFace },
  { section: 'Records' },

  { path: '/sync', label: 'Sync Dashboard', icon: RefreshCw, badge: '3' },
  { section: 'System' },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose, theme, onToggleTheme }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Shield size={24} />
          </div>
          <div className="sidebar-title">
            <h1>NHAI Auth</h1>
            <span>Face Recognition System</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item, idx) => {
            if (item.section) {
              return (
                <div key={idx} className="nav-section-title">
                  {item.section}
                </div>
              );
            }

            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <Icon className="nav-icon" size={20} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <button
            className="nav-item"
            onClick={onToggleTheme}
            style={{ width: '100%' }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <div style={{
            padding: '12px',
            fontSize: '11px',
            color: 'var(--text-muted)',
            textAlign: 'center',
            lineHeight: 1.5
          }}>
            NHAI Innovation Hackathon 7.0<br />
            v1.0.0 — Edge AI Prototype
          </div>
        </div>
      </aside>
    </>
  );
}
