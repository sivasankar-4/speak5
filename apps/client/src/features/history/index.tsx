import React, { useState } from 'react';
import { useRouter } from '../../app/router';
import { useAppState, getVisibleSessions, formatDuration } from '../../app/store';
import { audioRecorder } from '../../data/audioRecorder';
import { Icon } from '../../components';

export const HistoryScreen: React.FC = () => {
  const { navigate } = useRouter();
  const { state, dispatch } = useAppState();
  const visible = getVisibleSessions(state);

  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const audioPlayerRef = React.useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = async (fileName: string, sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePlayingId === sessionId && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setActivePlayingId(null);
      return;
    }

    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }

    const base64 = await audioRecorder.getRecordingData(fileName);
    if (base64) {
      const audio = new Audio(`data:audio/aac;base64,${base64}`);
      audio.onended = () => setActivePlayingId(null);
      audioPlayerRef.current = audio;
      audio.play();
      setActivePlayingId(sessionId);
    }
  };

  const handleDelete = async (id: string, audioFileName?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm('Delete this practice entry and any stored audio?')) {
      if (audioPlayerRef.current && activePlayingId === id) {
        audioPlayerRef.current.pause();
        setActivePlayingId(null);
      }
      if (audioFileName) {
        await audioRecorder.deleteRecording(audioFileName);
      }
      dispatch({ type: 'DELETE_SESSION', id });
    }
  };

  return (
    <div className="page animate-in">
      <div className="page-top">
        <button type="button" className="icon-btn" onClick={() => navigate('progress')} aria-label="Back">
          <Icon name="chevron-left" size={20} />
        </button>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sub)' }}>History</span>
        <div className="sp" />
      </div>

      <div className="page-body">
        <div className="between" style={{ marginTop: '4px' }}>
          <p className="sub-text">
            {visible.length} session{visible.length === 1 ? '' : 's'} recorded
          </p>
          <button
            type="button"
            className="btn-ghost"
            style={{ fontSize: '13px', padding: '4px 8px' }}
            onClick={() => dispatch({ type: 'SET_SEEDED', on: !state.seeded })}
          >
            {state.seeded ? 'Hide sample history' : 'Show sample history'}
          </button>
        </div>

        {visible.length === 0 ? (
          <div
            className="card"
            style={{ marginTop: '30px', textAlign: 'center', padding: '40px 20px' }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--sf2)',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 16px',
                color: 'var(--sub)',
              }}
            >
              <Icon name="clock" size={32} />
            </div>
            <h3>No practice history yet</h3>
            <p style={{ fontSize: '14px', color: 'var(--sub)', marginTop: '6px' }}>
              Complete your daily speaking drill or click "Show sample history" above to preview data.
            </p>
            <div style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="btn btn-pri"
                onClick={() => navigate('prep', { challengeId: 'beh' })}
              >
                Start First Drill
              </button>
            </div>
          </div>
        ) : (
          <div className="stack" style={{ marginTop: '16px' }}>
            {visible.map((s) => {
              const isAttempt = 'challengeId' in s;
              const title = isAttempt ? s.title : s.title;
              const sub = isAttempt ? s.category : s.cat;
              const date = isAttempt ? s.when : s.when;
              const dur = s.durationSec;
              const fillers = s.fillers;

              return (
                <div
                  key={s.id}
                  className="card clickable"
                  onClick={() => {
                    if (isAttempt) {
                      navigate('results', { attemptId: s.id, challengeId: s.challengeId });
                    }
                  }}
                >
                  <div className="between">
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--faint)' }}>
                        {date} • {sub}
                      </div>
                      <h3 style={{ marginTop: '4px' }}>{title}</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {isAttempt && s.audioFileName && state.savedRecordingIds.has(s.id) && (
                        <button
                          type="button"
                          className="icon-btn"
                          style={{ width: '32px', height: '32px' }}
                          onClick={(e) => handlePlayAudio(s.audioFileName!, s.id, e)}
                          aria-label={activePlayingId === s.id ? 'Pause audio' : 'Play saved recording'}
                        >
                          <Icon name={activePlayingId === s.id ? 'pause' : 'play'} size={14} color="var(--ac)" />
                        </button>
                      )}
                      <button
                        type="button"
                        className="icon-btn"
                        style={{ width: '32px', height: '32px', border: 0, background: 'transparent' }}
                        onClick={(e) => handleDelete(s.id, isAttempt ? s.audioFileName : undefined, e)}
                        aria-label="Delete entry"
                      >
                        <Icon name="trash" size={16} color="var(--faint)" />
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginTop: '12px',
                      fontSize: '13px',
                      color: 'var(--sub)',
                    }}
                  >
                    <span>⏱ {formatDuration(dur)}</span>
                    <span>•</span>
                    <span>{fillers} filler words</span>
                    <span>•</span>
                    <span style={{ color: 'var(--ac)', fontWeight: 600 }}>{s.theme}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
