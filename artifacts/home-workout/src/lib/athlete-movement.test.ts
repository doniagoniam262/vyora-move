import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { poseAt } from '../components/athlete-movement';

type Pose = Parameters<typeof poseAt>[0][number];
const standing: Pose = { x: 200, y: 162, t: 0, aN: [6, 14], aF: [-6, 8], lN: [0, 0], lF: [2, 0] };
const lowered: Pose = { ...standing, x: 183, y: 205, t: 38, aN: [90, 90], lN: [80, -30] };
const frames = [standing, lowered];

test('a slightly negative first animation phase never reads a missing keyframe', () => {
  const pose = poseAt(frames, -0.001, false);
  assert.ok(Number.isFinite(pose.x));
  assert.ok(Math.abs(pose.x - standing.x) < 0.001);
});

test('phase wrapping stays finite across long playback and exercise transitions', () => {
  for (const phase of [-100, -2, -1, -Number.EPSILON, 0, 0.5, 1, 1.999, 2, 3.75, 1e10, NaN, Infinity, -Infinity]) {
    for (const reduced of [false, true]) {
      const pose = poseAt(frames, phase, reduced);
      for (const value of [pose.x, pose.y, pose.t, ...pose.aN, ...pose.aF, ...pose.lN, ...pose.lF]) {
        assert.ok(Number.isFinite(value), `phase=${phase}, reduced=${reduced}`);
      }
    }
  }
});

test('normal playback and reduced-motion key poses retain their original positions', () => {
  assert.equal(poseAt(frames, 0, false).x, standing.x);
  assert.equal(poseAt(frames, 1, false).x, lowered.x);
  assert.equal(poseAt(frames, 0.75, true).x, standing.x);
  assert.equal(poseAt(frames, 1.75, true).x, lowered.x);
});
