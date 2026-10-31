import type { UserGender } from './profile';
import type { Exercise, WorkoutPlan } from './data';
import { planExercises } from './data';
import { exerciseVideoSource } from './exercise-video-sources';

const femaleHiddenExerciseIds = new Set(['calf-raise', 'pull-up']);

export function exercisesAvailableForGender<T extends Pick<Exercise, 'id'>>(
  items: readonly T[],
  gender?: UserGender,
): T[] {
  if (gender === 'female') {
    return items.filter((exercise) => !femaleHiddenExerciseIds.has(exercise.id));
  }
  if (gender === 'male') {
    return items.filter((exercise) => Boolean(exerciseVideoSource(exercise.id, gender)?.src));
  }
  return [...items];
}

export function planExercisesAvailableForGender(plan: WorkoutPlan, gender?: UserGender): Exercise[] {
  return exercisesAvailableForGender(planExercises(plan), gender);
}
