import { useState } from 'react';
import { Search, Filter, Download, MapPin, Clock, CheckCircle } from 'lucide-react';
import { attendanceRecords } from '../data/employees';

export default function AttendanceHistory() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filtered = attendanceRecords.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.employeeId.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || r.type.toLowerCase().replace('-', '') === filterType;
    return matchSearch && matchType;
  });

  return (
    <div>
      <div className="page-header">
        <h2>Attendance History</h2>
        <p>View all attendance records with authentication details</p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} />
            <input
              className="form-input"
              placeholder="Search by name or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '38px', width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'checkin', 'checkout'].map(type => (
              <button
                key={type}
                className={`btn ${filterType === type ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                onClick={() => setFilterType(type)}
              >
                {type === 'all' ? 'All' : type === 'checkin' ? 'Check-In' : 'Check-Out'}
              </button>
            ))}
          </div>

          <button className="btn btn-secondary btn-sm">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card animate-fadeInUp">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Confidence</th>
                <th>Status</th>
                <th>Sync</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(record => (
                <tr key={record.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary-400), var(--primary-600))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 700,
                        flexShrink: 0
                      }}>
                        {record.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '14px' }}>{record.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {record.employeeId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${record.type === 'Check-In' ? 'badge-success' : 'badge-info'}`}>
                      {record.type}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} color="var(--text-muted)" />
                      <div>
                        <div style={{ fontSize: '14px' }}>{record.time}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{record.date}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                      <MapPin size={14} color="var(--text-muted)" />
                      {record.location}
                    </div>
                  </td>
                  <td>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div className="progress-bar" style={{ width: '60px', height: '6px' }}>
                        <div
                          className="progress-fill success"
                          style={{ width: `${record.confidence}%` }}
                        />
                      </div>
                      <span style={{
                        fontWeight: 600,
                        fontSize: '13px',
                        color: record.confidence >= 97 ? 'var(--success-600)' : 'var(--warning-600)',
                        fontFamily: 'var(--font-mono)'
                      }}>
                        {record.confidence}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-success">
                      <CheckCircle size={12} />
                      Verified
                    </span>
                  </td>
                  <td>
                    {record.synced ? (
                      <span className="badge badge-success">Synced</span>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 0 0',
          fontSize: '13px',
          color: 'var(--text-secondary)'
        }}>
          <span>Showing {filtered.length} of {attendanceRecords.length} records</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>
              <span className="status-dot online" style={{ marginRight: '6px' }} />
              {attendanceRecords.filter(r => r.synced).length} Synced
            </span>
            <span>
              <span className="status-dot pending" style={{ marginRight: '6px' }} />
              {attendanceRecords.filter(r => !r.synced).length} Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
