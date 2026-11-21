// =========================================================
// Speak5 — Profile & Settings Screen
// =========================================================

import React from 'react';
import { useRouter } from '../../app/router';
import { useAppState, getStreak, totalSpeakingSeconds, formatDuration } from '../../app/store';
import { DURATION_OPTIONS } from '../../data/challenges';
import { Icon } from '../../components';

export const ProfileScreen: React.FC = () => {
  const { navigate } = useRouter();
  const { state, dispatch } = useAppState();

  const streak = getStreak(state);
  const totalSeconds = totalSpeakingSeconds(state);

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all data and restart onboarding?')) {
      dispatch({ type: 'DELETE_ALL_DATA' });
      navigate('onboarding_goals');
    }
  };

  return (
    <div className="page animate-in">
      <div className="page-top">
        <button type="button" className="icon-btn" onClick={() => navigate('home')} aria-label="Back">
          <Icon name="chevron-left" size={20} />
        </button>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sub)' }}>Profile & Settings</span>
        <div className="sp" />
      </div>

      <div className="page-body">
        {/* Profile Card */}
        <div
          className="card"
          style={{
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--acsoft)',
              color: 'var(--ac)',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Icon name="user" size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px' }}>Daily Speaker</h3>
            <p style={{ fontSize: '14px', color: 'var(--sub)', marginTop: '2px' }}>
              Cadence Active • Local Storage
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginTop: '16px',
          }}
        >
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>{streak} days</div>
            <div style={{ fontSize: '13px', color: 'var(--sub)', marginTop: '4px' }}>Active Streak</div>
          </div>
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>{formatDuration(totalSeconds)}</div>
            <div style={{ fontSize: '13px', color: 'var(--sub)', marginTop: '4px' }}>Total Speaking</div>
          </div>
        </div>

        {/* Preferences */}
        <div style={{ marginTop: '28px' }}>
          <h3>Cadence Settings</h3>
          <div className="stack" style={{ marginTop: '12px' }}>
            {/* Theme Toggle */}
            <div className="card" style={{ padding: '14px 18px' }}>
              <div className="between">
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px' }}>Appearance</div>
                  <div style={{ fontSize: '13px', color: 'var(--sub)', textTransform: 'capitalize' }}>
                    {state.theme} mode
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {(['light', 'dark', 'system'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`chip ${state.theme === t ? 'selected' : ''}`}
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={() => dispatch({ type: 'SET_THEME', theme: t })}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily Commitment */}
            <div className="card" style={{ padding: '14px 18px' }}>
              <div className="between">
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px' }}>Daily Goal</div>
                  <div style={{ fontSize: '13px', color: 'var(--sub)' }}>
                    {state.duration} minutes / day
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {DURATION_OPTIONS.map((d) => (
                    <button
                      key={d.minutes}
                      type="button"
                      className={`chip ${state.duration === d.minutes ? 'selected' : ''}`}
                      style={{ padding: '6px 10px', fontSize: '12px' }}
                      onClick={() => dispatch({ type: 'SET_DURATION', duration: d.minutes, picked: true })}
                    >
                      {d.minutes}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily Reminder */}
            <div className="card" style={{ padding: '14px 18px' }}>
              <div className="between">
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px' }}>Practice Reminder</div>
                  <div style={{ fontSize: '13px', color: 'var(--sub)' }}>{state.remind.time}</div>
                </div>
                <button
                  type="button"
                  className="toggle"
                  aria-pressed={state.remind.on}
                  onClick={() => dispatch({ type: 'SET_REMIND', on: !state.remind.on })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone / Data Management */}
        <div style={{ marginTop: '28px' }}>
          <h3>Data & Privacy</h3>
          <div className="stack" style={{ marginTop: '12px' }}>
            <div className="card" style={{ padding: '14px 18px' }}>
              <div className="between">
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px' }}>Restart Onboarding</div>
                  <div style={{ fontSize: '13px', color: 'var(--sub)' }}>Reconfigure learning goals</div>
                </div>
                <button
                  type="button"
                  className="btn btn-sec btn-sm"
                  onClick={() => navigate('onboarding_goals')}
                >
                  Configure
                </button>
              </div>
            </div>

            <div className="card" style={{ padding: '14px 18px' }}>
              <div className="between">
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--danger)' }}>
                    Reset All Data
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--sub)' }}>
                    Clears local state and restarts fresh
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={handleResetData}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
