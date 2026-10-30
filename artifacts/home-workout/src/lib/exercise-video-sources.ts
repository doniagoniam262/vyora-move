import type { UserGender } from './profile';

export type ExerciseVideoSource = {
  src: string;
  fallbackSrc?: string;
  pageUrl: string;
  creator: string;
  license: string;
  licenseUrl: string;
  external: boolean;
  orientation: 'portrait' | 'landscape';
  exerciseSpecific?: boolean;
  genderMatched?: boolean;
};

export const exerciseVideoSources: Record<string, Record<UserGender, ExerciseVideoSource>> = {
  squat: {
    female: {
      src: `${import.meta.env.BASE_URL}videos/squat-female-8s.webm`,
      fallbackSrc: `${import.meta.env.BASE_URL}videos/squat-female-8s.mp4`,
      pageUrl: '',
      creator: 'VYORA',
      license: 'VYORA generated demo',
      licenseUrl: '',
      external: false,
      orientation: 'portrait',
      exerciseSpecific: true,
      genderMatched: true,
    },
    male: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Squat_-_exercise_demonstration_video.webm',
      pageUrl: 'https://commons.wikimedia.org/wiki/File:Squat_-_exercise_demonstration_video.webm',
      creator: 'FitnessScape',
      license: 'CC BY 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
      external: true,
      orientation: 'landscape',
      exerciseSpecific: true,
      genderMatched: true,
    },
  },
};

export const exerciseVideoSource = (exerciseId: string, gender: UserGender) =>
  exerciseVideoSources[exerciseId]?.[gender];
