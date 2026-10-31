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

const localVideo = (fileName: string) =>
  `${import.meta.env.BASE_URL}videos/${fileName}`;

const femaleVideos: Record<string, string> = {
  squat: localVideo('female-squat-demo.mp4'),
  'push-up': publicVideo('pushups-female.mp4'),
  plank: publicVideo('plank-female.mp4'),
  lunge: publicVideo('lunges-female.mp4'),
  deadlift: localVideo('female-deadlift-demo.mp4'),
  crunch: localVideo('female-crunch-demo.mp4'),
  bicycle: localVideo('female-bicycle-crunch-demo.mp4'),
  'cat-cow': localVideo('female-cat-cow-demo.mp4'),
  'wall-sit': localVideo('female-wall-sit-demo.mp4'),
  'leg-raise': localVideo('female-leg-raise-demo.mp4'),
  'glute-bridge': localVideo('female-glute-bridge-demo.mp4'),
  'bench-press': localVideo('female-bench-press-demo.mp4'),
  'shoulder-press': localVideo('female-shoulder-press-demo.mp4'),
};

const maleVideos: Record<string, string> = {
  'pull-up': publicVideo('pullups-male.mp4'),
  deadlift: publicVideo('deadlift-male.mp4'),
  'bench-press': publicVideo('bench-press-male.mp4'),
  'shoulder-press': publicVideo('shoulder-press-male.mp4'),
};

const sourceFor = (exerciseId: string, gender: UserGender): ExerciseVideoSource => {
  const src = gender === 'female'
    ? (femaleVideos[exerciseId] ?? '')
    : (maleVideos[exerciseId] ?? '');
  return {
    src,
    fallbackSrc: gender === 'male' && src ? src.replace(/\.mp4$/, '.webm') : undefined,
    image: gender === 'female' ? femaleImage : maleImage,
    pageUrl: '',
    creator: '',
    license: '',
    licenseUrl: '',
    external: false,
    orientation: gender === 'female' && [
      'squat',
      'deadlift',
      'cat-cow',
      'wall-sit',
      'leg-raise',
      'glute-bridge',
      'crunch',
      'bicycle',
      'bench-press',
      'shoulder-press',
    ].includes(exerciseId) ? 'landscape' : 'portrait',
    exerciseSpecific: Boolean(src),
    genderMatched: true,
  };
};

const supportedExerciseIds = [
  'squat',
  'push-up',
  'plank',
  'crunch',
  'bicycle',
  'glute-bridge',
  'leg-raise',
  'lunge',
  'calf-raise',
  'wall-sit',
  'cat-cow',
  'pull-up',
  'deadlift',
  'bench-press',
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
