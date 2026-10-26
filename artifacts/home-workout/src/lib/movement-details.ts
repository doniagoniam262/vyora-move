import type { Locale } from './locale';

export type MuscleId =
  | 'chest'
  | 'shoulders'
  | 'arms'
  | 'upper-back'
  | 'core'
  | 'obliques'
  | 'glutes'
  | 'quads'
  | 'hamstrings'
  | 'calves'
  | 'hip-flexors';

type BilingualText = { ar: string; en: string };

export type MovementInsight = {
  primary: MuscleId[];
  secondary: MuscleId[];
  cues: BilingualText[];
  mistakes: BilingualText[];
  breathing: BilingualText;
};

const cue = (ar: string, en: string): BilingualText => ({ ar, en });

export const muscleNames: Record<MuscleId, BilingualText> = {
  chest: cue('الصدر', 'Chest'),
  shoulders: cue('الكتفان', 'Shoulders'),
  arms: cue('الذراعان', 'Arms'),
  'upper-back': cue('أعلى الظهر', 'Upper back'),
  core: cue('عضلات الجذع', 'Core'),
  obliques: cue('جانبا البطن', 'Obliques'),
  glutes: cue('الأرداف', 'Glutes'),
  quads: cue('أمام الفخذ', 'Quadriceps'),
  hamstrings: cue('خلف الفخذ', 'Hamstrings'),
  calves: cue('السمانة', 'Calves'),
  'hip-flexors': cue('مثنيات الورك', 'Hip flexors'),
};

export const movementInsights: Record<string, MovementInsight> = {
  march: {
    primary: ['calves', 'hip-flexors'],
    secondary: ['core'],
    cues: [
      cue('رفع الركبة إلى ارتفاع مريح مع إبقاء الجذع مستقيمًا.', 'Lift each knee to a comfortable height while keeping your torso tall.'),
      cue('البدء بخطوات هادئة ثم زيادة الإيقاع تدريجيًا.', 'Start with easy steps, then increase the pace gradually.'),
    ],
    mistakes: [
      cue('يُتجنب الميل بالجذع للخلف أو رفع الركبتين بعنف.', 'Avoid leaning back or forcing the knees upward.'),
    ],
    breathing: cue('الحفاظ على إيقاع تنفس منتظم دون حبس النفس.', 'Keep a steady rhythm; do not hold your breath.'),
  },
  'shoulder-circles': {
    primary: ['shoulders'],
    secondary: ['upper-back'],
    cues: [
      cue('البدء بدوائر صغيرة ومتحكم بها.', 'Begin with small, controlled circles.'),
      cue('إبقاء الرقبة مرتاحة والكتفين بعيدين عن الأذنين.', 'Keep your neck relaxed and shoulders away from your ears.'),
    ],
    mistakes: [
      cue('يُتجنب رفع الكتفين أو تدويرهما بسرعة.', 'Avoid shrugging or moving too quickly.'),
    ],
    breathing: cue('التنفس بهدوء طوال الحركة.', 'Breathe calmly throughout the movement.'),
  },
  squat: {
    primary: ['quads', 'glutes'],
    secondary: ['hamstrings', 'core'],
    cues: [
      cue('دفع الوركين للخلف مع ثبات القدمين على الأرض.', 'Send your hips back while keeping both feet grounded.'),
      cue('توجيه الركبتين نحو أصابع القدمين.', 'Keep your knees tracking in line with your toes.'),
    ],
    mistakes: [
      cue('يُتجنب انهيار الركبتين للداخل أو ارتفاع الكعبين.', 'Do not let your knees collapse inward or your heels lift.'),
    ],
    breathing: cue('الشهيق أثناء النزول، والزفير عند الوقوف.', 'Inhale on the way down and exhale as you stand.'),
  },
  'glute-bridge': {
    primary: ['glutes'],
    secondary: ['hamstrings', 'core'],
    cues: [
      cue('الضغط بالكعبين ورفع الحوض حتى يصبح الجذع والفخذان على خط واحد.', 'Press through your heels and lift until your torso and thighs align.'),
      cue('شد الأرداف في الأعلى دون تقويس أسفل الظهر.', 'Squeeze your glutes at the top without arching your lower back.'),
    ],
    mistakes: [
      cue('يُتجنب الدفع من أسفل الظهر أو المبالغة في ارتفاع الحوض.', 'Avoid pushing through your lower back or lifting too high.'),
    ],
    breathing: cue('الزفير عند رفع الحوض، والشهيق عند إنزاله.', 'Exhale as you lift your hips and inhale as you lower.'),
  },
  lunge: {
    primary: ['quads', 'glutes'],
    secondary: ['hamstrings', 'core'],
    cues: [
      cue('اتخاذ خطوة ثابتة مع الحفاظ على اتزان الجذع.', 'Take a stable step and keep your torso balanced.'),
      cue('النزول بقدر مريح مع توجيه الركبة نحو القدم.', 'Lower only as far as comfortable, with the knee tracking over the foot.'),
    ],
    mistakes: [
      cue('يُتجنب فقدان التحكم بالركبة الأمامية أو انهيارها للداخل.', 'Do not let the front knee buckle inward or lose control.'),
    ],
    breathing: cue('شهيق عند النزول وزفير عند الدفع للعودة.', 'Inhale as you lower and exhale as you push back up.'),
  },
  'jacks-low': {
    primary: ['calves', 'quads'],
    secondary: ['shoulders', 'core'],
    cues: [
      cue('تحريك القدمين بالتبادل للخارج والداخل من دون قفز.', 'Step one foot out and in at a time without jumping.'),
      cue('تحريك الذراعين ضمن مدى مريح مع إيقاع ثابت.', 'Move your arms through a comfortable range and keep a steady rhythm.'),
    ],
    mistakes: [
      cue('يُتجنب الهبوط القوي أو تجاوز مدى حركة الكتف.', 'Avoid heavy foot strikes or forcing your shoulders overhead.'),
    ],
    breathing: cue('التنفس باستمرار مع خطوات منتظمة.', 'Keep breathing continuously with even steps.'),
  },
  'mountain-climber': {
    primary: ['core', 'hip-flexors'],
    secondary: ['shoulders', 'quads'],
    cues: [
      cue('تثبيت الكتفين فوق اليدين والحفاظ على خط مستقيم للجسم.', 'Stack your shoulders over your hands and keep a straight body line.'),
      cue('تقريب الركبتين بالتبادل من دون هبوط الحوض.', 'Drive each knee forward without letting your hips sag.'),
    ],
    mistakes: [
      cue('يُتجنب رفع الحوض عاليًا أو زيادة السرعة على حساب التحكم.', 'Do not hike your hips or trade control for speed.'),
    ],
    breathing: cue('أنفاس قصيرة ومنتظمة مع استمرار الحركة.', 'Use short, steady breaths as you continue moving.'),
  },
  'incline-push': {
    primary: ['chest'],
    secondary: ['shoulders', 'arms', 'core'],
    cues: [
      cue('وضع اليدين على سطح ثابت وأوسع قليلًا من الكتفين.', 'Place your hands on a stable surface, slightly wider than your shoulders.'),
      cue('الحفاظ على خط واحد من الرأس إلى الكعبين أثناء النزول والدفع.', 'Maintain a straight line from head to heels as you lower and press.'),
    ],
    mistakes: [
      cue('يُتجنب فتح المرفقين بزاوية واسعة أو هبوط الحوض.', 'Avoid flaring your elbows or letting your hips sag.'),
    ],
    breathing: cue('شهيق عند الاقتراب من السطح، وزفير عند الدفع بعيدًا.', 'Inhale as you lower toward the surface and exhale as you press away.'),
  },
  'chair-dip': {
    primary: ['arms'],
    secondary: ['shoulders', 'chest'],
    cues: [
      cue('استخدام كرسي ثابت ملاصق للحائط.', 'Use a sturdy chair placed against a wall.'),
      cue('ثني المرفقين للخلف والنزول ضمن مدى مريح للكتفين.', 'Bend your elbows backward and lower only through a comfortable shoulder range.'),
    ],
    mistakes: [
      cue('التوقف عند الشعور بألم في الكتف، وعدم النزول أعمق من القدرة على التحكم.', 'Stop if you feel shoulder pain and do not dip deeper than you can control.'),
    ],
    breathing: cue('الشهيق عند النزول، والزفير أثناء الدفع للأعلى.', 'Inhale as you lower and exhale as you press up.'),
  },
  plank: {
    primary: ['core'],
    secondary: ['shoulders', 'glutes'],
    cues: [
      cue('وضع المرفقين أسفل الكتفين مع شد البطن والأرداف.', 'Place elbows under shoulders and brace your abdomen and glutes.'),
      cue('الحفاظ على خط مستقيم، أو استخدام الركبتين لنسخة أسهل.', 'Keep a straight body line; use the knees for an easier variation.'),
    ],
    mistakes: [
      cue('يُتجنب حبس النفس أو هبوط أسفل الظهر.', 'Do not hold your breath or let your lower back sag.'),
    ],
    breathing: cue('التنفس ببطء واستمرار مع ثبات الجذع.', 'Breathe slowly and continuously while keeping your core braced.'),
  },
  crunch: {
    primary: ['core'],
    secondary: ['hip-flexors'],
    cues: [
      cue('رفع لوحي الكتف قليلًا مع إبقاء أسفل الظهر على الأرض.', 'Lift your shoulder blades slightly while keeping your lower back grounded.'),
      cue('بدء الحركة من عضلات البطن، لا من سحب الرأس.', 'Initiate the movement from your abs, not by pulling your head.'),
    ],
    mistakes: [
      cue('يُتجنب شد الرقبة باليدين أو رفع الجذع كاملًا.', 'Do not pull on your neck or sit all the way up.'),
    ],
    breathing: cue('الزفير عند رفع الكتفين، والشهيق عند العودة.', 'Exhale as you curl up and inhale as you return.'),
  },
  bicycle: {
    primary: ['core', 'obliques'],
    secondary: ['hip-flexors'],
    cues: [
      cue('تحريك الجذع والركبة المقابلة ببطء وتحكم.', 'Move your torso and opposite knee slowly and with control.'),
      cue('إبقاء أسفل الظهر قريبًا من الأرض.', 'Keep your lower back close to the floor.'),
    ],
    mistakes: [
      cue('يُتجنب سحب الرأس أو تحريك المرفق وحده بدلًا من الجذع.', 'Avoid pulling your head or moving only your elbow.'),
    ],
    breathing: cue('الزفير مع التقريب، والشهيق عند التبديل.', 'Exhale as you rotate in and inhale as you switch sides.'),
  },
  hamstring: {
    primary: ['hamstrings'],
    secondary: ['glutes'],
    cues: [
      cue('الانحناء من مفصل الورك مع إطالة الظهر دون تقويسه.', 'Hinge at your hips with a long spine rather than rounding your back.'),
      cue('الثبات عند شد لطيف ثم تبديل الجانب.', 'Hold at a gentle stretch, then switch sides.'),
    ],
    mistakes: [
      cue('يُتجنب الوصول إلى ألم حاد أو الارتداد السريع.', 'Do not push into sharp pain or bounce.'),
    ],
    breathing: cue('التنفس بهدوء مع إتاحة المجال للشد أن يخف تدريجيًا.', 'Breathe calmly and let the stretch ease in gradually.'),
  },
  'childs-pose': {
    primary: ['upper-back'],
    secondary: ['glutes', 'shoulders'],
    cues: [
      cue('إراحة الوركين للخلف ومد الذراعين بقدر مريح.', 'Ease your hips back and extend your arms as far as comfortable.'),
      cue('استخدام وسادة تحت الركبتين عند الحاجة.', 'Place a cushion beneath your knees if needed.'),
    ],
    mistakes: [
      cue('يُتجنب دفع الوركين نحو الكعبين عند الشعور بألم.', 'Do not force your hips toward your heels if it causes pain.'),
    ],
    breathing: cue('أنفاس بطيئة وهادئة في وضعية التمدد.', 'Take slow, calm breaths in the stretch.'),
  },
  'wall-push-up': {
    primary: ['chest'],
    secondary: ['arms', 'shoulders', 'core'],
    cues: [
      cue('تثبيت راحتي اليدين على مستوى الصدر مع شد الجذع.', 'Place your palms at chest height and brace your torso.'),
      cue('ثني المرفقين للخلف بزاوية مريحة ثم الدفع بعيدًا عن الحائط.', 'Bend your elbows at a comfortable angle, then press away from the wall.'),
    ],
    mistakes: [
      cue('يُتجنب تقويس الظهر أو دفع الرأس للأمام.', 'Avoid arching your back or reaching your head forward.'),
    ],
    breathing: cue('شهيق عند الاقتراب من الحائط، وزفير عند الدفع.', 'Inhale toward the wall and exhale as you press away.'),
  },
  'prone-w-raise': {
    primary: ['upper-back'],
    secondary: ['shoulders', 'arms'],
    cues: [
      cue('تقريب لوحي الكتف دون رفع الكتفين نحو الأذنين.', 'Draw your shoulder blades together without shrugging.'),
      cue('استخدام مدى رفع صغير مع رقبة مرتاحة.', 'Use a small lift and keep your neck relaxed.'),
    ],
    mistakes: [
      cue('يُتجنب رفع الصدر عاليًا أو تقويس أسفل الظهر.', 'Avoid lifting your chest too high or arching your lower back.'),
    ],
    breathing: cue('الزفير عند رفع الذراعين، والشهيق عند العودة.', 'Exhale as you lift your arms and inhale as you lower.'),
  },
  'wall-sit': {
    primary: ['quads'],
    secondary: ['glutes', 'core'],
    cues: [
      cue('توزيع الوزن على القدمين كاملتين مع تثبيت الظهر على الحائط.', 'Keep your whole foot grounded and your back against the wall.'),
      cue('اختيار عمق مريح وثبات الركبتين باتجاه أصابع القدم.', 'Choose a comfortable depth and keep your knees tracking over your toes.'),
    ],
    mistakes: [
      cue('يُتجنب نزول الركبتين للداخل أو حبس النفس.', 'Avoid letting your knees cave inward or holding your breath.'),
    ],
    breathing: cue('تنفس بانتظام خلال الثبات.', 'Breathe steadily throughout the hold.'),
  },
  'calf-raise': {
    primary: ['calves'],
    secondary: ['core'],
    cues: [
      cue('رفع الكعبين بشكل متساوٍ مع ثبات الكاحلين.', 'Lift both heels evenly while keeping your ankles steady.'),
      cue('العودة ببطء حتى تلامس القدم الأرض كاملة.', 'Lower slowly until your full foot is grounded.'),
    ],
    mistakes: [
      cue('يُتجنب الارتداد أو الاعتماد الكامل على الذراعين.', 'Avoid bouncing or leaning heavily on your arms.'),
    ],
    breathing: cue('الزفير عند الارتفاع، والشهيق عند النزول.', 'Exhale as you rise and inhale as you lower.'),
  },
  'dead-bug': {
    primary: ['core'],
    secondary: ['obliques', 'hip-flexors'],
    cues: [
      cue('شد البطن مع حركة بطيئة للذراع والساق المتعاكستين.', 'Brace your abdomen and move the opposite arm and leg slowly.'),
      cue('إيقاف مدى الحركة قبل أن يرتفع أسفل الظهر عن الأرض.', 'Stop the range before your lower back lifts from the floor.'),
    ],
    mistakes: [
      cue('يُتجنب مد الذراع والساق بسرعة أو فقدان ثبات الجذع.', 'Avoid extending quickly or losing torso control.'),
    ],
    breathing: cue('زفير مع مد الطرفين، وشهيق عند العودة للمنتصف.', 'Exhale as you extend and inhale as you return to center.'),
  },
  'side-plank': {
    primary: ['obliques'],
    secondary: ['core', 'shoulders', 'glutes'],
    cues: [
      cue('محاذاة المرفق أسفل الكتف ورفع الوركين دون دوران.', 'Stack your elbow beneath your shoulder and lift without rotating.'),
      cue('الحفاظ على خط واحد من الكتف إلى الورك والقدم.', 'Keep a straight line from shoulder through hip to foot.'),
    ],
    mistakes: [
      cue('يُتجنب هبوط الورك أو دفع الكتف بعيدًا عن الأذن.', 'Avoid letting your hip sag or shrugging your shoulder.'),
    ],
    breathing: cue('أنفاس هادئة ومنتظمة أثناء الثبات.', 'Take calm, even breaths during the hold.'),
  },
  'fire-hydrant': {
    primary: ['glutes'],
    secondary: ['hip-flexors', 'core'],
    cues: [
      cue('إبقاء الحوض مواجهًا للأرض أثناء رفع الركبة للجانب.', 'Keep your hips facing the floor as you lift your knee to the side.'),
      cue('رفع الركبة بقدر مريح مع ثبات الظهر.', 'Lift only as high as comfortable while keeping your back steady.'),
    ],
    mistakes: [
      cue('يُتجنب تدوير الجذع أو تقويس الظهر لرفع الساق أكثر.', 'Avoid rotating your torso or arching your back to lift higher.'),
    ],
    breathing: cue('الزفير عند الرفع، والشهيق عند خفض الركبة.', 'Exhale as you lift and inhale as you lower your knee.'),
  },
  'hip-hinge': {
    primary: ['hamstrings'],
    secondary: ['glutes', 'core'],
    cues: [
      cue('تحريك الوركين للخلف مع بقاء الظهر طويلًا.', 'Move your hips back while keeping a long spine.'),
      cue('العودة للوقوف بدفع الوركين للأمام دون المبالغة في تقويس الظهر.', 'Stand by bringing your hips forward without over-arching your back.'),
    ],
    mistakes: [
      cue('يُتجنب تحويل الحركة إلى انحناء من أسفل الظهر.', 'Avoid turning the movement into a bend through your lower back.'),
    ],
    breathing: cue('شهيق عند إرجاع الوركين، وزفير عند الوقوف.', 'Inhale as your hips move back and exhale as you stand.'),
  },
  'pike-push-up': {
    primary: ['shoulders'],
    secondary: ['arms', 'chest', 'core'],
    cues: [
      cue('تثبيت اليدين ورفع الوركين لتكوين شكل V مقلوب.', 'Set your hands and lift your hips into an inverted V.'),
      cue('خفض الرأس بين اليدين بمدى مريح مع تحكم بالمرفقين.', 'Lower your head between your hands through a comfortable range.'),
    ],
    mistakes: [
      cue('يُتجنب هبوط الرأس بسرعة أو تحميل الرسغين دون استعداد.', 'Avoid dropping your head quickly or forcing your wrists.'),
    ],
    breathing: cue('شهيق عند النزول، وزفير عند دفع الأرض للعودة.', 'Inhale as you lower and exhale as you press back.'),
  },
};

export function getMovementInsight(exerciseId: string, locale: Locale) {
  const insight = movementInsights[exerciseId];
  if (!insight) return undefined;
  const text = (value: BilingualText) => value[locale];
  return {
    ...insight,
    primaryNames: insight.primary.map((id) => text(muscleNames[id])),
    secondaryNames: insight.secondary.map((id) => text(muscleNames[id])),
    cues: insight.cues.map(text),
    mistakes: insight.mistakes.map(text),
    breathing: text(insight.breathing),
  };
}
