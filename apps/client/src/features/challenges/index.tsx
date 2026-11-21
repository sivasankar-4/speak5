// =========================================================
// Speak5 — Challenge Detail, Framework, and Prep Screens
// =========================================================

import React, { useState, useEffect } from 'react';
import { useRouter } from '../../app/router';
import { CHALLENGES, FRAMEWORKS, type ChallengeId } from '../../data/challenges';
import { Button, Icon } from '../../components';

// ---------------------------------------------------------
// Challenge Detail Screen
// ---------------------------------------------------------
export const ChallengeDetailScreen: React.FC = () => {
  const { params, navigate, goBack } = useRouter();
  const challengeId = (params.challengeId as ChallengeId) || 'beh';
  const ch = CHALLENGES[challengeId] || CHALLENGES['beh'];
  const fw = FRAMEWORKS[ch.frameworkId];

  return (
    <div className="page animate-in">
      <div className="page-top">
        <button type="button" className="icon-btn" onClick={goBack} aria-label="Back">
          <Icon name="chevron-left" size={20} />
        </button>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sub)' }}>Challenge</span>
        <div className="sp" />
      </div>

      <div className="page-body">
        <p className="eyebrow">{fw ? fw.name : ch.frameworkId}</p>
        <h1 style={{ fontSize: '34px' }}>{ch.title}</h1>
        <p className="sub-text">{ch.prompt}</p>

        {/* Framework card */}
        {fw && (
          <div
            className="card clickable"
            style={{ marginTop: '24px' }}
            onClick={() => navigate('framework', { frameworkId: fw.id })}
          >
            <div className="between">
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ac)' }}>
                  RECOMMENDED FRAMEWORK
                </span>
                <h3 style={{ marginTop: '4px' }}>{fw.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--sub)', marginTop: '2px' }}>
                  {fw.heading}
                </p>
              </div>
              <Icon name="chevron-right" size={20} color="var(--sub)" />
            </div>
          </div>
        )}

        {/* What Speak5 will evaluate */}
        <div style={{ marginTop: '24px' }}>
          <h3>What Speak5 will evaluate</h3>
          <div className="stack" style={{ marginTop: '12px' }}>
            <div className="card">
              <div style={{ fontWeight: 600, fontSize: '15px' }}>Structure & Pacing</div>
              <p style={{ fontSize: '13px', color: 'var(--sub)', marginTop: '4px' }}>
                Clear transition markers matching the framework moves: {fw ? fw.steps.map(s => s.name).join(' → ') : ''}.
              </p>
            </div>
            <div className="card">
              <div style={{ fontWeight: 600, fontSize: '15px' }}>Filler Word Restraint</div>
              <p style={{ fontSize: '13px', color: 'var(--sub)', marginTop: '4px' }}>
                Detecting filler terms (um, uh, basically) and replacing hesitation with intentional pauses.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-cta">
        <Button onClick={() => navigate('prep', { challengeId: ch.id })}>
          Start Prep Timer
          <Icon name="arrow-right" size={18} />
        </Button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// Framework Explainer Screen
// ---------------------------------------------------------
export const FrameworkScreen: React.FC = () => {
  const { params, goBack } = useRouter();
  const frameworkId = params.frameworkId || 'beh';
  const fw = FRAMEWORKS[frameworkId as keyof typeof FRAMEWORKS] || FRAMEWORKS['beh'];

  return (
    <div className="page animate-in">
      <div className="page-top">
        <button type="button" className="icon-btn" onClick={goBack} aria-label="Back">
          <Icon name="chevron-left" size={20} />
        </button>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sub)' }}>Framework Guide</span>
        <div className="sp" />
      </div>

      <div className="page-body">
        <p className="eyebrow">{fw.id.toUpperCase()}</p>
        <h1 style={{ fontSize: '36px' }}>{fw.name}</h1>
        <p className="sub-text">{fw.heading}</p>

        <div className="stack" style={{ marginTop: '24px' }}>
          {fw.steps.map((st, idx) => (
            <div key={idx} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--acsoft)',
                    color: 'var(--ac)',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  {idx + 1}
                </span>
                <span style={{ fontWeight: 700, fontSize: '16px' }}>{st.name}</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--sub)', marginTop: '8px', lineHeight: 1.5 }}>
                {st.description}
              </p>
              {st.example && (
                <div
                  style={{
                    marginTop: '8px',
                    fontSize: '13px',
                    background: 'var(--sf2)',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontStyle: 'italic',
                    color: 'var(--tx)',
                  }}
                >
                  "{st.example}"
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="page-cta">
        <Button variant="secondary" onClick={goBack}>
          Got it
        </Button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// Prep Screen with countdown
// ---------------------------------------------------------
export const PrepScreen: React.FC = () => {
  const { params, navigate, goBack } = useRouter();
  const challengeId = (params.challengeId as ChallengeId) || 'beh';
  const isBaseline = params.isBaseline === 'true';
  const ch = CHALLENGES[challengeId] || CHALLENGES['beh'];
  const fw = FRAMEWORKS[ch.frameworkId];

  // Regular preparation is designed around 60 seconds (accelerated to 15s in demo with clear indication)
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const totalPrepTime = 15;

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate('recording', { challengeId: ch.id, isBaseline: isBaseline ? 'true' : 'false' });
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate, ch.id, isBaseline]);

  const handleStartNow = () => {
    navigate('recording', { challengeId: ch.id, isBaseline: isBaseline ? 'true' : 'false' });
  };

  return (
    <div className="page animate-in">
      <div className="page-top">
        <button type="button" className="icon-btn" onClick={goBack} aria-label="Cancel">
          <Icon name="close" size={20} />
        </button>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sub)' }}>
          {isBaseline ? 'Baseline Prep' : '60s Drill Prep'}
        </span>
        <div className="sp" />
      </div>

      <div className="page-body" style={{ textAlign: 'center' }}>
        <p className="eyebrow">Organize your thoughts (60s habit)</p>
        <h1 style={{ fontSize: '28px', maxWidth: '300px', margin: '0 auto' }}>
          {isBaseline ? 'Tell me about yourself, your background, and your goals.' : ch.prompt}
        </h1>

        {/* Circular Countdown Ring */}
        <div className="prep-ring" style={{ margin: '30px auto' }}>
          <svg viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="var(--sf2)"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="var(--ac)"
              strokeWidth="6"
              fill="none"
              strokeDasharray="276"
              strokeDashoffset={276 - (276 * timeLeft) / totalPrepTime}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="prep-ring-value">{timeLeft}s</div>
        </div>

        {fw && (
          <div
            style={{
              background: 'var(--sf)',
              borderRadius: '16px',
              border: '1px solid var(--ln)',
              padding: '12px 16px',
              display: 'inline-block',
              margin: '0 auto',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sub)' }}>
              Recall: <strong>{fw.steps.map((s) => s.name).join(' → ')}</strong>
            </span>
          </div>
        )}
      </div>

      <div className="page-cta">
        <Button onClick={handleStartNow}>
          Start Speaking Now
          <Icon name="mic" size={18} />
        </Button>
      </div>
    </div>
  );
};
