// =========================================================
// Speak5 — Results & Review Screens
// With real audio playback, explicit "Keep Recording" opt-in,
// automatic cleanup on exit, and clearly labelled demonstration analysis.
// =========================================================

import React, { useState, useRef } from 'react';
import { useRouter } from '../../app/router';
import { useAppState } from '../../app/store';
import { CHALLENGES, type ChallengeId } from '../../data/challenges';
import { type SampleTranscript } from '../../data/sampleContent';
import { audioRecorder } from '../../data/audioRecorder';
import { Button, Icon, MetricTiles } from '../../components';

export const ResultsScreen: React.FC = () => {
  const { params, navigate } = useRouter();
  const { state, dispatch } = useAppState();
  const challengeId = (params.challengeId as ChallengeId) || 'beh';
  const attemptId = params.attemptId;

  const ch = CHALLENGES[challengeId] || CHALLENGES['beh'];
  const attempt = state.attempts.find((a) => a.id === attemptId) || state.attempts[state.attempts.length - 1];

  const transcript: SampleTranscript = attempt?.attemptNumber === 2 ? ch.attempt2 : ch.attempt1;
  const fb = ch.feedback;

  const audioFileName = params.audioFileName || attempt?.audioFileName || '';
  const [isSaved, setIsSaved] = useState<boolean>(state.savedRecordingIds.has(attempt?.id || ''));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Play audio take
  const handlePlayPause = async () => {
    if (isPlaying && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (!audioPlayerRef.current && audioFileName) {
      const base64 = await audioRecorder.getRecordingData(audioFileName);
      if (base64) {
        const audio = new Audio(`data:audio/aac;base64,${base64}`);
        audio.onended = () => setIsPlaying(false);
        audioPlayerRef.current = audio;
      }
    }

    if (audioPlayerRef.current) {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  // Toggle Keep Recording privately on device
  const handleToggleKeepRecording = async () => {
    if (!attempt) return;
    if (isSaved) {
      // User unchecks: remove file and state
      if (audioFileName) {
        await audioRecorder.deleteRecording(audioFileName);
      }
      setIsSaved(false);
    } else {
      // User checks: mark as saved
      dispatch({ type: 'SAVE_RECORDING', id: attempt.id });
      setIsSaved(true);
    }
  };

  // If user exits without choosing to keep the recording, delete the temporary file (Default to Results only)
  const handleDone = async () => {
    if (audioPlayerRef.current) audioPlayerRef.current.pause();
    if (!isSaved && audioFileName) {
      await audioRecorder.deleteRecording(audioFileName);
    }
    navigate('home');
  };

  const handleRetake = async () => {
    if (audioPlayerRef.current) audioPlayerRef.current.pause();
    if (!isSaved && audioFileName) {
      await audioRecorder.deleteRecording(audioFileName);
    }
    navigate('prep', { challengeId: ch.id });
  };

  const handleOpenReview = () => {
    navigate('review', { challengeId: ch.id, attemptId: attempt?.id || '' });
  };

  return (
    <div className="page animate-in">
      <div className="page-top">
        <span className="proto-label">Diagnostic Report</span>
        <button type="button" className="icon-btn" onClick={handleDone} aria-label="Close">
          <Icon name="close" size={20} />
        </button>
      </div>

      <div className="page-body">
        <p className="eyebrow">{attempt?.kind === 'baseline' ? 'Baseline Analysis' : ch.category}</p>
        <h1 style={{ fontSize: '32px' }}>{fb.heading}</h1>
        <p className="sub-text" style={{ marginTop: '8px' }}>
          {fb.wentWell}
        </p>

        {/* Real Audio Playback & Privacy Controls */}
        {audioFileName && (
          <div
            className="card"
            style={{
              marginTop: '20px',
              border: '1.5px solid var(--ln)',
              background: 'var(--sf)',
              padding: '16px',
            }}
          >
            <div className="between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  className="play-btn"
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? 'Pause audio' : 'Play take'}
                >
                  <Icon name={isPlaying ? 'pause' : 'play'} size={18} color="#fff" />
                </button>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px' }}>
                    {isPlaying ? 'Playing Your Recording' : 'Listen to Your Take'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--sub)' }}>
                    Saved privately on device • {attempt?.durationSec || 60}s
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: '14px',
                paddingTop: '12px',
                borderTop: '1px solid var(--ln)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>Save Recording to History</div>
                <div style={{ fontSize: '12px', color: 'var(--sub)' }}>
                  Default is Results only. Unsaved takes are discarded upon exit.
                </div>
              </div>
              <button
                type="button"
                className="toggle"
                aria-pressed={isSaved}
                onClick={handleToggleKeepRecording}
              />
            </div>
          </div>
        )}

        {/* Clear Demonstration Data Notice (Keeps simulated analysis honest) */}
        <div
          style={{
            marginTop: '16px',
            padding: '10px 14px',
            background: 'var(--acsoft)',
            borderRadius: '14px',
            fontSize: '13px',
            color: 'var(--ac)',
            lineHeight: 1.45,
          }}
        >
          <strong>Notice: Demonstration Diagnostics.</strong> Speech transcription, pacing metrics, and coaching below are calibrated reference data demonstrating Speak5's feedback model. Live AI model inference is not yet connected to recorded audio.
        </div>

        {/* Diagnostic Metrics */}
        <div style={{ marginTop: '20px' }}>
          <MetricTiles
            items={[
              {
                label: 'Sample Pace',
                value: `${attempt?.wordsPerMin || 130} WPM`,
                sub: 'Benchmark model',
                tone: 'good',
              },
              {
                label: 'Sample Fillers',
                value: attempt?.fillers ?? 4,
                sub: 'Um, basically',
                tone: (attempt?.fillers || 0) > 6 ? 'warn' : 'good',
              },
              {
                label: 'Sample Hesitations',
                value: `${attempt?.pauses ?? 2}`,
                sub: '> 2.0s silent gaps',
              },
            ]}
          />
        </div>

        {/* Priority Focus */}
        <div
          className="card"
          style={{
            marginTop: '20px',
            borderLeft: '4px solid var(--coral)',
            background: 'var(--sf)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--coral)', textTransform: 'uppercase' }}>
              Priority Focus (Sample)
            </span>
          </div>
          <h3 style={{ marginTop: '6px' }}>{fb.priorityTitle}</h3>
          <p style={{ fontSize: '14px', color: 'var(--sub)', marginTop: '4px', lineHeight: 1.5 }}>
            {fb.priorityBody}
          </p>
        </div>

        {/* Detailed Breakdown */}
        <div style={{ marginTop: '24px' }}>
          <h3>Evaluation Dimensions (Reference Model)</h3>
          <div className="stack" style={{ marginTop: '10px' }}>
            {fb.rows.map((r, idx) => (
              <div key={idx} className="card" style={{ padding: '14px 18px' }}>
                <div className="between">
                  <span style={{ fontWeight: 600, fontSize: '15px' }}>{r.dimension}</span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '99px',
                      background: r.rating === 'good' ? 'var(--goodsoft)' : 'var(--warnsoft)',
                      color: r.rating === 'good' ? 'var(--good)' : 'var(--coraltx)',
                    }}
                  >
                    {r.observation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison to Previous Attempt if Retry */}
        {attempt?.attemptNumber && attempt.attemptNumber > 1 && ch.comparison && (
          <div style={{ marginTop: '24px' }}>
            <div className="sec-header">
              <span>{ch.comparison.heading}</span>
              <small>{ch.comparison.label}</small>
            </div>
            <div className="card" style={{ background: 'var(--sf)' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--good)', marginBottom: '10px' }}>
                ✓ {ch.comparison.progressNote}
              </div>
              <div className="stack" style={{ gap: '8px', marginTop: '4px' }}>
                {ch.comparison.rows.map((cr, idx) => (
                  <div key={idx} style={{ padding: '8px 0', borderBottom: idx < ch.comparison.rows.length - 1 ? '1px solid var(--ln)' : 'none' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--tx)' }}>{cr.dimension}</div>
                    <div style={{ fontSize: '13px', color: 'var(--sub)', marginTop: '2px' }}>{cr.observation}</div>
                  </div>
                ))}
              </div>
              {ch.comparison.nextFocus && (
                <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--sub)', background: 'var(--sf2)', padding: '10px 12px', borderRadius: '12px' }}>
                  <strong>Next focus:</strong> {ch.comparison.nextFocus}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sample Transcript Snippet */}
        <div style={{ marginTop: '24px' }}>
          <div className="between">
            <div>
              <h3>Sample Reference Transcript</h3>
              <div style={{ fontSize: '12px', color: 'var(--sub)' }}>Illustrated coaching benchmark</div>
            </div>
            <button
              type="button"
              className="btn-ghost"
              style={{ fontSize: '14px', padding: '4px 8px' }}
              onClick={handleOpenReview}
            >
              Full Breakdown →
            </button>
          </div>
          <div
            className="card"
            style={{
              marginTop: '10px',
              fontFamily: 'inherit',
              lineHeight: 1.7,
              fontSize: '15px',
            }}
          >
            {transcript.tokens.map((tok, i) => {
              if (tok.kind === 'filler') {
                return (
                  <span key={i} className="filler-word">
                    {tok.text}
                  </span>
                );
              }
              if (tok.kind === 'pause') {
                return (
                  <span key={i} className="pause-marker">
                    {tok.seconds}s
                  </span>
                );
              }
              if (tok.kind === 'text') {
                return <span key={i}>{tok.text}</span>;
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <div className="page-cta">
        <Button onClick={handleRetake}>
          Try Again with Coaching
          <Icon name="refresh" size={18} />
        </Button>
        <Button variant="secondary" onClick={handleDone}>
          Complete & Return Home
        </Button>
      </div>
    </div>
  );
};

export const ReviewScreen: React.FC = () => {
  const { params, goBack } = useRouter();
  const { state } = useAppState();
  const challengeId = (params.challengeId as ChallengeId) || 'beh';
  const attemptId = params.attemptId;

  const ch = CHALLENGES[challengeId] || CHALLENGES['beh'];
  const attempt = state.attempts.find((a) => a.id === attemptId) || state.attempts[state.attempts.length - 1];
  const transcript = attempt?.attemptNumber === 2 ? ch.attempt2 : ch.attempt1;

  return (
    <div className="page animate-in">
      <div className="page-top">
        <button type="button" className="icon-btn" onClick={goBack} aria-label="Back">
          <Icon name="chevron-left" size={20} />
        </button>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sub)' }}>Sample Reference Transcript</span>
        <div className="sp" />
      </div>

      <div className="page-body">
        <p className="eyebrow">{ch.title}</p>
        <h1 style={{ fontSize: '28px' }}>Benchmark transcript</h1>
        <p style={{ fontSize: '13px', color: 'var(--sub)', marginTop: '4px' }}>
          Demonstration transcript illustrating cadence and filler word density.
        </p>

        <div style={{ display: 'flex', gap: '16px', margin: '14px 0', fontSize: '13px', color: 'var(--sub)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="filler-word" style={{ padding: '1px 6px' }}>word</span> Filler word
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="pause-marker" style={{ margin: 0 }}>2.4s</span> Long pause
          </span>
        </div>

        <div className="card" style={{ marginTop: '16px', lineHeight: 1.8, fontSize: '16px' }}>
          {transcript.tokens.map((tok, i) => {
            if (tok.kind === 'filler') {
              return (
                <span key={i} className="filler-word" title="Filler word">
                  {tok.text}
                </span>
              );
            }
            if (tok.kind === 'pause') {
              return (
                <span key={i} className="pause-marker" title="Hesitation">
                  {tok.seconds}s
                </span>
              );
            }
            if (tok.kind === 'text') {
              return <span key={i}>{tok.text}</span>;
            }
            return null;
          })}
        </div>

        {/* Coaching revised sentence */}
        <div className="card" style={{ marginTop: '20px', background: 'var(--acsoft)' }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ac)' }}>MODEL PHRASING (BENCHMARK)</div>
          <p style={{ marginTop: '6px', fontSize: '15px', color: 'var(--tx)', fontStyle: 'italic' }}>
            "{ch.coaching.revisedSentence}"
          </p>
        </div>
      </div>

      <div className="page-cta">
        <Button onClick={goBack}>Done Reviewing</Button>
      </div>
    </div>
  );
};
