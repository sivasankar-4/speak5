// =========================================================
// Speak5 — Processing Screen (Speech Diagnostic Pipeline)
// =========================================================

import React, { useState, useEffect } from 'react';
import { useRouter } from '../../app/router';
import { useAppState } from '../../app/store';
import { CHALLENGES, type ChallengeId } from '../../data/challenges';
import type { AttemptRecord } from '../../data/storage';
import { Icon } from '../../components';

const STAGES = [
  'Acoustic signal transcription',
  'Pacing & cadence analysis',
  'Filler word & hesitation mapping',
  'Framework structural alignment',
];

export const ProcessingScreen: React.FC = () => {
  const { params, navigate } = useRouter();
  const { state, dispatch } = useAppState();
  const challengeId = (params.challengeId as ChallengeId) || 'beh';
  const duration = parseInt(params.duration || '45', 10);
  const isBaseline = params.isBaseline === 'true';

  const [activeStage, setActiveStage] = useState<number>(0);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setActiveStage((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stageInterval);
          // Complete processing: create attempt in state and navigate to results
          const attemptId = 'att_' + Date.now();
          const ch = CHALLENGES[challengeId] || CHALLENGES['beh'];
          
          // Count previous attempts for this challenge
          const prevAttempts = state.attempts.filter(a => a.challengeId === challengeId);
          const attemptNumber = prevAttempts.length + 1;
          const sample = attemptNumber === 1 ? ch.attempt1 : ch.attempt2;

          const fillersCount = sample.tokens.filter(t => t.kind === 'filler').length;
          const pausesCount = sample.tokens.filter(t => t.kind === 'pause').length;
          const wordsCount = sample.tokens
            .filter(t => t.kind === 'text')
            .reduce((acc, t) => acc + (t.kind === 'text' ? t.text.trim().split(/\s+/).length : 0), 0);

          const newAttempt: AttemptRecord = {
            id: attemptId,
            kind: isBaseline ? 'baseline' : 'attempt',
            challengeId,
            attemptNumber,
            when: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            category: ch.category,
            title: ch.title,
            sampleId: sample.id,
            durationSec: duration || sample.durationSec,
            words: wordsCount || 150,
            fillers: fillersCount,
            pauses: pausesCount,
            wordsPerMin: sample.wordsPerMin || 125,
            theme: sample.theme,
            keepRecording: false,
            audioFileName: params.audioFileName || undefined,
          };

          dispatch({ type: 'ADD_ATTEMPT', attempt: newAttempt });
          if (isBaseline) {
            dispatch({ type: 'SET_BASELINE_DONE' });
          }

          setTimeout(() => {
            navigate('results', { attemptId, challengeId, audioFileName: params.audioFileName || '' });
          }, 600);

          return prev;
        }
      });
    }, 700);

    return () => clearInterval(stageInterval);
  }, [challengeId, duration, isBaseline, dispatch, navigate, state.attempts]);

  return (
    <div className="page bgl animate-in" style={{ justifyContent: 'center' }}>
      <div className="page-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p className="eyebrow" style={{ textAlign: 'center' }}>Cadence Engine</p>
        <h1 style={{ textAlign: 'center', fontSize: '32px' }}>
          Analyzing your <em>speech</em>...
        </h1>
        <p className="sub-text" style={{ textAlign: 'center', marginTop: '8px' }}>
          Generating granular speech diagnostics and framework metrics.
        </p>

        <div className="proc-stages" style={{ marginTop: '36px', maxWidth: '340px', margin: '36px auto 0' }}>
          {STAGES.map((text, idx) => {
            const isDone = idx < activeStage;
            const isActive = idx === activeStage;

            return (
              <div
                key={idx}
                className={`proc-stage ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
              >
                <div className="proc-stage-icon">
                  {isDone ? (
                    <Icon name="check" size={16} color="var(--good)" />
                  ) : isActive ? (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ac)' }} />
                  ) : (
                    <span style={{ fontSize: '11px', color: 'var(--faint)' }}>{idx + 1}</span>
                  )}
                </div>
                <span>{text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
