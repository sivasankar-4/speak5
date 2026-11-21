// =========================================================
// Speak5 — Practice / Library Screen
// =========================================================

import React, { useState } from 'react';
import { useRouter } from '../../app/router';
import { useAppState } from '../../app/store';
import { CHALLENGE_ORDER, CHALLENGES, FRAMEWORKS } from '../../data/challenges';
import { Icon, Chip } from '../../components';

export const PracticeScreen: React.FC = () => {
  const { navigate } = useRouter();
  const { state } = useAppState();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Drills' },
    { id: 'beh', label: 'Behavioral' },
    { id: 'gd', label: 'Group Disc.' },
    { id: 'tech', label: 'Technical' },
    { id: 'gen', label: 'Stories' },
  ];

  const filteredChallenges = CHALLENGE_ORDER.filter((id) => {
    const c = CHALLENGES[id];
    if (selectedFilter === 'all') return true;
    return c.frameworkId.toLowerCase() === selectedFilter;
  });

  return (
    <div className="page tabs animate-in">
      <div className="page-top">
        <button type="button" className="icon-btn" onClick={() => navigate('progress')} aria-label="Back">
          <Icon name="chevron-left" size={20} />
        </button>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sub)' }}>Library</span>
        <div className="sp" />
      </div>

      <div className="page-body">
        <p className="sub-text" style={{ marginTop: '4px' }}>
          Targeted frameworks designed for real workplace clarity.
        </p>

        {/* Filters */}
        <div className="row" style={{ marginTop: '16px', gap: '8px' }}>
          {filterOptions.map((f) => (
            <Chip
              key={f.id}
              label={f.label}
              selected={selectedFilter === f.id}
              onClick={() => setSelectedFilter(f.id)}
            />
          ))}
        </div>

        {/* Challenge list */}
        <div className="stack" style={{ marginTop: '18px' }}>
          {filteredChallenges.map((id) => {
            const ch = CHALLENGES[id];
            const fw = FRAMEWORKS[ch.frameworkId];
            const attemptsCount = state.attempts.filter((a) => a.challengeId === id).length;

            return (
              <div
                key={id}
                className="card clickable"
                onClick={() => navigate('challenge_detail', { challengeId: id })}
              >
                <div className="between">
                  <div>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--ac)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {fw ? fw.name : ch.frameworkId}
                    </span>
                    <h3 style={{ marginTop: '4px' }}>{ch.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--sub)', marginTop: '4px' }}>
                      {ch.trains}
                    </p>
                  </div>
                  <Icon name="chevron-right" size={20} color="var(--sub)" />
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginTop: '12px',
                    fontSize: '13px',
                    color: 'var(--faint)',
                  }}
                >
                  <span>⏱ {ch.attempt1.durationSec}s response</span>
                  <span>•</span>
                  <span>{attemptsCount > 0 ? `${attemptsCount} attempts` : 'Unattempted'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
