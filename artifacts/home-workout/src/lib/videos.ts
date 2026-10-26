export type TrainerFilter = 'all' | 'women' | 'men';

export type TrainingVideo = {
  id: string;
  title: string;
  description: string;
  videoId: string;
  trainer: string;
  trainerGroup: Exclude<TrainerFilter, 'all'> | 'mixed';
  language: 'العربية';
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
