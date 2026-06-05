import { useState, useEffect, useRef } from 'react';
import { Camera, Check, Shield, AlertTriangle, Scan, User, Search, Brain, CheckCircle } from 'lucide-react';
import { employees } from '../data/employees';

const AUTH_STAGES = ['detecting', 'liveness', 'recognizing', 'verified', 'success'];

export default function Authentication() {
  const [stage, setStage] = useState('idle'); // idle, detecting, liveness, recognizing, verified, success
  const [confidence, setConfidence] = useState(0);
  const [matchedEmployee, setMatchedEmployee] = useState(null);
  const [scanAngle, setScanAngle] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    if (stage === 'detecting' || stage === 'liveness' || stage === 'recognizing') {
      const animate = () => {
        setScanAngle(prev => (prev + 2) % 360);
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animRef.current);
    }
  }, [stage]);

  const startAuth = () => {
    setStage('detecting');
    setConfidence(0);
    setMatchedEmployee(null);

    // Stage 1: Face Detection (1.5s)
    setTimeout(() => {
      setStage('liveness');
    }, 1500);

    // Stage 2: Liveness Check (3s)
    setTimeout(() => {
      setStage('recognizing');
    }, 3000);

    // Stage 3: Recognition (4.5s)
    setTimeout(() => {
      const emp = employees[Math.floor(Math.random() * employees.length)];
      setMatchedEmployee(emp);
      setStage('verified');
    }, 4500);

    // Animate confidence
    setTimeout(() => {
      let conf = 0;
      const interval = setInterval(() => {
        conf += Math.random() * 8;
        if (conf >= 97.8) {
          conf = 97.8;
          clearInterval(interval);
        }
        setConfidence(conf);
      }, 50);
    }, 4500);

    // Stage 4: Success (6s)
    setTimeout(() => {
      setConfidence(97.8);
      setStage('success');
    }, 6000);
  };

  const reset = () => {
    setStage('idle');
    setConfidence(0);
    setMatchedEmployee(null);
  };

  const getStageText = () => {
    switch (stage) {
      case 'detecting': return <><Search size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />Detecting Face...</>;
      case 'liveness': return <><Shield size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />Verifying Liveness...</>;
      case 'recognizing': return <><Brain size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />Recognizing Face...</>;
      case 'verified': return <><CheckCircle size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />Identity Verified</>;
      case 'success': return <><CheckCircle size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />Authentication Successful</>;
      default: return <><Camera size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />Ready to Scan</>;
    }
  };

  const getStageColor = () => {
    if (stage === 'verified' || stage === 'success') return 'var(--success-500)';
    if (stage === 'idle') return 'var(--text-muted)';
    return 'var(--primary-400)';
  };

  if (stage === 'success' && matchedEmployee) {
    return (
      <div>
        <div className="page-header">
          <h2>Face Authentication</h2>
          <p>AI-powered identity verification</p>
        </div>
        <div className="card">
          <div className="auth-success">
            <div className="success-checkmark">
              <Check size={48} color="white" />
            </div>
            <h3 className="success-title">Authentication Successful!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '4px' }}>
              Identity verified
            </p>

            {/* Employee Info */}
            <div style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              width: '100%',
              maxWidth: '400px',
              marginTop: '12px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary-400), var(--primary-600))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 700
                }}>
                  {matchedEmployee.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '16px' }}>
                    {matchedEmployee.name}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {matchedEmployee.designation} • {matchedEmployee.region}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                fontSize: '13px'
              }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>Employee ID</div>
                  <div style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{matchedEmployee.id}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>Confidence</div>
                  <div style={{ fontWeight: 700, color: 'var(--success-600)' }}>{confidence.toFixed(1)}%</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>Time</div>
                  <div style={{ fontWeight: 600 }}>{new Date().toLocaleTimeString()}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>Type</div>
                  <span className="badge badge-success">Check-In</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button className="btn btn-primary" onClick={reset}>
                <Camera size={18} />
                Scan Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2>Face Authentication</h2>
        <p>AI-powered identity verification with liveness detection</p>
      </div>

      <div className="grid-2">
        {/* Camera Feed */}
        <div className="card animate-fadeInUp" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="camera-container">
            {/* Simulated camera feed */}
            <div className="camera-feed" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '8px',
              position: 'relative'
            }}>
              {/* Scanning animation */}
              {(stage === 'detecting' || stage === 'liveness' || stage === 'recognizing') && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '200px',
                    height: '200px',
                    border: `3px solid ${getStageColor()}`,
                    borderRadius: '50%',
                    animation: 'facePulse 2s ease-in-out infinite',
                    position: 'relative',
                  }}>
                    {/* Rotating scan line */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '100px',
                      height: '2px',
                      background: `linear-gradient(90deg, transparent, ${getStageColor()})`,
                      transformOrigin: 'left center',
                      transform: `rotate(${scanAngle}deg)`,
                    }} />
                  </div>
                </div>
              )}

              {/* Face icon */}
              <User size={80} color="rgba(255,255,255,0.15)" />

              {/* Face overlay corners */}
              <div className="face-corners">
                <div className="face-corner tl" />
                <div className="face-corner tr" />
                <div className="face-corner bl" />
                <div className="face-corner br" />
              </div>
            </div>

            {/* Status bar */}
            <div className="camera-status" style={{
              borderColor: getStageColor(),
              borderWidth: '1px',
              borderStyle: 'solid'
            }}>
              <span className={`status-dot ${stage === 'verified' ? 'online' : stage === 'idle' ? 'offline' : 'pending'}`} />
              {getStageText()}
            </div>
          </div>

          {/* Start Button */}
          <button
            className="btn btn-primary btn-lg"
            style={{ marginTop: '24px', width: '100%', maxWidth: '320px' }}
            onClick={startAuth}
            disabled={stage !== 'idle'}
          >
            {stage === 'idle' ? (
              <>
                <Scan size={20} />
                Start Authentication
              </>
            ) : (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Processing...
              </>
            )}
          </button>
        </div>

        {/* Authentication Pipeline */}
        <div className="card animate-fadeInUp delay-1">
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            marginBottom: '24px',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Shield size={20} />
            Authentication Pipeline
          </h3>

          {/* Pipeline Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { key: 'detecting', label: 'Face Detection', desc: 'MediaPipe Face Mesh — Localizing face & landmarks', icon: <Camera size={20} /> },
              { key: 'liveness', label: 'Liveness Check', desc: 'MiniFASNet — Anti-spoofing verification', icon: <Shield size={20} /> },
              { key: 'recognizing', label: 'Face Recognition', desc: 'MobileFaceNet — Embedding comparison', icon: <Scan size={20} /> },
              { key: 'verified', label: 'Identity Verified', desc: 'Confidence score ≥ 95% threshold', icon: <Check size={20} /> },
            ].map((step, idx) => {
              const stageIdx = AUTH_STAGES.indexOf(stage);
              const stepIdx = AUTH_STAGES.indexOf(step.key);
              const isCompleted = stageIdx > stepIdx;
              const isActive = stage === step.key;
              const isPending = stageIdx < stepIdx;

              return (
                <div key={step.key} style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--primary-50)' : isCompleted ? 'rgba(34, 197, 94, 0.05)' : 'var(--bg-primary)',
                  border: `1.5px solid ${isActive ? 'var(--primary-400)' : isCompleted ? 'var(--success-400)' : 'var(--border-color)'}`,
                  transition: 'all var(--transition-base)',
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: isCompleted ? 'var(--success-500)' : isActive ? 'var(--primary-500)' : 'var(--neutral-200)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: (isCompleted || isActive) ? 'white' : 'var(--text-muted)',
                    flexShrink: 0,
                    transition: 'all var(--transition-base)',
                  }}>
                    {isCompleted ? <Check size={20} /> : isActive ? (
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                    ) : step.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
                      {step.label}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {step.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Confidence Meter */}
          {(stage === 'verified' || confidence > 0) && (
            <div style={{ marginTop: '24px' }}>
              <div className="confidence-meter">
                <div className="confidence-ring" style={{ '--confidence': confidence }}>
                  <span className="confidence-value">{confidence.toFixed(1)}%</span>
                </div>
                <span className="confidence-label">Confidence Score</span>
              </div>
            </div>
          )}

          {/* Info */}
          <div style={{
            marginTop: '24px',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            display: 'flex',
            gap: '8px'
          }}>
            <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Demo Mode:</strong> This prototype simulates the face authentication 
              pipeline. In production, actual TensorFlow Lite models (MediaPipe, MiniFASNet, 
              MobileFaceNet) process the camera feed on-device.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
