import {
  Users, UserCheck, RefreshCw, TrendingUp,
  Clock, Shield, Zap, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { dashboardStats, recentActivity, weeklyAttendance } from '../data/employees';

export default function Dashboard() {
  const stats = [
    {
      label: 'Total Employees',
      value: dashboardStats.totalEmployees,
      icon: <Users size={24} />,
      color: 'blue',
      change: '+2 this month',
      positive: true,
    },
    {
      label: "Today's Attendance",
      value: `${dashboardStats.todayAttendance}/${dashboardStats.totalEmployees}`,
      icon: <UserCheck size={24} />,
      color: 'green',
      change: '75% present',
      positive: true,
    },
    {
      label: 'Pending Sync',
      value: dashboardStats.pendingSync,
      icon: <RefreshCw size={24} />,
      color: 'orange',
      change: '3 records offline',
      positive: false,
    },
    {
      label: 'Success Rate',
      value: `${dashboardStats.successRate}%`,
      icon: <TrendingUp size={24} />,
      color: 'blue',
      change: '+0.3% vs last week',
      positive: true,
    },
  ];

  const maxCount = Math.max(...weeklyAttendance.map(d => d.count));

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Overview of the Offline Face Authentication System</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`stat-card ${stat.color} animate-fadeInUp delay-${idx + 1}`}
          >
            <div className={`stat-icon ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="stats-grid" style={{ marginBottom: '32px' }}>
        <div className="stat-card blue">
          <div className="stat-icon blue">
            <Shield size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Authentications</span>
            <span className="stat-value">{dashboardStats.totalAuthentications}</span>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon green">
            <Zap size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Avg Auth Time</span>
            <span className="stat-value">{dashboardStats.avgAuthTime}</span>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon orange">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Last Sync</span>
            <span className="stat-value" style={{ fontSize: '16px' }}>{dashboardStats.lastSyncTime}</span>
          </div>
        </div>
      </div>

      {/* Charts & Activity */}
      <div className="grid-2">
        {/* Weekly Attendance Chart */}
        <div className="card animate-fadeInUp delay-2">
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            marginBottom: '24px',
            color: 'var(--text-primary)'
          }}>
            Weekly Attendance
          </h3>
          <div className="bar-chart" style={{ paddingBottom: '28px' }}>
            {weeklyAttendance.map((day, idx) => (
              <div
                key={idx}
                className="bar"
                style={{
                  height: `${(day.count / maxCount) * 100}%`,
                  animationDelay: `${idx * 0.1}s`
                }}
              >
                <span className="bar-label">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card animate-fadeInUp delay-3">
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            marginBottom: '16px',
            color: 'var(--text-primary)'
          }}>
            Recent Activity
          </h3>
          <div>
            {recentActivity.map((item) => (
              <div key={item.id} className="activity-item">
                <div className="activity-avatar">
                  {item.avatar}
                </div>
                <div className="activity-content">
                  <p>
                    <strong>{item.user}</strong> {item.action}
                  </p>
                  <span className="activity-time">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card" style={{ marginTop: '24px' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          marginBottom: '20px',
          color: 'var(--text-primary)'
        }}>
          System Status
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Face Detection Model', status: 'Active', type: 'success' },
            { label: 'Liveness Engine', status: 'Active', type: 'success' },
            { label: 'Recognition Model', status: 'Active', type: 'success' },
            { label: 'SQLCipher Database', status: 'Encrypted', type: 'info' },
            { label: 'Cloud Sync', status: 'Offline', type: 'warning' },
            { label: 'Security Module', status: 'AES-256', type: 'info' },
          ].map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                {item.label}
              </span>
              <span className={`badge badge-${item.type}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
