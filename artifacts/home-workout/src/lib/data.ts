import type { FitnessGoal } from './profile';

export type Category = 'full' | 'upper' | 'lower' | 'abs' | 'warmup' | 'stretch';
export type Level = 'beginner' | 'intermediate';

export type Exercise = {
  id: string;
  name: string;
  latin: string;
  category: Category;
  level: Level;
  image: string; // path under public/
  duration: number; // seconds per set
  reps?: number;
  sets: number;
  instructions: string[];
  safety: string;
  easier: string;
};

export type WorkoutPlan = {
  id: string;
  name: string;
  description: string;
  level: Level;
  minutes: number;
  frequency: string;
  image: string;
  exerciseIds: string[];
  goal?: FitnessGoal;
};

export type SavedSession = {
  id: string;
  planId: string;
  planName: string;
  completedAt: string;
  durationSeconds: number;
  completedExerciseIds: string[];
  completedCount: number;
};

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  { id: 'full', label: 'الجسم بالكامل', blurb: 'حركات مركبة لكل الجسم' },
  { id: 'upper', label: 'الجزء العلوي', blurb: 'صدر، كتفان وذراعان' },
  { id: 'lower', label: 'الجزء السفلي', blurb: 'أرجل ومؤخرة' },
  { id: 'abs', label: 'البطن', blurb: 'ثبات وتحكم في الجذع' },
  { id: 'warmup', label: 'الإحماء', blurb: 'جهّز جسمك قبل البدء' },
  { id: 'stretch', label: 'التمدد', blurb: 'ختام هادئ للعضلات' },
];
export const LEVELS: { id: Level; label: string }[] = [
  { id: 'beginner', label: 'مبتدئ' },
  { id: 'intermediate', label: 'متوسط' },
];
export const categoryLabel = (c: Category) => CATEGORIES.find((x) => x.id === c)?.label ?? c;
export const levelLabel = (l: Level) => LEVELS.find((x) => x.id === l)?.label ?? l;

const R = 'images/reference/';
const IMG = {
  squat: R + 'squat.webp',
  plank: R + 'plank-woman.webp',
  push: R + 'push-man.webp',
  stretch: R + 'stretch-seated.webp',
  abs: R + 'crunch-woman.webp',
  lunges: R + 'stretch-woman.webp',
  man: R + 'plank-pair.webp',
  upper: R + 'upper-woman.webp',
  athletes: R + 'athletes.webp',
  pair: R + 'plan-pair.webp',
};

export const exercises: Exercise[] = [
  {
    id: 'march',
    name: 'مشي في المكان',
    latin: 'March in Place',
    category: 'warmup',
    level: 'beginner',
    image: IMG.lunges,
    duration: 40,
    sets: 1,
    instructions: [
      'قف بقدمين بعرض الوركين وكتفين مرتخيين.',
      'ارفع ركبة ثم الأخرى بإيقاع ثابت مع تحريك الذراعين.',
      'تنفّس بانتظام وزد الإيقاع تدريجيًا.',
    ],
    safety: 'ابدأ ببطء واستند إلى كرسي إن شعرت بعدم اتزان.',
    easier: 'قلّل ارتفاع الركبتين وامشِ بإيقاع أهدأ.',
  },
  {
    id: 'shoulder-circles',
    name: 'دوائر الكتفين',
    latin: 'Shoulder Circles',
    category: 'warmup',
    level: 'beginner',
    image: IMG.upper,
    duration: 30,
    sets: 2,
    instructions: [
      'قف مستقيمًا وارفع الكتفين نحو الأذنين.',
      'ارسم دوائر كبيرة للخلف بتحكم.',
      'بدّل الاتجاه في منتصف الوقت.',
    ],
    safety: 'حافظ على حركة مريحة ولا تدفع المفصل لأقصى مدى.',
    easier: 'اجعل الدوائر أصغر.',
  },
  {
    id: 'squat',
    name: 'سكوات',
    latin: 'Squat',
    category: 'lower',
    level: 'beginner',
    image: IMG.squat,
    duration: 40,
    reps: 12,
    sets: 3,
    instructions: [
      'قف بقدمين بعرض الكتفين وأصابع القدم للخارج قليلًا.',
      'ادفع الوركين للخلف وانزل كأنك تجلس على كرسي، والظهر مستقيم.',
      'اضغط بالكعبين وعُد للوقوف مع شدّ المؤخرة.',
    ],
    safety: 'ابقَ الركبتين باتجاه أصابع القدم، وتوقف عند أي ألم حاد في الركبة.',
    easier: 'انزل نصف المسافة أو المس كرسيًا ثابتًا بخفة.',
  },
  {
    id: 'glute-bridge',
    name: 'جسر الأرداف',
    latin: 'Glute Bridge',
    category: 'lower',
    level: 'beginner',
    image: IMG.abs,
    duration: 40,
    reps: 12,
    sets: 2,
    instructions: [
      'استلقِ على الظهر وثنِ الركبتين وقدماك مسطحتان على الأرض.',
      'ارفع الوركين حتى يستقيم خط الكتفين والركبتين.',
      'اثبت ثانية ثم انزل ببطء.',
    ],
    safety: 'لا تبالغ في تقوس أسفل الظهر؛ اعتمد على شدّ الأرداف.',
    easier: 'ارتفاع أقل مع ثبات أقصر.',
  },
  {
    id: 'lunge',
    name: 'اندفاع للأمام',
    latin: 'Forward Lunge',
    category: 'lower',
    level: 'intermediate',
    image: IMG.lunges,
    duration: 45,
    reps: 10,
    sets: 3,
    instructions: [
      'قف مستقيمًا وخذ خطوة واسعة للأمام.',
      'اثنِ الركبتين حتى تقاربا زاوية قائمة دون أن تلمس الركبة الخلفية الأرض.',
      'ادفع بالقدم الأمامية وعُد، ثم بدّل الجهة.',
    ],
    safety: 'ابقَ الجذع منتصبًا والركبة الأمامية فوق الكاحل لا أبعد منه.',
    easier: 'اندفاع أقصر أو تمسّك بحائط للتوازن.',
  },
  {
    id: 'jacks-low',
    name: 'جاك خفيف',
    latin: 'Step Jacks',
    category: 'full',
    level: 'beginner',
    image: IMG.squat,
    duration: 40,
    sets: 2,
    instructions: [
      'ابدأ واقفًا وقدماك متقاربتان.',
      'خذ خطوة جانبية مع رفع الذراعين للأعلى.',
      'عُد للمنتصف وبدّل الجهة بإيقاع ثابت.',
    ],
    safety: 'بدون قفز، مناسب لمن يريد حملًا أخف على المفاصل.',
    easier: 'اخفض الذراعين للمستوى الأفقي فقط.',
  },
  {
    id: 'mountain-climber',
    name: 'متسلق الجبل',
    latin: 'Mountain Climber',
    category: 'full',
    level: 'intermediate',
    image: IMG.man,
    duration: 30,
    sets: 3,
    instructions: [
      'خذ وضع البلانك بيدين تحت الكتفين.',
      'اسحب ركبة نحو الصدر ثم بدّل بسرعة متحكَّم بها.',
      'حافظ على الوركين منخفضين والجذع ثابتًا.',
    ],
    safety: 'إن شعرت بضغط على المعصمين استخدم قبضتين مغلقتين أو تمرن على سطح مرتفع.',
    easier: 'نفّذ الحركة ببطء أو على سطح مرتفع كالأريكة.',
  },
  {
    id: 'incline-push',
    name: 'ضغط مائل',
    latin: 'Incline Push-up',
    category: 'upper',
    level: 'beginner',
    image: IMG.push,
    duration: 40,
    reps: 8,
    sets: 3,
    instructions: [
      'ضع يديك على سطح ثابت مرتفع بعرض أوسع قليلًا من الكتفين.',
      'اجعل جسمك خطًا مستقيمًا من الرأس للكعبين.',
      'انزل بالصدر نحو السطح ثم ادفع للأعلى.',
    ],
    safety: 'تأكد أن السطح ثابت وغير منزلق، وأبقِ الرقبة في وضع محايد.',
    easier: 'استخدم حائطًا بدل السطح المنخفض.',
  },
  {
    id: 'chair-dip',
    name: 'غطس على الكرسي',
    latin: 'Chair Dip',
    category: 'upper',
    level: 'intermediate',
    image: IMG.upper,
    duration: 35,
    reps: 8,
    sets: 3,
    instructions: [
      'اجلس على حافة كرسي ثابت وضع كفيك بجانب الوركين.',
      'ازحف بالوركين للأمام وانزل بثني المرفقين للخلف.',
      'ادفع بالذراعين للعودة دون قفل المرفقين.',
    ],
    safety: 'ابقَ الوركين قريبين من الكرسي وتجنّب النزول العميق إن شعرت بضغط في الكتف.',
    easier: 'اثنِ الركبتين وقرّب القدمين من الكرسي.',
  },
  {
    id: 'plank',
    name: 'بلانك',
    latin: 'Plank',
    category: 'abs',
    level: 'beginner',
    image: IMG.plank,
    duration: 30,
    sets: 3,
    instructions: [
      'استند على الساعدين والمرفقان تحت الكتفين.',
      'شدّ البطن والأرداف وابقِ الجسم خطًا مستقيمًا.',
      'تنفّس بهدوء وانظر للأرض.',
    ],
    safety: 'أوقف التمرين إن هبط أسفل الظهر أو شعرت بألم فيه.',
    easier: 'اسند الركبتين على الأرض.',
  },
  {
    id: 'crunch',
    name: 'كرنش بطن',
    latin: 'Crunch',
    category: 'abs',
    level: 'beginner',
    image: IMG.abs,
    duration: 35,
    reps: 12,
    sets: 2,
    instructions: [
      'استلقِ على الظهر وثنِ الركبتين.',
      'ضع اليدين خلف الرأس دون سحب الرقبة.',
      'ارفع الكتفين عن الأرض بشدّ البطن ثم انزل ببطء.',
    ],
    safety: 'الحركة صغيرة ومتحكَّم بها؛ لا تشدّ الرأس بيديك.',
    easier: 'اجعل اليدين على الصدر وارفع قليلًا.',
  },
  {
    id: 'bicycle',
    name: 'دراجة الهواء',
    latin: 'Bicycle Crunch',
    category: 'abs',
    level: 'intermediate',
    image: IMG.abs,
    duration: 40,
    reps: 16,
    sets: 3,
    instructions: [
      'استلقِ مع يدين خلف الرأس وارفع الساقين قليلًا.',
      'قرّب المرفق من الركبة المعاكسة مع مدّ الساق الأخرى.',
      'بدّل بإيقاع بطيء ومتحكَّم.',
    ],
    safety: 'ابقَ أسفل الظهر ملامسًا للأرض، وأبطئ إن شعرت بتعب في الرقبة.',
    easier: 'أبقِ القدمين على الأرض وبدّل المرفق والركبة بالتناوب.',
  },
  {
    id: 'hamstring',
    name: 'تمدد الفخذ الخلفي',
    latin: 'Hamstring Stretch',
    category: 'stretch',
    level: 'beginner',
    image: IMG.stretch,
    duration: 40,
    sets: 1,
    instructions: [
      'اجلس وافرد ساقًا وثنِ الأخرى.',
      'مِل للأمام من الوركين بظهر مستقيم.',
      'اثبت بتنفس هادئ ثم بدّل الساق.',
    ],
    safety: 'يجب أن تشعر بشدّ لطيف لا ألم.',
    easier: 'ثنِ الركبة الممدودة قليلًا.',
  },
  {
    id: 'childs-pose',
    name: 'وضع الطفل',
    latin: "Child's Pose",
    category: 'stretch',
    level: 'beginner',
    image: IMG.stretch,
    duration: 40,
    sets: 1,
    instructions: [
      'اركع واجلس على الكعبين.',
      'مدّ الذراعين للأمام وأنزل الصدر نحو الأرض.',
      'تنفّس بعمق وأرخِ الظهر.',
    ],
    safety: 'إن آلمت الركبتان ضع وسادة تحتهما.',
    easier: 'ضع وسادة بين الوركين والكعبين.',
  },
];

export const exerciseById = (id: string) => exercises.find((e) => e.id === id);

export const plans: WorkoutPlan[] = [
  {
    id: 'beginner-plan',
    name: 'خطة المبتدئين',
    description: 'بداية متدرجة: إحماء، حركات أساسية، وتمدد. مناسبة لأول أسبوع لك.',
    level: 'beginner',
    minutes: 0,
    frequency: '3 أيام في الأسبوع',
    image: IMG.pair,
    exerciseIds: ['march', 'squat', 'incline-push', 'glute-bridge', 'plank', 'childs-pose'],
  },
  {
    id: 'ten-minute',
    name: 'خطة 10 دقائق',
    description: 'جلسة سريعة لأيام الازدحام: حركات مركبة بإيقاع ثابت.',
    level: 'beginner',
    minutes: 0,
    frequency: 'يوميًا إن رغبت',
    image: IMG.man,
    exerciseIds: ['march', 'jacks-low', 'squat', 'crunch', 'plank', 'hamstring'],
  },
  {
    id: 'beginner-10-b',
    name: 'جلسة مبتدئين متنوعة',
    description: 'جلسة قصيرة بديلة للمبتدئين بحركات مختلفة وبدون معدات.',
    level: 'beginner',
    minutes: 0,
    frequency: 'حتى 10 دقائق',
    image: IMG.push,
    exerciseIds: ['march', 'glute-bridge', 'incline-push', 'crunch', 'hamstring'],
  },
  {
    id: 'beginner-20-b',
    name: 'خطة مبتدئين متنوعة',
    description: 'جلسة أطول قليلًا بحركات متنوعة تناسب المستوى المبتدئ.',
    level: 'beginner',
    minutes: 0,
    frequency: 'حتى 20 دقيقة',
    image: IMG.squat,
    exerciseIds: ['march', 'squat', 'glute-bridge', 'incline-push', 'crunch', 'plank', 'hamstring'],
  },
  {
    id: 'intermediate-10',
    name: 'جلسة متوسطة قصيرة',
    description: 'جلسة مختصرة بإيقاع متوسط مع حركات ثابتة؛ وقتها الفعلي أقل من 10 دقائق.',
    level: 'intermediate',
    minutes: 0,
    frequency: 'حتى 10 دقائق',
    image: IMG.athletes,
    exerciseIds: ['march', 'squat', 'mountain-climber', 'plank', 'hamstring'],
  },
  {
    id: 'intermediate-10-b',
    name: 'جلسة متوسطة متنوعة',
    description: 'جلسة قصيرة بديلة للمستوى المتوسط مع تركيز على حركات مختلفة.',
    level: 'intermediate',
    minutes: 0,
    frequency: 'حتى 10 دقائق',
    image: IMG.upper,
    exerciseIds: ['march', 'lunge', 'chair-dip', 'crunch', 'childs-pose'],
  },
  {
    id: 'twenty-minute',
    name: 'خطة 20 دقيقة',
    description: 'جلسة أطول للجسم كاملًا لمن اعتاد الحركة، مع إحماء وتمدد.',
    level: 'intermediate',
    minutes: 0,
    frequency: '4 أيام في الأسبوع',
    image: IMG.athletes,
    exerciseIds: [
      'march',
      'shoulder-circles',
      'lunge',
      'squat',
      'chair-dip',
      'mountain-climber',
      'bicycle',
      'plank',
      'hamstring',
      'childs-pose',
    ],
  },
  {
    id: 'intermediate-20-b',
    name: 'خطة متوسطة متنوعة',
    description: 'جلسة بديلة للجسم كاملًا مع وقت مناسب للمستوى المتوسط.',
    level: 'intermediate',
    minutes: 0,
    frequency: 'حتى 20 دقيقة',
    image: IMG.pair,
    exerciseIds: [
      'march',
      'squat',
      'lunge',
      'glute-bridge',
      'chair-dip',
      'bicycle',
      'plank',
      'childs-pose',
    ],
  },
  {
    id: 'lose-weight-plan',
    name: 'خطة نشاط وتدرّج',
    description:
      'جلسة منزلية متوازنة تجمع الحركة وتمارين القوة الخفيفة، مع وتيرة قابلة للتدرج.',
    level: 'beginner',
    minutes: 0,
    frequency: '3 أيام في الأسبوع',
    image: IMG.squat,
    exerciseIds: ['march', 'squat', 'jacks-low', 'plank', 'hamstring'],
    goal: 'lose-weight',
  },
  {
    id: 'lose-weight-intermediate',
    name: 'خطة نشاط متوسطة',
    description:
      'حركات مركبة بإيقاع متوسط مع وقت كافٍ للتعافي بين الجلسات.',
    level: 'intermediate',
    minutes: 0,
    frequency: '3–4 أيام في الأسبوع',
    image: IMG.athletes,
    exerciseIds: ['march', 'squat', 'mountain-climber', 'plank', 'hamstring'],
    goal: 'lose-weight',
  },
  {
    id: 'build-muscle-plan',
    name: 'خطة قوة وبناء عضلات',
    description:
      'تمارين مقاومة منزلية بحركات أساسية وتدرج هادئ في التكرارات والصعوبة.',
    level: 'beginner',
    minutes: 0,
    frequency: '3 أيام في الأسبوع',
    image: IMG.push,
    exerciseIds: ['squat', 'glute-bridge', 'incline-push', 'childs-pose'],
    goal: 'build-muscle',
  },
  {
    id: 'build-muscle-intermediate',
    name: 'خطة مقاومة متوسطة',
    description:
      'جلسات قوة للجسم كاملًا مع تنويع الحركات وفترات راحة مناسبة.',
    level: 'intermediate',
    minutes: 0,
    frequency: '3–4 أيام في الأسبوع',
    image: IMG.upper,
    exerciseIds: ['squat', 'lunge', 'chair-dip', 'childs-pose'],
    goal: 'build-muscle',
  },
  {
    id: 'fitness-plan',
    name: 'خطة لياقة متوازنة',
    description:
      'مزيج لطيف من الإحماء والقوة والثبات والتمدد لبناء عادة حركة منتظمة.',
    level: 'beginner',
    minutes: 0,
    frequency: '3 أيام في الأسبوع',
    image: IMG.pair,
    exerciseIds: ['march', 'shoulder-circles', 'squat', 'incline-push', 'hamstring'],
    goal: 'fitness',
  },
  {
    id: 'fitness-intermediate',
    name: 'خطة لياقة متوسطة',
    description:
      'جلسة متوازنة تجمع الحركة والقوة والثبات، مع يوم راحة بين الجلسات عند الإمكان.',
    level: 'intermediate',
    minutes: 0,
    frequency: '3–4 أيام في الأسبوع',
    image: IMG.athletes,
    exerciseIds: ['march', 'lunge', 'chair-dip', 'plank', 'hamstring'],
    goal: 'fitness',
  },
  {
    id: 'gain-weight-plan',
    name: 'خطة قوة لزيادة الوزن',
    description:
      'تمارين مقاومة بوزن الجسم مع زيادة تدريجية في التكرار أو صعوبة الحركة، وفترات راحة كافية.',
    level: 'beginner',
    minutes: 0,
    frequency: '2–4 جلسات مقاومة أسبوعيًا',
    image: IMG.squat,
    exerciseIds: ['squat', 'glute-bridge', 'incline-push', 'childs-pose'],
    goal: 'gain-weight',
  },
  {
    id: 'gain-weight-intermediate',
    name: 'خطة قوة متوسطة لزيادة الوزن',
    description:
      'تمارين مقاومة متدرجة بمستوى متوسط، مع أيام راحة للتعافي بين الجلسات.',
    level: 'intermediate',
    minutes: 0,
    frequency: '3–4 جلسات مقاومة أسبوعيًا',
    image: IMG.push,
    exerciseIds: ['squat', 'glute-bridge', 'incline-push', 'childs-pose'],
    goal: 'gain-weight',
  },
];

export const REST_DEFAULT = 15;
export type Step = { ex: Exercise; set: number; sets: number };
export function planExercises(plan: WorkoutPlan): Exercise[] {
  return plan.exerciseIds.map(exerciseById).filter((e): e is Exercise => !!e);
}
export function buildSteps(list: Exercise[]): Step[] {
  return list.flatMap((ex) =>
    Array.from({ length: ex.sets }, (_, i) => ({ ex, set: i + 1, sets: ex.sets })),
  );
}
export function estimateSeconds(list: Exercise[], rest = REST_DEFAULT) {
  const steps = buildSteps(list);
  return steps.reduce((s, st) => s + st.ex.duration, 0) + Math.max(0, steps.length - 1) * rest;
}
// minutes are derived from the real timed content so labels stay honest
plans.forEach((p) => {
  p.minutes = Math.max(1, Math.round(estimateSeconds(planExercises(p)) / 60));
});
export const planById = (id: string) => plans.find((p) => p.id === id);

export function scheduledPlanOptions(
  schedule: { level: Level; minutes: 10 | 20 },
  goal?: FitnessGoal,
) {
  if (goal) {
    const matching = plans
      .filter((plan) => plan.goal === goal)
      .sort((a, b) => {
        const aLevel = a.level === schedule.level ? 0 : 1;
        const bLevel = b.level === schedule.level ? 0 : 1;
        return aLevel - bLevel || a.minutes - b.minutes;
      });
    const fit = matching.find((plan) => plan.minutes <= schedule.minutes);
    const selected = fit ?? matching[0];
    return selected ? [selected] : [];
  }
  const ids =
    schedule.level === 'beginner'
      ? schedule.minutes === 10
        ? ['ten-minute', 'beginner-10-b']
        : ['beginner-plan', 'beginner-20-b']
      : schedule.minutes === 10
        ? ['intermediate-10', 'intermediate-10-b']
        : ['twenty-minute', 'intermediate-20-b'];
  return ids.map(planById).filter((plan): plan is WorkoutPlan => !!plan);
}

export function scheduledPlanForDay(
  schedule: { days: number[]; level: Level; minutes: 10 | 20 },
  day: number,
  goal?: FitnessGoal,
) {
  const orderedDays = [...new Set(schedule.days)]
    .filter((d) => d >= 0 && d <= 6)
    .sort((a, b) => ((a + 1) % 7) - ((b + 1) % 7));
  const dayIndex = orderedDays.indexOf(day);
  if (dayIndex < 0) return undefined;
  const options = scheduledPlanOptions(schedule, goal);
  return options[dayIndex % options.length];
}

export type HomeFitPreferences = {
  level: Level;
  minutes: 10 | 20;
  quiet: boolean;
  compact: boolean;
  goal?: FitnessGoal;
  recentPlanIds?: string[];
};

export function recommendHomePlan(preferences: HomeFitPreferences) {
  const recent = new Set(preferences.recentPlanIds ?? []);
  const eligible = plans
    .filter((plan) => !plan.goal || plan.goal === preferences.goal)
    .filter((plan) => plan.level === preferences.level && plan.minutes <= preferences.minutes)
    .filter((plan) =>
      planExercises(plan).every(
        (exercise) =>
          (!preferences.quiet || exercise.id !== 'jacks-low') &&
          (!preferences.compact || exercise.id !== 'lunge'),
      ),
    )
    .sort((a, b) => b.minutes - a.minutes);
  return eligible.find((plan) => !recent.has(plan.id)) ?? eligible[0];
}

export function formatTime(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
}
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
