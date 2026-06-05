import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import SplashScreen from './pages/SplashScreen';
import Dashboard from './pages/Dashboard';
import Enrollment from './pages/Enrollment';
import Authentication from './pages/Authentication';
import LivenessDetection from './pages/LivenessDetection';

import SyncDashboard from './pages/SyncDashboard';
import SettingsPage from './pages/SettingsPage';
import './index.css';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/enrollment': 'Employee Enrollment',
  '/authenticate': 'Face Authentication',
  '/liveness': 'Liveness Detection',

  '/sync': 'Sync Dashboard',
  '/settings': 'Settings',
};

function AppLayout({ theme, onToggleTheme }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Datalake 3.0 Auth';

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
      <div className="main-content">
        <Topbar
          title={title}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="page-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path="/authenticate" element={<Authentication />} />
            <Route path="/liveness" element={<LivenessDetection />} />

            <Route path="/sync" element={<SyncDashboard />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nhai-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nhai-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/*" element={<AppLayout theme={theme} onToggleTheme={toggleTheme} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
