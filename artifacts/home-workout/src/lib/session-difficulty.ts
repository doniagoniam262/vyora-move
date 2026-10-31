import type { Level, SessionDifficulty } from './data';

export function adjustLevelForFeedback(level: Level, difficulty: SessionDifficulty): Level {
  if (difficulty === 'easy' && level === 'beginner') return 'intermediate';
  if (difficulty === 'hard' && level === 'intermediate') return 'beginner';
  return level;
}
