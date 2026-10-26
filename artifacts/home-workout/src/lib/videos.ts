export type TrainerFilter = 'all' | 'women' | 'men';

export type TrainingVideo = {
  id: string;
  title: string;
  description: string;
  videoId: string;
  trainer: string;
  trainerGroup: Exclude<TrainerFilter, 'all'> | 'mixed';
  language: 'العربية' | 'English';
  level: 'مبتدئ' | 'متوسط';
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
    id: 'jared-beginner-full-body',
    title: 'تمرين جسم كامل بدون معدات',
    description: 'جلسة للمبتدئين يقودها مختص علاج طبيعي، مع خيارات للتمرين في البيت.',
    videoId: '7GkMHPe_OXw',
    trainer: 'Jared · Tone and Tighten',
    trainerGroup: 'men',
    language: 'English',
    level: 'مبتدئ',
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
    trainer: 'تمرين منزلي',
    trainerGroup: 'mixed',
    language: 'العربية',
    level: 'مبتدئ',
    image: 'images/hero-squat.jpg',
  },
  {
    id: 'joanna-form-guide',
    title: 'تعليم السكوات والاندفاع والضغط والبلانك',
    description: 'شرح تفصيلي لأربع حركات أساسية مع المدربة المعتمدة Joanna Soh.',
    videoId: 'bI2qDaLrKCg',
    trainer: 'Joanna Soh',
    trainerGroup: 'women',
    language: 'English',
    level: 'مبتدئ',
    image: 'images/lunges.jpg',
  },
];
