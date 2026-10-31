import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { playDing } from './ding-sound';

test('plays a short rising tone with Web Audio', () => {
  const calls: string[] = [];
  const fakeAudioContext = class {
    currentTime = 5;
    destination = {};
    state = 'running';

    createOscillator() {
      return {
        type: '',
        frequency: {
          setValueAtTime: () => calls.push('frequency-start'),
          exponentialRampToValueAtTime: () => calls.push('frequency-rise'),
        },
        connect: () => undefined,
        start: () => calls.push('start'),
        stop: () => calls.push('stop'),
      };
    }

    createGain() {
      return {
        gain: {
          setValueAtTime: () => calls.push('volume-start'),
          exponentialRampToValueAtTime: () => calls.push('volume-fade'),
        },
        connect: () => undefined,
      };
    }

    resume() {
      return Promise.resolve();
    }
  };
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { AudioContext: fakeAudioContext },
  });

  try {
    playDing();
    assert.deepEqual(calls, [
      'frequency-start',
      'frequency-rise',
      'volume-start',
      'volume-fade',
      'volume-fade',
      'start',
      'stop',
    ]);
  } finally {
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow);
    else Reflect.deleteProperty(globalThis, 'window');
  }
});
