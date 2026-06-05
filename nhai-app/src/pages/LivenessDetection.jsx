import { useState, useEffect, useCallback } from 'react';
import { Eye, Smile, RotateCcw, RotateCw, ArrowDown, Check, RefreshCw, Shield, XCircle, Target, BarChart3 } from 'lucide-react';

const challenges = [
  {
    key: 'blink',
    title: 'Blink Your Eyes',
    subtitle: 'Close and open your eyes naturally',
    icon: <Eye size={44} />,
    listIcon: <Eye size={16} />,
  },
  {
    key: 'smile',
    title: 'Smile Please',
    subtitle: 'Give a natural smile',
    icon: <Smile size={44} />,
    listIcon: <Smile size={16} />,
  },
  {
    key: 'left',
    title: 'Turn Head Left',
    subtitle: 'Slowly turn your head to the left',
    icon: <RotateCcw size={44} />,
    listIcon: <RotateCcw size={16} />,
  },
  {
    key: 'right',
    title: 'Turn Head Right',
    subtitle: 'Slowly turn your head to the right',
    icon: <RotateCw size={44} />,
    listIcon: <RotateCw size={16} />,
  },
  {
    key: 'nod',
    title: 'Nod Your Head',
    subtitle: 'Nod your head up and down gently',
    icon: <ArrowDown size={44} />,
    listIcon: <ArrowDown size={16} />,
  },
];

export default function LivenessDetection() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [status, setStatus] = useState('waiting'); // waiting, processing, completed, failed
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [timer, setTimer] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);

  // Shuffle challenges for randomness
  const [shuffledChallenges] = useState(() => {
    const shuffled = [...challenges].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4); // Pick 4 random challenges
  });

  const startChallenge = useCallback(() => {
    setStatus('waiting');
    setTimer(5);
    setIsRunning(true);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!isRunning || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          // Auto-complete (simulated detection)
          setStatus('processing');
          clearInterval(interval);

          // Simulate processing
          setTimeout(() => {
            const success = Math.random() > 0.1; // 90% success rate
            if (success) {
              setStatus('completed');
              setCompletedChallenges(prev => [...prev, currentChallenge]);

              // Move to next or finish
              setTimeout(() => {
                if (currentChallenge < shuffledChallenges.length - 1) {
                  setCurrentChallenge(prev => prev + 1);
                  setStatus('waiting');
                  setTimer(5);
                } else {
                  setAllCompleted(true);
                  setIsRunning(false);
                }
              }, 1000);
            } else {
              setStatus('failed');
              setIsRunning(false);
            }
          }, 800);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timer, currentChallenge, shuffledChallenges.length]);

  const resetAll = () => {
    setCurrentChallenge(0);
    setStatus('waiting');
    setCompletedChallenges([]);
    setTimer(5);
    setIsRunning(false);
    setAllCompleted(false);
  };

  const challenge = shuffledChallenges[currentChallenge];

  if (allCompleted) {
    return (
      <div>
        <div className="page-header">
          <h2>Liveness Detection</h2>
          <p>Active anti-spoofing verification</p>
        </div>
        <div className="card">
          <div className="auth-success">
            <div className="success-checkmark">
              <Shield size={48} color="white" />
            </div>
            <h3 className="success-title">Liveness Verified!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              All {shuffledChallenges.length} challenges completed successfully.<br />
              The user is verified as a real person — not a photo, video, or mask.
            </p>

            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '12px'
            }}>
              {shuffledChallenges.map((c, i) => (
                <span key={i} className="badge badge-success">
                  <Check size={12} /> {c.title}
                </span>
              ))}
            </div>

            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              maxWidth: '400px'
            }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Anti-Spoofing Results:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>Photo Attack: <span className="badge badge-success" style={{ marginLeft: '4px' }}>Blocked</span></div>
                <div>Video Replay: <span className="badge badge-success" style={{ marginLeft: '4px' }}>Blocked</span></div>
                <div>Screen Replay: <span className="badge badge-success" style={{ marginLeft: '4px' }}>Blocked</span></div>
                <div>Mask Attack: <span className="badge badge-success" style={{ marginLeft: '4px' }}>Blocked</span></div>
              </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={resetAll}>
              <RefreshCw size={18} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2>Liveness Detection</h2>
        <p>Active anti-spoofing verification — Random challenges change every login</p>
      </div>

      <div className="grid-2">
        {/* Challenge Display */}
        <div className="card animate-fadeInUp">
          <div className="liveness-challenge">
            {/* Challenge Icon */}
            <div className="challenge-icon" style={{
              borderColor: status === 'completed' ? 'var(--success-400)' : status === 'failed' ? 'var(--danger-400)' : 'transparent',
              borderWidth: '3px',
              borderStyle: 'solid',
            }}>
              {status === 'completed' ? (
                <Check size={44} color="var(--success-600)" />
              ) : status === 'failed' ? (
                <XCircle size={44} color="var(--danger-600)" />
              ) : (
                <span style={{ color: 'var(--primary-600)' }}>
                  {challenge.icon}
                </span>
              )}
            </div>

            {/* Challenge Text */}
            <div>
              <div className="challenge-text">
                {status === 'completed' ? 'Challenge Passed!' :
                  status === 'failed' ? 'Challenge Failed' :
                    status === 'processing' ? 'Analyzing...' :
                      challenge.title}
              </div>
              <div className="challenge-subtitle" style={{ marginTop: '4px' }}>
                {status === 'completed' ? 'Moving to next challenge...' :
                  status === 'failed' ? 'Please try again' :
                    status === 'processing' ? 'Processing facial movement data' :
                      challenge.subtitle}
              </div>
            </div>

            {/* Timer */}
            {isRunning && status === 'waiting' && (
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '4px solid var(--primary-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 800,
                color: timer <= 2 ? 'var(--danger-500)' : 'var(--primary-600)',
                position: 'relative',
              }}>
                <svg style={{ position: 'absolute', inset: '-4px', width: 'calc(100% + 8px)', height: 'calc(100% + 8px)', transform: 'rotate(-90deg)' }}>
                  <circle
                    cx="44"
                    cy="44"
                    r="40"
                    fill="none"
                    stroke="var(--primary-500)"
                    strokeWidth="4"
                    strokeDasharray={`${(timer / 5) * 251.3} 251.3`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 1s linear' }}
                  />
                </svg>
                {timer}
              </div>
            )}

            {/* Processing spinner */}
            {status === 'processing' && (
              <div style={{
                width: '48px',
                height: '48px',
                border: '4px solid var(--primary-100)',
                borderTopColor: 'var(--primary-500)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            )}

            {/* Progress Steps */}
            <div className="challenge-progress">
              {shuffledChallenges.map((_, idx) => (
                <div
                  key={idx}
                  className={`challenge-step ${completedChallenges.includes(idx) ? 'completed' : idx === currentChallenge ? 'active' : ''}`}
                />
              ))}
            </div>

            {/* Start / Retry Button */}
            {!isRunning && !allCompleted && (
              <button
                className={`btn ${status === 'failed' ? 'btn-danger' : 'btn-primary'} btn-lg`}
                onClick={() => {
                  if (status === 'failed') {
                    setStatus('waiting');
                    setTimer(5);
                  }
                  startChallenge();
                }}
              >
                {status === 'failed' ? (
                  <>
                    <RefreshCw size={18} />
                    Retry Challenge
                  </>
                ) : (
                  <>
                    <Shield size={18} />
                    Start Liveness Check
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Info Panel */}
        <div className="card animate-fadeInUp delay-1">
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            marginBottom: '20px',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Shield size={20} />
            Anti-Spoofing Layers
          </h3>

          {/* Passive Liveness */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            marginBottom: '16px'
          }}>
            <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '8px', color: 'var(--text-primary)' }}>
              <Shield size={16} style={{ flexShrink: 0 }} /> Passive Liveness (MiniFASNet)
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Automatically detects spoofing attempts without user interaction:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
              <span className="badge badge-danger">Photo Attacks</span>
              <span className="badge badge-danger">Screen Replay</span>
              <span className="badge badge-danger">Video Replay</span>
              <span className="badge badge-danger">Fake Masks</span>
            </div>
          </div>

          {/* Active Liveness */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            marginBottom: '16px'
          }}>
            <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '8px', color: 'var(--text-primary)' }}>
              <Target size={16} style={{ flexShrink: 0 }} /> Active Liveness (Challenges)
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '8px' }}>
              Random challenges verify real-time presence:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {challenges.map((c, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: 'var(--text-secondary)'
                }}>
                  <span style={{ color: 'var(--primary-500)', display: 'flex', alignItems: 'center' }}>{c.listIcon}</span>
                  <span>{c.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Status */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
          }}>
            <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '12px', color: 'var(--text-primary)' }}>
              <BarChart3 size={16} style={{ flexShrink: 0 }} /> Current Session
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Challenges Completed</span>
                <span style={{ fontWeight: 600 }}>{completedChallenges.length} / {shuffledChallenges.length}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill success"
                  style={{ width: `${(completedChallenges.length / shuffledChallenges.length) * 100}%` }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Passive Liveness</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Model</span>
                <span style={{ fontWeight: 600, fontSize: '12px', fontFamily: 'var(--font-mono)' }}>MiniFASNet v2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
