import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { claimFirstLoginWelcome } from './first-login-welcome';

test('first-login greeting is claimed once per account on this device', () => {
  const values = new Map<string, string>();
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      localStorage: {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
      },
    },
  });

  try {
    assert.equal(claimFirstLoginWelcome('user-a'), true);
    assert.equal(claimFirstLoginWelcome('user-a'), false);
    assert.equal(claimFirstLoginWelcome('user-b'), true);
  } finally {
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow);
    else Reflect.deleteProperty(globalThis, 'window');
  }
});
