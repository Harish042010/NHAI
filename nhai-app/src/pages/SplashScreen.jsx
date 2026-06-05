import { useNavigate } from 'react-router-dom';
import {
  Shield, Camera, Wifi, WifiOff, Fingerprint,
  Lock, Zap, ArrowRight, ChevronRight, Trophy
} from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  const features = [
    { icon: <Camera size={20} />, text: 'Face Recognition' },
    { icon: <Fingerprint size={20} />, text: 'Liveness Detection' },
    { icon: <WifiOff size={20} />, text: '100% Offline' },
    { icon: <Lock size={20} />, text: 'AES-256 Encrypted' },
    { icon: <Zap size={20} />, text: '< 1s Auth Time' },
    { icon: <Shield size={20} />, text: 'Anti-Spoofing' },
  ];

  // Generate particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${3 + Math.random() * 4}px`,
    duration: `${8 + Math.random() * 12}s`,
    delay: `${Math.random() * 8}s`,
    opacity: 0.1 + Math.random() * 0.2,
  }));

  return (
    <div className="splash-screen">
      {/* Particles */}
      <div className="splash-particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div className="splash-content">
        {/* Logo */}
        <div className="splash-logo">
          <Shield size={48} />
        </div>

        {/* Badge */}
        <div className="splash-badge">
          <Trophy size={16} style={{ flexShrink: 0 }} /> NHAI Innovation Hackathon 7.0
        </div>

        {/* Title */}
        <h1 className="splash-title">
          Offline Face<br />
          <span className="highlight">Authentication</span><br />
          System
        </h1>

        {/* Description */}
        <p className="splash-description">
          Secure, AI-powered attendance and identity verification for NHAI field personnel. 
          Works entirely offline in remote highway locations. Edge AI processing with 
          multi-layer liveness detection and AES-256 encryption.
        </p>

        {/* Actions */}
        <div className="splash-actions">
          <button
            className="splash-btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            Enter Dashboard
            <ArrowRight size={18} />
          </button>
          <button
            className="splash-btn-secondary"
            onClick={() => navigate('/authenticate')}
          >
            Quick Authenticate
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Feature Grid */}
        <div className="splash-features">
          {features.map((f, i) => (
            <div key={i} className="splash-feature">
              <div className="splash-feature-icon">
                {f.icon}
              </div>
              <span className="splash-feature-text">{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
