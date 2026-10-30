import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Router, type BaseLocationHook } from 'wouter';
import { estimateEnergy } from './energy';
import { isVYORAProfile, readVYORAProfile, saveVYORAProfile, type VYORAProfile } from './profile';
import { exercises } from './data';
import { movementInsights } from './movement-details';
import { muscleEducation } from './muscle-education';
import { athleteExerciseIds } from '../components/athlete-movement';
import { BodyShapeGuide, femaleBodyShapes } from '../components/body-shape-guide';
import BodyShapesPage from '../pages/body-shapes';
import { LocaleProvider } from './locale';
import { VYORAProfileContext } from './profile-context';

const legacy: VYORAProfile = { weightKg: 68, heightCm: 170, gender: 'female', bodyType: 'medium', goal: 'fitness', sessionsPerWeek: 3 };

test('legacy saved profiles remain valid without calorie inputs', () => {
  assert.equal(isVYORAProfile(legacy), true);
  assert.equal(estimateEnergy(legacy), null);
});

test('all five female shape labels have bilingual guidance and remain saveable', () => {
  assert.deepEqual(femaleBodyShapes.map(shape => shape.value), ['hourglass', 'pear', 'inverted-triangle', 'rectangle', 'apple']);
  for (const shape of femaleBodyShapes) {
    for (const locale of ['ar', 'en'] as const) {
      assert.ok(shape.label[locale].length > 3);
      assert.ok(shape.description[locale].length > 40);
      assert.ok(shape.measurements[locale].length > 35);
    }
  }
  for (const bodyType of ['apple', 'pear', 'hourglass', 'inverted-triangle', 'rectangle'] as const)
    for (const goal of ['lose-weight', 'gain-weight', 'build-muscle', 'fitness'] as const)
      assert.equal(isVYORAProfile({ ...legacy, bodyType, goal, ageYears: 25, activityLevel: 'light' }), true);
});

test('the body-shape selector renders all five localized descriptions and measurement guidance', () => {
  // The workspace TSX runner uses classic JSX; expose React for server rendering.
  Object.assign(globalThis, { React });
  for (const locale of ['ar', 'en'] as const) {
    const html = renderToStaticMarkup(React.createElement(BodyShapeGuide, {
      selected: 'hourglass',
      onSelect: () => {},
      locale,
      accent: '#f184b6',
    }));
    for (const shape of femaleBodyShapes) {
      assert.ok(html.includes(`button-body-${shape.value}`));
      assert.ok(html.includes(shape.label[locale]));
      assert.ok(html.includes(shape.description[locale]));
      assert.ok(html.includes(shape.measurements[locale]));
    }
    assert.ok(html.includes('body-measurement-help'));
    assert.ok(html.includes(locale === 'ar' ? 'الوسط' : 'Waist'));
  }
});

test('body-shapes page uses the five supplied photos only for female profiles', () => {
  Object.assign(globalThis, { React });
  const staticLocation: BaseLocationHook = () => ['/body-shapes', () => {}];
  const renderPage = (gender: 'female' | 'male') => {
    return renderToStaticMarkup(
      React.createElement(Router, { hook: staticLocation },
        React.createElement(LocaleProvider, null,
          React.createElement(VYORAProfileContext.Provider, { value: { ...legacy, gender } },
            React.createElement(BodyShapesPage),
          ),
        ),
      ),
    );
  };
  const femaleHtml = renderPage('female');
  for (const shape of ['apple', 'rectangle', 'inverted-triangle', 'pear', 'hourglass']) {
    assert.ok(femaleHtml.includes(`/images/vyora-ui/body-${shape}.jpg`));
  }
  assert.ok(femaleHtml.includes('100'));
  const maleHtml = renderPage('male');
  assert.ok(maleHtml.includes('body-shapes-female-only'));
  assert.ok(!maleHtml.includes('/images/vyora-ui/body-apple.jpg'));
});

test('adult energy formula uses age, gender, measurements and explicit activity', () => {
  assert.deepEqual(estimateEnergy({ ...legacy, ageYears: 25, activityLevel: 'light' }), {
    resting: 1460, maintenance: 2000, low: 1800, high: 2200,
  });
  const male = estimateEnergy({ ...legacy, gender: 'male', weightKg: 80, heightCm: 180, ageYears: 30, activityLevel: 'light' });
  assert.equal(male?.resting, 1780);
  assert.equal(male?.maintenance, 2450);
});

test('missing or invalid fields never generate a made-up calorie value', () => {
  const valid = { ...legacy, ageYears: 25, activityLevel: 'light' as const };
  for (const patch of [
    { ageYears: undefined }, { activityLevel: undefined }, { ageYears: 17 },
    { ageYears: 25.5 }, { ageYears: 101 }, { weightKg: NaN }, { weightKg: Infinity },
    { heightCm: 0 }, { gender: 'other' }, { activityLevel: '__proto__' },
  ]) assert.equal(estimateEnergy({ ...valid, ...patch } as Partial<VYORAProfile>), null);
  assert.equal(isVYORAProfile({ ...valid, ageYears: 17 }), false);
  assert.equal(isVYORAProfile({ ...valid, activityLevel: 'invalid' }), false);
});

test('body shape and goal never change the maintenance estimate', () => {
  const base = { ...legacy, ageYears: 25, activityLevel: 'light' as const };
  assert.deepEqual(estimateEnergy({ ...base, goal: 'lose-weight', bodyType: 'apple' }), estimateEnergy({ ...base, goal: 'gain-weight', bodyType: 'hourglass' }));
});

test('profile persistence round-trips new fields without replacing another user profile', () => {
  const values = new Map<string, string>();
  Object.defineProperty(globalThis, 'window', { configurable: true, value: {
    localStorage: { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value), removeItem: (key: string) => values.delete(key) },
  } });
  try {
    const next: VYORAProfile = { ...legacy, name: 'Maya', bodyType: 'pear', ageYears: 25, activityLevel: 'light' };
    assert.equal(saveVYORAProfile('test-female', next), true);
    assert.deepEqual(readVYORAProfile('test-female'), next);
    assert.equal(saveVYORAProfile('test-legacy', legacy), true);
    assert.deepEqual(readVYORAProfile('test-legacy'), legacy);
    const triangle = { ...legacy, bodyType: 'inverted-triangle' as const };
    assert.equal(saveVYORAProfile('test-triangle', triangle), true);
    assert.deepEqual(readVYORAProfile('test-triangle'), triangle);
    values.set('vyora-profile-v1:test-female', '{broken');
    assert.equal(readVYORAProfile('test-female'), null);
    assert.deepEqual(readVYORAProfile('test-legacy'), legacy);
    assert.equal(saveVYORAProfile('invalid', { ...legacy, weightKg: -10 }), false);
  } finally {
    Reflect.deleteProperty(globalThis, 'window');
  }
});

test('every existing exercise has bilingual muscle education with three technique checkpoints', () => {
  assert.equal(exercises.length >= 32, true);
  for (const exercise of exercises) {
    const insight = movementInsights[exercise.id];
    assert.ok(insight, exercise.id);
    for (const id of [...insight.primary, ...insight.secondary]) {
      const education = muscleEducation[id];
      assert.ok(education, id);
      assert.equal(education.steps.length, 3);
      for (const locale of ['ar', 'en'] as const) {
        assert.ok(education.role[locale].length > 20);
        assert.ok(education.benefit[locale].length > 20);
        assert.ok(education.steps.every(step => step[locale].length > 20));
      }
    }
  }
});

test('every existing exercise has its own internal movement configuration', () => {
  assert.deepEqual(new Set(athleteExerciseIds), new Set(exercises.map(exercise => exercise.id)));
});
