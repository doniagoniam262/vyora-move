export type Level = 'beginner' | 'intermediate';
export type Exercise = {
  id: string;
  name: string;
  focus: string;
  duration: number;
  reps?: number;
  cue: string;
  restAfter: number;
  easier?: string;
};
export type Workout = {
  id: string;
  title: string;
  subtitle: string;
  level: Level;
  minutes: number;
  accent: string;
  label: string;
  exercises: Exercise[];
};
export type SavedSession = {
  id: string;
  workoutId: string;
  workoutTitle: string;
  completedAt: string;
  durationSeconds: number;
  exerciseCount: number;
};

export const workouts: Workout[] = [
  {
    id: 'gentle-start', title: 'بداية خفيفة', subtitle: 'حركة هادئة لتبدأ يومك بثقة', level: 'beginner', minutes: 8,
    accent: 'sage', label: 'للمبتدئين',
    exercises: [
      { id: 'march', name: 'مشي في المكان', focus: 'إحماء لطيف', duration: 40, cue: 'قف براحة، وارفع قدميك بالتبادل مع تحريك الذراعين بهدوء.', restAfter: 15, easier: 'قلّل ارتفاع القدمين أو تمسّك بكرسي ثابت.' },
      { id: 'wall-squat', name: 'جلوس نحو الحائط', focus: 'الساقان', duration: 35, reps: 8, cue: 'اقترب من الحائط، اثنِ الركبتين قليلًا ثم عد للوقوف. تحرّك بمدى مريح.', restAfter: 20, easier: 'اكتفِ بثني بسيط للركبتين.' },
      { id: 'wall-push', name: 'دفع الحائط', focus: 'الذراعان والصدر', duration: 35, reps: 8, cue: 'ضع كفيك على الحائط بعرض الكتفين، قرّب صدرك ثم ادفع بلطف.', restAfter: 20, easier: 'قف أقرب إلى الحائط لتخفيف الجهد.' },
      { id: 'standing-reach', name: 'مدّ الذراعين', focus: 'الكتفان', duration: 40, cue: 'ارفع ذراعًا للأعلى بالتبادل، ومدّ جانبك دون شدّ أو استعجال.', restAfter: 15 },
      { id: 'chair-stand', name: 'وقوف من الكرسي', focus: 'الحركة اليومية', duration: 40, reps: 8, cue: 'من كرسي ثابت، انهض ببطء ثم اجلس بتحكّم. استخدم يديك عند الحاجة.', restAfter: 15, easier: 'استعن بمساند الكرسي أو قلّل التكرارات.' },
    ],
  },
  {
    id: 'steady-strength', title: 'قوة على مهل', subtitle: 'تمارين أساسية بإيقاع متوازن', level: 'beginner', minutes: 12,
    accent: 'coral', label: 'إيقاع متوازن',
    exercises: [
      { id: 'step-tap', name: 'خطوة ولمسة', focus: 'تنشيط الجسم', duration: 45, cue: 'خطوة جانبية صغيرة ثم المس الأرض قرب القدم. بدّل الجانبين براحة.', restAfter: 15, easier: 'ابقَ في مكانك واكتفِ بتحريك القدم.' },
      { id: 'chair-squat', name: 'قرفصاء للكرسي', focus: 'الساقان', duration: 40, reps: 10, cue: 'ادفع الوركين للخلف نحو كرسي ثابت، المسه بخفة ثم قف.', restAfter: 20, easier: 'استخدم كرسيًا أعلى أو قلّل النزول.' },
      { id: 'incline-push', name: 'دفع على سطح ثابت', focus: 'الجزء العلوي', duration: 40, reps: 8, cue: 'ضع يديك على حائط أو سطح ثابت، وحافظ على جسمك مستقيمًا.', restAfter: 20, easier: 'اختر الحائط بدل السطح المنخفض.' },
      { id: 'bird-dog', name: 'مدّ متبادل', focus: 'التوازن', duration: 45, cue: 'على أربع أو واقفًا مع الاستناد، مدّ ذراعًا وساقًا متعاكستين ثم بدّل.', restAfter: 20, easier: 'حرّك ذراعًا واحدة في كل مرة.' },
      { id: 'calf-raise', name: 'رفع الكعبين', focus: 'الكاحلان', duration: 40, reps: 12, cue: 'استند إلى كرسي، ارفع كعبيك ببطء ثم أنزلهما بتحكّم.', restAfter: 15 },
      { id: 'breath-stretch', name: 'تنفّس وتمدد', focus: 'ختام هادئ', duration: 45, cue: 'خذ نفسًا هادئًا، وافتح الذراعين للجانبين ثم أرخِهما.', restAfter: 0 },
    ],
  },
  {
    id: 'daily-flow', title: 'تدفّق يومي', subtitle: 'تحدٍ لطيف للجسم كاملًا', level: 'intermediate', minutes: 16,
    accent: 'gold', label: 'لديك خبرة',
    exercises: [
      { id: 'march-fast', name: 'مشي نشيط', focus: 'إحماء', duration: 50, cue: 'امشِ في المكان بإيقاع نشيط تستطيع معه الكلام براحة.', restAfter: 15 },
      { id: 'reverse-lunge', name: 'خطوة خلفية', focus: 'الساقان', duration: 45, reps: 10, cue: 'تمسّك بكرسي، خذ خطوة قصيرة للخلف وارجع. بدّل القدمين.', restAfter: 20, easier: 'اكتفِ بلمس القدم للخلف دون ثني عميق.' },
      { id: 'incline-push-2', name: 'دفع مائل', focus: 'الصدر والذراعان', duration: 45, reps: 10, cue: 'استخدم سطحًا ثابتًا مرتفعًا، وانزل ببطء ثم ادفع للعودة.', restAfter: 20, easier: 'استخدم الحائط لنسخة أخف.' },
      { id: 'hip-hinge', name: 'ميل الورك', focus: 'الوركان', duration: 45, reps: 12, cue: 'اثنِ الوركين للخلف مع ظهر مريح، ثم عد للوقوف. حافظ على حركة صغيرة.', restAfter: 20 },
      { id: 'side-step', name: 'خطوات جانبية', focus: 'الحركة والتوازن', duration: 50, cue: 'خطوتان صغيرتان لليمين ثم لليسار، مع ذراعين مرتاحتين.', restAfter: 15 },
      { id: 'wall-sit', name: 'ثبات قرب الحائط', focus: 'الساقان', duration: 30, cue: 'استند إلى الحائط واثنِ الركبتين قليلًا. قف إذا رغبت في الراحة.', restAfter: 20, easier: 'ابقَ واقفًا مع ثني بسيط.' },
      { id: 'standing-reach-2', name: 'تمدد جانبي', focus: 'التهدئة', duration: 45, cue: 'مدّ ذراعك فوق الرأس ومِل قليلًا للجانب، ثم بدّل بهدوء.', restAfter: 0 },
    ],
  },
  {
    id: 'gentle-plus', title: 'بداية على راحتك', subtitle: 'مساحة أطول لحركة متدرجة', level: 'beginner', minutes: 16,
    accent: 'sage', label: 'للمبتدئين',
    exercises: [
      { id: 'march-plus', name: 'مشي في المكان', focus: 'إحماء لطيف', duration: 55, cue: 'امشِ في مكانك وارفع قدميك بالتبادل. ابدأ بإيقاع مريح.', restAfter: 15, easier: 'قلّل ارتفاع القدمين أو تمسّك بكرسي ثابت.' },
      { id: 'reach-plus', name: 'مدّ الذراعين', focus: 'الكتفان', duration: 50, cue: 'ارفع ذراعًا للأعلى بالتبادل، ومدّ جانبك دون شدّ أو استعجال.', restAfter: 15 },
      { id: 'wall-squat-plus', name: 'جلوس نحو الحائط', focus: 'الساقان', duration: 50, reps: 10, cue: 'اقترب من الحائط، اثنِ الركبتين قليلًا ثم عد للوقوف ببطء.', restAfter: 20, easier: 'اكتفِ بثني بسيط للركبتين.' },
      { id: 'wall-push-plus', name: 'دفع الحائط', focus: 'الذراعان والصدر', duration: 50, reps: 10, cue: 'ضع كفيك على الحائط بعرض الكتفين، قرّب صدرك ثم ادفع بلطف.', restAfter: 20, easier: 'قف أقرب إلى الحائط لتخفيف الجهد.' },
      { id: 'step-plus', name: 'خطوة جانبية', focus: 'التوازن', duration: 50, cue: 'خذ خطوة صغيرة إلى الجانب ثم عد للمنتصف، وبدّل بهدوء.', restAfter: 15 },
      { id: 'chair-stand-plus', name: 'وقوف من الكرسي', focus: 'الحركة اليومية', duration: 50, reps: 8, cue: 'من كرسي ثابت، انهض ببطء ثم اجلس بتحكّم. استخدم يديك عند الحاجة.', restAfter: 20, easier: 'استعن بمساند الكرسي أو قلّل التكرارات.' },
      { id: 'breath-plus', name: 'تنفّس وتمدد', focus: 'ختام هادئ', duration: 55, cue: 'خذ نفسًا هادئًا، وافتح الذراعين للجانبين ثم أرخِهما.', restAfter: 0 },
    ],
  },
  {
    id: 'steady-short', title: 'نشاط متوازن', subtitle: 'جلسة مركّزة بخطوات واضحة', level: 'intermediate', minutes: 8,
    accent: 'coral', label: 'إيقاع متوازن',
    exercises: [
      { id: 'march-short', name: 'مشي نشيط', focus: 'إحماء', duration: 45, cue: 'امشِ في المكان بإيقاع نشيط تستطيع معه الكلام براحة.', restAfter: 15 },
      { id: 'chair-squat-short', name: 'قرفصاء للكرسي', focus: 'الساقان', duration: 40, reps: 8, cue: 'ادفع الوركين للخلف نحو كرسي ثابت، المسه بخفة ثم قف.', restAfter: 20, easier: 'استخدم كرسيًا أعلى أو قلّل النزول.' },
      { id: 'incline-short', name: 'دفع مائل', focus: 'الجزء العلوي', duration: 40, reps: 8, cue: 'ضع يديك على حائط أو سطح ثابت، وحافظ على جسمك مستقيمًا.', restAfter: 20, easier: 'اختر الحائط بدل السطح المنخفض.' },
      { id: 'side-short', name: 'خطوات جانبية', focus: 'الحركة والتوازن', duration: 45, cue: 'خطوتان صغيرتان لليمين ثم لليسار بإيقاعك.', restAfter: 15 },
      { id: 'stretch-short', name: 'تمدد جانبي', focus: 'التهدئة', duration: 45, cue: 'مدّ ذراعك فوق الرأس ومِل قليلًا للجانب، ثم بدّل بهدوء.', restAfter: 0 },
    ],
  },
  {
    id: 'steady-mid', title: 'قوة متوازنة', subtitle: 'حركات أساسية بإيقاع متقدم قليلًا', level: 'intermediate', minutes: 12,
    accent: 'gold', label: 'لديك خبرة',
    exercises: [
      { id: 'march-mid', name: 'مشي نشيط', focus: 'إحماء', duration: 50, cue: 'امشِ في المكان بإيقاع نشيط تستطيع معه الكلام براحة.', restAfter: 15 },
      { id: 'reverse-mid', name: 'خطوة خلفية', focus: 'الساقان', duration: 45, reps: 10, cue: 'تمسّك بكرسي، خذ خطوة قصيرة للخلف وارجع. بدّل القدمين.', restAfter: 20, easier: 'اكتفِ بلمس القدم للخلف دون ثني عميق.' },
      { id: 'push-mid', name: 'دفع مائل', focus: 'الصدر والذراعان', duration: 45, reps: 10, cue: 'استخدم سطحًا ثابتًا مرتفعًا، وانزل ببطء ثم ادفع للعودة.', restAfter: 20, easier: 'استخدم الحائط لنسخة أخف.' },
      { id: 'hinge-mid', name: 'ميل الورك', focus: 'الوركان', duration: 45, reps: 12, cue: 'اثنِ الوركين للخلف مع ظهر مريح، ثم عد للوقوف.', restAfter: 20 },
      { id: 'side-mid', name: 'خطوات جانبية', focus: 'التوازن', duration: 45, cue: 'خطوتان صغيرتان لليمين ثم لليسار، مع ذراعين مرتاحتين.', restAfter: 15 },
      { id: 'reach-mid', name: 'تمدد جانبي', focus: 'التهدئة', duration: 50, cue: 'مدّ ذراعك فوق الرأس ومِل قليلًا للجانب، ثم بدّل بهدوء.', restAfter: 0 },
    ],
  },
];

export const STORAGE = { selection: 'tamreen-selection-v1', history: 'tamreen-history-v1' };

export function readHistory(): SavedSession[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE.history) ?? '[]');
    if (!Array.isArray(value)) return [];
    return value.filter((entry): entry is SavedSession =>
      entry && typeof entry.id === 'string' && typeof entry.workoutTitle === 'string' &&
      typeof entry.completedAt === 'string' && Number.isFinite(entry.durationSeconds) &&
      Number.isFinite(entry.exerciseCount)
    );
  } catch { return []; }
}

export function saveSession(session: SavedSession) {
  const next = [session, ...readHistory()];
  try { localStorage.setItem(STORAGE.history, JSON.stringify(next)); } catch { /* keep the session usable if storage is full */ }
}

export function estimatedSeconds(workout: Workout) {
  return workout.exercises.reduce((sum, exercise) => sum + exercise.duration + exercise.restAfter, 0);
}

export function formatTime(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
}
