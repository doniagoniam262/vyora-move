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

const IMG = {
  squat: 'images/hero-squat.jpg',
  plank: 'images/plank.jpg',
  push: 'images/push-up.jpg',
  stretch: 'images/stretch.jpg',
  abs: 'images/abs.jpg',
  lunges: 'images/lunges.jpg',
};

export const exercises: Exercise[] = [
  { id: 'march', name: 'مشي في المكان', latin: 'March in Place', category: 'warmup', level: 'beginner', image: IMG.lunges, duration: 40, sets: 1,
    instructions: ['قف بقدمين بعرض الوركين وكتفين مرتخيين.', 'ارفع ركبة ثم الأخرى بإيقاع ثابت مع تحريك الذراعين.', 'تنفّس بانتظام وزد الإيقاع تدريجيًا.'],
    safety: 'ابدأ ببطء واستند إلى كرسي إن شعرت بعدم اتزان.', easier: 'قلّل ارتفاع الركبتين وامشِ بإيقاع أهدأ.' },
  { id: 'shoulder-circles', name: 'دوائر الكتفين', latin: 'Shoulder Circles', category: 'warmup', level: 'beginner', image: IMG.stretch, duration: 30, sets: 2,
    instructions: ['قف مستقيمًا وارفع الكتفين نحو الأذنين.', 'ارسم دوائر كبيرة للخلف بتحكم.', 'بدّل الاتجاه في منتصف الوقت.'],
    safety: 'حافظ على حركة مريحة ولا تدفع المفصل لأقصى مدى.', easier: 'اجعل الدوائر أصغر.' },
  { id: 'squat', name: 'سكوات', latin: 'Squat', category: 'lower', level: 'beginner', image: IMG.squat, duration: 40, reps: 12, sets: 3,
    instructions: ['قف بقدمين بعرض الكتفين وأصابع القدم للخارج قليلًا.', 'ادفع الوركين للخلف وانزل كأنك تجلس على كرسي، والظهر مستقيم.', 'اضغط بالكعبين وعُد للوقوف مع شدّ المؤخرة.'],
    safety: 'ابقَ الركبتين باتجاه أصابع القدم، وتوقف عند أي ألم حاد في الركبة.', easier: 'انزل نصف المسافة أو المس كرسيًا ثابتًا بخفة.' },
  { id: 'glute-bridge', name: 'جسر الأرداف', latin: 'Glute Bridge', category: 'lower', level: 'beginner', image: IMG.abs, duration: 40, reps: 12, sets: 2,
    instructions: ['استلقِ على الظهر وثنِ الركبتين وقدماك مسطحتان على الأرض.', 'ارفع الوركين حتى يستقيم خط الكتفين والركبتين.', 'اثبت ثانية ثم انزل ببطء.'],
    safety: 'لا تبالغ في تقوس أسفل الظهر؛ اعتمد على شدّ الأرداف.', easier: 'ارتفاع أقل مع ثبات أقصر.' },
  { id: 'lunge', name: 'اندفاع للأمام', latin: 'Forward Lunge', category: 'lower', level: 'intermediate', image: IMG.lunges, duration: 45, reps: 10, sets: 3,
    instructions: ['قف مستقيمًا وخذ خطوة واسعة للأمام.', 'اثنِ الركبتين حتى تقاربا زاوية قائمة دون أن تلمس الركبة الخلفية الأرض.', 'ادفع بالقدم الأمامية وعُد، ثم بدّل الجهة.'],
    safety: 'ابقَ الجذع منتصبًا والركبة الأمامية فوق الكاحل لا أبعد منه.', easier: 'اندفاع أقصر أو تمسّك بحائط للتوازن.' },
  { id: 'jacks-low', name: 'جاك خفيف', latin: 'Step Jacks', category: 'full', level: 'beginner', image: IMG.squat, duration: 40, sets: 2,
    instructions: ['ابدأ واقفًا وقدماك متقاربتان.', 'خذ خطوة جانبية مع رفع الذراعين للأعلى.', 'عُد للمنتصف وبدّل الجهة بإيقاع ثابت.'],
    safety: 'بدون قفز، مناسب لمن يريد حملًا أخف على المفاصل.', easier: 'اخفض الذراعين للمستوى الأفقي فقط.' },
  { id: 'mountain-climber', name: 'متسلق الجبل', latin: 'Mountain Climber', category: 'full', level: 'intermediate', image: IMG.plank, duration: 30, sets: 3,
    instructions: ['خذ وضع البلانك بيدين تحت الكتفين.', 'اسحب ركبة نحو الصدر ثم بدّل بسرعة متحكَّم بها.', 'حافظ على الوركين منخفضين والجذع ثابتًا.'],
    safety: 'إن شعرت بضغط على المعصمين استخدم قبضتين مغلقتين أو تمرن على سطح مرتفع.', easier: 'نفّذ الحركة ببطء أو على سطح مرتفع كالأريكة.' },
  { id: 'incline-push', name: 'ضغط مائل', latin: 'Incline Push-up', category: 'upper', level: 'beginner', image: IMG.push, duration: 40, reps: 8, sets: 3,
    instructions: ['ضع يديك على سطح ثابت مرتفع بعرض أوسع قليلًا من الكتفين.', 'اجعل جسمك خطًا مستقيمًا من الرأس للكعبين.', 'انزل بالصدر نحو السطح ثم ادفع للأعلى.'],
    safety: 'تأكد أن السطح ثابت وغير منزلق، وأبقِ الرقبة في وضع محايد.', easier: 'استخدم حائطًا بدل السطح المنخفض.' },
  { id: 'chair-dip', name: 'غطس على الكرسي', latin: 'Chair Dip', category: 'upper', level: 'intermediate', image: IMG.push, duration: 35, reps: 8, sets: 3,
    instructions: ['اجلس على حافة كرسي ثابت وضع كفيك بجانب الوركين.', 'ازحف بالوركين للأمام وانزل بثني المرفقين للخلف.', 'ادفع بالذراعين للعودة دون قفل المرفقين.'],
    safety: 'ابقَ الوركين قريبين من الكرسي وتجنّب النزول العميق إن شعرت بضغط في الكتف.', easier: 'اثنِ الركبتين وقرّب القدمين من الكرسي.' },
  { id: 'plank', name: 'بلانك', latin: 'Plank', category: 'abs', level: 'beginner', image: IMG.plank, duration: 30, sets: 3,
    instructions: ['استند على الساعدين والمرفقان تحت الكتفين.', 'شدّ البطن والأرداف وابقِ الجسم خطًا مستقيمًا.', 'تنفّس بهدوء وانظر للأرض.'],
    safety: 'أوقف التمرين إن هبط أسفل الظهر أو شعرت بألم فيه.', easier: 'اسند الركبتين على الأرض.' },
  { id: 'crunch', name: 'كرنش بطن', latin: 'Crunch', category: 'abs', level: 'beginner', image: IMG.abs, duration: 35, reps: 12, sets: 2,
    instructions: ['استلقِ على الظهر وثنِ الركبتين.', 'ضع اليدين خلف الرأس دون سحب الرقبة.', 'ارفع الكتفين عن الأرض بشدّ البطن ثم انزل ببطء.'],
    safety: 'الحركة صغيرة ومتحكَّم بها؛ لا تشدّ الرأس بيديك.', easier: 'اجعل اليدين على الصدر وارفع قليلًا.' },
  { id: 'bicycle', name: 'دراجة الهواء', latin: 'Bicycle Crunch', category: 'abs', level: 'intermediate', image: IMG.abs, duration: 40, reps: 16, sets: 3,
    instructions: ['استلقِ مع يدين خلف الرأس وارفع الساقين قليلًا.', 'قرّب المرفق من الركبة المعاكسة مع مدّ الساق الأخرى.', 'بدّل بإيقاع بطيء ومتحكَّم.'],
    safety: 'ابقَ أسفل الظهر ملامسًا للأرض، وأبطئ إن شعرت بتعب في الرقبة.', easier: 'أبقِ القدمين على الأرض وبدّل المرفق والركبة بالتناوب.' },
  { id: 'hamstring', name: 'تمدد الفخذ الخلفي', latin: 'Hamstring Stretch', category: 'stretch', level: 'beginner', image: IMG.stretch, duration: 40, sets: 1,
    instructions: ['اجلس وافرد ساقًا وثنِ الأخرى.', 'مِل للأمام من الوركين بظهر مستقيم.', 'اثبت بتنفس هادئ ثم بدّل الساق.'],
    safety: 'يجب أن تشعر بشدّ لطيف لا ألم.', easier: 'ثنِ الركبة الممدودة قليلًا.' },
  { id: 'childs-pose', name: 'وضع الطفل', latin: "Child's Pose", category: 'stretch', level: 'beginner', image: IMG.stretch, duration: 40, sets: 1,
    instructions: ['اركع واجلس على الكعبين.', 'مدّ الذراعين للأمام وأنزل الصدر نحو الأرض.', 'تنفّس بعمق وأرخِ الظهر.'],
    safety: 'إن آلمت الركبتان ضع وسادة تحتهما.', easier: 'ضع وسادة بين الوركين والكعبين.' },
];

export const exerciseById = (id: string) => exercises.find((e) => e.id === id);

export const plans: WorkoutPlan[] = [
  { id: 'beginner-plan', name: 'خطة المبتدئين', description: 'بداية متدرجة: إحماء، حركات أساسية، وتمدد. مناسبة لأول أسبوع لك.', level: 'beginner', minutes: 0, frequency: '3 أيام في الأسبوع', image: IMG.plank,
    exerciseIds: ['march', 'squat', 'incline-push', 'glute-bridge', 'plank', 'childs-pose'] },
  { id: 'ten-minute', name: 'خطة 10 دقائق', description: 'جلسة سريعة لأيام الازدحام: حركات مركبة بإيقاع ثابت.', level: 'beginner', minutes: 0, frequency: 'يوميًا إن رغبت', image: IMG.lunges,
    exerciseIds: ['march', 'jacks-low', 'squat', 'crunch', 'plank', 'hamstring'] },
  { id: 'twenty-minute', name: 'خطة 20 دقيقة', description: 'جلسة أطول للجسم كاملًا لمن اعتاد الحركة، مع إحماء وتمدد.', level: 'intermediate', minutes: 0, frequency: '4 أيام في الأسبوع', image: IMG.abs,
    exerciseIds: ['march', 'shoulder-circles', 'lunge', 'squat', 'chair-dip', 'mountain-climber', 'bicycle', 'plank', 'hamstring', 'childs-pose'] },
];

export const REST_DEFAULT = 15;
export type Step = { ex: Exercise; set: number; sets: number };
export function planExercises(plan: WorkoutPlan): Exercise[] {
  return plan.exerciseIds.map(exerciseById).filter((e): e is Exercise => !!e);
}
export function buildSteps(list: Exercise[]): Step[] {
  return list.flatMap((ex) => Array.from({ length: ex.sets }, (_, i) => ({ ex, set: i + 1, sets: ex.sets })));
}
export function estimateSeconds(list: Exercise[], rest = REST_DEFAULT) {
  const steps = buildSteps(list);
  return steps.reduce((s, st) => s + st.ex.duration, 0) + Math.max(0, steps.length - 1) * rest;
}
// minutes are derived from the real timed content so labels stay honest
plans.forEach((p) => { p.minutes = Math.max(1, Math.round(estimateSeconds(planExercises(p)) / 60)); });
export const planById = (id: string) => plans.find((p) => p.id === id);

export function formatTime(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
}
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
