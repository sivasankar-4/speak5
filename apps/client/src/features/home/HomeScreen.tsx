// =========================================================
// Speak5 — Home Screen
// =========================================================

import React from 'react';
import { useRouter } from '../../app/router';
import { useAppState, useRecommendedChallenge, getStreak, totalSpeakingSeconds, formatDuration } from '../../app/store';
import { CHALLENGES, FRAMEWORKS } from '../../data/challenges';
import { TabBar, Icon } from '../../components';

export const HomeScreen: React.FC = () => {
  const { navigate } = useRouter();
  const { state } = useAppState();
  const recId = useRecommendedChallenge();
  const rec = CHALLENGES[recId] || CHALLENGES['beh'];
  const fw = FRAMEWORKS[rec.frameworkId];
  const streak = getStreak(state);
  const totalSeconds = totalSpeakingSeconds(state);

  const handleStartToday = () => {
    navigate('prep', { challengeId: rec.id });
  };

  const handleViewDetail = () => {
    navigate('challenge_detail', { challengeId: rec.id });
  };

  return (
    <div className="page home tabs animate-in">
      <div className="page-top">
        <div className="streak-pill">
          <div className="streak-pill-dot" />
          <span>{streak} day streak</span>
        </div>
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
        <p className="eyebrow" style={{ marginTop: '16px' }}>Daily Cadence</p>
        <h1 style={{ fontSize: '38px' }}>
          Speak with <em>clarity</em> and intent today.
        </h1>

        {/* Hero Card */}
        <div className="hero-card" onClick={handleViewDetail} style={{ cursor: 'pointer' }}>
          <div className="tag">Today's Focus • {rec.category}</div>
          <div className="title">{rec.homeTitle || rec.title}</div>
          <div className="subtitle">{rec.trains}</div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '99px',
              background: 'rgba(255,255,255,0.18)',
              fontSize: '13px',
              fontWeight: 600,
              marginTop: '10px',
            }}
          >
            <Icon name="bulb" size={14} color="#fff" />
            Framework: {fw ? fw.name : rec.frameworkId.toUpperCase()}
          </div>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: '16px' }}>
          <button
            type="button"
            className="btn btn-pri w-full"
            onClick={handleStartToday}
            style={{ height: '54px' }}
          >
            Start Drill
            <Icon name="arrow-right" size={18} />
          </button>
        </div>

        {/* Quick Stats & Progress */}
        <div className="sec-header">
          <span>Weekly Rhythm</span>
          <small>{formatDuration(totalSeconds)} practiced</small>
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

        {/* Learning prompt card */}
        <div
          className="card clickable"
          style={{ marginTop: '20px' }}
          onClick={() => navigate('practice')}
        >
          <div className="between">
            <div>
              <div style={{ fontWeight: 700, fontSize: '16px' }}>Explore Framework Library</div>
              <p style={{ fontSize: '13px', color: 'var(--sub)', marginTop: '4px' }}>
                STAR, Explain It, Make Your Case, and Storytelling frameworks.
              </p>
            </div>
            <Icon name="chevron-right" size={20} color="var(--sub)" />
          </div>
        </div>
      </div>

      <TabBar
        activeTab="home"
        onSelectTab={(tab) => {
          if (tab === 'home') navigate('home');
          else if (tab === 'progress') navigate('progress');
        }}
        onRecordClick={handleStartToday}
      />
    </div>
  );
};
