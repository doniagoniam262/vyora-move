const imageBase = `${import.meta.env.BASE_URL}images/exercise-comparisons/`;

const comparisons: Record<string, { correct: string; mistake: string }> = {
  squat: { correct: 'squat-correct.jpg', mistake: 'squat-error.jpg' },
  'push-up': { correct: 'push-up-correct.jpg', mistake: 'push-up-error.jpg' },
  plank: { correct: 'plank-correct.jpg', mistake: 'plank-error.jpg' },
  crunch: { correct: 'crunch-correct.jpg', mistake: 'crunch-error.jpg' },
  bicycle: { correct: 'bicycle-correct.jpg', mistake: 'bicycle-error.jpg' },
  'glute-bridge': { correct: 'glute-bridge-correct.jpg', mistake: 'glute-bridge-error.jpg' },
  'leg-raise': { correct: 'leg-raise-correct.jpg', mistake: 'leg-raise-error.jpg' },
  lunge: { correct: 'lunge-correct.jpg', mistake: 'lunge-error.jpg' },
  'calf-raise': { correct: 'calf-raise-correct.jpg', mistake: 'calf-raise-error.jpg' },
  'wall-sit': { correct: 'wall-sit-correct.jpg', mistake: 'wall-sit-error.jpg' },
  'cat-cow': { correct: 'cat-cow-correct.jpg', mistake: 'cat-cow-error.jpg' },
  'pull-up': { correct: 'pull-up-correct.jpg', mistake: 'pull-up-error.jpg' },
  deadlift: { correct: 'deadlift-correct.jpg', mistake: 'deadlift-error.jpg' },
  'bench-press': { correct: 'bench-press-correct.jpg', mistake: 'bench-press-error.jpg' },
  'bicep-curl': { correct: 'bicep-curl-correct.jpg', mistake: 'bicep-curl-error.jpg' },
  'shoulder-press': { correct: 'shoulder-press-correct.jpg', mistake: 'shoulder-press-error.jpg' },
};

export function exerciseComparisonImages(exerciseId: string) {
  const comparison = comparisons[exerciseId];
  if (!comparison) return undefined;
  return {
    correct: `${imageBase}${comparison.correct}`,
    mistake: `${imageBase}${comparison.mistake}`,
  };
}
