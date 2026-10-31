import type { UserGender } from './profile';
import type { Exercise, WorkoutPlan } from './data';
import { planExercises } from './data';
import { exerciseVideoSource } from './exercise-video-sources';

export function exercisesAvailableForGender<T extends Pick<Exercise, 'id'>>(
  items: readonly T[],
  gender?: UserGender,
): T[] {
  if (gender !== 'male') return [...items];
  return items.filter((exercise) => Boolean(exerciseVideoSource(exercise.id, gender)?.src));
}

export function planExercisesAvailableForGender(plan: WorkoutPlan, gender?: UserGender): Exercise[] {
  return exercisesAvailableForGender(planExercises(plan), gender);
}
