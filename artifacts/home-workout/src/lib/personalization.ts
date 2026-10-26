import type { Level, WorkoutPlan } from './data';
import { planById } from './data';
import type { FitnessGoal } from './profile';

const goalPlanIds: Record<FitnessGoal, Record<Level, string>> = {
  'lose-weight': {
    beginner: 'lose-weight-plan',
    intermediate: 'lose-weight-intermediate',
  },
  'build-muscle': {
    beginner: 'build-muscle-plan',
    intermediate: 'build-muscle-intermediate',
  },
  fitness: {
    beginner: 'fitness-plan',
    intermediate: 'fitness-intermediate',
  },
  'gain-weight': {
    beginner: 'gain-weight-plan',
    intermediate: 'gain-weight-intermediate',
  },
};

export function goalWorkoutPlan(goal: FitnessGoal, level: Level): WorkoutPlan | undefined {
  return planById(goalPlanIds[goal][level]);
}

const defaultDayPatterns: Record<number, number[]> = {
  1: [2],
  2: [1, 5],
  3: [0, 2, 5],
  4: [0, 2, 4, 6],
  5: [0, 1, 3, 5, 6],
  6: [0, 1, 2, 4, 5, 6],
  7: [0, 1, 2, 3, 4, 5, 6],
};

export function suggestedTrainingDays(sessionsPerWeek: number): number[] {
  const safeCount = Math.min(7, Math.max(1, Math.floor(sessionsPerWeek) || 1));
  return [...defaultDayPatterns[safeCount]];
}

