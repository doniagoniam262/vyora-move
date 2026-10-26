import { useMemo, useSyncExternalStore } from 'react';
import type { SavedSession } from './data';

export const KEYS = { sessions: 'vyora-sessions-v1', settings: 'vyora-settings-v1', legacyHistory: 'tamreen-history-v1', legacySelection: 'tamreen-selection-v1' };
const EVT = 'vyora-storage';

function raw(k: string): string | null { try { return localStorage.getItem(k); } catch { return null; } }
function write(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } window.dispatchEvent(new Event(EVT)); }
function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb); window.addEventListener('storage', cb);
  return () => { window.removeEventListener(EVT, cb); window.removeEventListener('storage', cb); };
}
function useRaw(k: string) { return useSyncExternalStore(subscribe, () => raw(k), () => null); }

function arr(s: string | null): unknown[] { try { const v: unknown = JSON.parse(s ?? '[]'); return Array.isArray(v) ? v : []; } catch { return []; } }
const isRec = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object';

export function parseSessions(current: string | null, legacy: string | null): SavedSession[] {
  const out = new Map<string, SavedSession>();
  for (const e of arr(current)) {
    if (!isRec(e) || typeof e.id !== 'string' || typeof e.completedAt !== 'string' || !Number.isFinite(e.durationSeconds)) continue;
    if (Number.isNaN(new Date(e.completedAt).getTime())) continue;
    const ids = Array.isArray(e.completedExerciseIds) ? e.completedExerciseIds.filter((x): x is string => typeof x === 'string') : [];
    out.set(e.id, { id: e.id, planId: String(e.planId ?? ''), planName: String(e.planName ?? 'جلسة'), completedAt: e.completedAt, durationSeconds: Number(e.durationSeconds), completedExerciseIds: ids, completedCount: Number.isFinite(e.completedCount) ? Number(e.completedCount) : ids.length });
  }
  for (const e of arr(legacy)) { // migrate old progress
    if (!isRec(e) || typeof e.id !== 'string' || typeof e.completedAt !== 'string' || !Number.isFinite(e.durationSeconds) || out.has(e.id)) continue;
    if (Number.isNaN(new Date(e.completedAt).getTime())) continue;
    out.set(e.id, { id: e.id, planId: String(e.workoutId ?? ''), planName: String(e.workoutTitle ?? 'جلسة سابقة'), completedAt: e.completedAt, durationSeconds: Number(e.durationSeconds), completedExerciseIds: [], completedCount: Number.isFinite(e.exerciseCount) ? Number(e.exerciseCount) : 0 });
  }
  return [...out.values()].sort((a, b) => b.completedAt.localeCompare(a.completedAt));
}
export function useSessions(): SavedSession[] {
  const a = useRaw(KEYS.sessions); const b = useRaw(KEYS.legacyHistory);
  return useMemo(() => parseSessions(a, b), [a, b]);
}
/** Writes a session once per id. Returns false if it already existed. */
export function saveSession(s: SavedSession): boolean {
  const list = parseSessions(raw(KEYS.sessions), raw(KEYS.legacyHistory));
  if (list.some((x) => x.id === s.id)) return false;
  write(KEYS.sessions, JSON.stringify([s, ...list]));
  return true;
}
export function newSessionId() { return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`; }

export type Settings = { restSeconds: number; weeklyGoal: number };
export const defaultSettings: Settings = { restSeconds: 15, weeklyGoal: 4 };
export function parseSettings(s: string | null): Settings {
  try {
    const v: unknown = JSON.parse(s ?? '{}');
    if (!isRec(v)) return defaultSettings;
    return {
      restSeconds: [10, 15, 20, 30].includes(Number(v.restSeconds)) ? Number(v.restSeconds) : defaultSettings.restSeconds,
      weeklyGoal: Number.isInteger(v.weeklyGoal) && Number(v.weeklyGoal) >= 1 && Number(v.weeklyGoal) <= 7 ? Number(v.weeklyGoal) : defaultSettings.weeklyGoal,
    };
  } catch { return defaultSettings; }
}
export function useSettings(): [Settings, (patch: Partial<Settings>) => void] {
  const r = useRaw(KEYS.settings);
  const s = useMemo(() => parseSettings(r), [r]);
  return [s, (patch) => write(KEYS.settings, JSON.stringify({ ...parseSettings(raw(KEYS.settings)), ...patch }))];
}
export function clearAllData() {
  try { Object.values(KEYS).forEach((k) => localStorage.removeItem(k)); } catch { /* ignore */ }
  window.dispatchEvent(new Event(EVT));
}

export function weekStart(now = new Date()) { // weeks start Saturday
  const d = new Date(now); d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 1) % 7));
  return d;
}
export function weekDays(sessions: SavedSession[], now = new Date()) {
  const start = weekStart(now);
  return Array.from({ length: 7 }, (_, i) => {
    const from = new Date(start); from.setDate(start.getDate() + i);
    const to = new Date(from); to.setDate(from.getDate() + 1);
    const count = sessions.filter((s) => { const t = new Date(s.completedAt); return t >= from && t < to; }).length;
    return { date: from, count, today: from.toDateString() === now.toDateString() };
  });
}
export function fmtDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? 'تاريخ غير محدد' : new Intl.DateTimeFormat('ar-u-nu-latn', { weekday: 'long', day: 'numeric', month: 'long' }).format(d);
}
