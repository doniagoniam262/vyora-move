export type ExerciseErrorGuide = {
  id: string;
  visual: string;
  title: { ar: string; en: string };
  cause: { ar: string; en: string };
  correction: { ar: string; en: string };
};

export const exerciseFormErrors: Record<string, ExerciseErrorGuide[]> = {
  squat: [
    {
      id: 'knees',
      visual: 'knees',
      title: { ar: 'انهيار الركبتين للداخل', en: 'Knees collapsing inward' },
      cause: { ar: 'قد يحدث عند ضعف التحكم في الورك أو عند زيادة الحمل والسرعة عن قدرة الجسم.', en: 'This can happen when hip control is limited or the load and speed exceed current capacity.' },
      correction: { ar: 'خفّف عمق الحركة، ووجّه الركبتين برفق نحو أصابع القدمين مع إبقاء القدمين ثابتتين.', en: 'Reduce depth and track your knees toward your toes while keeping both feet grounded.' },
    },
    {
      id: 'back',
      visual: 'back',
      title: { ar: 'تقوّس أو انحناء الظهر', en: 'Back rounding or over-arching' },
      cause: { ar: 'غالبًا ينتج عن محاولة النزول أعمق من مدى الحركة المريح أو فقدان شدّ الجذع.', en: 'Often caused by dropping deeper than your comfortable range or losing trunk control.' },
      correction: { ar: 'شدّ البطن باعتدال، وحافظ على الجذع ثابتًا، واكتفِ بمدى تستطيع التحكم فيه.', en: 'Brace gently, keep your trunk steady, and use only a range you can control.' },
    },
    {
      id: 'depth',
      visual: 'depth',
      title: { ar: 'التسرّع في النزول أو قطع المدى', en: 'Rushing or cutting the range short' },
      cause: { ar: 'قد يكون السبب التسرع أو اختيار عمق لا يناسب التوازن والمرونة الحاليين.', en: 'Rushing or choosing a depth that does not suit current balance and mobility may cause this.' },
      correction: { ar: 'انزل ببطء إلى عمق مريح مع بقاء الكعبين على الأرض، ثم زد المدى تدريجيًا.', en: 'Lower slowly to a comfortable depth with heels down, then build range gradually.' },
    },
  ],
  'push-up': [
    {
      id: 'hips-sag',
      visual: 'hips-sag',
      title: { ar: 'هبوط الحوض', en: 'Hips sagging' },
      cause: { ar: 'يحدث غالبًا عند ضعف شدّ البطن أو اختيار عدد تكرارات أكبر من القدرة الحالية.', en: 'Often caused by losing core tension or attempting more repetitions than current capacity.' },
      correction: { ar: 'شدّ البطن والأرداف وحافظ على خط مستقيم؛ استخدم وضع الركبتين أو سطحًا مرتفعًا عند الحاجة.', en: 'Brace your core and glutes; use a knee or incline variation when needed.' },
    },
    {
      id: 'elbows',
      visual: 'elbows',
      title: { ar: 'فتح المرفقين للخارج', en: 'Elbows flaring too wide' },
      cause: { ar: 'قد تبتعد اليدان أو المرفقان أكثر من اللازم، فيزيد الضغط على الكتفين.', en: 'Hands or elbows may drift too wide, increasing shoulder strain.' },
      correction: { ar: 'ضع اليدين أسفل الكتفين تقريبًا، واجعل المرفقين بزاوية مريحة باتجاه الخلف.', en: 'Place hands about under the shoulders and guide elbows back at a comfortable angle.' },
    },
    {
      id: 'neck',
      visual: 'neck',
      title: { ar: 'إسقاط الرأس أو قصر النزول', en: 'Head dropping or uncontrolled depth' },
      cause: { ar: 'غالبًا بسبب متابعة الأرض بالرأس أو النزول أسرع من القدرة على التحكم.', en: 'Often caused by leading with the head or lowering faster than you can control.' },
      correction: { ar: 'اجعل الرقبة امتدادًا للجذع، وانزل بالصدر بتحكم ضمن مدى مريح.', en: 'Keep your neck aligned with your trunk and lower your chest through a controlled range.' },
    },
  ],
  plank: [
    {
      id: 'hips-sag',
      visual: 'hips-sag',
      title: { ar: 'هبوط الوركين', en: 'Hips dropping' },
      cause: { ar: 'يظهر عند فقدان شدّ البطن أو إطالة الثبات بعد التعب.', en: 'This appears when core tension fades or the hold continues after fatigue.' },
      correction: { ar: 'شدّ البطن والأرداف، وأنهِ الجولة قبل أن يهبط أسفل الظهر.', en: 'Brace your core and glutes, and end the hold before your lower back sags.' },
    },
    {
      id: 'hips-high',
      visual: 'hips-high',
      title: { ar: 'رفع الوركين عاليًا', en: 'Hips lifted too high' },
      cause: { ar: 'قد تكون محاولة لتخفيف الحمل على الجذع، لكنها تقلل ثبات وضع البلانك.', en: 'This may be an attempt to reduce core effort, but it changes the plank alignment.' },
      correction: { ar: 'اخفض الوركين حتى يصطف الرأس والكتفان والحوض والكعبان.', en: 'Lower your hips until your head, shoulders, hips, and heels align.' },
    },
    {
      id: 'neck',
      visual: 'neck',
      title: { ar: 'رفع الرأس أو حبس النفس', en: 'Neck strain or held breath' },
      cause: { ar: 'النظر للأمام أو التركيز المفرط قد يسبب توتر الرقبة والتنفس.', en: 'Looking forward or over-focusing can tense the neck and interrupt breathing.' },
      correction: { ar: 'انظر للأرض أسفل الوجه مباشرة، وتنفس بهدوء طوال الثبات.', en: 'Look at the floor below your face and keep breathing calmly.' },
    },
  ],
  lunge: [
    {
      id: 'knee-in',
      visual: 'knee-in',
      title: { ar: 'تحرك الركبة الأمامية للداخل', en: 'Front knee collapsing inward' },
      cause: { ar: 'قد يرتبط بخطوة غير ثابتة أو فقدان الاتزان أثناء النزول.', en: 'This can follow an unstable step or loss of balance while lowering.' },
      correction: { ar: 'خفف عمق الحركة، وثبّت القدم، ووجّه الركبة نحو منتصف القدم.', en: 'Reduce depth, steady your foot, and track the knee toward the middle of the foot.' },
    },
    {
      id: 'stride',
      visual: 'stride',
      title: { ar: 'خطوة قصيرة أو ضيقة', en: 'Step too short or narrow' },
      cause: { ar: 'قد تجعل المسافة غير المناسبة الحركة غير مريحة وتحد من الاتزان.', en: 'An unsuitable step length can make the movement uncomfortable and unstable.' },
      correction: { ar: 'ابدأ بخطوة مريحة بعرض الحوض، وامسك دعمًا ثابتًا إذا احتجت.', en: 'Use a comfortable hip-width stance and hold stable support if needed.' },
    },
    {
      id: 'torso',
      visual: 'torso',
      title: { ar: 'ميل الجذع أو فقدان الاتزان', en: 'Torso tipping or losing balance' },
      cause: { ar: 'يحدث عند الاندفاع بسرعة أو نقل الوزن إلى مقدمة القدم.', en: 'This can happen when lunging too quickly or shifting weight onto the toes.' },
      correction: { ar: 'حافظ على الجذع طويلًا، ووزّع الضغط على كامل القدم الأمامية.', en: 'Keep your torso tall and distribute pressure through the whole front foot.' },
    },
  ],
  'glute-bridge': [
    {
      id: 'arch',
      visual: 'arch',
      title: { ar: 'المبالغة في تقويس أسفل الظهر', en: 'Over-arching the lower back' },
      cause: { ar: 'قد يحدث عند رفع الحوض أعلى من مدى الحركة أو دفع الحركة من الظهر.', en: 'This can happen when lifting beyond your range or driving the movement from your back.' },
      correction: { ar: 'شدّ البطن وارفع الحوض حتى يصطف الجذع والفخذان دون ألم.', en: 'Brace your core and lift until your torso and thighs align, without pain.' },
    },
    {
      id: 'feet',
      visual: 'feet',
      title: { ar: 'إبعاد القدمين عن الحوض', en: 'Feet positioned too far away' },
      cause: { ar: 'المسافة الزائدة قد تنقل الجهد من الأرداف وتقلل ثبات الحركة.', en: 'Excessive distance can shift effort away from the glutes and reduce stability.' },
      correction: { ar: 'قرّب القدمين بحيث تستطيع ضغط الأرض بالكعبين براحة.', en: 'Bring your feet closer so you can press comfortably through your heels.' },
    },
    {
      id: 'push',
      visual: 'push',
      title: { ar: 'الدفع من الرقبة أو القدمين فقط', en: 'Pushing through the neck or toes' },
      cause: { ar: 'قد يكون بسبب وضع القدمين أو محاولة رفع الحوض بقوة بدل التحكم.', en: 'This may come from foot placement or forcing the lift instead of controlling it.' },
      correction: { ar: 'أبقِ الرأس والكتفين مسترخيين، وادفع من الكعبين مع عصر الأرداف.', en: 'Relax your head and shoulders, press through your heels, and squeeze your glutes.' },
    },
  ],
  deadlift: [
    {
      id: 'back-round',
      visual: 'back-round',
      title: { ar: 'تقوّس الظهر أثناء الرفع', en: 'Rounding the back during the lift' },
      cause: { ar: 'قد يحدث عند زيادة الوزن أو النزول أبعد من مدى الورك المتحكم به.', en: 'This can happen when the load is too heavy or the hinge exceeds controlled range.' },
      correction: { ar: 'خفف الحمل، وابدأ من الورك، وحافظ على الظهر محايدًا والوزن قريبًا.', en: 'Reduce load, hinge from the hips, and keep a neutral back with the weight close.' },
    },
    {
      id: 'bar-distance',
      visual: 'bar-distance',
      title: { ar: 'ابتعاد الوزن عن الجسم', en: 'Weight drifting away from the body' },
      cause: { ar: 'ابتعاد الوزن يزيد ذراع المقاومة ويجعل التحكم أصعب على الظهر.', en: 'A distant load increases leverage and makes back control harder.' },
      correction: { ar: 'حرّك الوزن قريبًا من الساقين مع إبقاء الذراعين مرتخيتين.', en: 'Keep the load close to your legs and your arms relaxed.' },
    },
    {
      id: 'jerk',
      visual: 'jerk',
      title: { ar: 'سحب الوزن بسرعة أو بقفزة', en: 'Jerking the load off the floor' },
      cause: { ar: 'الاستعجال قبل تثبيت القدمين والجذع يقلل التحكم في بداية الحركة.', en: 'Starting before setting your feet and trunk reduces control at lift-off.' },
      correction: { ar: 'ثبّت القدمين، شدّ الجذع، ثم ارفع بسلاسة مع دفع الأرض.', en: 'Set your feet, brace your trunk, and lift smoothly while pressing the floor away.' },
    },
  ],
};

export const exerciseFormErrorGuidesFor = (exerciseId: string) =>
  exerciseFormErrors[exerciseId] ?? [];
