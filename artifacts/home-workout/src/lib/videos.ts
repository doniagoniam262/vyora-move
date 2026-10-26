export type TrainerFilter = 'all' | 'women' | 'men';

export type TrainingVideo = {
  id: string;
  title: string;
  description: string;
  videoId: string;
  durationSeconds: number;
  trainer: string;
  trainerGroup: Exclude<TrainerFilter, 'all'> | 'mixed';
  hasEnglishAudioTrack?: boolean;
  language: string;
  level: string;
  image: string;
  thumbnailSource?: 'youtube' | 'local';
};

export const trainingVideos: TrainingVideo[] = [
  {
    id: 'farah-bakkar-home',
    title: 'تمارين منزلية بسيطة للمبتدئين',
    description: 'حركات متنوعة وسهلة في البيت مع المدربة الرياضية فرح بكار.',
    videoId: 'obtzDPwAt6c',
    durationSeconds: 543,
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
    durationSeconds: 364,
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
    durationSeconds: 103,
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
    durationSeconds: 411,
    trainer: 'د. إبراهيم الدخيل',
    trainerGroup: 'men',
    hasEnglishAudioTrack: true,
    language: 'العربية',
    level: 'مبتدئ',
    image: 'images/hero-squat.jpg',
  },
  {
    id: 'farah-neck-shoulder-stretch',
    title: 'إطالات الرقبة والكتفين',
    description: 'حركات إطالة مع شرح عربي من المدربة فرح بكار. تحرك في نطاق مريح دون ضغط على الرقبة، وتوقف إذا ظهر ألم.',
    videoId: '64oux1TtQzY',
    durationSeconds: 660,
    trainer: 'فرح بكار · العربي 2',
    trainerGroup: 'women',
    language: 'العربية',
    level: 'مبتدئ',
    image: 'images/lunges.jpg',
  },
  {
    id: 'akram-bodyweight-fullbody',
    title: 'تمارين لكامل الجسم في المنزل | بناء العضلات في المنزل (بدون معدات، بدون جيم)',
    description: 'تمرين لكامل الجسم بوزن الجسم في المنزل. مستوى الفيديو غير محدد من الناشر؛ اختر حركة مريحة وتوقف إذا ظهر ألم.',
    videoId: 'ZyRSfhuXF34',
    durationSeconds: 902,
    trainer: 'أكرم | Akram',
    trainerGroup: 'men',
    language: 'العربية',
    level: 'غير محدد',
    image: 'images/hero-squat.jpg',
    thumbnailSource: 'local',
  },
  {
    id: 'mostafa-seven-home',
    title: '7 تمارين منزلية للجسم كامل بدون معدات | تبني جسمك في البيت',
    description: 'سبع حركات بوزن الجسم في المنزل. مستوى الفيديو غير محدد من الناشر؛ استخدم التدرج الذي يناسب قدرتك.',
    videoId: 'Zel61SO7zh8',
    durationSeconds: 617,
    trainer: 'Coach Mostafa Fitness',
    trainerGroup: 'men',
    language: 'العربية',
    level: 'غير محدد',
    image: 'images/plank.jpg',
    thumbnailSource: 'local',
  },
  {
    id: 'farah-pilates-abs',
    title: 'تمارين البيلاتس الرياضية لتقوية عضلات البطن مع المدربة الرياضية فرح بكار',
    description: 'تمارين بيلاتس للبطن مع فرح بكار على قناة العربي 2. اختاري حركة مريحة وتوقفي إذا ظهر ألم.',
    videoId: 'qqHwI7D-tWM',
    durationSeconds: 833,
    trainer: 'فرح بكار · العربي 2',
    trainerGroup: 'women',
    language: 'العربية',
    level: 'غير محدد',
    image: 'images/abs.jpg',
    thumbnailSource: 'local',
  },
  {
    id: 'amal-lower-body-home',
    title: 'تمارين رياضية لتحت الجسم في البيت في أقل من 30 دقيقة مع مدربة الرياضة أمال عبيدي',
    description: 'جلسة للجزء السفلي مع أمال عبيدي. يذكر المصدر استخدام الأوزان، لذلك قد تحتاج إلى معدات خفيفة.',
    videoId: '01ZIh6R3dlA',
    durationSeconds: 651,
    trainer: 'أمال عبيدي · صباح النور',
    trainerGroup: 'women',
    language: 'العربية',
    level: 'غير محدد',
    image: 'images/lunges.jpg',
    thumbnailSource: 'local',
  },
];

const englishVideoCopy: Record<string, { title: string; description: string }> = {
  'farah-bakkar-home': { title: 'Simple Home Workouts for Beginners', description: 'Easy varied movements at home with fitness trainer Farah Bakkar.' },
  'bar-warrior-home-guide': { title: 'Calisthenics at Home: A Guide', description: 'Arabic instruction for bodyweight training at home. Choose progressions that suit your ability and skip any advanced movement that is not right for you.' },
  'tarek-plank-basics': { title: 'Plank for Beginners, Step by Step', description: 'A clear progression to learn the plank from the beginning.' },
  'arabic-five-moves': { title: '5 Full-Body Exercises Without Equipment', description: 'A short Arabic-language video for beginners. Everyone can follow the movements at their own level.' },
  'farah-neck-shoulder-stretch': { title: 'Neck and Shoulder Stretches', description: 'Stretching movements explained in Arabic by trainer Farah Bakkar. Move within a comfortable range without straining your neck, and stop if pain occurs.' },
  'akram-bodyweight-fullbody': { title: 'Full-Body Workout at Home | Build Muscle Without Equipment or a Gym', description: 'A bodyweight workout for the whole body at home. The publisher does not specify a level; choose comfortable movements and stop if pain occurs.' },
  'mostafa-seven-home': { title: '7 Full-Body Home Exercises Without Equipment', description: 'Seven bodyweight movements at home. The publisher does not specify a level; use progressions that suit your ability.' },
  'farah-pilates-abs': { title: 'Pilates Exercises to Strengthen the Abs with Trainer Farah Bakkar', description: 'Pilates exercises for the abs with Farah Bakkar on Al Arabi 2. Choose comfortable movements and stop if pain occurs.' },
  'amal-lower-body-home': { title: 'Under-30-Minute Lower-Body Workout at Home with Trainer Amal Obeidi', description: 'A lower-body session with Amal Obeidi. The source mentions using weights, so light equipment may be needed.' },
};

export function formatVideoDuration(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

const englishTrainers: Record<string, string> = {
  'farah-bakkar-home': 'Farah Bakkar · Sabah Al-Noor',
  'bar-warrior-home-guide': 'Bar Warrior · Arabic instruction',
  'tarek-plank-basics': 'Tarek FitCore',
  'arabic-five-moves': 'Dr. Ibrahim Al-Dakhil',
  'farah-neck-shoulder-stretch': 'Farah Bakkar · Al Arabi 2',
  'akram-bodyweight-fullbody': 'Akram',
  'mostafa-seven-home': 'Coach Mostafa Fitness',
  'farah-pilates-abs': 'Farah Bakkar · Al Arabi 2',
  'amal-lower-body-home': 'Amal Obeidi · Sabah Al-Noor',
};

export function localizeVideo(video: TrainingVideo, locale: 'ar' | 'en'): TrainingVideo {
  const copy = englishVideoCopy[video.id];
  const level = video.level === 'مبتدئ' ? 'Beginner' : video.level === 'متوسط' ? 'Intermediate' : 'Not specified';
  return locale === 'en' && copy
    ? { ...video, ...copy, trainer: englishTrainers[video.id] ?? video.trainer, language: 'Arabic', level }
    : video;
}
