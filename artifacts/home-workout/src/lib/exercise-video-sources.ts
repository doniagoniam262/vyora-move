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

const femaleImage = `${import.meta.env.BASE_URL}images/vyora-ui/female-profile.jpg`;
const maleImage = `${import.meta.env.BASE_URL}images/vyora-ui/male-profile.jpg`;

// Videos are intentionally empty until the project owner uploads licensed files.
const femaleVideo = '';
const maleVideo = '';

const sourceFor = (gender: UserGender): ExerciseVideoSource => ({
  src: gender === 'female' ? femaleVideo : maleVideo,
  image: gender === 'female' ? femaleImage : maleImage,
  pageUrl: '',
  creator: '',
  license: '',
  licenseUrl: '',
  external: false,
  orientation: 'portrait',
  exerciseSpecific: false,
  genderMatched: true,
});

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
];

export const exerciseVideoSources: Record<string, Record<UserGender, ExerciseVideoSource>> =
  Object.fromEntries(
    supportedExerciseIds.map((id) => [
      id,
      {
        female: sourceFor('female'),
        male: sourceFor('male'),
      },
    ]),
  );

export const exerciseVideoSource = (exerciseId: string, gender: UserGender) =>
  exerciseVideoSources[exerciseId]?.[gender];
