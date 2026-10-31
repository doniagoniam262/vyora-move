import assert from 'node:assert/strict';
import test from 'node:test';
import { chooseWelcomeVoice } from './welcome-voice';

const voice = (name: string, lang: string) =>
  ({ name, lang }) as SpeechSynthesisVoice;

test('prefers a named en-US male voice', () => {
  const defaultVoice = voice('Google US English', 'en-US');
  const maleVoice = voice('English Male', 'en-US');

  assert.equal(chooseWelcomeVoice([defaultVoice, maleVoice]), maleVoice);
});

test('falls back to a Google en-US voice', () => {
  const googleVoice = voice('Google US English', 'en-US');

  assert.equal(chooseWelcomeVoice([voice('Samantha', 'en-US'), googleVoice]), googleVoice);
});

test('falls back to the first available voice', () => {
  const firstVoice = voice('Default Voice', 'en-GB');

  assert.equal(chooseWelcomeVoice([firstVoice, voice('Samantha', 'en-US')]), firstVoice);
  assert.equal(chooseWelcomeVoice([]), undefined);
});
