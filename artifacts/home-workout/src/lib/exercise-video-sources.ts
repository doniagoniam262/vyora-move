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
    },
    male: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Squat_-_exercise_demonstration_video.webm',
      pageUrl: 'https://commons.wikimedia.org/wiki/File:Squat_-_exercise_demonstration_video.webm',
      creator: 'FitnessScape',
      license: 'CC BY 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
      external: true,
      orientation: 'landscape',
    },
  },
  'push-up': {
    female: pexels('8472764', '8472764-uhd_2560_1440_25fps.mp4', 'Yaroslav Shuraev', 'woman-doing-push-ups'),
    male: pexels('6388436', '6388436-uhd_2560_1440_25fps.mp4', 'Tima Miroshnichenko', 'man-doing-push-ups'),
  },
  plank: {
    female: pexels('8836970', '8836970-uhd_2732_1440_25fps.mp4', 'MART PRODUCTION', 'a-woman-doing-a-plank'),
    male: pexels('4325592', '4325592-uhd_2732_1440_25fps.mp4', 'cottonbro studio', 'man-doing-a-plank'),
  },
  lunge: {
    female: pexels('4488004', '4488004-hd_1080_1920_25fps.mp4', 'olia danilevich', 'woman-doing-leg-lunges', 'portrait'),
    male: pexels('35585591', '15079561_1080_1920_30fps.mp4', 'khezez | خزاز', 'man-performing-dumbbell-lunges-in-gym', 'portrait'),
  },
  'glute-bridge': {
    female: pexels('6525487', '6525487-hd_1920_1080_25fps.mp4', 'Polina Tankilevitch', 'woman-doing-glute-bridge-exercise'),
    male: pexels('8520042', '8520042-uhd_2732_1122_25fps.mp4', 'KoolShooters', 'a-man-doing-glute-bridges'),
  },
  deadlift: {
    female: pexels('7674502', '7674502-uhd_2732_1440_25fps.mp4', 'cottonbro studio', 'a-woman-lifting-a-barbell'),
    male: pexels('5837708', '5837708-uhd_2560_1440_24fps.mp4', 'RDNE Stock project', 'muscular-man-lifting-a-barbell'),
  },
};

export const exerciseVideoSource = (exerciseId: string, gender: UserGender) =>
  exerciseVideoSources[exerciseId]?.[gender];
