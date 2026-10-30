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
  deadlift: {
    primary: ['hamstrings', 'glutes'],
    secondary: ['quads', 'upper-back', 'core'],
    cues: [
      cue('أبقِ الوزن قريبًا من الساقين وحافظ على ظهر محايد.', 'Keep the load close to your legs and maintain a neutral back.'),
      cue('ابدأ الحركة بإرجاع الوركين، ثم ادفع الأرض للعودة للوقوف.', 'Start by hinging at the hips, then press the floor away to stand.'),
    ],
    mistakes: [
      cue('يُتجنب تقريب الوزن من الأرض بتقويس الظهر أو سحب الوزن بعيدًا عن الجسم.', 'Avoid reaching the load by rounding your back or letting it drift away.'),
    ],
    breathing: cue('خذ شهيقًا قبل النزول، وازفر عند العودة للوقوف.', 'Inhale before hinging down and exhale as you return to standing.'),
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
  'push-up': {
    primary: ['chest', 'arms'],
    secondary: ['shoulders', 'core'],
    cues: [
      cue('ثبّت اليدين أسفل الكتفين وحافظ على استقامة الجسم.', 'Set your hands beneath your shoulders and keep your body aligned.'),
      cue('انزل بتحكم ثم ادفع الأرض بعيدًا دون هبوط الحوض.', 'Lower with control, then press the floor away without letting your hips sag.'),
    ],
    mistakes: [
      cue('تجنّب فتح المرفقين كثيرًا أو تقويس أسفل الظهر.', 'Avoid flaring your elbows or arching your lower back.'),
    ],
    breathing: cue('شهيق عند النزول وزفير عند الدفع للأعلى.', 'Inhale as you lower and exhale as you press up.'),
  },
  'knee-push-up': {
    primary: ['chest', 'arms'],
    secondary: ['shoulders', 'core'],
    cues: [
      cue('حافظ على خط مستقيم من الرأس حتى الركبتين.', 'Keep a straight line from your head to your knees.'),
      cue('اثنِ المرفقين للخلف وادفع الأرض للعودة.', 'Bend your elbows back and press the floor away to return.'),
    ],
    mistakes: [
      cue('تجنّب هبوط الحوض أو دفع الرأس للأمام.', 'Avoid letting your hips sag or reaching your head forward.'),
    ],
    breathing: cue('شهيق عند النزول وزفير عند الدفع.', 'Inhale as you lower and exhale as you press.'),
  },
  'wide-push-up': {
    primary: ['chest'],
    secondary: ['shoulders', 'arms', 'core'],
    cues: [
      cue('اجعل اليدين أوسع قليلًا من الكتفين فقط.', 'Place your hands only slightly wider than your shoulders.'),
      cue('انزل بالصدر بتحكم مع مرفقين بزاوية مريحة.', 'Lower your chest with control and keep your elbows at a comfortable angle.'),
    ],
    mistakes: [
      cue('تجنّب توسيع اليدين أكثر من اللازم أو النزول بسرعة.', 'Avoid placing your hands too wide or dropping quickly.'),
    ],
    breathing: cue('شهيق عند النزول وزفير عند الدفع.', 'Inhale as you lower and exhale as you press.'),
  },
  'close-grip-push-up': {
    primary: ['arms'],
    secondary: ['chest', 'shoulders', 'core'],
    cues: [
      cue('ابدأ باليدين تحت الكتفين واجعل المرفقين قريبين من الجذع.', 'Start with hands under your shoulders and keep elbows near your torso.'),
      cue('استخدم مدى مريحًا وادفع للأعلى مع ثبات الجذع.', 'Use a comfortable range and press up while keeping your torso steady.'),
    ],
    mistakes: [
      cue('تجنّب تقريب اليدين بشكل يسبب ضغطًا على الرسغ.', 'Do not bring your hands so close that your wrists feel strained.'),
    ],
    breathing: cue('شهيق أثناء النزول وزفير أثناء الدفع.', 'Inhale as you lower and exhale as you press.'),
  },
  'bicep-self-curl': {
    primary: ['arms'],
    secondary: ['core'],
    cues: [
      cue('استخدم اليد الأخرى لمقاومة خفيفة ومتدرجة.', 'Use your other hand to provide light, gradual resistance.'),
      cue('أبقِ الكوع بجانب الجسم وتحكم في العودة.', 'Keep your elbow beside your body and control the return.'),
    ],
    mistakes: [
      cue('تجنّب هز الجذع أو الضغط القوي على الرسغ.', 'Avoid swinging your torso or pressing hard on your wrist.'),
    ],
    breathing: cue('ازفر مع الثني وخذ شهيقًا عند العودة.', 'Exhale as you curl and inhale as you return.'),
  },
  'superman-pull': {
    primary: ['upper-back'],
    secondary: ['shoulders', 'glutes', 'core'],
    cues: [
      cue('ارفع الصدر والذراعين ارتفاعًا بسيطًا فقط.', 'Lift your chest and arms only a small distance.'),
      cue('اسحب المرفقين نحو الجانبين مع ضم لوحي الكتف.', 'Draw your elbows toward your sides and gently squeeze your shoulder blades.'),
    ],
    mistakes: [
      cue('تجنّب المبالغة في الرفع أو تقويس أسفل الظهر.', 'Avoid lifting too high or arching your lower back.'),
    ],
    breathing: cue('ازفر أثناء السحب وخذ شهيقًا عند مد الذراعين.', 'Exhale as you pull and inhale as you reach forward.'),
  },
  'reverse-snow-angel': {
    primary: ['upper-back', 'shoulders'],
    secondary: ['arms'],
    cues: [
      cue('حرّك الذراعين في قوس مريح مع بقاء الجبهة منخفضة.', 'Sweep your arms through a comfortable arc with your forehead lowered.'),
      cue('حافظ على الكتفين بعيدين عن الأذنين.', 'Keep your shoulders away from your ears.'),
    ],
    mistakes: [
      cue('تجنّب رفع الصدر بقوة أو إجبار الكتفين على مدى واسع.', 'Avoid lifting your chest forcefully or forcing a wide shoulder range.'),
    ],
    breathing: cue('حافظ على تنفس هادئ أثناء الحركة.', 'Keep breathing calmly throughout the movement.'),
  },
  'prone-t-raise': {
    primary: ['upper-back', 'shoulders'],
    secondary: ['arms'],
    cues: [
      cue('قرّب لوحي الكتف وارفع اليدين مسافة صغيرة.', 'Draw your shoulder blades together and lift your hands slightly.'),
      cue('أبقِ الرقبة محايدة والجبهة قريبة من الأرض.', 'Keep your neck neutral and your forehead near the floor.'),
    ],
    mistakes: [
      cue('تجنّب رفع الذراعين عاليًا أو تقويس الظهر.', 'Avoid lifting your arms too high or arching your back.'),
    ],
    breathing: cue('ازفر عند الرفع وخذ شهيقًا عند الإنزال.', 'Exhale as you lift and inhale as you lower.'),
  },
  'scapular-push-up': {
    primary: ['shoulders'],
    secondary: ['chest', 'arms', 'core'],
    cues: [
      cue('أبقِ المرفقين مستقيمين طوال الحركة.', 'Keep your elbows straight throughout the movement.'),
      cue('حرّك لوحي الكتف والصدر فقط مع ثبات الحوض.', 'Move your shoulder blades and chest while keeping your hips steady.'),
    ],
    mistakes: [
      cue('تجنّب ثني المرفقين أو ترك أسفل الظهر يهبط.', 'Avoid bending your elbows or letting your lower back sag.'),
    ],
    breathing: cue('تنفس باستمرار ولا تحبس النفس في وضع البلانك.', 'Keep breathing and do not hold your breath in the plank.'),
  },
  'arm-circles': {
    primary: ['shoulders'],
    secondary: ['upper-back'],
    cues: [
      cue('ابدأ بمدى دائري صغير مع إبقاء الذراعين مرتاحتين.', 'Start with small circles and keep your arms relaxed.'),
      cue('حرّك الكتفين بتحكم ولا ترفعها نحو الأذنين.', 'Move your shoulders with control without shrugging toward your ears.'),
    ],
    mistakes: [cue('تجنب الدوائر السريعة أو المؤلمة.', 'Avoid fast or painful circles.')],
    breathing: cue('تنفس بهدوء مع استمرار الدوائر.', 'Breathe calmly as you continue the circles.'),
  },
  'chest-expansion': {
    primary: ['chest'],
    secondary: ['shoulders', 'upper-back'],
    cues: [
      cue('افتح الذراعين براحة مع تقريب لوحي الكتف.', 'Open your arms comfortably while drawing your shoulder blades together.'),
      cue('حافظ على الجذع ثابتًا ولا تدفع الأضلاع للأمام.', 'Keep your torso steady and avoid pushing your ribs forward.'),
    ],
    mistakes: [cue('تجنب دفع الذراعين خلف الجسم إلى مدى مؤلم.', 'Avoid forcing your arms behind your body into a painful range.')],
    breathing: cue('ازفر عند فتح الذراعين وخذ شهيقًا عند العودة.', 'Exhale as you open your arms and inhale as you return.'),
  },
  'torso-twists': {
    primary: ['obliques'],
    secondary: ['core', 'shoulders'],
    cues: [
      cue('لف الجذع برفق مع توجيه الصدر للجانب.', 'Gently rotate your torso and turn your chest to the side.'),
      cue('أبقِ الحوض والقدمين ثابتين وتجنب الارتداد.', 'Keep your hips and feet steady; do not bounce.'),
    ],
    mistakes: [cue('تجنب الدوران السريع أو تحريك الركبتين مع الجذع.', 'Avoid quick twisting or rotating your knees with your torso.')],
    breathing: cue('ازفر مع اللف وخذ شهيقًا عند العودة للمنتصف.', 'Exhale into the twist and inhale as you return to center.'),
  },
  'leg-raise': {
    primary: ['core'],
    secondary: ['hip-flexors'],
    cues: [
      cue('ثبت أسفل الظهر وارفَع الساقين ضمن مدى متحكم به.', 'Keep your lower back grounded and lift through a controlled range.'),
      cue('اخفض الساقين ببطء مع شد البطن.', 'Lower your legs slowly while bracing your abdomen.'),
    ],
    mistakes: [cue('تجنب تقويس الظهر أو استخدام الزخم لرفع الساقين.', 'Avoid arching your back or using momentum to lift your legs.')],
    breathing: cue('ازفر عند الرفع وخذ شهيقًا عند الإنزال.', 'Exhale as you lift and inhale as you lower.'),
  },
  'high-knees': {
    primary: ['hip-flexors', 'quads'],
    secondary: ['calves', 'core'],
    cues: [
      cue('ارفع الركبتين بالتبادل مع إبقاء الجذع منتصبًا.', 'Alternate knee lifts while keeping your torso upright.'),
      cue('ابدأ بإيقاع مريح واجعل هبوط القدمين هادئًا.', 'Start at a comfortable pace and land softly.'),
    ],
    mistakes: [cue('تجنب الميل للخلف أو الهبوط الثقيل على القدمين.', 'Avoid leaning backward or landing heavily.')],
    breathing: cue('تنفس باستمرار مع إيقاع الخطوات.', 'Keep breathing steadily with your steps.'),
  },
  'standing-side-stretch': {
    primary: ['obliques'],
    secondary: ['upper-back', 'shoulders'],
    cues: [
      cue('مِل من الجذع إلى الجانب مع بقاء القدمين ثابتتين.', 'Lean your torso sideways while keeping your feet steady.'),
      cue('حافظ على الصدر للأمام وتوقف عند شد لطيف.', 'Keep your chest facing forward and stop at a gentle stretch.'),
    ],
    mistakes: [cue('تجنب تدوير الجسم أو دفع الورك إلى الجانب.', 'Avoid rotating your body or pushing your hip sideways.')],
    breathing: cue('تنفس ببطء أثناء الثبات ثم بدّل الجانب.', 'Breathe slowly during the hold, then switch sides.'),
  },
  'cat-cow': {
    primary: ['upper-back'],
    secondary: ['core', 'shoulders'],
    cues: [
      cue('ابدأ من وضع اليدين والركبتين مع حركة بطيئة للظهر.', 'Start on hands and knees and move your back slowly.'),
      cue('حرّك الرأس مع العمود الفقري دون ضغط على الرقبة.', 'Move your head with your spine without straining your neck.'),
    ],
    mistakes: [cue('تجنب دفع البطن أو الرأس بقوة إلى نهاية المدى.', 'Avoid forcing your abdomen or head into end range.')],
    breathing: cue('ازفر عند تدوير الظهر واستنشق عند فتح الصدر.', 'Exhale as you round your back and inhale as you open your chest.'),
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
