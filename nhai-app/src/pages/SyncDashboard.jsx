import { useState } from 'react';
import {
  RefreshCw, Wifi, WifiOff, Upload, Cloud,
  CheckCircle, XCircle, Clock, Database,
  ArrowUpCircle, AlertTriangle, HardDrive, Package
} from 'lucide-react';
import { syncRecords, dashboardStats } from '../data/employees';

export default function SyncDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [records, setRecords] = useState(syncRecords);

  const handleSync = () => {
    if (!isOnline) return;
    setSyncing(true);
    setTimeout(() => {
      setRecords(prev => prev.map(r =>
        r.status === 'pending' ? { ...r, status: 'synced', lastAttempt: new Date().toLocaleString() } : r
      ));
      setSyncing(false);
    }, 3000);
  };

  const pendingCount = records.filter(r => r.status === 'pending').length;
  const syncedCount = records.filter(r => r.status === 'synced').length;
  const failedCount = records.filter(r => r.status === 'failed').length;

  return (
    <div>
      <div className="page-header">
        <h2>Sync Dashboard</h2>
        <p>Monitor data synchronization between device and cloud</p>
      </div>

      {/* Network Status Banner */}
      <div className="sync-status-bar animate-fadeInUp" style={{
        background: isOnline
          ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(34, 197, 94, 0.02))'
          : 'linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(239, 68, 68, 0.02))',
        borderColor: isOnline ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
      }}>
        <div className={`sync-indicator ${isOnline ? 'online' : 'offline'}`} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>
            {isOnline ? 'Network Connected' : 'Currently Offline'}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            {isOnline
              ? 'Ready to sync pending records to AWS S3'
              : 'Data is being stored securely on device. Will sync when network returns.'}
          </div>
        </div>
        <button
          className={`btn btn-sm ${isOnline ? 'btn-danger' : 'btn-success'}`}
          onClick={() => setIsOnline(!isOnline)}
        >
          {isOnline ? <WifiOff size={16} /> : <Wifi size={16} />}
          {isOnline ? 'Go Offline' : 'Go Online'}
        </button>
      </div>

      {/* Sync Stats */}
      <div className="stats-grid">
        <div className="stat-card blue animate-fadeInUp delay-1">
          <div className="stat-icon blue">
            <Cloud size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Records</span>
            <span className="stat-value">{records.length}</span>
          </div>
        </div>
        <div className="stat-card orange animate-fadeInUp delay-2">
          <div className="stat-icon orange">
            <ArrowUpCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Pending Upload</span>
            <span className="stat-value">{pendingCount}</span>
          </div>
        </div>
        <div className="stat-card green animate-fadeInUp delay-3">
          <div className="stat-icon green">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Synced</span>
            <span className="stat-value">{syncedCount}</span>
          </div>
        </div>
        <div className="stat-card red animate-fadeInUp delay-4">
          <div className="stat-icon red">
            <XCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Failed</span>
            <span className="stat-value">{failedCount}</span>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Sync Records Table */}
        <div className="card animate-fadeInUp delay-2">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Sync Queue
            </h3>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSync}
              disabled={!isOnline || syncing || pendingCount === 0}
              style={{
                opacity: (!isOnline || syncing || pendingCount === 0) ? 0.5 : 1,
              }}
            >
              {syncing ? (
                <>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Syncing...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Sync Now
                </>
              )}
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Data Type</th>
                  <th>Records</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Last Attempt</th>
                </tr>
              </thead>
              <tbody>
                {records.map(record => (
                  <tr key={record.id}>
                    <td style={{ fontWeight: 600 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Database size={16} color="var(--text-muted)" />
                        {record.type}
                      </div>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      {record.count}
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                      {record.size}
                    </td>
                    <td>
                      <span className={`badge badge-${record.status === 'synced' ? 'success' : record.status === 'failed' ? 'danger' : 'warning'}`}>
                        {record.status === 'synced' && <CheckCircle size={12} />}
                        {record.status === 'failed' && <XCircle size={12} />}
                        {record.status === 'pending' && <Clock size={12} />}
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      {record.lastAttempt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sync Details */}
        <div className="card animate-fadeInUp delay-3">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>
            Sync Engine Details
          </h3>

          {/* Sync Pipeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Monitor Network', desc: 'Continuously check for connectivity', icon: <Wifi size={18} />, active: true },
              { label: 'Batch Records', desc: 'Group pending data for upload', icon: <Database size={18} />, active: isOnline },
              { label: 'Upload to AWS S3', desc: 'Encrypted transfer to cloud storage', icon: <Cloud size={18} />, active: syncing },
              { label: 'Confirm Receipt', desc: 'Verify server acknowledgment', icon: <CheckCircle size={18} />, active: false },
              { label: 'Purge Local', desc: 'Delete synced records from device', icon: <HardDrive size={18} />, active: false },
            ].map((step, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: step.active ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-primary)',
                border: `1px solid ${step.active ? 'rgba(59, 130, 246, 0.2)' : 'var(--border-color)'}`,
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: step.active ? 'var(--primary-500)' : 'var(--neutral-200)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: step.active ? 'white' : 'var(--text-muted)',
                  flexShrink: 0,
                }}>
                  {step.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {step.desc}
                  </div>
                </div>
                {step.active && (
                  <span className="badge badge-info" style={{ marginLeft: 'auto' }}>Active</span>
                )}
              </div>
            ))}
          </div>

          {/* Storage Info */}
          <div style={{
            marginTop: '20px',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
          }}>
            <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '12px', color: 'var(--text-primary)' }}>
              <Package size={16} style={{ flexShrink: 0 }} /> Local Storage
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Database Size</span>
                  <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>2.4 MB / 50 MB</span>
                </div>
                <div className="progress-bar" style={{ height: '6px' }}>
                  <div className="progress-fill" style={{ width: '5%' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Encryption</span>
                <span className="badge badge-info">AES-256 / SQLCipher</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Last Sync</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '12px' }}>
                  {dashboardStats.lastSyncTime}
                </span>
              </div>
            </div>
          </div>

          {/* Warning */}
          {!isOnline && pendingCount > 0 && (
            <div style={{
              marginTop: '16px',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(234, 179, 8, 0.08)',
              border: '1px solid rgba(234, 179, 8, 0.2)',
              display: 'flex',
              gap: '8px',
              fontSize: '13px',
              color: 'var(--warning-600)',
            }}>
              <AlertTriangle size={18} style={{ flexShrink: 0 }} />
              <div>
                <strong>{pendingCount} records</strong> waiting to sync. 
                Data is securely stored with AES-256 encryption and will auto-sync when network returns.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
