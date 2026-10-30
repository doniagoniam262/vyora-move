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

const pexelsLicense = 'https://www.pexels.com/license/';
const pexels = (
  id: string,
  variant: string,
  creator: string,
  slug: string,
  orientation: ExerciseVideoSource['orientation'] = 'landscape',
): ExerciseVideoSource => ({
  src: `https://videos.pexels.com/video-files/${id}/${variant}`,
  pageUrl: `https://www.pexels.com/video/${slug}-${id}/`,
  creator,
  license: 'Pexels License',
  licenseUrl: pexelsLicense,
  external: true,
  orientation,
});

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

const sharedTemporaryExerciseVideo: ExerciseVideoSource = {
  ...pexels('6740278', '6740278-hd_1080_1920_25fps.mp4', 'Mikhail Nilov', 'a-man-and-a-woman-exercising-on-the-floor', 'portrait'),
  exerciseSpecific: false,
  genderMatched: false,
};

// One verified temporary Pexels clip is shared across the non-squat movements.
for (const exerciseId of [
  'march', 'shoulder-circles', 'push-up', 'glute-bridge', 'lunge', 'deadlift',
  'jacks-low', 'mountain-climber', 'incline-push', 'chair-dip', 'plank', 'crunch',
  'bicycle', 'hamstring', 'childs-pose', 'wall-push-up', 'prone-w-raise', 'wall-sit',
  'calf-raise', 'dead-bug', 'side-plank', 'fire-hydrant', 'hip-hinge',
  'pike-push-up', 'knee-push-up', 'wide-push-up', 'close-grip-push-up',
  'bicep-self-curl', 'superman-pull', 'reverse-snow-angel', 'prone-t-raise',
  'scapular-push-up',
]) {
  exerciseVideoSources[exerciseId] = {
    female: sharedTemporaryExerciseVideo,
    male: sharedTemporaryExerciseVideo,
  };
}

export const exerciseVideoSource = (exerciseId: string, gender: UserGender) =>
  exerciseVideoSources[exerciseId]?.[gender];
