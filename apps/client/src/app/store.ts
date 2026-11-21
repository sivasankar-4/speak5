// =========================================================
// Speak5 — App state (useReducer + Context)
// =========================================================

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { StorageRepository, type PersistedState, type AttemptRecord } from '../data/storage';
import { CHALLENGE_ORDER, CHALLENGES, type ChallengeId, type GoalId } from '../data/challenges';
import { SEED_HISTORY, type SeedSession } from '../data/sampleContent';

// ---------------------------------------------------------------------------
// State shape
// ---------------------------------------------------------------------------

export interface AppState extends PersistedState {
  /** In-memory attempts for current session */
  attempts: AttemptRecord[];
  /** IDs of attempts/sessions where the recording was saved */
  savedRecordingIds: Set<string>;
  /** IDs of soft-deleted sessions */
  deletedIds: Set<string>;
  /** Which challenge is "today's" recommendation */
  todayChallengeId: ChallengeId | null;
  /** Currently active challenge (may differ from today's) */
  activeChallengeId: ChallengeId | null;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export type AppAction =
  | { type: 'TOGGLE_GOAL'; goalId: GoalId }
  | { type: 'SET_COMFORT'; comfort: string }
  | { type: 'SET_DURATION'; duration: number; picked: boolean }
  | { type: 'SET_MODE'; mode: 'video' | 'voice' }
  | { type: 'SET_THEME'; theme: 'light' | 'dark' | 'system' }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'SET_BASELINE_DONE' }
  | { type: 'ADD_ATTEMPT'; attempt: AttemptRecord }
  | { type: 'DELETE_SESSION'; id: string }
  | { type: 'DELETE_ALL_RECORDINGS' }
  | { type: 'DELETE_ALL_DATA' }
  | { type: 'SAVE_RECORDING'; id: string }
  | { type: 'SET_SEEDED'; on: boolean }
  | { type: 'SET_REMIND'; on: boolean; time?: string }
  | { type: 'SET_ACCOUNT'; on: boolean }
  | { type: 'SET_PROMPTED'; on: boolean }
  | { type: 'SET_TODAY_CHALLENGE'; id: ChallengeId }
  | { type: 'SET_ACTIVE_CHALLENGE'; id: ChallengeId };

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TOGGLE_GOAL': {
      const exists = state.goals.includes(action.goalId);
      return { ...state, goals: exists ? state.goals.filter(g => g !== action.goalId) : [...state.goals, action.goalId] };
    }
    case 'SET_COMFORT':
      return { ...state, comfort: action.comfort };
    case 'SET_DURATION':
      return { ...state, duration: action.duration };
    case 'SET_MODE':
      return { ...state, mode: action.mode };
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingComplete: true };
    case 'SET_BASELINE_DONE':
      return { ...state, baselineDone: true };
    case 'ADD_ATTEMPT':
      return { ...state, attempts: [...state.attempts, action.attempt] };
    case 'DELETE_SESSION': {
      const next = new Set(state.deletedIds);
      next.add(action.id);
      return { ...state, deletedIds: next };
    }
    case 'DELETE_ALL_RECORDINGS': {
      return { ...state, savedRecordingIds: new Set() };
    }
    case 'DELETE_ALL_DATA': {
      StorageRepository.clear();
      return { ...buildInitialState(), attempts: [], savedRecordingIds: new Set(), deletedIds: new Set() };
    }
    case 'SAVE_RECORDING': {
      const next = new Set(state.savedRecordingIds);
      next.add(action.id);
      return { ...state, savedRecordingIds: next };
    }
    case 'SET_SEEDED':
      return { ...state, seeded: action.on };
    case 'SET_REMIND':
      return {
        ...state,
        remind: { on: action.on, time: action.time ?? state.remind.time },
      };
    case 'SET_ACCOUNT':
      return { ...state, account: action.on };
    case 'SET_PROMPTED':
      return { ...state, prompted: action.on };
    case 'SET_TODAY_CHALLENGE':
      return { ...state, todayChallengeId: action.id };
    case 'SET_ACTIVE_CHALLENGE':
      return { ...state, activeChallengeId: action.id };
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Helper — build initial state from storage
// ---------------------------------------------------------------------------

function buildInitialState(): AppState {
  const persisted = StorageRepository.load();
  return {
    ...persisted,
    attempts: [],
    savedRecordingIds: new Set(),
    deletedIds: new Set(),
    todayChallengeId: null,
    activeChallengeId: null,
  };
}

// ---------------------------------------------------------------------------
// Derived helpers (pure functions on state)
// ---------------------------------------------------------------------------

export function getVisibleSessions(state: AppState): (AttemptRecord | SeedSession)[] {
  const seeded: (SeedSession | AttemptRecord)[] = state.seeded ? [...SEED_HISTORY] : [];
  const live: AttemptRecord[] = state.attempts;
  return [...seeded, ...live].filter(s => !state.deletedIds.has(s.id));
}

export function getAttempts(state: AppState, challengeId: ChallengeId): AttemptRecord[] {
  return state.attempts.filter(a => a.challengeId === challengeId && !state.deletedIds.has(a.id));
}

export function recommend(state: AppState): ChallengeId {
  const goals = state.goals.length ? (state.goals as GoalId[]) : ['tech' as GoalId];
  const matching = CHALLENGE_ORDER.filter(id => goals.includes(CHALLENGES[id].goalId));
  const candidates = matching.length ? matching : CHALLENGE_ORDER;
  const fresh = candidates.filter(id => getAttempts(state, id).length === 0);
  return (fresh.length ? fresh : candidates)[0];
}

export function getStreak(state: AppState): number {
  const base = state.seeded ? 3 : 0;
  const todayDone = state.attempts.some(
    a => a.kind === 'attempt' && !state.deletedIds.has(a.id)
  );
  return base + (todayDone ? 1 : 0);
}

export function totalSpeakingSeconds(state: AppState): number {
  return getVisibleSessions(state).reduce((sum, s) => {
    const dur = 'durationSec' in s ? s.durationSec : 0;
    return sum + dur;
  }, 0);
}

export function formatDuration(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);

  // Persist relevant fields to localStorage on every change
  useEffect(() => {
    const toSave: PersistedState = {
      goals: state.goals,
      comfort: state.comfort,
      duration: state.duration,
      mode: state.mode,
      theme: state.theme,
      onboardingComplete: state.onboardingComplete,
      baselineDone: state.baselineDone,
      seeded: state.seeded,
      remind: state.remind,
      account: state.account,
      prompted: state.prompted,
    };
    StorageRepository.save(toSave);
  }, [
    state.goals, state.comfort, state.duration, state.mode,
    state.theme, state.onboardingComplete, state.baselineDone,
    state.seeded, state.remind, state.account, state.prompted,
  ]);

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', state.theme);
    }
  }, [state.theme]);

  return React.createElement(AppContext.Provider, { value: { state, dispatch } }, children);
}

export function useAppState(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be inside AppProvider');
  return ctx;
}

// Convenience derived-state hook
export function useRecommendedChallenge(): ChallengeId {
  const { state } = useAppState();
  return state.todayChallengeId ?? recommend(state);
}

export function useActiveChallenge(): ChallengeId {
  const { state } = useAppState();
  return state.activeChallengeId ?? state.todayChallengeId ?? recommend(state);
}
