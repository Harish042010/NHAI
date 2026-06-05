import { useState } from 'react';
import { Camera, Check, UserPlus, Upload, User, ArrowLeft, ArrowRight, Lock } from 'lucide-react';

const designations = [
  'Project Director',
  'Highway Engineer',
  'Site Supervisor',
  'Quality Inspector',
  'Toll Plaza Manager',
  'Survey Engineer',
  'Admin Officer',
  'Maintenance Head',
  'Safety Officer',
  'Environmental Specialist',
];

const regions = [
  'Delhi NCR', 'Gujarat', 'Uttar Pradesh', 'Andhra Pradesh',
  'Karnataka', 'Rajasthan', 'Kerala', 'Tamil Nadu',
  'Maharashtra', 'Madhya Pradesh', 'West Bengal', 'Punjab',
];

export default function Enrollment() {
  const [form, setForm] = useState({
    employeeId: '',
    name: '',
    designation: '',
    region: '',
    mobile: '',
  });
  const [faces, setFaces] = useState({ front: false, left: false, right: false });
  const [enrolled, setEnrolled] = useState(false);
  const [capturing, setCapturing] = useState(null);

  const handleCapture = (direction) => {
    setCapturing(direction);
    // Simulate face capture delay
    setTimeout(() => {
      setFaces(prev => ({ ...prev, [direction]: true }));
      setCapturing(null);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnrolled(true);
    setTimeout(() => setEnrolled(false), 3000);
  };

  const allFacesCaptured = faces.front && faces.left && faces.right;
  const formValid = form.employeeId && form.name && form.designation && form.region && allFacesCaptured;

  if (enrolled) {
    return (
      <div>
        <div className="page-header">
          <h2>Employee Enrollment</h2>
          <p>Register new employees with face data</p>
        </div>
        <div className="card">
          <div className="auth-success">
            <div className="success-checkmark">
              <Check size={48} color="white" />
            </div>
            <h3 className="success-title">Employee Enrolled Successfully!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              {form.name} has been enrolled with ID {form.employeeId}.<br />
              3 face embeddings generated and stored securely.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <span className="badge badge-success">Face Data Encrypted</span>
              <span className="badge badge-info">AES-256 Secured</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ marginTop: '16px' }}
              onClick={() => {
                setEnrolled(false);
                setForm({ employeeId: '', name: '', designation: '', region: '', mobile: '' });
                setFaces({ front: false, left: false, right: false });
              }}
            >
              <UserPlus size={18} />
              Enroll Another Employee
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2>Employee Enrollment</h2>
        <p>Register new employees with face data for offline authentication</p>
      </div>

      <div className="grid-2">
        {/* Form */}
        <div className="card animate-fadeInUp enrollment-form">
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            marginBottom: '24px',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <User size={20} />
            Employee Information
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Employee ID *</label>
              <input
                type="text"
                className="form-input"
                placeholder="NHAI-2024-XXX"
                value={form.employeeId}
                onChange={e => setForm(prev => ({ ...prev, employeeId: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter full name"
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Designation *</label>
              <select
                className="form-select"
                value={form.designation}
                onChange={e => setForm(prev => ({ ...prev, designation: e.target.value }))}
              >
                <option value="">Select designation</option>
                {designations.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Region *</label>
              <select
                className="form-select"
                value={form.region}
                onChange={e => setForm(prev => ({ ...prev, region: e.target.value }))}
              >
                <option value="">Select region</option>
                {regions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+91 XXXXX XXXXX"
                value={form.mobile}
                onChange={e => setForm(prev => ({ ...prev, mobile: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={!formValid}
              style={{
                width: '100%',
                marginTop: '8px',
                opacity: formValid ? 1 : 0.5,
                cursor: formValid ? 'pointer' : 'not-allowed',
              }}
            >
              <Upload size={18} />
              Enroll Employee
            </button>
          </form>
        </div>

        {/* Face Capture */}
        <div className="card animate-fadeInUp delay-1">
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            marginBottom: '8px',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Camera size={20} />
            Face Capture
          </h3>
          <p style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '20px'
          }}>
            Capture 3 angles for accurate face embedding generation
          </p>

          <div className="face-capture-grid">
            {[
              { key: 'front', label: 'Front Face', icon: <User size={28} /> },
              { key: 'left', label: 'Left Profile', icon: <ArrowLeft size={28} /> },
              { key: 'right', label: 'Right Profile', icon: <ArrowRight size={28} /> },
            ].map(face => (
              <div
                key={face.key}
                className={`face-capture-slot ${faces[face.key] ? 'captured' : ''}`}
                onClick={() => !faces[face.key] && handleCapture(face.key)}
              >
                {capturing === face.key ? (
                  <>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      border: '3px solid var(--primary-500)',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    <span>Capturing...</span>
                  </>
                ) : faces[face.key] ? (
                  <>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--success-400), var(--success-600))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={24} color="white" />
                    </div>
                    <span style={{ color: 'var(--success-600)', fontWeight: 600 }}>
                      {face.label}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Embedding: 128-dim
                    </span>
                  </>
                ) : (
                  <>
                    <span style={{ color: 'var(--primary-500)' }}>{face.icon}</span>
                    <span>{face.label}</span>
                    <span style={{ fontSize: '11px' }}>Tap to capture</span>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Capture Progress */}
          <div style={{ marginTop: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              marginBottom: '8px'
            }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                Capture Progress
              </span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {Object.values(faces).filter(Boolean).length} / 3
              </span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-fill ${allFacesCaptured ? 'success' : ''}`}
                style={{ width: `${(Object.values(faces).filter(Boolean).length / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Security Info */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={16} style={{ flexShrink: 0 }} /> Security Notice
            </div>
            Face embeddings are generated on-device using MobileFaceNet. 
            Raw images are never stored. All data is encrypted with AES-256 
            using SQLCipher before local storage.
          </div>
        </div>
      </div>
    </div>
  );
}
