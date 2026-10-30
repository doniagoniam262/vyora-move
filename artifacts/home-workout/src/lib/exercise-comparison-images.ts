const imageBase = `${import.meta.env.BASE_URL}images/exercise-comparisons/`;

type Gender = 'female' | 'male';

const comparisons: Record<string, Partial<Record<Gender, { correct: string; mistake: string }>>> = {
  deadlift: {
    male: { correct: 'deadlift-male-correct.jpg', mistake: 'deadlift-male-error.jpg' },
    female: { correct: 'deadlift-female-correct.jpg', mistake: 'deadlift-female-error.jpg' },
  },
  'bicep-curl': {
    male: { correct: 'bicep-curl-male-correct.jpg', mistake: 'bicep-curl-male-error.jpg' },
    female: { correct: 'bicep-curl-female-correct.jpg', mistake: 'bicep-curl-female-error.jpg' },
  },
  'shoulder-press': {
    male: { correct: 'shoulder-press-male-correct.jpg', mistake: 'shoulder-press-male-error.jpg' },
    female: { correct: 'shoulder-press-female-correct.jpg', mistake: 'shoulder-press-female-error.jpg' },
  },
  'bench-press': {
    male: { correct: 'bench-press-male-correct.jpg', mistake: 'bench-press-male-error.jpg' },
    female: { correct: 'bench-press-female-correct.jpg', mistake: 'bench-press-female-error.jpg' },
  },
  'glute-bridge': { male: { correct: 'glute-bridge-male-correct.jpg', mistake: 'glute-bridge-male-error.jpg' } },
  'wall-sit': { male: { correct: 'wall-sit-male-correct.jpg', mistake: 'wall-sit-male-error.jpg' } },
  'leg-raise': { male: { correct: 'leg-raise-male-correct.jpg', mistake: 'leg-raise-male-error.jpg' } },
  'cat-cow': { male: { correct: 'cat-cow-male-correct.jpg', mistake: 'cat-cow-male-error.jpg' } },
  bicycle: {
    female: { correct: 'bicycle-female-correct.jpg', mistake: 'bicycle-female-error.jpg' },
    male: { correct: 'bicycle-male-correct.jpg', mistake: 'bicycle-male-error.jpg' },
  },
  'calf-raise': {
    female: { correct: 'calf-raise-female-correct.jpg', mistake: 'calf-raise-female-error.jpg' },
    male: { correct: 'calf-raise-male-correct.jpg', mistake: 'calf-raise-male-error.jpg' },
  },
  crunch: {
    female: { correct: 'crunch-female-correct.jpg', mistake: 'crunch-female-error.jpg' },
    male: { correct: 'crunch-male-correct.jpg', mistake: 'crunch-male-error.jpg' },
  },
  'pull-up': {
    female: { correct: 'pull-up-female-correct.jpg', mistake: 'pull-up-female-error.jpg' },
    male: { correct: 'pull-up-male-correct.jpg', mistake: 'pull-up-male-error.jpg' },
  },
  squat: {
    male: { correct: 'squat-male-correct.jpg', mistake: 'squat-male-error.jpg' },
    female: { correct: 'squat-female-correct.jpg', mistake: 'squat-female-error.jpg' },
  },
  'push-up': {
    male: { correct: 'push-up-male-correct.jpg', mistake: 'push-up-male-error.jpg' },
    female: { correct: 'push-up-female-correct.jpg', mistake: 'push-up-female-error.jpg' },
  },
  lunge: {
    male: { correct: 'lunge-male-correct.jpg', mistake: 'lunge-male-error.jpg' },
    female: { correct: 'lunge-female-correct.jpg', mistake: 'lunge-female-error.jpg' },
  },
  plank: {
    male: { correct: 'plank-male-correct.jpg', mistake: 'plank-male-error.jpg' },
    female: { correct: 'plank-female-correct.jpg', mistake: 'plank-female-error.jpg' },
  },
};

export function exerciseComparisonImages(exerciseId: string, gender: Gender) {
  const comparison = comparisons[exerciseId]?.[gender];
  if (!comparison) return undefined;
  return {
    correct: `${imageBase}${comparison.correct}`,
    mistake: `${imageBase}${comparison.mistake}`,
  };
}
