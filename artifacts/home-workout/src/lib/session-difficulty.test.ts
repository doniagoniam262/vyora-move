import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import type { SavedSession } from './data';
import { adjustLevelForFeedback } from './session-difficulty';
import { KEYS, parseSessions, saveSession, updateSessionDifficulty } from './store';

test('session difficulty feedback adjusts the suggested home-workout level', () => {
  assert.equal(adjustLevelForFeedback('beginner', 'easy'), 'intermediate');
  assert.equal(adjustLevelForFeedback('intermediate', 'easy'), 'intermediate');
  assert.equal(adjustLevelForFeedback('intermediate', 'hard'), 'beginner');
  assert.equal(adjustLevelForFeedback('beginner', 'hard'), 'beginner');
  assert.equal(adjustLevelForFeedback('intermediate', 'just-right'), 'intermediate');
});

test('session difficulty is saved and remains compatible with existing session history', () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  };
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const originalLocalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: storage });
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { dispatchEvent: () => true },
  });

  try {
    const session: SavedSession = {
      id: 'difficulty-test',
      planId: 'beginner-plan',
      planName: 'Beginner plan',
      completedAt: '2026-10-31T00:00:00.000Z',
      durationSeconds: 90,
      completedExerciseIds: ['squat'],
      completedCount: 1,
    };
    assert.equal(saveSession(session), true);
    assert.equal(updateSessionDifficulty(session.id, 'hard'), true);
    assert.equal(updateSessionDifficulty('missing-session', 'easy'), false);

    const saved = parseSessions(values.get(KEYS.sessions) ?? null, null);
    assert.equal(saved[0]?.difficulty, 'hard');
    assert.equal(saved[0]?.id, session.id);

    values.set(KEYS.sessions, JSON.stringify([{ ...session, difficulty: 'unknown' }]));
    assert.equal(parseSessions(values.get(KEYS.sessions) ?? null, null)[0]?.difficulty, undefined);
  } finally {
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow);
    else Reflect.deleteProperty(globalThis, 'window');
    if (originalLocalStorage) Object.defineProperty(globalThis, 'localStorage', originalLocalStorage);
    else Reflect.deleteProperty(globalThis, 'localStorage');
  }
});
