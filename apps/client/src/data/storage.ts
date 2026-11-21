// =========================================================
// Speak5 — Local storage repository
// Abstraction so the storage implementation is replaceable.
// =========================================================

const STORAGE_KEY = 'speak5_state_v1';

export interface PersistedState {
  goals: string[];
  comfort: string | null;
  duration: number;
  mode: 'video' | 'voice';
  theme: 'light' | 'dark' | 'system';
  onboardingComplete: boolean;
  baselineDone: boolean;
  seeded: boolean;
  remind: { on: boolean; time: string };
  account: boolean;
  prompted: boolean;
}

const DEFAULT_STATE: PersistedState = {
  goals: [],
  comfort: null,
  duration: 5,
  mode: 'video',
  theme: 'system',
  onboardingComplete: false,
  baselineDone: false,
  seeded: false,
  remind: { on: false, time: '8:00 PM' },
  account: false,
  prompted: false,
};

function isValidState(v: unknown): v is PersistedState {
  if (!v || typeof v !== 'object') return false;
  const s = v as Record<string, unknown>;
  return Array.isArray(s.goals) && (s.comfort === null || typeof s.comfort === 'string');
}

export const StorageRepository = {
  load(): PersistedState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_STATE };
      const parsed = JSON.parse(raw) as unknown;
      if (!isValidState(parsed)) return { ...DEFAULT_STATE };
      // Merge with defaults so new fields are always present
      return { ...DEFAULT_STATE, ...parsed };
    } catch {
      return { ...DEFAULT_STATE };
    }
  },

  save(state: PersistedState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore write errors (e.g., private browsing quota)
    }
  },

  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};

// ---------------------------------------------------------------------------
// Attempt record (session store — kept in memory only for M1)
// ---------------------------------------------------------------------------

export interface AttemptRecord {
  id: string;
  kind: 'attempt' | 'baseline';
  challengeId: string;
  attemptNumber: number;
  when: string;
  category: string;
  title: string;
  /** Which sample transcript was used */
  sampleId: string;
  durationSec: number;
  words: number;
  fillers: number;
  pauses: number;
  wordsPerMin: number;
  theme: string;
  keepRecording: boolean;
  /** App-private storage audio recording reference if saved */
  audioFileName?: string;
  /** Audio mime type */
  audioMimeType?: string;
}
