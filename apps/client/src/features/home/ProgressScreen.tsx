// =========================================================
// Speak5 — Progress Screen
// Shows speaking stats, rhythm, and link to History
// =========================================================

import React from 'react';
import { useRouter } from '../../app/router';
import { useAppState, getStreak, totalSpeakingSeconds, formatDuration, getVisibleSessions } from '../../app/store';
import { TabBar, Icon, MetricTiles } from '../../components';

export const ProgressScreen: React.FC = () => {
  const { navigate } = useRouter();
  const { state } = useAppState();
  const streak = getStreak(state);
  const totalSeconds = totalSpeakingSeconds(state);
  const visible = getVisibleSessions(state);
  const totalAttempts = state.attempts.filter(a => a.kind === 'attempt').length;

  return (
    <div className="page tabs animate-in">
      <div className="page-top">
        <h1 style={{ fontSize: '28px' }}>Progress</h1>
        <button
          type="button"
          className="icon-btn"
          aria-label="Profile and Settings"
          onClick={() => navigate('profile')}
        >
          <Icon name="user" size={18} />
        </button>
      </div>

      <div className="page-body">
        <p className="sub-text" style={{ marginTop: '4px' }}>
          Your speaking habit and consistency over time.
        </p>

        {/* Metric tiles */}
        <div style={{ marginTop: '18px' }}>
          <MetricTiles
            items={[
              { label: 'Practice Streak', value: `${streak}d`, sub: 'Daily habit', tone: 'good' },
              { label: 'Total Speaking', value: formatDuration(totalSeconds), sub: 'Recorded audio' },
              { label: 'Drills Completed', value: totalAttempts, sub: 'Targeted drills' },
            ]}
          />
        </div>

        {/* Weekly Rhythm */}
        <div className="sec-header" style={{ marginTop: '24px' }}>
          <span>Weekly Rhythm</span>
          <small>{streak} day streak</small>
        </div>

        <div className="week">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
            const isDone = idx < streak;
            const isToday = idx === 3;
            return (
              <div
                key={idx}
                className={`week-day ${isDone ? 'done' : ''} ${isToday && !isDone ? 'today' : ''}`}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* History Access Card */}
        <div
          className="card clickable"
          style={{ marginTop: '24px' }}
          onClick={() => navigate('history')}
        >
          <div className="between">
            <div>
              <div style={{ fontWeight: 700, fontSize: '16px' }}>Practice History & Recordings</div>
              <p style={{ fontSize: '13px', color: 'var(--sub)', marginTop: '4px' }}>
                Review past takes, retained audio recordings ({visible.length} entries), and feedback.
              </p>
            </div>
            <Icon name="chevron-right" size={20} color="var(--sub)" />
          </div>
        </div>

        {/* Framework library access */}
        <div
          className="card clickable"
          style={{ marginTop: '12px' }}
          onClick={() => navigate('practice')}
        >
          <div className="between">
            <div>
              <div style={{ fontWeight: 700, fontSize: '16px' }}>Framework Library</div>
              <p style={{ fontSize: '13px', color: 'var(--sub)', marginTop: '4px' }}>
                Review thinking structures (STAR, Explain It, Make Your Case).
              </p>
            </div>
            <Icon name="chevron-right" size={20} color="var(--sub)" />
          </div>
        </div>
      </div>

      <TabBar
        activeTab="progress"
        onSelectTab={(tab) => {
          if (tab === 'home') navigate('home');
          else if (tab === 'progress') navigate('progress');
        }}
        onRecordClick={() => navigate('prep', { challengeId: 'beh' })}
      />
    </div>
  );
};
