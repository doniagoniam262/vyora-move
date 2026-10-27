import type { MuscleId } from './movement-details';

type Text = { ar: string; en: string };
type MuscleEducation = { role: Text; benefit: Text; steps: [Text, Text, Text] };
const t = (ar: string, en: string): Text => ({ ar, en });

/** Anatomical guidance complements, rather than replaces, each exercise's specific instructions. */
export const muscleEducation: Record<MuscleId, MuscleEducation> = {
  chest: {
    role: t('عضلات الصدر تساعد على دفع الذراعين للأمام وتقريبهما من الجذع، وتشارك مع الكتف والذراع في حركات الدفع.', 'The chest helps press the arms forward and bring them toward the torso, working with shoulders and arms in pushing movements.'),
    benefit: t('تقويتها تدريجيًا تدعم دفع الأشياء والتحكم في الجزء العلوي من الجسم.', 'Gradual strengthening supports everyday pushing and upper-body control.'),
    steps: [
      t('اضبط موضع اليدين واتجاه المرفقين حسب تعليمات تمرين الدفع المحدد.', 'Set hand position and elbow direction as specified for the particular push exercise.'),
      t('تحكم في النزول أو الاقتراب من السطح دون سقوط الكتفين للأمام.', 'Control the lowering phase without collapsing the shoulders forward.'),
      t('ادفع بثبات مع الزفير وحافظ على الجذع متماسكًا دون تقويس الظهر.', 'Press steadily while exhaling, keeping the trunk supported without arching the back.'),
    ],
  },
  shoulders: {
    role: t('عضلات الكتف تحرك الذراع وتساعد على تثبيت مفصل الكتف أثناء الرفع والدفع أو الثبات.', 'The shoulder muscles move the arm and help stabilize the shoulder joint while lifting, pushing or holding a position.'),
    benefit: t('التحكم التدريجي بها يدعم الوصول والرفع وتحمل أنشطة الجزء العلوي.', 'Developing control supports reaching, lifting and upper-body endurance.'),
    steps: [
      t('ابدأ برقبة مريحة وكتفين بعيدين عن الأذنين دون شد مبالغ فيه.', 'Start with a relaxed neck and shoulders away from the ears without forcing them down.'),
      t('حرّك الذراع أو ثبّته في المدى الموضح للتمرين، وبحدود خالية من الألم.', 'Move or hold the arm as shown in the exercise, within a pain-free range.'),
      t('عد ببطء ولا تستخدم هز الجذع لإكمال المدى.', 'Return slowly; do not swing the trunk to force a larger range.'),
    ],
  },
  arms: {
    role: t('العضلة ذات الرأسين تثني الكوع، والثلاثية تمده؛ وتتعاون عضلات الذراع لتثبيته عند الارتكاز.', 'The biceps bend the elbow and the triceps straighten it; arm muscles also cooperate to stabilize it during support.'),
    benefit: t('تساعد القوة والتحمل في الذراع على الحمل والدفع والسحب اليومي.', 'Arm strength and endurance help with everyday carrying, pushing and pulling.'),
    steps: [
      t('اجعل الرسغ في وضع مريح ومتوافق مع اتجاه الساعد.', 'Keep the wrist comfortable and aligned with the forearm.'),
      t('اثنِ أو مدّ الكوع أو ثبّته بحسب تعليمات التمرين، دون قفل عنيف.', 'Bend, straighten or hold the elbow as instructed, without forceful locking.'),
      t('حافظ على تحكم مستمر وتجنب رمي الوزن أو التعويض بتحريك الكتف.', 'Keep continuous control rather than throwing the load or compensating with the shoulder.'),
    ],
  },
  'upper-back': {
    role: t('عضلات أعلى الظهر تنظّم حركة لوحي الكتف وتساعد على السحب والتحكم في وضع الجزء العلوي.', 'The upper back controls shoulder-blade motion and assists pulling and upper-body positioning.'),
    benefit: t('تقويتها تدعم تحمل الظهر والكتفين في الحمل والعمل والحركة اليومية.', 'Strengthening supports back and shoulder endurance during carrying, work and daily movement.'),
    steps: [
      t('أطل الرقبة براحة ولا ترفع الذقن لتعويض الحركة.', 'Keep the neck comfortably long; do not lift the chin to compensate.'),
      t('اسمح للوحي الكتف بالحركة فوق القفص الصدري حسب التمرين؛ لا تثبتهما بعصر دائم.', 'Let the shoulder blades move over the rib cage as required; do not keep them forcefully pinched.'),
      t('أنه المدى المتاح بتحكم ثم عد ببطء دون اندفاع أو تقويس زائد.', 'Finish the available range with control, then return slowly without jerking or overextending.'),
    ],
  },
  core: {
    role: t('عضلات الجذع تساعد على التحكم في العمود الفقري ونقل القوة بين الجزء العلوي والسفلي، سواء في الثبات أو الحركة.', 'The core helps control the spine and transfer force between upper and lower body during holds and movement.'),
    benefit: t('تنمية تحملها يدعم الاتزان والتحكم في الجذع أثناء المهام والتمارين.', 'Building core endurance supports balance and trunk control in tasks and exercise.'),
    steps: [
      t('قرّب وضع الأضلاع والحوض من المحاذاة المريحة وحدد وضع الظهر حسب التمرين.', 'Set the ribs and pelvis in a comfortable relationship and position the back as instructed.'),
      t('شد البطن شدًا خفيفًا يسمح بالتنفس الطبيعي، دون حبس النفس.', 'Gently engage the abdomen while allowing normal breathing; do not hold your breath.'),
      t('قلل المدى أو المدة إذا بدأ الظهر يتقوس أو أصبح الحفاظ على التنفس صعبًا.', 'Reduce the range or hold time if the back begins to arch or breathing becomes difficult.'),
    ],
  },
  obliques: {
    role: t('العضلات الجانبية للبطن تساعد على الدوران والميل الجانبي ومقاومة الدوران غير المقصود.', 'The obliques assist rotation and side bending and resist unwanted rotation.'),
    benefit: t('تدعم التحكم في الجذع عند تغيير الاتجاه أو حمل الأشياء على جانب واحد.', 'They support trunk control when changing direction or carrying on one side.'),
    steps: [
      t('حاذِ الحوض والأضلاع قبل البدء دون شد الرقبة.', 'Align the pelvis and ribs before starting, without neck tension.'),
      t('حرّك الجذع أو قاوم دورانه بحسب التمرين، ولا تسحب الرأس باليدين.', 'Move the trunk or resist rotation as instructed; do not pull the head with the hands.'),
      t('اعمل على الجانبين بتوازن وارجع ببطء مع تنفس مستمر.', 'Work both sides evenly and return slowly while continuing to breathe.'),
    ],
  },
  glutes: {
    role: t('عضلات الأرداف تمد الورك وتساعد على إبعاد الفخذ وتثبيت الحوض أثناء الوقوف والخطوات.', 'The glutes extend the hip, assist moving the thigh outward and stabilize the pelvis during standing and steps.'),
    benefit: t('تقويتها تدعم صعود الدرج والنهوض والتحكم في الحوض.', 'Strengthening supports stair climbing, standing up and pelvic control.'),
    steps: [
      t('ثبت موضع القدمين أو الارتكاز كما هو موضح مع حوض متوازن.', 'Set the feet or support points as instructed with a balanced pelvis.'),
      t('نفّذ الحركة من مفصل الورك بدل دفع أسفل الظهر إلى تقوس أكبر.', 'Move through the hip rather than pushing the lower back into a larger arch.'),
      t('شد الأرداف براحة في جزء الجهد ثم عد بتحكم دون رفع الحوض أكثر من اللازم.', 'Engage the glutes comfortably during effort, then return with control without over-lifting the pelvis.'),
    ],
  },
  quads: {
    role: t('عضلات أمام الفخذ تمد الركبة وتساعد على التحكم في ثنيها أثناء السكوات والنزول والخطوات.', 'The quadriceps straighten the knee and control knee bending during squats, lowering and steps.'),
    benefit: t('تدعم النهوض من الكرسي والمشي وصعود الدرج.', 'They support getting up from a chair, walking and climbing stairs.'),
    steps: [
      t('ضع القدمين في الوضع المطلوب ووزّع الضغط بثبات على نقاط الارتكاز.', 'Place the feet as instructed and distribute pressure steadily over the support points.'),
      t('وجّه الركبة مع اتجاه أصابع القدم دون انهيارها للداخل، وبمدى مريح.', 'Let the knee track with the toes without collapsing inward, within a comfortable range.'),
      t('تحكم في النزول والعودة وتجنب القفز أو قفل الركبة بعنف.', 'Control both lowering and returning, without bouncing or forcefully locking the knee.'),
    ],
  },
  hamstrings: {
    role: t('عضلات خلف الفخذ تثني الركبة وتساعد على مد الورك والتحكم في السلسلة الخلفية.', 'The hamstrings bend the knee and assist hip extension and control of the posterior chain.'),
    benefit: t('تدعم الخطوات والتحكم في الورك والركبة أثناء الأنشطة اليومية.', 'They support stepping and hip and knee control during everyday activities.'),
    steps: [
      t('ابدأ بوضع مريح للحوض والركبتين واتبع زاوية الركبة الخاصة بالتمرين.', 'Start with a comfortable pelvis and knees, following the knee angle required by the exercise.'),
      t('حرّك الورك أو الركبة بهدوء؛ في التمدد لا تجبر الركبة على الاستقامة.', 'Move the hip or knee smoothly; during stretching, do not force the knee straight.'),
      t('ارجع ببطء وتوقف عند ألم حاد أو إحساس ممتد غير معتاد.', 'Return slowly and stop for sharp pain or unusual radiating sensations.'),
    ],
  },
  calves: {
    role: t('عضلات السمانة تساعد على دفع القدم والتحكم في الكاحل والتوازن أثناء الوقوف والمشي.', 'The calves help push through the foot and control the ankle and balance during standing and walking.'),
    benefit: t('تطوير تحملها يدعم المشي وصعود الدرج وثبات الكاحل.', 'Developing endurance supports walking, stair climbing and ankle stability.'),
    steps: [
      t('وزّع الضغط براحة على القدم واستخدم دعمًا للتوازن إذا احتجت.', 'Distribute pressure comfortably over the foot and use support for balance if needed.'),
      t('غيّر وضع الكعب فقط كما تتطلب الحركة؛ لا تفرض رفعه في تمرين يحتاج ثباته.', 'Change heel position only as the movement requires; do not force a heel lift when the exercise needs it grounded.'),
      t('تحكم في العودة وتجنب الارتداد السريع أو ميل الكاحل إلى الجانب.', 'Control the return without rapid bouncing or letting the ankle roll sideways.'),
    ],
  },
  'hip-flexors': {
    role: t('مثنيات الورك تقرّب الفخذ من الجذع وتشارك في رفع الركبة والتحكم في وضع الحوض.', 'The hip flexors bring the thigh toward the torso and assist knee lifting and pelvic control.'),
    benefit: t('تساعد على خطوات المشي وصعود الدرج وحركة الطرف السفلي.', 'They assist walking steps, climbing stairs and lower-limb movement.'),
    steps: [
      t('حدد وضع الحوض والظهر المريح قبل بدء رفع الساق أو تثبيتها.', 'Set a comfortable pelvis and back before lifting or holding the leg.'),
      t('حرّك الفخذ بالمدى المطلوب دون الميل بالظهر لتعويض المدى.', 'Move the thigh through the instructed range without leaning the back to compensate.'),
      t('أعد الساق ببطء مع استمرار التنفس وقلل الارتفاع إذا فقدت الثبات.', 'Return the leg slowly while breathing, reducing the height if stability is lost.'),
    ],
  },
};
