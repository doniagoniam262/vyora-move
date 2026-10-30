export type ExerciseErrorGuide = {
  id: string;
  image?: string;
  title: { ar: string; en: string };
  cause: { ar: string; en: string };
  correction: { ar: string; en: string };
};

const guide = (
  id: string,
  _poseHint: string,
  arTitle: string,
  enTitle: string,
  arCause: string,
  enCause: string,
  arCorrection: string,
  enCorrection: string,
): ExerciseErrorGuide => ({
  id,
  title: { ar: arTitle, en: enTitle },
  cause: { ar: arCause, en: enCause },
  correction: { ar: arCorrection, en: enCorrection },
});

export const exerciseFormErrors: Record<string, ExerciseErrorGuide[]> = {
  squat: [
    {
      id: 'knees',
      title: { ar: 'انهيار الركبتين للداخل', en: 'Knees collapsing inward' },
      cause: { ar: 'قد يحدث عند ضعف التحكم في الورك أو عند زيادة الحمل والسرعة عن قدرة الجسم.', en: 'This can happen when hip control is limited or the load and speed exceed current capacity.' },
      correction: { ar: 'خفّف عمق الحركة، ووجّه الركبتين برفق نحو أصابع القدمين مع إبقاء القدمين ثابتتين.', en: 'Reduce depth and track your knees toward your toes while keeping both feet grounded.' },
    },
    {
      id: 'back',
      title: { ar: 'تقوّس أو انحناء الظهر', en: 'Back rounding or over-arching' },
      cause: { ar: 'غالبًا ينتج عن محاولة النزول أعمق من مدى الحركة المريح أو فقدان شدّ الجذع.', en: 'Often caused by dropping deeper than your comfortable range or losing trunk control.' },
      correction: { ar: 'شدّ البطن باعتدال، وحافظ على الجذع ثابتًا، واكتفِ بمدى تستطيع التحكم فيه.', en: 'Brace gently, keep your trunk steady, and use only a range you can control.' },
    },
    {
      id: 'depth',
      title: { ar: 'التسرّع في النزول أو قطع المدى', en: 'Rushing or cutting the range short' },
      cause: { ar: 'قد يكون السبب التسرع أو اختيار عمق لا يناسب التوازن والمرونة الحاليين.', en: 'Rushing or choosing a depth that does not suit current balance and mobility may cause this.' },
      correction: { ar: 'انزل ببطء إلى عمق مريح مع بقاء الكعبين على الأرض، ثم زد المدى تدريجيًا.', en: 'Lower slowly to a comfortable depth with heels down, then build range gradually.' },
    },
  ],
  'push-up': [
    {
      id: 'hips-sag',
      title: { ar: 'هبوط الحوض', en: 'Hips sagging' },
      cause: { ar: 'يحدث غالبًا عند ضعف شدّ البطن أو اختيار عدد تكرارات أكبر من القدرة الحالية.', en: 'Often caused by losing core tension or attempting more repetitions than current capacity.' },
      correction: { ar: 'شدّ البطن والأرداف وحافظ على خط مستقيم؛ استخدم وضع الركبتين أو سطحًا مرتفعًا عند الحاجة.', en: 'Brace your core and glutes; use a knee or incline variation when needed.' },
    },
    {
      id: 'elbows',
      title: { ar: 'فتح المرفقين للخارج', en: 'Elbows flaring too wide' },
      cause: { ar: 'قد تبتعد اليدان أو المرفقان أكثر من اللازم، فيزيد الضغط على الكتفين.', en: 'Hands or elbows may drift too wide, increasing shoulder strain.' },
      correction: { ar: 'ضع اليدين أسفل الكتفين تقريبًا، واجعل المرفقين بزاوية مريحة باتجاه الخلف.', en: 'Place hands about under the shoulders and guide elbows back at a comfortable angle.' },
    },
    {
      id: 'neck',
      title: { ar: 'إسقاط الرأس أو قصر النزول', en: 'Head dropping or uncontrolled depth' },
      cause: { ar: 'غالبًا بسبب متابعة الأرض بالرأس أو النزول أسرع من القدرة على التحكم.', en: 'Often caused by leading with the head or lowering faster than you can control.' },
      correction: { ar: 'اجعل الرقبة امتدادًا للجذع، وانزل بالصدر بتحكم ضمن مدى مريح.', en: 'Keep your neck aligned with your trunk and lower your chest through a controlled range.' },
    },
  ],
  plank: [
    {
      id: 'hips-sag',
      title: { ar: 'هبوط الوركين', en: 'Hips dropping' },
      cause: { ar: 'يظهر عند فقدان شدّ البطن أو إطالة الثبات بعد التعب.', en: 'This appears when core tension fades or the hold continues after fatigue.' },
      correction: { ar: 'شدّ البطن والأرداف، وأنهِ الجولة قبل أن يهبط أسفل الظهر.', en: 'Brace your core and glutes, and end the hold before your lower back sags.' },
    },
    {
      id: 'hips-high',
      title: { ar: 'رفع الوركين عاليًا', en: 'Hips lifted too high' },
      cause: { ar: 'قد تكون محاولة لتخفيف الحمل على الجذع، لكنها تقلل ثبات وضع البلانك.', en: 'This may be an attempt to reduce core effort, but it changes the plank alignment.' },
      correction: { ar: 'اخفض الوركين حتى يصطف الرأس والكتفان والحوض والكعبان.', en: 'Lower your hips until your head, shoulders, hips, and heels align.' },
    },
    {
      id: 'neck',
      title: { ar: 'رفع الرأس أو حبس النفس', en: 'Neck strain or held breath' },
      cause: { ar: 'النظر للأمام أو التركيز المفرط قد يسبب توتر الرقبة والتنفس.', en: 'Looking forward or over-focusing can tense the neck and interrupt breathing.' },
      correction: { ar: 'انظر للأرض أسفل الوجه مباشرة، وتنفس بهدوء طوال الثبات.', en: 'Look at the floor below your face and keep breathing calmly.' },
    },
  ],
  lunge: [
    {
      id: 'knee-in',
      title: { ar: 'تحرك الركبة الأمامية للداخل', en: 'Front knee collapsing inward' },
      cause: { ar: 'قد يرتبط بخطوة غير ثابتة أو فقدان الاتزان أثناء النزول.', en: 'This can follow an unstable step or loss of balance while lowering.' },
      correction: { ar: 'خفف عمق الحركة، وثبّت القدم، ووجّه الركبة نحو منتصف القدم.', en: 'Reduce depth, steady your foot, and track the knee toward the middle of the foot.' },
    },
    {
      id: 'stride',
      title: { ar: 'خطوة قصيرة أو ضيقة', en: 'Step too short or narrow' },
      cause: { ar: 'قد تجعل المسافة غير المناسبة الحركة غير مريحة وتحد من الاتزان.', en: 'An unsuitable step length can make the movement uncomfortable and unstable.' },
      correction: { ar: 'ابدأ بخطوة مريحة بعرض الحوض، وامسك دعمًا ثابتًا إذا احتجت.', en: 'Use a comfortable hip-width stance and hold stable support if needed.' },
    },
    {
      id: 'torso',
      title: { ar: 'ميل الجذع أو فقدان الاتزان', en: 'Torso tipping or losing balance' },
      cause: { ar: 'يحدث عند الاندفاع بسرعة أو نقل الوزن إلى مقدمة القدم.', en: 'This can happen when lunging too quickly or shifting weight onto the toes.' },
      correction: { ar: 'حافظ على الجذع طويلًا، ووزّع الضغط على كامل القدم الأمامية.', en: 'Keep your torso tall and distribute pressure through the whole front foot.' },
    },
  ],
  'glute-bridge': [
    {
      id: 'arch',
      title: { ar: 'المبالغة في تقويس أسفل الظهر', en: 'Over-arching the lower back' },
      cause: { ar: 'قد يحدث عند رفع الحوض أعلى من مدى الحركة أو دفع الحركة من الظهر.', en: 'This can happen when lifting beyond your range or driving the movement from your back.' },
      correction: { ar: 'شدّ البطن وارفع الحوض حتى يصطف الجذع والفخذان دون ألم.', en: 'Brace your core and lift until your torso and thighs align, without pain.' },
    },
    {
      id: 'feet',
      title: { ar: 'إبعاد القدمين عن الحوض', en: 'Feet positioned too far away' },
      cause: { ar: 'المسافة الزائدة قد تنقل الجهد من الأرداف وتقلل ثبات الحركة.', en: 'Excessive distance can shift effort away from the glutes and reduce stability.' },
      correction: { ar: 'قرّب القدمين بحيث تستطيع ضغط الأرض بالكعبين براحة.', en: 'Bring your feet closer so you can press comfortably through your heels.' },
    },
    {
      id: 'push',
      title: { ar: 'الدفع من الرقبة أو القدمين فقط', en: 'Pushing through the neck or toes' },
      cause: { ar: 'قد يكون بسبب وضع القدمين أو محاولة رفع الحوض بقوة بدل التحكم.', en: 'This may come from foot placement or forcing the lift instead of controlling it.' },
      correction: { ar: 'أبقِ الرأس والكتفين مسترخيين، وادفع من الكعبين مع عصر الأرداف.', en: 'Relax your head and shoulders, press through your heels, and squeeze your glutes.' },
    },
  ],
  deadlift: [
    {
      id: 'back-round',
      title: { ar: 'تقوّس الظهر أثناء الرفع', en: 'Rounding the back during the lift' },
      cause: { ar: 'قد يحدث عند زيادة الوزن أو النزول أبعد من مدى الورك المتحكم به.', en: 'This can happen when the load is too heavy or the hinge exceeds controlled range.' },
      correction: { ar: 'خفف الحمل، وابدأ من الورك، وحافظ على الظهر محايدًا والوزن قريبًا.', en: 'Reduce load, hinge from the hips, and keep a neutral back with the weight close.' },
    },
    {
      id: 'bar-distance',
      title: { ar: 'ابتعاد الوزن عن الجسم', en: 'Weight drifting away from the body' },
      cause: { ar: 'ابتعاد الوزن يزيد ذراع المقاومة ويجعل التحكم أصعب على الظهر.', en: 'A distant load increases leverage and makes back control harder.' },
      correction: { ar: 'حرّك الوزن قريبًا من الساقين مع إبقاء الذراعين مرتخيتين.', en: 'Keep the load close to your legs and your arms relaxed.' },
    },
    {
      id: 'jerk',
      title: { ar: 'سحب الوزن بسرعة أو بقفزة', en: 'Jerking the load off the floor' },
      cause: { ar: 'الاستعجال قبل تثبيت القدمين والجذع يقلل التحكم في بداية الحركة.', en: 'Starting before setting your feet and trunk reduces control at lift-off.' },
      correction: { ar: 'ثبّت القدمين، شدّ الجذع، ثم ارفع بسلاسة مع دفع الأرض.', en: 'Set your feet, brace your trunk, and lift smoothly while pressing the floor away.' },
    },
  ],
  'pull-up': [
    guide('swing', 'torso', 'التأرجح بدل السحب', 'Swinging instead of pulling', 'استخدام اندفاع الساقين يقلل عمل الظهر والتحكم.', 'Leg momentum reduces back engagement and control.', 'ابدأ من جسم ثابت واسحب الصدر نحو البار.', 'Start from a still body and pull your chest toward the bar.'),
    guide('shoulders-up', 'shoulder', 'ترك الكتفين قرب الأذنين', 'Shoulders rising toward the ears', 'بدء الحركة دون تثبيت لوحي الكتف يزيد توتر الرقبة.', 'Pulling without setting the shoulder blades can tense the neck.', 'اخفض لوحي الكتف أولًا ثم اثنِ المرفقين.', 'Draw the shoulder blades down before bending the elbows.'),
    guide('fast-drop', 'jerk', 'السقوط بسرعة من الأعلى', 'Dropping too quickly', 'ترك الوزن فجأة يفقد التحكم في الكتفين والمرفقين.', 'Releasing suddenly removes shoulder and elbow control.', 'انزل ببطء حتى تمد الذراعين بأمان.', 'Lower slowly until your arms extend safely.'),
  ],
  'bench-press': [
    guide('bar-bounce', 'range', 'ارتداد البار عن الصدر', 'Bouncing the bar off the chest', 'الوزن الزائد أو السرعة قد يمنعان التوقف المتحكم به.', 'Excess load or speed can prevent a controlled pause.', 'استخدم وزنًا أخف والمس الصدر برفق دون ارتداد.', 'Use a lighter load and touch gently without bouncing.'),
    guide('wrists-back', 'hands', 'انثناء الرسغين للخلف', 'Wrists bending backward', 'وضع البار بعيدًا عن قاعدة الكف يضغط على الرسغ.', 'Holding the bar away from the heel of the palm strains the wrist.', 'ضع البار فوق قاعدة الكف وأبقِ الرسغ فوق المرفق.', 'Set the bar over the heel of your palm and stack wrist over elbow.'),
    guide('feet-lift', 'feet', 'رفع القدمين أو فقدان الثبات', 'Feet lifting or losing stability', 'عدم ضبط المقعد أو القدمين يقلل ثبات الجسم.', 'Poor bench or foot setup reduces body stability.', 'ثبّت القدمين والكتفين قبل فك البار.', 'Plant your feet and shoulders before unracking.'),
  ],
  'bicep-curl': [
    guide('body-swing', 'torso', 'تأرجح الجذع', 'Swinging the torso', 'الوزن الثقيل يدفع الجسم لاستخدام الاندفاع.', 'A heavy load encourages momentum.', 'خفف الوزن وثبّت الأضلاع فوق الحوض.', 'Reduce the load and keep your ribs stacked over your hips.'),
    guide('elbows-forward', 'elbows', 'تحرك المرفقين للأمام', 'Elbows drifting forward', 'رفع الكتف يحول الحركة بعيدًا عن ثني المرفق.', 'Shoulder movement shifts work away from the elbow curl.', 'ثبّت المرفقين بجانب الجسم طوال التكرار.', 'Keep your elbows beside your torso for the whole rep.'),
    guide('fast-lower', 'jerk', 'إسقاط الدامبلز سريعًا', 'Dropping the dumbbells quickly', 'التركيز على الرفع فقط يفقد التحكم في العودة.', 'Focusing only on lifting loses control on the return.', 'اخفض الدامبلز ببطء حتى تمد الذراعين.', 'Lower slowly until your arms extend.'),
  ],
  'shoulder-press': [
    guide('back-arch', 'back', 'تقويس أسفل الظهر', 'Arching the lower back', 'الوزن الزائد أو ضعف شد الجذع يدفع الأضلاع للأمام.', 'Excess load or weak bracing pushes the ribs forward.', 'خفف الوزن وشد البطن مع إبقاء الأضلاع فوق الحوض.', 'Reduce the load, brace your abs, and stack ribs over hips.'),
    guide('elbows-far', 'elbows', 'دفع المرفقين بعيدًا للخلف', 'Elbows drifting too far back', 'بداية غير مريحة قد تزيد ضغط مقدمة الكتف.', 'An awkward start can increase front-shoulder strain.', 'ابدأ بمرفقين تحت الرسغين وفي مستوى مريح.', 'Start with elbows under wrists at a comfortable angle.'),
    guide('weights-hit', 'hands', 'اصطدام الدامبلز فوق الرأس', 'Dumbbells colliding overhead', 'الدفع بسرعة يقلل التحكم قرب نهاية المدى.', 'Pressing too fast reduces control near the top.', 'ادفع بسلاسة وتوقف قبل اصطدام الدامبلز.', 'Press smoothly and stop before the dumbbells collide.'),
  ],
  march: [
    guide('lean-back', 'torso', 'الميل للخلف', 'Leaning backward', 'رفع الركبتين عاليًا أو تسريع الخطوات قد يسحب الجذع للخلف.', 'High knee lifts or rushing can pull the torso backward.', 'ارفع الركبة لمدى مريح وحافظ على الجذع فوق الحوض.', 'Use a comfortable knee height and keep your torso over your hips.'),
    guide('stomp', 'feet', 'الهبوط بقوة', 'Stomping the feet', 'الخطوات العنيفة تزيد الحمل على القدمين والمفاصل.', 'Hard steps increase impact on the feet and joints.', 'اخطُ بهدوء واجعل ملامسة القدم للأرض ناعمة.', 'Step quietly and land each foot softly.'),
    guide('arm-tension', 'shoulder', 'شدّ الكتفين', 'Tensing the shoulders', 'رفع الكتفين أو شد الذراعين يسبب توترًا غير ضروري.', 'Shrugging or stiff arms create unnecessary tension.', 'أرخِ الكتفين ودع الذراعين يتحركان طبيعيًا.', 'Relax your shoulders and let your arms move naturally.'),
  ],
  'shoulder-circles': [
    guide('shrug', 'shoulder', 'رفع الكتفين نحو الأذنين', 'Shrugging toward the ears', 'قد يحلّ شد الرقبة محل حركة الكتف.', 'Neck tension can replace shoulder movement.', 'أبقِ الرقبة طويلة والكتفين منخفضين.', 'Keep your neck long and shoulders lowered.'),
    guide('large-circles', 'range', 'دوائر أكبر من المدى المريح', 'Circles beyond a comfortable range', 'زيادة المدى قد تهيّج مفصل الكتف.', 'Forcing the range may irritate the shoulder joint.', 'ابدأ بدوائر صغيرة وزدها فقط إذا بقيت الحركة مريحة.', 'Start with small circles and widen them only while comfortable.'),
    guide('fast-circles', 'jerk', 'التدوير بسرعة أو بعنف', 'Circling too fast or forcefully', 'السرعة تقلل التحكم في مسار المفصل.', 'Speed reduces control over the joint path.', 'حرّك الذراعين بإيقاع بطيء ومتساوٍ.', 'Move your arms slowly and evenly.'),
  ],
  'jacks-low': [
    guide('jumping', 'feet', 'إضافة قفز غير مطلوب', 'Adding an unnecessary jump', 'القفز يزيد الصدمة رغم أن الحركة مصممة كخطوة منخفضة التأثير.', 'Jumping adds impact to a low-impact movement.', 'اخطُ جانبًا ثم أعد القدم دون قفز.', 'Step sideways and bring the foot back without jumping.'),
    guide('arms-high', 'shoulder', 'رفع الذراعين فوق المدى المريح', 'Lifting arms beyond a comfortable range', 'قد يسبب مدى الكتف المحدود تعويضًا برفع الكتفين.', 'Limited shoulder range may lead to shrugging.', 'ارفع الذراعين إلى مستوى مريح فقط.', 'Raise your arms only to a comfortable height.'),
    guide('uneven-steps', 'stride', 'خطوات غير متزنة', 'Uneven or rushed steps', 'الإيقاع السريع قد يضع القدمين في موضع غير ثابت.', 'A fast pace can make foot placement unstable.', 'حافظ على خطوات قصيرة وإيقاع منتظم.', 'Use short steps and a steady rhythm.'),
  ],
  'mountain-climber': [
    guide('hips-high', 'hips-high', 'رفع الحوض عاليًا', 'Hips lifting too high', 'قد يحاول الجسم تخفيف الحمل عن الجذع بهذه الطريقة.', 'The body may hike the hips to reduce core demand.', 'أعد الكتفين فوق اليدين ومدّ الجسم بخط مريح.', 'Stack shoulders over hands and lengthen into a comfortable line.'),
    guide('hips-sag', 'hips-sag', 'هبوط أسفل الظهر', 'Lower back sagging', 'التعب أو السرعة قد يضعفان شدّ الجذع.', 'Fatigue or speed can reduce core tension.', 'أبطئ الحركة أو ارفع اليدين على سطح ثابت.', 'Slow down or place your hands on a stable elevated surface.'),
    guide('short-knee', 'range', 'سحب الركبة دون تحكم', 'Driving the knee without control', 'محاولة السرعة قد تجعل حركة الورك قصيرة أو مرتدة.', 'Rushing can make the hip motion short or bouncy.', 'اسحب الركبة ببطء نحو الصدر مع زفير هادئ.', 'Drive the knee toward your chest slowly while exhaling.'),
  ],
  'incline-push': [
    guide('surface-move', 'hands', 'استخدام سطح غير ثابت', 'Using an unstable surface', 'السطح المتحرك يصعّب تثبيت اليدين والجذع.', 'A moving surface makes hand and trunk control harder.', 'اختر طاولة أو حائطًا ثابتًا قبل بدء المجموعة.', 'Choose a sturdy table or wall before starting.'),
    guide('hips-bend', 'hips', 'انثناء الجسم عند الحوض', 'Bending at the hips', 'قد لا يكون شد البطن والأرداف كافيًا.', 'Core and glute tension may be insufficient.', 'حافظ على خط واحد من الرأس إلى الكعبين.', 'Maintain one line from your head to your heels.'),
    guide('elbows-out', 'elbows', 'فتح المرفقين كثيرًا', 'Elbows flaring too wide', 'اتساع المرفقين قد يزيد إجهاد الكتف.', 'Wide elbows can increase shoulder strain.', 'وجّه المرفقين للخلف بزاوية مريحة.', 'Guide your elbows back at a comfortable angle.'),
  ],
  'chair-dip': [
    guide('chair-slip', 'hands', 'ابتعاد الكرسي أو تحركه', 'Chair moving away', 'الكرسي غير الثابت قد ينزلق أثناء تحميل الوزن عليه.', 'An unsecured chair may slide under load.', 'اسند الكرسي إلى حائط وافحص ثباته قبل التمرين.', 'Place the chair against a wall and check it before exercising.'),
    guide('deep-dip', 'range', 'النزول أعمق من المريح', 'Dipping too deeply', 'العمق الزائد قد يضغط على مقدمة الكتف.', 'Excessive depth can stress the front of the shoulder.', 'استخدم مدى قصيرًا وأوقف النزول قبل أي ألم.', 'Use a shallow range and stop before discomfort.'),
    guide('shoulders-forward', 'shoulder', 'تقدم الكتفين للأمام', 'Shoulders rolling forward', 'الابتعاد كثيرًا عن الكرسي قد يقلل التحكم بالكتف.', 'Moving too far from the chair can reduce shoulder control.', 'ابقِ الوركين قريبين من الكرسي واسحب الكتفين للخلف بلطف.', 'Keep your hips close to the chair and gently draw shoulders back.'),
  ],
  crunch: [
    guide('neck-pull', 'neck', 'سحب الرأس باليدين', 'Pulling the head with your hands', 'قد تحاول اليدان تعويض ضعف بدء الحركة من البطن.', 'The hands may compensate when the abs do not initiate the curl.', 'اسند الرأس بخفة وارفع لوحي الكتف فقط.', 'Support your head lightly and lift only your shoulder blades.'),
    guide('full-sit', 'range', 'الجلوس كاملًا بدل الكرنش', 'Sitting all the way up', 'رفع الجذع بالكامل يحول الحركة ويزيد مشاركة مثنيات الورك.', 'Lifting the whole torso changes the movement and increases hip-flexor work.', 'اجعل الحركة قصيرة من أعلى البطن ثم عد ببطء.', 'Curl a short distance from the upper abs, then lower slowly.'),
    guide('back-lift', 'back', 'رفع أسفل الظهر عن الأرض', 'Lower back lifting off the floor', 'قد يكون مدى الرفع أكبر من قدرة الجذع على الثبات.', 'The range may exceed your ability to keep the trunk stable.', 'ثبّت أسفل الظهر وخفف ارتفاع الكتفين.', 'Keep your lower back grounded and reduce the shoulder lift.'),
  ],
  bicycle: [
    guide('elbow-knee', 'torso', 'سحب المرفق بدل تدوير الجذع', 'Pulling the elbow instead of rotating', 'تحريك الذراع فقط يقلل دوران الجذع المتحكم به.', 'Moving only the arm reduces controlled trunk rotation.', 'لفّ الكتف نحو الركبة المقابلة دون شد الرقبة.', 'Rotate your shoulder toward the opposite knee without straining your neck.'),
    guide('fast-bicycle', 'jerk', 'التبديل بسرعة وباندفاع', 'Switching too quickly', 'السرعة قد تقلل مدى الحركة والتحكم في أسفل الظهر.', 'Speed can reduce range and low-back control.', 'أبطئ التبديل ومدّ الساق تدريجيًا.', 'Slow the switch and extend each leg gradually.'),
    guide('back-arch', 'back', 'تقوس أسفل الظهر', 'Arching the lower back', 'مدّ الساقين بعيدًا قد يرفع الظهر عن الأرض.', 'Extending the legs too far may lift the back from the floor.', 'قلل مدى مد الساق وأبقِ الظهر قريبًا من الأرض.', 'Shorten the leg reach and keep your back close to the floor.'),
  ],
  hamstring: [
    guide('round-back', 'back', 'تقويس الظهر للوصول للأمام', 'Rounding the back to reach farther', 'محاولة لمس القدم قد تأتي من الظهر بدل مفصل الورك.', 'Trying to touch the foot may bend the back instead of hinging at the hips.', 'ابدأ الحركة من الوركين وحافظ على ظهر طويل.', 'Hinge from your hips and keep your back long.'),
    guide('locked-knee', 'knee', 'قفل الركبة بقوة', 'Forcing the knee straight', 'الضغط الزائد قد يحول الشد اللطيف إلى ألم خلف الركبة.', 'Forcing the stretch can turn a gentle pull into pain behind the knee.', 'اسمح بثني بسيط للركبة حتى تشعر بشد مريح.', 'Allow a slight knee bend until the stretch feels comfortable.'),
    guide('bounce', 'jerk', 'الارتداد أثناء التمدد', 'Bouncing during the stretch', 'الارتداد لا يسمح للعضلة بالتكيف بهدوء.', 'Bouncing prevents the muscle from settling into the stretch.', 'اثبت بهدوء وتنفس دون دفع إضافي.', 'Hold still and breathe without forcing extra range.'),
  ],
  'childs-pose': [
    guide('knees-pain', 'knee', 'ضغط الركبتين على الأرض', 'Pressing painfully into the knees', 'الأرض القاسية أو مدى الثني الكبير قد يزعجان الركبتين.', 'A hard floor or deep bend may irritate the knees.', 'ضع وسادة تحت الركبتين أو قلل مدى الثني.', 'Place a cushion under your knees or reduce the bend.'),
    guide('shoulders-raised', 'shoulder', 'شد الكتفين قرب الأذنين', 'Tensing shoulders near the ears', 'مد الذراعين بقوة قد يسبب شدًا في الرقبة والكتفين.', 'Forcing the arms forward can tense the neck and shoulders.', 'أرخِ الكتفين واسند الذراعين براحة.', 'Relax your shoulders and rest your arms comfortably.'),
    guide('forced-depth', 'range', 'دفع الصدر للأرض بالقوة', 'Forcing the chest toward the floor', 'اختلاف مرونة الورك والكاحل قد يحد من المدى الطبيعي.', 'Hip and ankle mobility vary and may limit range.', 'استخدم وسادة للدعم وتوقف عند شد لطيف فقط.', 'Use a cushion for support and stop at a gentle stretch.'),
  ],
  'wall-push-up': [
    guide('feet-close', 'stride', 'الوقوف قريبًا جدًا من الحائط', 'Standing too close to the wall', 'المسافة القصيرة تقلل مدى الحركة والتحكم.', 'A short stance reduces the available range and control.', 'ارجع خطوة أو خطوتين مع تثبيت القدمين.', 'Step back slightly while keeping your feet stable.'),
    guide('elbows-wide', 'elbows', 'فتح المرفقين للجانبين', 'Elbows flaring sideways', 'قد يزيد ذلك الضغط على مفصل الكتف.', 'This may increase stress on the shoulder joint.', 'وجّه المرفقين للخلف بزاوية مريحة.', 'Guide your elbows back at a comfortable angle.'),
    guide('hip-fold', 'hips', 'ثني الحوض نحو الحائط', 'Folding at the hips toward the wall', 'قد لا يحافظ الجسم على خط مستقيم خلال الدفع.', 'The body may lose its straight alignment during the press.', 'شد الجذع وحافظ على خط الرأس والحوض والكعبين.', 'Brace your trunk and align head, hips, and heels.'),
  ],
  'prone-w-raise': [
    guide('neck-lift', 'neck', 'رفع الرأس أثناء الرفع', 'Lifting the head during the raise', 'قد يحاول المتدرب النظر للأمام بدل إبقاء الرقبة محايدة.', 'Looking forward can pull the neck out of neutral.', 'انظر للأرض واجعل الجبهة قريبة منها.', 'Look at the floor and keep your forehead close to it.'),
    guide('large-lift', 'range', 'رفع الذراعين عاليًا', 'Lifting the arms too high', 'الرفع المبالغ فيه قد يدفع الحركة إلى أسفل الظهر.', 'Excessive lifting may shift the movement into the lower back.', 'ارفع اليدين قليلًا مع ضم لوحي الكتف.', 'Lift the hands only slightly while drawing shoulder blades together.'),
    guide('shrug', 'shoulder', 'رفع الكتفين نحو الأذنين', 'Shrugging the shoulders', 'التركيز على ارتفاع اليدين قد يسبب شد الرقبة.', 'Focusing on hand height can tense the neck.', 'أبقِ الكتفين منخفضين وحرّك لوحي الكتف للخلف.', 'Keep shoulders low and move your shoulder blades back.'),
  ],
  'wall-sit': [
    guide('knees-in', 'knee', 'دخول الركبتين للداخل', 'Knees falling inward', 'قد تفقد الركبتان مسارهما عند التعب أو الوقفة غير الثابتة.', 'Knees may drift when fatigued or when the stance is unstable.', 'وجّه الركبتين مع أصابع القدمين وعدّل المسافة عن الحائط.', 'Track knees with toes and adjust your distance from the wall.'),
    guide('feet-close', 'feet', 'وضع القدمين قريبًا جدًا من الحائط', 'Feet too close to the wall', 'قد يدفع ذلك الركبتين للأمام ويصعب تثبيت الكعبين.', 'This can push the knees forward and make heels harder to ground.', 'حرّك القدمين للأمام قليلًا حتى تستقر القدم كاملة.', 'Move your feet forward until the whole foot feels grounded.'),
    guide('too-low', 'range', 'الجلوس أعمق من القدرة', 'Sitting lower than you can control', 'العمق أو مدة الثبات قد يتجاوزان قدرة الركبتين الحالية.', 'Depth or hold time may exceed current knee capacity.', 'ارفع وضعية الجلوس وقلل وقت الثبات تدريجيًا.', 'Use a higher position and build hold time gradually.'),
  ],
  'calf-raise': [
    guide('bounce', 'jerk', 'الارتداد عند النزول', 'Bouncing at the bottom', 'السرعة تمنع التحكم في مدى الكاحل.', 'Speed prevents control through the ankle range.', 'ارفع واخفض الكعبين ببطء مع توقف قصير.', 'Raise and lower your heels slowly with a brief pause.'),
    guide('ankle-roll', 'feet', 'تدحرج القدم للخارج أو الداخل', 'Rolling the feet inward or outward', 'قد يكون الارتكاز غير متوازن على مقدمة القدم.', 'Pressure may be uneven across the forefoot.', 'وزع الضغط قرب قاعدة إصبعي القدم الكبير والصغير.', 'Balance pressure near the bases of the big and little toes.'),
    guide('support-pull', 'hands', 'سحب الجسم باليدين على الدعم', 'Pulling on the support with your hands', 'الاعتماد على الذراعين يخفي ضعف التوازن ويغير الحمل.', 'Using the arms can mask balance issues and change the load.', 'المس الدعم بخفة واستخدمه للتوازن فقط.', 'Touch the support lightly and use it only for balance.'),
  ],
  'dead-bug': [
    guide('back-lift', 'back', 'ابتعاد أسفل الظهر عن الأرض', 'Lower back lifting from the floor', 'مد الذراع والساق بعيدًا قد يتجاوز ثبات الجذع.', 'Reaching too far may exceed your trunk control.', 'قلل مدى المد وازفر مع تثبيت الجذع.', 'Shorten the reach and exhale while bracing your trunk.'),
    guide('fast-switch', 'jerk', 'تبديل الأطراف بسرعة', 'Switching limbs too quickly', 'السرعة تقلل دقة التوازن بين الذراع والساق المتعاكستين.', 'Speed reduces coordination between the opposite arm and leg.', 'حرّك طرفًا واحدًا في كل مرة بإيقاع بطيء.', 'Move one limb pair at a time at a slow pace.'),
    guide('neck-tension', 'neck', 'شد الرقبة ورفع الرأس', 'Tensing the neck and lifting the head', 'محاولة مراقبة الأطراف قد ترفع الرأس عن الأرض.', 'Watching the limbs can lift the head off the floor.', 'أبقِ الرأس مستريحًا وانظر للأعلى.', 'Rest your head and look upward.'),
  ],
  'side-plank': [
    guide('hips-sag', 'hips-sag', 'هبوط الوركين', 'Hips sagging', 'مدة الثبات قد تتجاوز قدرة عضلات الجذع الجانبية.', 'The hold may exceed current side-core endurance.', 'اخفض الركبتين للأرض أو قلل مدة الجولة.', 'Lower your knees to the floor or shorten the hold.'),
    guide('hips-forward', 'hips-high', 'دوران الجسم للأمام', 'Rotating the body forward', 'قد يفقد الكتف والحوض التراصف فوق بعضهما.', 'The shoulder and hip may lose their stacked alignment.', 'وجّه الصدر للأمام واجعل الوركين فوق بعضهما.', 'Face your chest forward and stack your hips.'),
    guide('elbow-place', 'elbows', 'وضع المرفق بعيدًا عن الكتف', 'Elbow placed away from the shoulder', 'الارتكاز غير المتراصف يزيد الحمل على مفصل الكتف.', 'Misalignment increases load on the shoulder joint.', 'ضع المرفق تحت الكتف مباشرة واستخدم الركبتين عند الحاجة.', 'Place the elbow directly under your shoulder; use knees if needed.'),
  ],
  'fire-hydrant': [
    guide('trunk-roll', 'torso', 'دوران الجذع مع رفع الركبة', 'Rotating the trunk with the knee lift', 'رفع الساق عاليًا قد يحرك الحوض بدل مفصل الورك.', 'Lifting too high can move the pelvis instead of the hip.', 'أبقِ الحوض مواجهًا للأرض وارفع الركبة ضمن مدى صغير.', 'Keep your pelvis facing down and lift the knee through a small range.'),
    guide('back-arch', 'back', 'تقويس أسفل الظهر', 'Arching the lower back', 'قد يحاول الجسم تعويض محدودية حركة الورك.', 'The body may compensate for limited hip motion.', 'شد البطن وحافظ على الظهر محايدًا.', 'Brace your abdomen and keep a neutral back.'),
    guide('fast-drop', 'jerk', 'إسقاط الركبة بسرعة', 'Dropping the knee quickly', 'العودة السريعة تقلل التحكم وتزيد الحركة الارتدادية.', 'A quick return reduces control and creates bouncing.', 'أعد الركبة ببطء حتى تلامس الأرض بهدوء.', 'Lower your knee slowly until it rests quietly.'),
  ],
  'hip-hinge': [
    guide('knee-squat', 'knee', 'ثني الركبتين كأنها سكوات', 'Bending the knees like a squat', 'قد يبدأ المتدرب من الركبتين بدل تحريك الوركين للخلف.', 'The movement may start at the knees instead of the hips.', 'حافظ على ثني بسيط وادفع الوركين للخلف.', 'Keep a soft knee bend and send your hips backward.'),
    guide('back-round', 'back', 'تقويس الظهر أثناء الميل', 'Rounding the back during the hinge', 'قد يتجاوز الجذع مدى الورك المتحكم به.', 'The torso may move beyond controlled hip range.', 'أوقف الميل عندما يبدأ الظهر بالتغير وحافظ عليه طويلًا.', 'Stop the hinge before your back changes shape and keep it long.'),
    guide('weight-to-toes', 'feet', 'نقل الوزن إلى أصابع القدم', 'Shifting weight onto the toes', 'دفع الركبتين للأمام قد يبعد الجسم عن التوازن.', 'Knees drifting forward can shift your balance.', 'حافظ على ضغط متوازن عبر القدمين وادفع الوركين للخلف.', 'Keep pressure balanced through your feet and push your hips back.'),
  ],
  'pike-push-up': [
    guide('head-floor', 'range', 'النزول بالرأس أمام اليدين', 'Lowering the head in front of the hands', 'الهبوط للأمام بدل المساحة بين اليدين يغير اتجاه الضغط.', 'Lowering forward instead of between the hands changes the press.', 'وجّه الرأس بين اليدين مع مدى صغير ومريح.', 'Aim your head between your hands using a short, comfortable range.'),
    guide('elbows-wide', 'elbows', 'فتح المرفقين للخارج', 'Elbows flaring outward', 'اتساع المرفقين قد يزيد ضغط الكتف.', 'Wide elbows can increase shoulder strain.', 'وجّه المرفقين للخلف بزاوية مريحة.', 'Angle your elbows back at a comfortable angle.'),
    guide('hips-drop', 'hips-sag', 'هبوط الوركين وفقدان شكل V', 'Hips dropping and losing the V shape', 'قد لا يبقى الجذع والوركان في وضع ثابت أثناء التكرار.', 'The trunk and hips may lose their stable position during reps.', 'ارفع الوركين باعتدال واستخدم سطحًا مرتفعًا لنسخة أسهل.', 'Keep hips comfortably high or use an elevated surface for an easier version.'),
  ],
  'knee-push-up': [
    guide('hips-fold', 'hips', 'ثني الجسم عند الوركين', 'Folding at the hips', 'قد يبتعد الحوض عن خط الرأس والركبتين.', 'The hips may drift out of line with the head and knees.', 'شد الجذع وحافظ على خط مستقيم من الرأس للركبتين.', 'Brace your trunk and align your head, hips, and knees.'),
    guide('elbows-wide', 'elbows', 'فتح المرفقين للجانبين', 'Elbows flaring to the sides', 'المرفقان الواسعان قد يضغطان على الكتفين.', 'Wide elbows can stress the shoulders.', 'وجّه المرفقين للخلف أثناء النزول.', 'Guide your elbows back as you lower.'),
    guide('short-range', 'range', 'عدم تقريب الصدر من الأرض', 'Not lowering the chest', 'قد يكون المدى قصيرًا بسبب السرعة أو وضع اليدين.', 'Speed or hand position may shorten the range.', 'انزل ببطء حتى مدى مريح مع ثبات الجذع.', 'Lower slowly through a comfortable range while keeping your trunk steady.'),
  ],
  'wide-push-up': [
    guide('hands-too-wide', 'hands', 'اتساع اليدين أكثر من اللازم', 'Hands set too far apart', 'المسافة المفرطة قد تزيد إجهاد الكتف والرسغ.', 'Excessive width can strain the shoulders and wrists.', 'ابدأ أوسع قليلًا من الكتفين فقط.', 'Start only slightly wider than your shoulders.'),
    guide('elbows-out', 'elbows', 'فتح المرفقين بزاوية حادة', 'Elbows flaring sharply', 'الذراعان قد يبتعدان كثيرًا عن الجذع.', 'The arms may move too far away from the trunk.', 'خفف عرض اليدين ووجّه المرفقين قطريًا للخلف.', 'Narrow your hand placement and angle elbows diagonally back.'),
    guide('hips-sag', 'hips-sag', 'هبوط الحوض', 'Hips sagging', 'فقدان شد البطن يجعل الجسم غير متراصف.', 'Losing core tension breaks body alignment.', 'شد الأرداف والبطن أو استخدم نسخة الركبتين.', 'Brace your glutes and abs or use the knee variation.'),
  ],
  'close-grip-push-up': [
    guide('hands-overlap', 'hands', 'تقريب اليدين أكثر من اللازم', 'Hands placed too close together', 'الوضع الضيق جدًا قد يزعج الرسغ ويصعّب التوازن.', 'An overly narrow position can bother wrists and challenge balance.', 'اجعل اليدين بعرض الكتفين تقريبًا أو أضيق قليلًا.', 'Place hands about shoulder-width apart or slightly narrower.'),
    guide('elbows-out', 'elbows', 'ابتعاد المرفقين عن الجذع', 'Elbows drifting away from the trunk', 'قد يتحول الضغط من الذراعين إلى إجهاد الكتف.', 'The press may shift from the arms to shoulder strain.', 'وجّه المرفقين للخلف بمحاذاة الجذع.', 'Guide your elbows back alongside your torso.'),
    guide('hips-sag', 'hips-sag', 'تقوس أسفل الظهر', 'Lower back arching', 'قد يضعف شد عضلات البطن خلال الحركة.', 'Abdominal bracing may fade during the movement.', 'شد الجذع وحافظ على استقامة الجسم من الرأس للكعبين.', 'Brace your trunk and keep a straight line from head to heels.'),
  ],
  'bicep-self-curl': [
    guide('wrist-bend', 'hands', 'ثني الرسغ بدل الذراع', 'Bending the wrist instead of the arm', 'قد ينهار الرسغ لمقاومة اليد الأخرى.', 'The wrist may collapse while resisting the other hand.', 'حافظ على الرسغ مستقيمًا وحرّك الساعد من المرفق.', 'Keep your wrist straight and move your forearm from the elbow.'),
    guide('elbow-drift', 'elbows', 'تحرك المرفق للأمام', 'Elbow drifting forward', 'قد يرفع الكتف الذراع لتسهيل الثني.', 'The shoulder may lift the arm to make the curl easier.', 'ثبّت المرفق بجوار الجسم واعمل بمقاومة معتدلة.', 'Keep your elbow beside your torso and use moderate resistance.'),
    guide('uneven-resistance', 'jerk', 'مقاومة متقطعة أو مفاجئة', 'Jerky or uneven resistance', 'تغيير قوة اليد بسرعة يصعّب التحكم في المفصل.', 'Changing hand pressure quickly makes joint control harder.', 'قاوم بسلاسة وحافظ على جهد ثابت في الاتجاهين.', 'Apply smooth resistance and steady effort in both directions.'),
  ],
  'superman-pull': [
    guide('high-lift', 'back', 'رفع الصدر والساقين عاليًا', 'Lifting the chest and legs too high', 'المد الزائد قد يضغط على أسفل الظهر.', 'Excessive extension can compress the lower back.', 'ارفع الأطراف قليلًا فقط مع شد الأرداف.', 'Lift only slightly while engaging your glutes.'),
    guide('neck-crane', 'neck', 'مد الرقبة والنظر للأمام', 'Cranking the neck to look forward', 'رفع الرأس قد يسبب توترًا في الرقبة.', 'Lifting the head can strain the neck.', 'اجعل النظر للأرض والرقبة امتدادًا للعمود الفقري.', 'Look down and keep your neck in line with your spine.'),
    guide('fast-pull', 'jerk', 'سحب الذراعين بسرعة', 'Pulling the arms quickly', 'السرعة تقلل التحكم في الكتف ولوحي الكتف.', 'Speed reduces control of the shoulders and shoulder blades.', 'اسحب المرفقين ببطء نحو الجذع ثم مد الذراعين بهدوء.', 'Draw elbows slowly toward your torso, then extend smoothly.'),
  ],
  'reverse-snow-angel': [
    guide('arm-lift', 'shoulder', 'رفع الذراعين بعيدًا عن الأرض', 'Lifting arms too far off the floor', 'المبالغة في الرفع قد تعوضها الرقبة أو أسفل الظهر.', 'Excessive lift may recruit the neck or lower back.', 'حرّك الذراعين قريبًا من الأرض وبمدى صغير.', 'Move your arms close to the floor through a small range.'),
    guide('shrug', 'shoulder', 'رفع الكتفين للأذنين', 'Shrugging toward the ears', 'قد يزيد شد الرقبة أثناء سحب الذراعين للخلف.', 'Neck tension can rise while sweeping the arms back.', 'أبقِ الكتفين منخفضين واسحب لوحي الكتف بلطف.', 'Keep shoulders low and gently draw your shoulder blades together.'),
    guide('back-arch', 'back', 'تقويس أسفل الظهر', 'Arching the lower back', 'قد ترتفع الأضلاع عند محاولة الوصول بالذراعين للخلف.', 'The ribs may flare when reaching the arms too far back.', 'شد البطن بخفة وأبقِ الجذع مستقرًا على الأرض.', 'Brace gently and keep your trunk settled on the floor.'),
  ],
  'prone-t-raise': [
    guide('neck-lift', 'neck', 'رفع الرأس لمتابعة الحركة', 'Lifting the head to watch the movement', 'النظر للأمام يخرج الرقبة من وضعها المحايد.', 'Looking forward takes the neck out of neutral.', 'انظر للأسفل وأبقِ الجبهة قريبة من الأرض.', 'Look down and keep your forehead near the floor.'),
    guide('elbow-bend', 'elbows', 'ثني المرفقين بدل مد الذراعين', 'Bending elbows instead of reaching long', 'الانثناء يغير شكل حرف T ويحد من عمل الكتف الخلفي.', 'Bending changes the T shape and limits rear-shoulder work.', 'مد الذراعين للجانبين مع ارتخاء بسيط للمرفق.', 'Reach your arms out to the sides with a soft elbow bend.'),
    guide('large-lift', 'range', 'رفع الذراعين بارتفاع مبالغ فيه', 'Raising arms excessively high', 'قد يتحول الرفع إلى تقويس في الظهر.', 'Excessive lift can turn into back arching.', 'ارفع اليدين قليلًا واعصر لوحي الكتف دون ألم.', 'Lift your hands slightly and squeeze your shoulder blades without pain.'),
  ],
  'scapular-push-up': [
    guide('elbow-bend', 'elbows', 'ثني المرفقين أثناء الحركة', 'Bending the elbows during the movement', 'قد يختلط ضغط لوحي الكتف مع تمرين الضغط العادي.', 'The scapular movement may turn into a regular push-up.', 'ثبّت المرفقين وحرّك الصدر بين لوحي الكتف فقط.', 'Keep elbows straight and move your chest between your shoulder blades.'),
    guide('hips-move', 'hips-sag', 'تحرك الحوض مع لوحي الكتف', 'Hips moving with the shoulder blades', 'ضعف شد الجذع يجعل الجسم يتأرجح بدل حركة الكتف.', 'Low trunk tension makes the body sway instead of the shoulders moving.', 'شد البطن والأرداف وثبّت الجذع.', 'Brace your abs and glutes to keep your trunk still.'),
    guide('shrug', 'shoulder', 'رفع الكتفين نحو الرقبة', 'Shrugging toward the neck', 'التركيز على دفع الأرض قد يرفع الكتفين للأذنين.', 'Pushing the floor away may cause the shoulders to shrug.', 'حافظ على الرقبة طويلة وحرّك لوحي الكتف بتحكم.', 'Keep your neck long and move your shoulder blades with control.'),
  ],
  'arm-circles': [
    guide('arm-shrug', 'shoulder', 'رفع الكتفين أثناء الدوائر', 'Shrugging during the circles', 'قد ينتقل الجهد إلى الرقبة بدل حركة الكتف.', 'Effort may shift to the neck instead of the shoulders.', 'أبقِ الكتفين منخفضين وابدأ بدوائر صغيرة.', 'Keep your shoulders low and begin with small circles.'),
    guide('locked-elbows', 'elbows', 'قفل المرفقين بقوة', 'Locking the elbows', 'شد الذراعين بالكامل قد يسبب توترًا غير ضروري.', 'Fully tensing the arms can create unnecessary strain.', 'حافظ على ليونة بسيطة في المرفقين.', 'Keep a soft bend in your elbows.'),
    guide('fast-arms', 'jerk', 'تحريك الذراعين بسرعة', 'Moving the arms too quickly', 'السرعة تقلل التحكم في مسار الكتف.', 'Speed reduces control of the shoulder path.', 'أبطئ الحركة وحافظ على دوائر متساوية.', 'Slow down and keep the circles even.'),
  ],
  'chest-expansion': [
    guide('rib-flare', 'back', 'دفع الأضلاع للأمام', 'Flaring the ribs forward', 'قد يعوض الجذع محدودية حركة الكتف بتقويس الظهر.', 'The torso may compensate for limited shoulder range by arching.', 'شد البطن بخفة وحافظ على الأضلاع فوق الحوض.', 'Brace gently and keep your ribs stacked over your hips.'),
    guide('overreach', 'range', 'فتح الذراعين خلف الجسم أكثر من اللازم', 'Reaching the arms too far behind', 'المد الزائد قد يضغط على مقدمة الكتف.', 'Overreaching can strain the front of the shoulder.', 'افتح الذراعين ضمن مدى مريح فقط.', 'Open your arms only through a comfortable range.'),
    guide('raised-shoulders', 'shoulder', 'شد الكتفين نحو الأذنين', 'Tensing shoulders toward the ears', 'رفع الكتفين يقلل حركة لوحي الكتف المريحة.', 'Shrugging limits comfortable shoulder-blade movement.', 'أرخِ الرقبة وأبقِ الكتفين منخفضين.', 'Relax your neck and keep your shoulders down.'),
  ],
  'torso-twists': [
    guide('hip-swing', 'hips', 'تحريك الحوض مع اللف', 'Swinging the hips with the twist', 'الاندفاع أو السرعة يجعلان الحركة تأتي من الساقين.', 'Momentum can make the movement come from the legs.', 'ثبّت القدمين ولف الصدر بهدوء.', 'Keep your feet planted and rotate your chest gently.'),
    guide('forced-twist', 'range', 'لف الجذع إلى مدى مؤلم', 'Twisting into a painful range', 'قد يتجاوز اللف مدى الحركة المريح للظهر.', 'The twist may exceed your comfortable spinal range.', 'قلل زاوية الدوران وتوقف عند شد مريح.', 'Use a smaller turn and stop at a comfortable stretch.'),
    guide('bouncing', 'jerk', 'الارتداد بين الجهتين', 'Bouncing between sides', 'الارتداد يقلل التحكم ويزيد سرعة الالتفاف.', 'Bouncing reduces control and accelerates the rotation.', 'توقف لحظة في المنتصف وبدّل الجهة ببطء.', 'Pause at center and switch sides slowly.'),
  ],
  'leg-raise': [
    guide('back-arch', 'back', 'تقوس أسفل الظهر عند الإنزال', 'Arching the lower back while lowering', 'قد يكون مدى خفض الساقين أكبر من قدرة الجذع على الثبات.', 'The lowering range may exceed your core control.', 'ارفع الساقين قليلًا أو اثنِ الركبتين وثبّت الظهر.', 'Raise your legs higher or bend your knees and keep your back grounded.'),
    guide('momentum', 'jerk', 'استخدام الاندفاع لرفع الساقين', 'Using momentum to lift the legs', 'التأرجح يقلل التحكم في عضلات الجذع.', 'Swinging reduces control through the core.', 'ابدأ الحركة ببطء وأوقفها قبل التأرجح.', 'Move slowly and stop before you begin to swing.'),
    guide('neck-tension', 'neck', 'شد الرقبة ورفع الرأس', 'Tensing the neck and lifting the head', 'محاولة مراقبة الساقين قد تسبب توترًا في الرقبة.', 'Watching your legs can create neck tension.', 'أرح الرأس على الأرض وانظر للأعلى.', 'Rest your head on the floor and look upward.'),
  ],
  'high-knees': [
    guide('lean-back', 'torso', 'الميل للخلف مع رفع الركبتين', 'Leaning back while lifting the knees', 'رفع الركبة أعلى من المدى المريح قد يسحب الجذع للخلف.', 'Lifting beyond a comfortable range can pull your torso backward.', 'اخفض ارتفاع الركبة وأبقِ الجذع فوق الحوض.', 'Lower your knee height and keep your torso over your hips.'),
    guide('hard-landing', 'feet', 'الهبوط بقوة على القدمين', 'Landing heavily on the feet', 'الإيقاع العالي قد يجعل الخطوات صاخبة وثقيلة.', 'A fast pace can make each step loud and heavy.', 'خفف السرعة واجعل الهبوط ناعمًا.', 'Slow down and land softly.'),
    guide('uncoordinated-arms', 'shoulder', 'تثبيت الذراعين أو شد الكتفين', 'Stiff arms or tense shoulders', 'عدم تنسيق الذراعين قد يرفع التوتر ويؤثر في الإيقاع.', 'Uncoordinated arms can increase tension and disrupt rhythm.', 'أرخِ الكتفين وحرك الذراع المقابلة للركبة.', 'Relax your shoulders and move the opposite arm with each knee.'),
  ],
  'standing-side-stretch': [
    guide('chest-rotation', 'torso', 'تدوير الصدر إلى الأمام', 'Rotating the chest forward', 'قد يحوّل الالتواء الحركة من تمدد جانبي إلى دوران.', 'Twisting changes the movement from a side stretch to a rotation.', 'وجّه الصدر للأمام ومِل من الجذع فقط.', 'Keep your chest facing forward and bend from your torso.'),
    guide('hip-shift', 'hips', 'دفع الورك بعيدًا عن خط الجسم', 'Pushing the hip out of alignment', 'قد يسبب الميل الجانبي فقدان الثبات على القدمين.', 'Leaning can make your stance unstable.', 'وزّع الوزن على القدمين وحافظ على الوركين ثابتين.', 'Share your weight between both feet and keep your hips steady.'),
    guide('overhead-shoulder', 'shoulder', 'رفع الكتف قرب الأذن', 'Shrugging the raised shoulder', 'شد الذراع للأعلى قد يسبب توترًا في الرقبة.', 'Reaching forcefully can tense the neck.', 'مد الذراع برفق وأبقِ الكتف بعيدًا عن الأذن.', 'Reach gently and keep your shoulder away from your ear.'),
  ],
  'cat-cow': [
    guide('neck-only', 'neck', 'تحريك الرقبة وحدها', 'Moving only the neck', 'قد يتركز الانثناء في الرقبة بدل العمود الفقري.', 'The movement may stay in the neck instead of the spine.', 'دع الرأس يتبع حركة الظهر برفق.', 'Let your head follow your spine gently.'),
    guide('forced-range', 'back', 'تقويس الظهر بقوة', 'Forcing the back into an arch', 'دفع البطن والصدر للأسفل أكثر من المريح قد يضغط أسفل الظهر.', 'Forcing the belly and chest down can strain the lower back.', 'استخدم مدى صغيرًا وابقَ ضمن الحركة المريحة.', 'Use a small range and stay within comfortable movement.'),
    guide('rushed-breath', 'jerk', 'التبديل بسرعة دون تنفس', 'Rushing without breathing', 'السرعة قد تجعل الحركة مفاجئة وتقلل التنسيق مع النفس.', 'Rushing can make the movement abrupt and disrupt breathing.', 'اربط كل انتقال بشهيق أو زفير هادئ.', 'Pair each transition with a calm inhale or exhale.'),
  ],
};

export const exerciseFormErrorGuidesFor = (exerciseId: string) =>
  exerciseFormErrors[exerciseId] ?? [];
