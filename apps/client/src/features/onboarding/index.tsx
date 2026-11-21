// =========================================================
// Speak5 — Onboarding Screens
// =========================================================

import React from 'react';
import { useRouter } from '../../app/router';
import { useAppState } from '../../app/store';
import { GOALS, COMFORT_LEVELS, DURATION_OPTIONS, type GoalId } from '../../data/challenges';
import { Button, OptionRow, Icon } from '../../components';

export const OnboardingGoals: React.FC = () => {
  const { navigate } = useRouter();
  const { state, dispatch } = useAppState();

  const handleToggle = (id: GoalId) => {
    dispatch({ type: 'TOGGLE_GOAL', goalId: id });
  };

  const handleContinue = () => {
    navigate('onboarding_comfort');
  };

  return (
    <div className="page bgl animate-in">
      <div className="page-top">
        <div className="dots">
          <div className="dots-dot on" />
          <div className="dots-dot" />
          <div className="dots-dot" />
        </div>
        <button
          type="button"
          className="btn-ghost"
          style={{ padding: '6px 12px', fontSize: '14px', fontWeight: 600 }}
          onClick={() => navigate('home')}
        >
          Skip
        </button>
      </div>

      <div className="page-body">
        <p className="eyebrow">Step 1 of 3</p>
        <h1>What do you want to <em>master</em>?</h1>
        <p className="sub-text">Pick as many as you like. We customize your daily speaking drills.</p>

        <div className="stack">
          {GOALS.map((g) => {
            const isSelected = state.goals.includes(g.id);
            return (
              <OptionRow
                key={g.id}
                title={g.label}
                desc={g.description}
                selected={isSelected}
                onClick={() => handleToggle(g.id)}
              />
            );
          })}
        </div>
      </div>

      <div className="page-cta">
        <Button onClick={handleContinue} disabled={state.goals.length === 0}>
          Continue
          <Icon name="arrow-right" size={18} />
        </Button>
      </div>
    </div>
  );
};

export const OnboardingComfort: React.FC = () => {
  const { navigate, goBack } = useRouter();
  const { state, dispatch } = useAppState();

  const handleSelect = (val: string) => {
    dispatch({ type: 'SET_COMFORT', comfort: val });
  };

  const handleContinue = () => {
    navigate('onboarding_duration');
  };

  return (
    <div className="page bgl animate-in">
      <div className="page-top">
        <button type="button" className="icon-btn" onClick={goBack} aria-label="Back">
          <Icon name="chevron-left" size={20} />
        </button>
        <div className="dots">
          <div className="dots-dot on" />
          <div className="dots-dot on" />
          <div className="dots-dot" />
        </div>
        <div className="sp" />
      </div>

      <div className="page-body">
        <p className="eyebrow">Step 2 of 3</p>
        <h1>How confident do you feel <em>speaking</em>?</h1>
        <p className="sub-text">Helps calibrate pacing, frameworks, and feedback sensitivity.</p>

        <div className="stack">
          {COMFORT_LEVELS.map((c) => (
            <OptionRow
              key={c.id}
              title={c.label}
              desc={c.description}
              selected={state.comfort === c.id}
              onClick={() => handleSelect(c.id)}
            />
          ))}
        </div>
      </div>

      <div className="page-cta">
        <Button onClick={handleContinue}>
          Continue
          <Icon name="arrow-right" size={18} />
        </Button>
      </div>
    </div>
  );
};

export const OnboardingDuration: React.FC = () => {
  const { navigate, goBack } = useRouter();
  const { state, dispatch } = useAppState();

  const handleSelect = (min: number) => {
    dispatch({ type: 'SET_DURATION', duration: min, picked: true });
  };

  const handleContinue = () => {
    navigate('onboarding_baseline_intro');
  };

  return (
    <div className="page bgl animate-in">
      <div className="page-top">
        <button type="button" className="icon-btn" onClick={goBack} aria-label="Back">
          <Icon name="chevron-left" size={20} />
        </button>
        <div className="dots">
          <div className="dots-dot on" />
          <div className="dots-dot on" />
          <div className="dots-dot on" />
        </div>
        <div className="sp" />
      </div>

      <div className="page-body">
        <p className="eyebrow">Step 3 of 3</p>
        <h1>Daily commitment <em>target</em></h1>
        <p className="sub-text">Short, concentrated practice builds lasting muscle memory.</p>

        <div className="stack">
          {DURATION_OPTIONS.map((d) => (
            <OptionRow
              key={d.minutes}
              title={`${d.minutes} minutes daily`}
              desc={d.tagline}
              selected={state.duration === d.minutes}
              onClick={() => handleSelect(d.minutes)}
            />
          ))}
        </div>
      </div>

      <div className="page-cta">
        <Button onClick={handleContinue}>
          Set Daily Target
          <Icon name="arrow-right" size={18} />
        </Button>
      </div>
    </div>
  );
};

export const OnboardingBaselineIntro: React.FC = () => {
  const { navigate } = useRouter();
  const { dispatch } = useAppState();

  const handleStartBaseline = () => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    navigate('prep', { challengeId: 'tech', isBaseline: 'true' });
  };

  const handleSkipBaseline = () => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    navigate('home');
  };

  return (
    <div className="page bgl animate-in">
      <div className="page-top">
        <div className="sp" />
        <span className="proto-label">Speak5 Cadence</span>
        <div className="sp" />
      </div>

      <div className="page-body" style={{ textAlign: 'center', paddingTop: '40px' }}>
        <div
          style={{
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            background: 'var(--acsoft)',
            color: 'var(--ac)',
            display: 'grid',
            placeItems: 'center',
            margin: '0 auto 24px',
          }}
        >
          <Icon name="mic" size={40} />
        </div>

        <h1>Your quick <em>baseline</em></h1>
        <p className="sub-text" style={{ maxWidth: '320px', margin: '14px auto 0' }}>
          Record a 2-minute spontaneous response so Speak5 can measure your starting pace, filler word ratio, and structure.
        </p>

        <div
          style={{
            background: 'var(--sf)',
            borderRadius: '20px',
            border: '1px solid var(--ln)',
            padding: '16px',
            margin: '32px 0 0',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icon name="bulb" size={20} color="var(--ac)" />
            <span style={{ fontWeight: 700, fontSize: '15px' }}>Self-Introduction (2 Minutes)</span>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--sub)', marginTop: '8px', lineHeight: 1.5 }}>
            "Tell me about yourself, your background, and what you are looking to achieve."
          </p>
        </div>
      </div>

      <div className="page-cta">
        <Button onClick={handleStartBaseline}>
          Record Baseline (2 min)
          <Icon name="arrow-right" size={18} />
        </Button>
        <Button variant="ghost" onClick={handleSkipBaseline}>
          I'll do this later
        </Button>
      </div>
    </div>
  );
};
