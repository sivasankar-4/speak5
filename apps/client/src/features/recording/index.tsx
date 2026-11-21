// =========================================================
// Speak5 — Recording & Countdown Screens
// Real voice-only recording using audioRecorder
// Supports countdown, timer, Finish, Discard, and Retry
// Permission requested right before recording
// =========================================================

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../../app/router';
import { CHALLENGES, type ChallengeId } from '../../data/challenges';
import { audioRecorder } from '../../data/audioRecorder';
import { VoiceLine, Icon } from '../../components';

export const RecordingScreen: React.FC = () => {
  const { params, navigate } = useRouter();
  const challengeId = (params.challengeId as ChallengeId) || 'beh';
  const isBaseline = params.isBaseline === 'true';
  const ch = CHALLENGES[challengeId] || CHALLENGES['beh'];

  // Permissions & Ready countdown state
  const [permissionState, setPermissionState] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [countdown, setCountdown] = useState<number>(3);
  const [elapsed, setElapsed] = useState<number>(0);
  const [isRecordingStarted, setIsRecordingStarted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const maxSeconds = isBaseline ? 120 : (ch.attempt1.durationSec || 60);
  const recordingSessionId = useRef<string>('rec_' + Date.now());
  const timerRef = useRef<number | null>(null);

  // 1. Request microphone permission on mount right before starting countdown
  useEffect(() => {
    let isMounted = true;

    async function initAudio() {
      try {
        const granted = await audioRecorder.requestPermission();
        if (!isMounted) return;
        if (granted) {
          setPermissionState('granted');
        } else {
          setPermissionState('denied');
        }
      } catch {
        if (isMounted) setPermissionState('denied');
      }
    }

    initAudio();

    return () => {
      isMounted = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // 2. Countdown timer once permission granted
  useEffect(() => {
    if (permissionState !== 'granted') return;

    if (countdown > 0) {
      const cdTimer = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 900);
      return () => clearInterval(cdTimer);
    }

    // Countdown finished -> Start actual audio capture
    async function beginCapture() {
      const started = await audioRecorder.startRecording(recordingSessionId.current);
      if (started) {
        setIsRecordingStarted(true);
      } else {
        setErrorMsg('Microphone recording could not be started.');
      }
    }

    beginCapture();

    // Elapsed timer
    timerRef.current = window.setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= maxSeconds) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleStop();
          return maxSeconds;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [countdown, permissionState, maxSeconds]);

  // Stop recording -> Save audio to private storage -> Proceed to Review
  const handleStop = async () => {
    if (timerRef.current) clearInterval(timerRef.current);

    try {
      const recordResult = await audioRecorder.stopRecording();
      navigate('record_done', {
        challengeId: ch.id,
        duration: String(elapsed || recordResult?.durationSec || 1),
        isBaseline: isBaseline ? 'true' : 'false',
        audioFileName: recordResult?.fileName || '',
      });
    } catch {
      navigate('record_done', {
        challengeId: ch.id,
        duration: String(elapsed || 1),
        isBaseline: isBaseline ? 'true' : 'false',
      });
    }
  };

  // Discard recording -> Clean up temporary audio file -> Return home
  const handleDiscard = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    await audioRecorder.discardCurrentRecording();
    navigate('home');
  };

  const formatSec = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  // If permission was denied, display helpful explanation without crashing
  if (permissionState === 'denied') {
    return (
      <div className="page animate-in" style={{ justifyContent: 'center' }}>
        <div className="page-body" style={{ textAlign: 'center', paddingTop: '60px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--warnsoft)',
              color: 'var(--warn)',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 20px',
            }}
          >
            <Icon name="lock" size={36} />
          </div>

          <h1>Microphone <em>Access</em> Needed</h1>
          <p className="sub-text" style={{ maxWidth: '320px', margin: '14px auto 0' }}>
            Speak5 records actual speech locally on your device for practice. Please enable microphone permissions in your device settings to continue.
          </p>

          <div className="card" style={{ marginTop: '24px', textAlign: 'left' }}>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>🔒 Privacy Guarantee</div>
            <p style={{ fontSize: '13px', color: 'var(--sub)', marginTop: '4px' }}>
              Your recordings are stored privately on your device. They are never uploaded to the cloud or shared with third parties.
            </p>
          </div>
        </div>

        <div className="page-cta">
          <button
            type="button"
            className="btn btn-pri w-full"
            onClick={async () => {
              const res = await audioRecorder.requestPermission();
              if (res) setPermissionState('granted');
            }}
          >
            Try Again
          </button>
          <button type="button" className="btn btn-ghost w-full" onClick={() => navigate('home')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page rec animate-in" style={{ position: 'relative' }}>
      {/* Ready 3-2-1 Overlay */}
      {countdown > 0 && permissionState === 'granted' && (
        <div className="countdown-overlay">
          <span>{countdown}</span>
          <small>Take a breath and get ready</small>
        </div>
      )}

      {/* Top Bar */}
      <div className="rec-top">
        <div className="rec-indicator">
          <div className="rec-dot" />
          <span>REC</span>
        </div>
        <div className="rec-timer">
          {formatSec(elapsed)} <span>/ {formatSec(maxSeconds)}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="rec-progress-bar">
        <div
          className="rec-progress-fill"
          style={{ width: `${(elapsed / maxSeconds) * 100}%` }}
        />
      </div>

      {/* Prompt Display */}
      <div className="page-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ color: '#C8CDFB', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase' }}>
          {isBaseline ? 'Baseline Assessment (2 Minutes)' : ch.title}
        </p>
        <div className="rec-prompt">
          {isBaseline ? 'Tell me about yourself, your background, and what you are looking to achieve.' : ch.prompt}
        </div>

        {errorMsg && (
          <div style={{ color: '#FFB2A8', fontSize: '13px', marginTop: '12px' }}>
            {errorMsg}
          </div>
        )}

        <div style={{ marginTop: '40px' }}>
          <VoiceLine active={isRecordingStarted} />
        </div>
      </div>

      {/* Controls: Finish (Stop) and Discard. NO pause or resume button per specification */}
      <div className="page-cta" style={{ alignItems: 'center' }}>
        <button
          type="button"
          className="stop-btn"
          onClick={handleStop}
          aria-label="Finish recording"
        >
          <span className="stop-btn-inner" />
        </button>

        <button
          type="button"
          className="discard-btn"
          onClick={handleDiscard}
          style={{ marginTop: '12px' }}
        >
          Discard & Exit
        </button>
      </div>
    </div>
  );
};

export const RecordDoneScreen: React.FC = () => {
  const { params, navigate } = useRouter();
  const challengeId = (params.challengeId as ChallengeId) || 'beh';
  const duration = params.duration || '45';
  const isBaseline = params.isBaseline === 'true';
  const audioFileName = params.audioFileName || '';

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Playback recorded take
  const handlePlayPause = async () => {
    if (isPlaying && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (!audioPlayerRef.current && audioFileName) {
      const base64 = await audioRecorder.getRecordingData(audioFileName);
      if (base64) {
        const audioSrc = `data:audio/aac;base64,${base64}`;
        const audio = new Audio(audioSrc);
        audio.onended = () => setIsPlaying(false);
        audioPlayerRef.current = audio;
      }
    }

    if (audioPlayerRef.current) {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAnalyze = () => {
    if (audioPlayerRef.current) audioPlayerRef.current.pause();
    navigate('processing', {
      challengeId,
      duration,
      isBaseline: isBaseline ? 'true' : 'false',
      audioFileName,
    });
  };

  const handleRetake = async () => {
    if (audioPlayerRef.current) audioPlayerRef.current.pause();
    if (audioFileName) {
      await audioRecorder.deleteRecording(audioFileName);
    }
    navigate('prep', { challengeId, isBaseline: isBaseline ? 'true' : 'false' });
  };

  return (
    <div className="page animate-in">
      <div className="page-top">
        <div className="sp" />
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sub)' }}>Review Take</span>
        <div className="sp" />
      </div>

      <div className="page-body" style={{ textAlign: 'center', paddingTop: '30px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--goodsoft)',
            color: 'var(--good)',
            display: 'grid',
            placeItems: 'center',
            margin: '0 auto 20px',
          }}
        >
          <div style={{ fontSize: '32px' }}>✓</div>
        </div>

        <h1>Recording <em>captured</em>!</h1>
        <p className="sub-text">Total recorded duration: {duration} seconds.</p>

        {/* Playback Control */}
        {audioFileName && (
          <div
            className="play-bar"
            style={{ marginTop: '20px', justifyContent: 'space-between', padding: '12px 18px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                className="play-btn"
                onClick={handlePlayPause}
                aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
              >
                <Icon name={isPlaying ? 'pause' : 'play'} size={18} color="#fff" />
              </button>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>
                  {isPlaying ? 'Playing Take...' : 'Listen to Take'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--sub)' }}>{duration}s recorded</div>
              </div>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--faint)', fontWeight: 600 }}>Local Audio</span>
          </div>
        )}

        <div className="card" style={{ marginTop: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 700, fontSize: '15px' }}>Diagnostic Ready</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--sub)', marginTop: '6px', lineHeight: 1.5 }}>
            Proceed to generate structural analysis and pacing diagnostics.
          </p>
        </div>
      </div>

      <div className="page-cta">
        <button type="button" className="btn btn-pri w-full" onClick={handleAnalyze}>
          Analyze Speech
        </button>
        <button type="button" className="btn btn-sec w-full" onClick={handleRetake}>
          Retake Recording (Clean up)
        </button>
      </div>
    </div>
  );
};
