import { Bell, Search, Menu, Wifi, WifiOff } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Topbar({ title, onMenuClick }) {
  const [isOnline, setIsOnline] = useState(false);
  const [time, setTime] = useState(new Date());

  // Simulated network toggle
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <h2>{title}</h2>
      </div>

      <div className="topbar-right">
        {/* Network Status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          background: isOnline ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          fontSize: '12px',
          fontWeight: 600,
          color: isOnline ? 'var(--success-600)' : 'var(--danger-600)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)'
        }}
          onClick={() => setIsOnline(!isOnline)}
          title="Click to toggle network simulation"
        >
          <span className={`status-dot ${isOnline ? 'online' : 'offline'}`} />
          {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
          {isOnline ? 'Online' : 'Offline'}
        </div>

        {/* Clock */}
        <div style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-mono)',
          minWidth: '70px',
          textAlign: 'center'
        }}>
          {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </div>

        {/* Notifications */}
        <button className="topbar-btn" title="Notifications">
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        {/* User Avatar */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '13px',
          fontWeight: 700,
          cursor: 'pointer'
        }}
          title="Admin User"
        >
          AD
        </div>
      </div>
    </header>
  );
}
