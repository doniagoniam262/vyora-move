export type TrainerFilter = 'all' | 'women' | 'men';

export type TrainingVideo = {
  id: string;
  title: string;
  description: string;
  videoId: string;
  trainer: string;
  trainerGroup: Exclude<TrainerFilter, 'all'> | 'mixed';
  language: string;
  level: string;
  image: string;
};

export const trainingVideos: TrainingVideo[] = [
  {
    id: 'farah-bakkar-home',
    title: 'تمارين منزلية بسيطة للمبتدئين',
    description: 'حركات متنوعة وسهلة في البيت مع المدربة الرياضية فرح بكار.',
    videoId: 'obtzDPwAt6c',
    trainer: 'فرح بكار · صباح النور',
    trainerGroup: 'women',
    language: 'العربية',
    level: 'مبتدئ',
    image: 'images/stretch.jpg',
  },
  {
    id: 'bar-warrior-home-guide',
    title: 'شرح تمارين الكاليسثنكس في المنزل',
    description: 'شرح عربي للتدريب المنزلي بوزن الجسم. اختر التدرج الملائم لقدرتك، وتجاوز أي حركة متقدمة لا تناسبك.',
    videoId: 'HG1vjeHWG1A',
    trainer: 'Bar Warrior · شرح بالعربية',
    trainerGroup: 'men',
    language: 'العربية',
    level: 'متوسط',
    image: 'images/plank.jpg',
  },
  {
    id: 'tarek-plank-basics',
    title: 'البلانك للمبتدئين خطوة بخطوة',
    description: 'تدرّج واضح لتعلّم وضعية البلانك من البداية.',
    videoId: '6HvLcQclEu0',
    trainer: 'Tarek FitCore',
    trainerGroup: 'men',
    language: 'العربية',
    level: 'مبتدئ',
    image: 'images/abs.jpg',
  },
  {
    id: 'arabic-five-moves',
    title: '5 تمارين لكامل الجسم بدون معدات',
    description: 'فيديو عربي قصير للمبتدئين، ويمكن للجميع متابعة الحركات حسب مستواهم.',
    videoId: 'FaWVHKU_I5Y',
    trainer: 'د. إبراهيم الدخيل',
    trainerGroup: 'men',
    language: 'العربية',
    level: 'مبتدئ',
    image: 'images/hero-squat.jpg',
  },
  {
    id: 'farah-neck-shoulder-stretch',
    title: 'إطالات الرقبة والكتفين',
    description: 'حركات إطالة مع شرح عربي من المدربة فرح بكار. تحرك في نطاق مريح دون ضغط على الرقبة، وتوقف إذا ظهر ألم.',
    videoId: '64oux1TtQzY',
    trainer: 'فرح بكار · العربي 2',
    trainerGroup: 'women',
    language: 'العربية',
    level: 'مبتدئ',
    image: 'images/lunges.jpg',
  },
];

const englishVideoCopy: Record<string, { title: string; description: string }> = {
  'farah-bakkar-home': { title: 'Simple Home Workouts for Beginners', description: 'Easy varied movements at home with fitness trainer Farah Bakkar.' },
  'bar-warrior-home-guide': { title: 'Calisthenics at Home: A Guide', description: 'Arabic instruction for bodyweight training at home. Choose progressions that suit your ability and skip any advanced movement that is not right for you.' },
  'tarek-plank-basics': { title: 'Plank for Beginners, Step by Step', description: 'A clear progression to learn the plank from the beginning.' },
  'arabic-five-moves': { title: '5 Full-Body Exercises Without Equipment', description: 'A short Arabic-language video for beginners. Everyone can follow the movements at their own level.' },
  'farah-neck-shoulder-stretch': { title: 'Neck and Shoulder Stretches', description: 'Stretching movements explained in Arabic by trainer Farah Bakkar. Move within a comfortable range without straining your neck, and stop if pain occurs.' },
};
export function localizeVideo(video: TrainingVideo, locale: 'ar' | 'en'): TrainingVideo {
  const copy = englishVideoCopy[video.id];
  return locale === 'en' && copy ? { ...video, ...copy, trainer: video.id === 'bar-warrior-home-guide' ? 'Bar Warrior · Arabic instruction' : video.id === 'farah-bakkar-home' ? 'Farah Bakkar · Sabah Al-Noor' : video.id === 'farah-neck-shoulder-stretch' ? 'Farah Bakkar · Al Arabi 2' : video.id === 'arabic-five-moves' ? 'Dr. Ibrahim Al-Dakhil' : video.trainer, language: 'Arabic', level: video.level === 'مبتدئ' ? 'Beginner' : 'Intermediate' } : video;
}
