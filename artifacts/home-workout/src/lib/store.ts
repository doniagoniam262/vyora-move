import { useMemo, useSyncExternalStore } from 'react';
import type { Level, SavedSession, SessionDifficulty } from './data';

export const KEYS = {
  sessions: 'vyora-sessions-v1',
  settings: 'vyora-settings-v1',
  schedule: 'vyora-schedule-v1',
  videoFavorites: 'vyora-video-favorites-v1',
  videoHistory: 'vyora-video-history-v1',
  reminderLast: 'vyora-reminder-last-v1',
  legacyHistory: 'tamreen-history-v1',
  legacySelection: 'tamreen-selection-v1',
};
const EVT = 'vyora-storage';

function raw(k: string): string | null {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
}
function write(k: string, v: string) {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new Event(EVT));
}
function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener('storage', cb);
  };
}
function useRaw(k: string) {
  return useSyncExternalStore(
    subscribe,
    () => raw(k),
    () => null,
  );
}

function arr(s: string | null): unknown[] {
  try {
    const v: unknown = JSON.parse(s ?? '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
const isRec = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object';
const isSessionDifficulty = (value: unknown): value is SessionDifficulty =>
  value === 'easy' || value === 'just-right' || value === 'hard';

export function parseSessions(current: string | null, legacy: string | null): SavedSession[] {
  const out = new Map<string, SavedSession>();
  for (const e of arr(current)) {
    if (
      !isRec(e) ||
      typeof e.id !== 'string' ||
      typeof e.completedAt !== 'string' ||
      !Number.isFinite(e.durationSeconds)
    )
      continue;
    if (Number.isNaN(new Date(e.completedAt).getTime())) continue;
    const ids = Array.isArray(e.completedExerciseIds)
      ? e.completedExerciseIds.filter((x): x is string => typeof x === 'string')
      : [];
    const durationSeconds = Math.max(0, Number(e.durationSeconds));
    const storedCount = Number.isFinite(e.completedCount)
      ? Math.max(0, Math.floor(Number(e.completedCount)))
      : ids.length;
    out.set(e.id, {
      id: e.id,
      planId: String(e.planId ?? ''),
      planName: String(e.planName ?? 'جلسة'),
      completedAt: e.completedAt,
      durationSeconds,
      completedExerciseIds: ids,
      completedCount: Math.max(storedCount, durationSeconds > 0 || ids.length > 0 ? 1 : 0),
      ...(isSessionDifficulty(e.difficulty) ? { difficulty: e.difficulty } : {}),
    });
  }
  for (const e of arr(legacy)) {
    // migrate old progress
    if (
      !isRec(e) ||
      typeof e.id !== 'string' ||
      typeof e.completedAt !== 'string' ||
      !Number.isFinite(e.durationSeconds) ||
      out.has(e.id)
    )
      continue;
    if (Number.isNaN(new Date(e.completedAt).getTime())) continue;
    const durationSeconds = Math.max(0, Number(e.durationSeconds));
    const storedCount = Number.isFinite(e.exerciseCount)
      ? Math.max(0, Math.floor(Number(e.exerciseCount)))
      : 0;
    out.set(e.id, {
      id: e.id,
      planId: String(e.workoutId ?? ''),
      planName: String(e.workoutTitle ?? 'جلسة سابقة'),
      completedAt: e.completedAt,
      durationSeconds,
      completedExerciseIds: [],
      completedCount: Math.max(storedCount, durationSeconds > 0 ? 1 : 0),
    });
  }
  return [...out.values()].sort((a, b) => b.completedAt.localeCompare(a.completedAt));
}
export function useSessions(): SavedSession[] {
  const a = useRaw(KEYS.sessions);
  const b = useRaw(KEYS.legacyHistory);
  return useMemo(() => parseSessions(a, b), [a, b]);
}

export type VideoWatchEntry = { videoId: string; watchedAt: string };

export function parseVideoHistory(s: string | null): VideoWatchEntry[] {
  const latest = new Map<string, VideoWatchEntry>();
  for (const entry of arr(s)) {
    if (!isRec(entry) || typeof entry.videoId !== 'string' || !/^[\w-]{1,128}$/.test(entry.videoId))
      continue;
    const watchedAt =
      typeof entry.watchedAt === 'string'
        ? entry.watchedAt
        : typeof entry.viewedAt === 'string'
          ? entry.viewedAt
          : null;
    if (!watchedAt) continue;
    const timestamp = Date.parse(watchedAt);
    if (!Number.isFinite(timestamp)) continue;
    const previous = latest.get(entry.videoId);
    if (!previous || timestamp > Date.parse(previous.watchedAt))
      latest.set(entry.videoId, { videoId: entry.videoId, watchedAt });
  }
  return [...latest.values()]
    .sort((a, b) => Date.parse(b.watchedAt) - Date.parse(a.watchedAt))
    .slice(0, 50);
}

export function useVideoHistory(): VideoWatchEntry[] {
  const stored = useRaw(KEYS.videoHistory);
  return useMemo(() => parseVideoHistory(stored), [stored]);
}

export function recordVideoWatch(videoId: string) {
  if (!/^[\w-]{1,128}$/.test(videoId)) return;
  const entry: VideoWatchEntry = { videoId, watchedAt: new Date().toISOString() };
  const history = parseVideoHistory(raw(KEYS.videoHistory)).filter(
    (item) => item.videoId !== videoId,
  );
  write(KEYS.videoHistory, JSON.stringify([entry, ...history].slice(0, 50)));
}

/** Writes a session once per id. Returns false if it already existed. */
export function saveSession(s: SavedSession): boolean {
  const list = parseSessions(raw(KEYS.sessions), raw(KEYS.legacyHistory));
  if (list.some((x) => x.id === s.id)) return false;
  write(KEYS.sessions, JSON.stringify([s, ...list]));
  return true;
}
export function updateSessionDifficulty(id: string, difficulty: SessionDifficulty): boolean {
  const list = parseSessions(raw(KEYS.sessions), raw(KEYS.legacyHistory));
  if (!list.some((session) => session.id === id)) return false;
  const updated = list.map((session) =>
    session.id === id ? { ...session, difficulty } : session,
  );
  write(KEYS.sessions, JSON.stringify(updated));
  return true;
}
export function newSessionId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export type Settings = {
  restSeconds: number;
  weeklyGoal: number;
  homeFitMinutes: 10 | 20;
  homeFitLevel: Level;
  homeFitQuiet: boolean;
  homeFitCompact: boolean;
};
export const defaultSettings: Settings = {
  restSeconds: 15,
  weeklyGoal: 4,
  homeFitMinutes: 10,
  homeFitLevel: 'beginner',
  homeFitQuiet: false,
  homeFitCompact: false,
};
export function parseSettings(s: string | null): Settings {
  try {
    const v: unknown = JSON.parse(s ?? '{}');
    if (!isRec(v)) return defaultSettings;
    return {
      restSeconds: [10, 15, 20, 30].includes(Number(v.restSeconds))
        ? Number(v.restSeconds)
        : defaultSettings.restSeconds,
      weeklyGoal:
        Number.isInteger(v.weeklyGoal) && Number(v.weeklyGoal) >= 1 && Number(v.weeklyGoal) <= 7
          ? Number(v.weeklyGoal)
          : defaultSettings.weeklyGoal,
      homeFitMinutes: v.homeFitMinutes === 20 ? 20 : 10,
      homeFitLevel: v.homeFitLevel === 'intermediate' ? 'intermediate' : 'beginner',
      homeFitQuiet: v.homeFitQuiet === true,
      homeFitCompact: v.homeFitCompact === true,
    };
  } catch {
    return defaultSettings;
  }
}
export function useSettings(): [Settings, (patch: Partial<Settings>) => void] {
  const r = useRaw(KEYS.settings);
  const s = useMemo(() => parseSettings(r), [r]);
  return [
    s,
    (patch) =>
      write(KEYS.settings, JSON.stringify({ ...parseSettings(raw(KEYS.settings)), ...patch })),
  ];
}

function parseVideoFavorites(s: string | null): string[] {
  return [
    ...new Set(
      arr(s).filter((id): id is string => typeof id === 'string' && /^[\w-]{1,128}$/.test(id)),
    ),
  ];
}
export function useVideoFavorites(): string[] {
  const value = useRaw(KEYS.videoFavorites);
  return useMemo(() => parseVideoFavorites(value), [value]);
}
export function toggleVideoFavorite(videoId: string): boolean {
  if (!/^[\w-]{1,128}$/.test(videoId)) return false;
  const favorites = parseVideoFavorites(raw(KEYS.videoFavorites));
  const isFavorite = favorites.includes(videoId);
  write(
    KEYS.videoFavorites,
    JSON.stringify(isFavorite ? favorites.filter((id) => id !== videoId) : [...favorites, videoId]),
  );
  return !isFavorite;
}
export type WeeklySchedule = {
  days: number[];
  level: Level;
  minutes: 10 | 20;
  reminderEnabled: boolean;
  reminderTime: string;
};
export const defaultWeeklySchedule: WeeklySchedule = {
  days: [],
  level: 'beginner',
  minutes: 10,
  reminderEnabled: false,
  reminderTime: '18:00',
};

export function parseWeeklySchedule(s: string | null): WeeklySchedule {
  try {
    const v: unknown = JSON.parse(s ?? '{}');
    if (!isRec(v)) return defaultWeeklySchedule;
    const days = Array.isArray(v.days)
      ? [
          ...new Set(
            v.days.filter((day): day is number => Number.isInteger(day) && day >= 0 && day <= 6),
          ),
        ]
      : [];
    return {
      days,
      level: v.level === 'intermediate' ? 'intermediate' : 'beginner',
      minutes: v.minutes === 20 ? 20 : 10,
      reminderEnabled: v.reminderEnabled === true,
      reminderTime:
        typeof v.reminderTime === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(v.reminderTime)
          ? v.reminderTime
          : defaultWeeklySchedule.reminderTime,
    };
  } catch {
    return defaultWeeklySchedule;
  }
}

export function useWeeklySchedule(): [WeeklySchedule, (next: WeeklySchedule) => void] {
  const stored = useRaw(KEYS.schedule);
  const schedule = useMemo(() => parseWeeklySchedule(stored), [stored]);
  return [
    schedule,
    (next) => write(KEYS.schedule, JSON.stringify(parseWeeklySchedule(JSON.stringify(next)))),
  ];
}
export function clearAllData() {
  try {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(EVT));
}

export function weekStart(now = new Date()) {
  // weeks start Saturday
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 1) % 7));
  return d;
}
export function weekDays(sessions: SavedSession[], now = new Date()) {
  const start = weekStart(now);
  return Array.from({ length: 7 }, (_, i) => {
    const from = new Date(start);
    from.setDate(start.getDate() + i);
    const to = new Date(from);
    to.setDate(from.getDate() + 1);
    const count = sessions.filter((s) => {
      const t = new Date(s.completedAt);
      return t >= from && t < to;
    }).length;
    return { date: from, count, today: from.toDateString() === now.toDateString() };
  });
}
export function fmtDate(iso: string, locale: 'ar' | 'en' = 'ar') {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? locale === 'ar'
      ? 'تاريخ غير محدد'
      : 'Date unavailable'
    : new Intl.DateTimeFormat(locale === 'ar' ? 'ar-u-nu-latn' : 'en', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }).format(d);
}
