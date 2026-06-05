import { useState } from 'react';
import {
  Shield, Database, Bell, Palette, Globe,
  Lock, Smartphone, Server, HardDrive, Key,
  Info
} from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    autoSync: true,
    biometric: true,
    encryption: true,
    geoTagging: true,
    offlineMode: true,
    debugMode: false,
    highSecurity: true,
    dataRetention: '30',
  });

  const toggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <div className="page-header">
        <h2>Settings</h2>
        <p>Configure system preferences and security options</p>
      </div>

      <div className="grid-2">
        <div>
          {/* Security Settings */}
          <div className="card animate-fadeInUp" style={{ marginBottom: '24px' }}>
            <div className="settings-section">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={18} />
                Security
              </h3>

              <div className="settings-item">
                <div className="settings-item-info">
                  <span className="label">AES-256 Encryption</span>
                  <span className="description">Encrypt all local data with SQLCipher</span>
                </div>
                <div
                  className={`toggle-switch ${settings.encryption ? 'active' : ''}`}
                  onClick={() => toggle('encryption')}
                />
              </div>

              <div className="settings-item">
                <div className="settings-item-info">
                  <span className="label">Device-Bound Authentication</span>
                  <span className="description">Lock face data to this device only</span>
                </div>
                <div
                  className={`toggle-switch ${settings.biometric ? 'active' : ''}`}
                  onClick={() => toggle('biometric')}
                />
              </div>

              <div className="settings-item">
                <div className="settings-item-info">
                  <span className="label">High Security Mode</span>
                  <span className="description">Require both passive + active liveness</span>
                </div>
                <div
                  className={`toggle-switch ${settings.highSecurity ? 'active' : ''}`}
                  onClick={() => toggle('highSecurity')}
                />
              </div>


            </div>
          </div>

          {/* Sync Settings */}
          <div className="card animate-fadeInUp delay-1">
            <div className="settings-section">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Server size={18} />
                Synchronization
              </h3>

              <div className="settings-item">
                <div className="settings-item-info">
                  <span className="label">Auto Sync</span>
                  <span className="description">Automatically sync when network available</span>
                </div>
                <div
                  className={`toggle-switch ${settings.autoSync ? 'active' : ''}`}
                  onClick={() => toggle('autoSync')}
                />
              </div>

              <div className="settings-item">
                <div className="settings-item-info">
                  <span className="label">Offline Mode</span>
                  <span className="description">Enable full offline operation</span>
                </div>
                <div
                  className={`toggle-switch ${settings.offlineMode ? 'active' : ''}`}
                  onClick={() => toggle('offlineMode')}
                />
              </div>

              <div className="settings-item">
                <div className="settings-item-info">
                  <span className="label">Data Retention</span>
                  <span className="description">Delete synced records after</span>
                </div>
                <select
                  className="form-select"
                  style={{ width: '120px' }}
                  value={settings.dataRetention}
                  onChange={e => setSettings(prev => ({ ...prev, dataRetention: e.target.value }))}
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* General Settings */}
          <div className="card animate-fadeInUp delay-2" style={{ marginBottom: '24px' }}>
            <div className="settings-section">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Palette size={18} />
                General
              </h3>

              <div className="settings-item">
                <div className="settings-item-info">
                  <span className="label">Notifications</span>
                  <span className="description">Sync and authentication alerts</span>
                </div>
                <div
                  className={`toggle-switch ${settings.notifications ? 'active' : ''}`}
                  onClick={() => toggle('notifications')}
                />
              </div>



              <div className="settings-item">
                <div className="settings-item-info">
                  <span className="label">Debug Mode</span>
                  <span className="description">Show AI model inference details</span>
                </div>
                <div
                  className={`toggle-switch ${settings.debugMode ? 'active' : ''}`}
                  onClick={() => toggle('debugMode')}
                />
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="card animate-fadeInUp delay-3">
            <div className="settings-section">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Info size={18} />
                System Information
              </h3>

              {[
                { label: 'Application', value: 'NHAI Face Auth v1.0.0' },
                { label: 'Face Detection', value: 'MediaPipe Face Mesh' },
                { label: 'Liveness Model', value: 'MiniFASNet v2' },
                { label: 'Recognition Model', value: 'MobileFaceNet' },
                { label: 'Database', value: 'SQLCipher (AES-256)' },
                { label: 'Model Size', value: '< 5 MB Total' },
                { label: 'Auth Speed', value: '< 1 Second' },
                { label: 'Accuracy', value: '> 97%' },
                { label: 'Cloud Backend', value: 'AWS S3 + Lambda' },
                { label: 'Platform', value: 'Android + iOS + Web' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: idx < 9 ? '1px solid var(--border-color)' : 'none',
                  fontSize: '13px'
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                  <span style={{
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--text-primary)'
                  }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
