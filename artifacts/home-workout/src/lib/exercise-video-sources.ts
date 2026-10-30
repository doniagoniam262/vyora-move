import type { UserGender } from './profile';

export type ExerciseVideoSource = {
  src: string;
  fallbackSrc?: string;
  image: string;
  pageUrl: string;
  creator: string;
  license: string;
  licenseUrl: string;
  external: boolean;
  orientation: 'portrait' | 'landscape';
  exerciseSpecific: boolean;
  genderMatched: boolean;
};

const femaleImage = `${import.meta.env.BASE_URL}images/egyptian_girl_full.jpg`;
const maleImage = `${import.meta.env.BASE_URL}images/egyptian_boy_full.jpg`;

const publicVideo = (fileName: string) =>
  `/api/storage/public-objects/vyora/videos/${fileName}`;

const femaleVideos: Record<string, string> = {
  'jacks-low': publicVideo('jumping-jacks-female.mp4'),
  squat: publicVideo('squat-female.mp4'),
  'push-up': publicVideo('pushups-female.mp4'),
  plank: publicVideo('plank-female.mp4'),
  lunge: publicVideo('lunges-female.mp4'),
};

const maleVideos: Record<string, string> = {
  'pull-up': publicVideo('pullups-male.mp4'),
  deadlift: publicVideo('deadlift-male.mp4'),
  'bench-press': publicVideo('bench-press-male.mp4'),
  'bicep-curl': publicVideo('bicep-curls-male.mp4'),
  'shoulder-press': publicVideo('shoulder-press-male.mp4'),
};

const sourceFor = (exerciseId: string, gender: UserGender): ExerciseVideoSource => {
  const src = gender === 'female'
    ? (femaleVideos[exerciseId] ?? '')
    : (maleVideos[exerciseId] ?? '');
  return {
    src,
    image: gender === 'female' ? femaleImage : maleImage,
    pageUrl: '',
    creator: '',
    license: '',
    licenseUrl: '',
    external: false,
    orientation: 'portrait',
    exerciseSpecific: Boolean(src),
    genderMatched: true,
  };
};

const supportedExerciseIds = [
  'jacks-low',
  'shoulder-circles',
  'arm-circles',
  'chest-expansion',
  'torso-twists',
  'squat',
  'glute-bridge',
  'leg-raise',
  'lunge',
  'calf-raise',
  'march',
  'high-knees',
  'wall-sit',
  'push-up',
  'plank',
  'superman-pull',
  'crunch',
  'bicycle',
  'side-plank',
  'chair-dip',
  'standing-side-stretch',
  'cat-cow',
  'pull-up',
  'deadlift',
  'bench-press',
  'bicep-curl',
  'shoulder-press',
];

export const exerciseVideoSources: Record<string, Record<UserGender, ExerciseVideoSource>> =
  Object.fromEntries(
    supportedExerciseIds.map((id) => [
      id,
      {
        female: sourceFor(id, 'female'),
        male: sourceFor(id, 'male'),
      },
    ]),
  );

export const exerciseVideoSource = (exerciseId: string, gender: UserGender) =>
  exerciseVideoSources[exerciseId]?.[gender];
