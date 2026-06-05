// Sample Employee Dataset for NHAI Prototype
export const employees = [
  {
    id: 'NHAI-2024-001',
    name: 'Rajesh Kumar Sharma',
    designation: 'Project Director',
    region: 'Delhi NCR',
    mobile: '+91 98765 43210',
    enrolledAt: '2024-11-15T09:30:00',
    status: 'active',
    facesCaptured: 3,
    authCount: 142,
    lastAuth: '2025-06-05T08:45:00',
    avatar: 'RS'
  },
  {
    id: 'NHAI-2024-002',
    name: 'Priya Patel',
    designation: 'Highway Engineer',
    region: 'Gujarat',
    mobile: '+91 87654 32109',
    enrolledAt: '2024-11-16T10:15:00',
    status: 'active',
    facesCaptured: 3,
    authCount: 128,
    lastAuth: '2025-06-05T08:30:00',
    avatar: 'PP'
  },
  {
    id: 'NHAI-2024-003',
    name: 'Amit Singh',
    designation: 'Site Supervisor',
    region: 'Uttar Pradesh',
    mobile: '+91 76543 21098',
    enrolledAt: '2024-11-20T11:00:00',
    status: 'active',
    facesCaptured: 3,
    authCount: 98,
    lastAuth: '2025-06-05T07:15:00',
    avatar: 'AS'
  },
  {
    id: 'NHAI-2024-004',
    name: 'Sneha Reddy',
    designation: 'Quality Inspector',
    region: 'Andhra Pradesh',
    mobile: '+91 65432 10987',
    enrolledAt: '2024-12-01T14:30:00',
    status: 'active',
    facesCaptured: 3,
    authCount: 85,
    lastAuth: '2025-06-04T17:20:00',
    avatar: 'SR'
  },
  {
    id: 'NHAI-2024-005',
    name: 'Mohammed Iqbal',
    designation: 'Toll Plaza Manager',
    region: 'Karnataka',
    mobile: '+91 54321 09876',
    enrolledAt: '2024-12-05T09:00:00',
    status: 'active',
    facesCaptured: 3,
    authCount: 112,
    lastAuth: '2025-06-05T09:00:00',
    avatar: 'MI'
  },
  {
    id: 'NHAI-2024-006',
    name: 'Deepak Verma',
    designation: 'Survey Engineer',
    region: 'Rajasthan',
    mobile: '+91 43210 98765',
    enrolledAt: '2024-12-10T08:45:00',
    status: 'active',
    facesCaptured: 3,
    authCount: 73,
    lastAuth: '2025-06-05T08:00:00',
    avatar: 'DV'
  },
  {
    id: 'NHAI-2024-007',
    name: 'Kavita Nair',
    designation: 'Admin Officer',
    region: 'Kerala',
    mobile: '+91 32109 87654',
    enrolledAt: '2024-12-12T10:30:00',
    status: 'active',
    facesCaptured: 3,
    authCount: 64,
    lastAuth: '2025-06-04T16:45:00',
    avatar: 'KN'
  },
  {
    id: 'NHAI-2024-008',
    name: 'Suresh Babu',
    designation: 'Maintenance Head',
    region: 'Tamil Nadu',
    mobile: '+91 21098 76543',
    enrolledAt: '2025-01-05T09:15:00',
    status: 'active',
    facesCaptured: 3,
    authCount: 56,
    lastAuth: '2025-06-05T07:30:00',
    avatar: 'SB'
  }
];



export const syncRecords = [
  { id: 2, type: 'Face Embeddings', count: 3, size: '156 KB', status: 'pending', lastAttempt: '2025-06-05 07:45' },
  { id: 3, type: 'Audit Logs', count: 45, size: '18 KB', status: 'synced', lastAttempt: '2025-06-04 18:30' },
  { id: 5, type: 'Device Telemetry', count: 8, size: '4 KB', status: 'failed', lastAttempt: '2025-06-05 06:00' },
];

export const recentActivity = [
  { id: 1, user: 'Rajesh Kumar Sharma', avatar: 'RS', action: 'authenticated via face recognition', time: '2 min ago', type: 'auth' },
  { id: 4, user: 'Amit Singh', avatar: 'AS', action: 'enrolled with 3 face captures', time: '1 hour ago', type: 'enrollment' },
  { id: 5, user: 'Mohammed Iqbal', avatar: 'MI', action: 'passed liveness challenge', time: '1.5 hours ago', type: 'liveness' },
  { id: 6, user: 'System', avatar: 'SY', action: 'network connectivity restored', time: '2 hours ago', type: 'system' },
];

export const dashboardStats = {
  totalEmployees: 8,
  pendingSync: 15,
  successRate: 97.8,
  totalAuthentications: 758,
  avgAuthTime: '0.8s',
  offlineRecords: 3,
  lastSyncTime: '2025-06-04 18:30',
};


