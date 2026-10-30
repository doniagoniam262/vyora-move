const imageBase = `${import.meta.env.BASE_URL}images/exercise-comparisons/`;

type Gender = 'female' | 'male';

const comparisons: Record<string, Partial<Record<Gender, { correct: string; mistake: string }>>> = {
  deadlift: { male: { correct: 'deadlift-male-correct.jpg', mistake: 'deadlift-male-error.jpg' } },
  'bicep-curl': { male: { correct: 'bicep-curl-male-correct.jpg', mistake: 'bicep-curl-male-error.jpg' } },
  'shoulder-press': { male: { correct: 'shoulder-press-male-correct.jpg', mistake: 'shoulder-press-male-error.jpg' } },
  'bench-press': { male: { correct: 'bench-press-male-correct.jpg', mistake: 'bench-press-male-error.jpg' } },
  'glute-bridge': { male: { correct: 'glute-bridge-male-correct.jpg', mistake: 'glute-bridge-male-error.jpg' } },
  'wall-sit': { male: { correct: 'wall-sit-male-correct.jpg', mistake: 'wall-sit-male-error.jpg' } },
  'leg-raise': { male: { correct: 'leg-raise-male-correct.jpg', mistake: 'leg-raise-male-error.jpg' } },
  'cat-cow': { male: { correct: 'cat-cow-male-correct.jpg', mistake: 'cat-cow-male-error.jpg' } },
  crunch: { female: { correct: 'crunch-female-correct.jpg', mistake: 'crunch-female-error.jpg' } },
  'calf-raise': { female: { correct: 'calf-raise-female-correct.jpg', mistake: 'calf-raise-female-error.jpg' } },
  'pull-up': { female: { correct: 'pull-up-female-correct.jpg', mistake: 'pull-up-female-error.jpg' } },
  bicycle: { female: { correct: 'bicycle-female-correct.jpg', mistake: 'bicycle-female-error.jpg' } },
};

export function exerciseComparisonImages(exerciseId: string, gender: Gender) {
  const comparison = comparisons[exerciseId]?.[gender];
  if (!comparison) return undefined;
  return {
    correct: `${imageBase}${comparison.correct}`,
    mistake: `${imageBase}${comparison.mistake}`,
  };
}
